import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  username: z.string().min(2, 'Pseudo trop court').max(20, 'Pseudo trop long'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string(),
});

// Register
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === data.email
          ? 'Cet email est deja utilise'
          : 'Ce pseudo est deja pris',
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        xp: true,
        level: true,
        gamesPlayed: true,
        gamesWon: true,
        currentStreak: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error('Register error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

// Login
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const validPassword = await bcrypt.compare(data.password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level,
        gamesPlayed: user.gamesPlayed,
        gamesWon: user.gamesWon,
        currentStreak: user.currentStreak,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

// Get current user
authRouter.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
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
        lastPlayedAt: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Logout (client-side token removal, but we can invalidate refresh tokens here)
authRouter.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  // In a production app, you would invalidate the refresh token here
  res.json({ message: 'Deconnexion reussie' });
});

// Refresh token
authRouter.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'
    ) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouve' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
});
