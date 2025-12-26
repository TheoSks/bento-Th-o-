import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

export const playlistRouter = Router();

// Get all playlists
playlistRouter.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;

    const playlists = await prisma.playlist.findMany({
      where: {
        isPublic: true,
        ...(category && { category }),
      },
      orderBy: { name: 'asc' },
    });

    res.json(playlists);
  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get playlist by ID
playlistRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: req.params.id },
      include: {
        songs: {
          include: {
            song: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist non trouvee' });
    }

    res.json({
      ...playlist,
      songs: playlist.songs.map((s) => s.song),
    });
  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get playlist categories
playlistRouter.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.playlist.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    res.json(categories.map((c) => c.category));
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
