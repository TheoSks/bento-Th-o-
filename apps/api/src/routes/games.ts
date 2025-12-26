import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { optionalAuthMiddleware, AuthRequest } from '../middleware/auth.js';

export const gameRouter = Router();

// Generate room code
function generateRoomCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numbers = '0123456789';
  let code = '';

  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  code += '-';
  for (let i = 0; i < 4; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return code;
}

// Create room
gameRouter.post('/', optionalAuthMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { isPublic, settings } = req.body;
    const roomCode = generateRoomCode();

    const game = await prisma.game.create({
      data: {
        roomCode,
        hostId: req.userId || null,
        status: 'LOBBY',
        settings: settings || {
          rounds: 15,
          timePerRound: 20,
          playlistIds: [],
          answerMode: 'both',
          difficulty: 'medium',
          allowHints: false,
          pointsSystem: 'speed',
        },
        totalRounds: settings?.rounds || 15,
      },
    });

    res.status(201).json({
      code: game.roomCode,
      id: game.id,
      settings: game.settings,
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Erreur lors de la creation de la room' });
  }
});

// Get room info
gameRouter.get('/:code', async (req: Request, res: Response) => {
  try {
    const game = await prisma.game.findFirst({
      where: { roomCode: req.params.code.toUpperCase() },
      include: {
        players: {
          select: {
            id: true,
            guestName: true,
            score: true,
            isHost: true,
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
                level: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({ message: 'Room non trouvee' });
    }

    res.json({
      id: game.id,
      code: game.roomCode,
      status: game.status,
      settings: game.settings,
      currentRound: game.currentRound,
      totalRounds: game.totalRounds,
      players: game.players.map((p) => ({
        id: p.id,
        name: p.user?.username || p.guestName,
        avatar: p.user?.avatar,
        level: p.user?.level,
        score: p.score,
        isHost: p.isHost,
      })),
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get public rooms
gameRouter.get('/public', async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      where: {
        status: 'LOBBY',
      },
      include: {
        players: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const publicGames = games.filter((g) => {
      const settings = g.settings as { isPublic?: boolean };
      return settings.isPublic !== false;
    });

    res.json(
      publicGames.map((game) => ({
        code: game.roomCode,
        players: game.players.length,
        maxPlayers: 8,
        status: game.status,
        createdAt: game.createdAt,
      }))
    );
  } catch (error) {
    console.error('Get public rooms error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Join room (for guests)
gameRouter.post('/:code/join', optionalAuthMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { guestName } = req.body;

    const game = await prisma.game.findFirst({
      where: { roomCode: req.params.code.toUpperCase() },
      include: { players: true },
    });

    if (!game) {
      return res.status(404).json({ message: 'Room non trouvee' });
    }

    if (game.status !== 'LOBBY') {
      return res.status(400).json({ message: 'La partie a deja commence' });
    }

    if (game.players.length >= 8) {
      return res.status(400).json({ message: 'Room complete' });
    }

    // Check if already in room
    const existingPlayer = game.players.find(
      (p) => (req.userId && p.userId === req.userId) ||
             (guestName && p.guestName === guestName)
    );

    if (existingPlayer) {
      return res.json({ message: 'Deja dans la room', playerId: existingPlayer.id });
    }

    const player = await prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        userId: req.userId || null,
        guestName: req.userId ? null : guestName,
        isHost: game.players.length === 0,
      },
    });

    res.status(201).json({
      playerId: player.id,
      isHost: player.isHost,
    });
  } catch (error) {
    console.error('Join room error:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion a la room' });
  }
});
