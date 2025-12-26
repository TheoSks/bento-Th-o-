import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { optionalAuthMiddleware, AuthRequest } from '../middleware/auth.js';

export const leaderboardRouter = Router();

// Get global leaderboard
leaderboardRouter.get('/global', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
        gamesWon: true,
        gamesPlayed: true,
      },
      orderBy: { xp: 'desc' },
      take: limit,
      skip: offset,
    });

    const leaderboard = users.map((user, index) => ({
      rank: offset + index + 1,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      score: user.xp,
      level: user.level,
      winRate: user.gamesPlayed > 0
        ? Math.round((user.gamesWon / user.gamesPlayed) * 100)
        : 0,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get global leaderboard error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get weekly leaderboard
leaderboardRouter.get('/weekly', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;

    // In production, this would query a separate weekly stats table
    // For now, we return the same as global
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
        gamesWon: true,
        gamesPlayed: true,
      },
      orderBy: { xp: 'desc' },
      take: limit,
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      score: user.xp,
      level: user.level,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get weekly leaderboard error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get monthly leaderboard
leaderboardRouter.get('/monthly', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
        gamesWon: true,
        gamesPlayed: true,
      },
      orderBy: { xp: 'desc' },
      take: limit,
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      score: user.xp,
      level: user.level,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get monthly leaderboard error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get friends leaderboard
leaderboardRouter.get('/friends', optionalAuthMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Connexion requise' });
    }

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: req.userId, status: 'ACCEPTED' },
          { friendId: req.userId, status: 'ACCEPTED' },
        ],
      },
    });

    const friendIds = friendships.map((f) =>
      f.userId === req.userId ? f.friendId : f.userId
    );

    // Include current user
    friendIds.push(req.userId);

    const users = await prisma.user.findMany({
      where: { id: { in: friendIds } },
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
        gamesWon: true,
        gamesPlayed: true,
      },
      orderBy: { xp: 'desc' },
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      score: user.xp,
      level: user.level,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get friends leaderboard error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get genre leaderboard
leaderboardRouter.get('/genre/:genre', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;

    // In production, this would query genre-specific stats
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
      },
      orderBy: { xp: 'desc' },
      take: limit,
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      score: user.xp,
      level: user.level,
      genre: req.params.genre,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get genre leaderboard error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
