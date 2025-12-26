import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/users.js';
import { gameRouter } from './routes/games.js';
import { playlistRouter } from './routes/playlists.js';
import { leaderboardRouter } from './routes/leaderboards.js';
import { dailyRouter } from './routes/daily.js';
import { challengeRouter } from './routes/challenges.js';
import { setupSocketHandlers } from './socket/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', authMiddleware, userRouter);
app.use('/api/games', gameRouter);
app.use('/api/playlists', playlistRouter);
app.use('/api/leaderboards', leaderboardRouter);
app.use('/api/daily', authMiddleware, dailyRouter);
app.use('/api/challenges', authMiddleware, challengeRouter);

// Error handler
app.use(errorHandler);

// Socket.io setup
setupSocketHandlers(io);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
});

export { app, io };
