import { Router, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/auth.js';

export const dailyRouter = Router();

// Get today's challenge
dailyRouter.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let challenge = await prisma.dailyChallenge.findUnique({
      where: { date: today },
    });

    if (!challenge) {
      // Create today's challenge
      const playlist = await prisma.playlist.findFirst({
        where: { isPublic: true },
      });

      if (!playlist) {
        return res.status(404).json({ message: 'Aucune playlist disponible' });
      }

      challenge = await prisma.dailyChallenge.create({
        data: {
          date: today,
          playlistId: playlist.id,
          topScores: [],
        },
      });
    }

    // Get playlist info
    const playlist = await prisma.playlist.findUnique({
      where: { id: challenge.playlistId },
    });

    // Calculate time remaining
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const timeRemaining = tomorrow.getTime() - Date.now();

    res.json({
      id: challenge.id,
      date: challenge.date,
      playlistId: challenge.playlistId,
      playlistName: playlist?.name,
      topScores: challenge.topScores,
      timeRemaining,
    });
  } catch (error) {
    console.error('Get daily challenge error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Play daily challenge
dailyRouter.post('/play', async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const challenge = await prisma.dailyChallenge.findUnique({
      where: { date: today },
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Defi non trouve' });
    }

    // Return challenge details for playing
    res.json({
      challengeId: challenge.id,
      playlistId: challenge.playlistId,
    });
  } catch (error) {
    console.error('Play daily challenge error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get daily leaderboard
dailyRouter.get('/leaderboard', async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const challenge = await prisma.dailyChallenge.findUnique({
      where: { date: today },
    });

    if (!challenge) {
      return res.json([]);
    }

    res.json(challenge.topScores);
  } catch (error) {
    console.error('Get daily leaderboard error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
