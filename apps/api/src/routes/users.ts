import { Router, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/auth.js';

export const userRouter = Router();

// Get user profile
userRouter.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
        gamesPlayed: true,
        gamesWon: true,
        totalCorrect: true,
        totalAnswers: true,
        bestStreak: true,
        currentStreak: true,
        createdAt: true,
        badges: {
          include: {
            badge: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Update user profile
userRouter.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ message: 'Non autorise' });
    }

    const { username, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        ...(username && { username }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user stats
userRouter.get('/:id/stats', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        gamesPlayed: true,
        gamesWon: true,
        totalCorrect: true,
        totalAnswers: true,
        bestStreak: true,
        currentStreak: true,
        xp: true,
        level: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }

    res.json({
      ...user,
      winRate: user.gamesPlayed > 0
        ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
        : 0,
      accuracy: user.totalAnswers > 0
        ? Math.round((user.totalCorrect / user.totalAnswers) * 100)
        : 0,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user badges
userRouter.get('/:id/badges', async (req: AuthRequest, res: Response) => {
  try {
    const badges = await prisma.userBadge.findMany({
      where: { userId: req.params.id },
      include: {
        badge: true,
      },
      orderBy: { unlockedAt: 'desc' },
    });

    res.json(badges);
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user game history
userRouter.get('/:id/history', async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const games = await prisma.gamePlayer.findMany({
      where: { userId: req.params.id },
      include: {
        game: {
          select: {
            id: true,
            roomCode: true,
            totalRounds: true,
            startedAt: true,
            endedAt: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
      take: limit,
      skip: offset,
    });

    res.json(games);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user friends
userRouter.get('/:id/friends', async (req: AuthRequest, res: Response) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ message: 'Non autorise' });
    }

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: req.params.id, status: 'ACCEPTED' },
          { friendId: req.params.id, status: 'ACCEPTED' },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            level: true,
          },
        },
        friend: {
          select: {
            id: true,
            username: true,
            avatar: true,
            level: true,
          },
        },
      },
    });

    const friends = friendships.map((f) =>
      f.userId === req.params.id ? f.friend : f.user
    );

    res.json(friends);
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Add friend
userRouter.post('/:id/friends', async (req: AuthRequest, res: Response) => {
  try {
    const { friendId } = req.body;

    if (req.userId === friendId) {
      return res.status(400).json({ message: 'Impossible de s\'ajouter soi-meme' });
    }

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: req.userId, friendId },
          { userId: friendId, friendId: req.userId },
        ],
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Demande deja envoyee' });
    }

    const friendship = await prisma.friendship.create({
      data: {
        userId: req.userId!,
        friendId,
        status: 'PENDING',
      },
    });

    res.status(201).json(friendship);
  } catch (error) {
    console.error('Add friend error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Remove friend
userRouter.delete('/:id/friends/:friendId', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId: req.userId, friendId: req.params.friendId },
          { userId: req.params.friendId, friendId: req.userId },
        ],
      },
    });

    res.json({ message: 'Ami supprime' });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
