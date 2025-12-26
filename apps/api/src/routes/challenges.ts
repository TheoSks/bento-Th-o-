import { Router, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/auth.js';

export const challengeRouter = Router();

// Get user challenges
challengeRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        OR: [
          { senderId: req.userId },
          { receiverId: req.userId },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get user info for each challenge
    const userIds = new Set<string>();
    challenges.forEach((c) => {
      userIds.add(c.senderId);
      userIds.add(c.receiverId);
    });

    const users = await prisma.user.findMany({
      where: { id: { in: Array.from(userIds) } },
      select: { id: true, username: true, avatar: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    res.json(
      challenges.map((c) => ({
        id: c.id,
        sender: userMap.get(c.senderId),
        receiver: userMap.get(c.receiverId),
        playlistId: c.playlistId,
        senderScore: c.senderScore,
        receiverScore: c.receiverScore,
        status: c.status,
        createdAt: c.createdAt,
        expiresAt: c.expiresAt,
      }))
    );
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Create challenge
challengeRouter.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { receiverId, playlistId } = req.body;

    if (req.userId === receiverId) {
      return res.status(400).json({ message: 'Impossible de se defier soi-meme' });
    }

    // Check if friend
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: req.userId, friendId: receiverId, status: 'ACCEPTED' },
          { userId: receiverId, friendId: req.userId, status: 'ACCEPTED' },
        ],
      },
    });

    if (!friendship) {
      return res.status(400).json({ message: 'Vous devez etre amis pour vous defier' });
    }

    // Check for existing pending challenge
    const existing = await prisma.challenge.findFirst({
      where: {
        senderId: req.userId,
        receiverId,
        status: 'PENDING',
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'Un defi est deja en cours' });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const challenge = await prisma.challenge.create({
      data: {
        senderId: req.userId!,
        receiverId,
        playlistId,
        status: 'PENDING',
        expiresAt,
      },
    });

    res.status(201).json(challenge);
  } catch (error) {
    console.error('Create challenge error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Accept/Decline challenge
challengeRouter.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { action } = req.body; // 'accept' | 'decline'

    const challenge = await prisma.challenge.findUnique({
      where: { id: req.params.id },
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Defi non trouve' });
    }

    if (challenge.receiverId !== req.userId) {
      return res.status(403).json({ message: 'Non autorise' });
    }

    if (challenge.status !== 'PENDING') {
      return res.status(400).json({ message: 'Ce defi ne peut plus etre modifie' });
    }

    const updatedChallenge = await prisma.challenge.update({
      where: { id: req.params.id },
      data: {
        status: action === 'accept' ? 'IN_PROGRESS' : 'DECLINED',
      },
    });

    res.json(updatedChallenge);
  } catch (error) {
    console.error('Update challenge error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
