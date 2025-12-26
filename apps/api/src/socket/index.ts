import { Server, Socket } from 'socket.io';
import { prisma } from '../utils/prisma.js';

interface RoomState {
  players: Map<string, PlayerState>;
  gameState: GameState | null;
}

interface PlayerState {
  id: string;
  name: string;
  score: number;
  isHost: boolean;
  isReady: boolean;
  socketId: string;
}

interface GameState {
  currentRound: number;
  totalRounds: number;
  status: 'countdown' | 'playing' | 'result' | 'finished';
}

const rooms = new Map<string, RoomState>();

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Room events
    socket.on('room:create', async (data: { isPublic: boolean; settings: any }) => {
      try {
        // Generate room code
        const code = generateRoomCode();

        rooms.set(code, {
          players: new Map(),
          gameState: null,
        });

        socket.emit('room:created', { code });
      } catch (error) {
        socket.emit('error', { message: 'Erreur lors de la creation de la room' });
      }
    });

    socket.on('room:join', async (data: { code: string; pseudo?: string; userId?: string }) => {
      try {
        const { code, pseudo, userId } = data;
        const roomCode = code.toUpperCase();

        let room = rooms.get(roomCode);

        if (!room) {
          room = {
            players: new Map(),
            gameState: null,
          };
          rooms.set(roomCode, room);
        }

        const isHost = room.players.size === 0;
        const playerId = `player_${socket.id}`;

        const playerState: PlayerState = {
          id: playerId,
          name: pseudo || 'Guest',
          score: 0,
          isHost,
          isReady: isHost,
          socketId: socket.id,
        };

        room.players.set(socket.id, playerState);
        socket.join(roomCode);
        (socket as any).roomCode = roomCode;

        // Notify all players
        io.to(roomCode).emit('room:player-joined', {
          player: playerState,
          players: Array.from(room.players.values()),
        });

        socket.emit('room:joined', {
          code: roomCode,
          isHost,
          players: Array.from(room.players.values()),
        });
      } catch (error) {
        socket.emit('error', { message: 'Erreur lors de la connexion a la room' });
      }
    });

    socket.on('room:leave', () => {
      handlePlayerLeave(socket, io);
    });

    socket.on('room:ready', () => {
      const roomCode = (socket as any).roomCode;
      if (!roomCode) return;

      const room = rooms.get(roomCode);
      if (!room) return;

      const player = room.players.get(socket.id);
      if (player) {
        player.isReady = !player.isReady;
        io.to(roomCode).emit('room:player-updated', {
          playerId: player.id,
          isReady: player.isReady,
        });
      }
    });

    socket.on('room:kick', (data: { playerId: string }) => {
      const roomCode = (socket as any).roomCode;
      if (!roomCode) return;

      const room = rooms.get(roomCode);
      if (!room) return;

      const kicker = room.players.get(socket.id);
      if (!kicker?.isHost) return;

      // Find and remove player
      for (const [socketId, player] of room.players.entries()) {
        if (player.id === data.playerId) {
          room.players.delete(socketId);
          io.to(roomCode).emit('room:player-left', { playerId: data.playerId });
          io.to(socketId).emit('room:kicked');
          break;
        }
      }
    });

    // Game events
    socket.on('game:start', () => {
      const roomCode = (socket as any).roomCode;
      if (!roomCode) return;

      const room = rooms.get(roomCode);
      if (!room) return;

      const player = room.players.get(socket.id);
      if (!player?.isHost) return;

      // Check if all players are ready
      const allReady = Array.from(room.players.values()).every(
        (p) => p.isReady || p.isHost
      );

      if (!allReady || room.players.size < 2) {
        socket.emit('error', { message: 'Tous les joueurs doivent etre prets' });
        return;
      }

      room.gameState = {
        currentRound: 1,
        totalRounds: 15,
        status: 'countdown',
      };

      io.to(roomCode).emit('game:starting', { countdown: 3 });

      // Start first round after countdown
      setTimeout(() => {
        if (room.gameState) {
          room.gameState.status = 'playing';
          io.to(roomCode).emit('game:round-start', {
            round: 1,
            audioUrl: '/audio/sample.mp3', // Placeholder
          });
        }
      }, 3000);
    });

    socket.on('game:answer', (data: { answer: string; timestamp: number }) => {
      const roomCode = (socket as any).roomCode;
      if (!roomCode) return;

      const room = rooms.get(roomCode);
      if (!room?.gameState) return;

      const player = room.players.get(socket.id);
      if (!player) return;

      // In production, check answer against correct answer
      const isCorrect = Math.random() > 0.3; // Placeholder
      const responseTime = Date.now() - data.timestamp;
      const points = isCorrect ? calculatePoints(responseTime) : 0;

      player.score += points;

      io.to(roomCode).emit('game:player-answered', {
        playerId: player.id,
        isCorrect,
        points,
        responseTime,
      });
    });

    socket.on('game:skip', () => {
      const roomCode = (socket as any).roomCode;
      if (!roomCode) return;

      const room = rooms.get(roomCode);
      const player = room?.players.get(socket.id);

      if (!player?.isHost || !room?.gameState) return;

      endRound(io, roomCode, room);
    });

    // Chat
    socket.on('chat:message', (data: { content: string }) => {
      const roomCode = (socket as any).roomCode;
      if (!roomCode) return;

      const room = rooms.get(roomCode);
      const player = room?.players.get(socket.id);

      if (!player) return;

      io.to(roomCode).emit('chat:message', {
        playerId: player.id,
        playerName: player.name,
        content: data.content,
        timestamp: Date.now(),
      });
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      handlePlayerLeave(socket, io);
    });
  });
}

function handlePlayerLeave(socket: Socket, io: Server) {
  const roomCode = (socket as any).roomCode;
  if (!roomCode) return;

  const room = rooms.get(roomCode);
  if (!room) return;

  const player = room.players.get(socket.id);
  if (!player) return;

  room.players.delete(socket.id);
  socket.leave(roomCode);

  io.to(roomCode).emit('room:player-left', { playerId: player.id });

  // If host left, assign new host
  if (player.isHost && room.players.size > 0) {
    const newHost = room.players.values().next().value;
    if (newHost) {
      newHost.isHost = true;
      io.to(roomCode).emit('room:host-changed', { newHostId: newHost.id });
    }
  }

  // Clean up empty rooms
  if (room.players.size === 0) {
    rooms.delete(roomCode);
  }
}

function endRound(io: Server, roomCode: string, room: RoomState) {
  if (!room.gameState) return;

  room.gameState.status = 'result';

  const scores = Array.from(room.players.values()).map((p) => ({
    playerId: p.id,
    playerName: p.name,
    score: p.score,
  }));

  io.to(roomCode).emit('game:round-end', {
    answer: {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      year: 1982,
    },
    scores: scores.sort((a, b) => b.score - a.score),
  });

  // Start next round or end game
  setTimeout(() => {
    if (!room.gameState) return;

    if (room.gameState.currentRound >= room.gameState.totalRounds) {
      room.gameState.status = 'finished';
      io.to(roomCode).emit('game:end', {
        finalScores: scores.sort((a, b) => b.score - a.score),
      });
    } else {
      room.gameState.currentRound++;
      room.gameState.status = 'playing';
      io.to(roomCode).emit('game:round-start', {
        round: room.gameState.currentRound,
        audioUrl: '/audio/sample.mp3',
      });
    }
  }, 5000);
}

function calculatePoints(responseTime: number): number {
  const maxTime = 20000; // 20 seconds
  const basePoints = 1000;
  const timeBonus = Math.floor((1 - responseTime / maxTime) * 500);
  return Math.max(basePoints + timeBonus, 100);
}

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
