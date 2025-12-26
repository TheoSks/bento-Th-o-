// User types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  xp: number;
  level: number;
  gamesPlayed: number;
  gamesWon: number;
  totalCorrect: number;
  totalAnswers: number;
  bestStreak: number;
  currentStreak: number;
  lastPlayedAt?: string;
  createdAt: string;
}

// Game types
export interface GameSettings {
  rounds: number;
  timePerRound: number;
  playlistIds: string[];
  answerMode: 'artist' | 'title' | 'both';
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  allowHints: boolean;
  pointsSystem: 'speed' | 'fixed';
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  isPublic: boolean;
  status: GameStatus;
  settings: GameSettings;
  players: Player[];
  currentRound: number;
  totalRounds: number;
  createdAt: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  isHost: boolean;
  isReady: boolean;
  avatar?: string;
  userId?: string;
}

export type GameStatus = 'lobby' | 'starting' | 'playing' | 'round_end' | 'finished' | 'cancelled';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre: string[];
  duration: number;
  previewUrl: string;
  coverUrl?: string;
}

export interface RoundResult {
  roundNumber: number;
  song: Song;
  scores: PlayerScore[];
}

export interface PlayerScore {
  playerId: string;
  playerName: string;
  answer: string;
  isCorrect: boolean;
  responseTime: number;
  points: number;
}

// Playlist types
export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  category: string;
  songCount: number;
}

// Badge types
export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  unlockedAt?: string;
}

export type BadgeCategory = 'progression' | 'performance' | 'genre' | 'social' | 'special';
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  level: number;
}

// Challenge types
export interface Challenge {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  playlistId: string;
  playlistName: string;
  senderScore?: number;
  receiverScore?: number;
  status: ChallengeStatus;
  createdAt: string;
  expiresAt: string;
}

export type ChallengeStatus = 'pending' | 'in_progress' | 'completed' | 'expired' | 'declined';

// Socket events
export interface ServerToClientEvents {
  'room:created': (data: { code: string }) => void;
  'room:joined': (data: { code: string; isHost: boolean; players: Player[] }) => void;
  'room:player-joined': (data: { player: Player; players: Player[] }) => void;
  'room:player-left': (data: { playerId: string }) => void;
  'room:player-updated': (data: { playerId: string; isReady: boolean }) => void;
  'room:host-changed': (data: { newHostId: string }) => void;
  'room:kicked': () => void;
  'game:starting': (data: { countdown: number }) => void;
  'game:round-start': (data: { round: number; audioUrl: string }) => void;
  'game:player-answered': (data: { playerId: string; isCorrect: boolean; points: number; responseTime: number }) => void;
  'game:round-end': (data: { answer: Song; scores: PlayerScore[] }) => void;
  'game:end': (data: { finalScores: PlayerScore[] }) => void;
  'chat:message': (data: { playerId: string; playerName: string; content: string; timestamp: number }) => void;
  'error': (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  'room:create': (data: { isPublic: boolean; settings: GameSettings }) => void;
  'room:join': (data: { code: string; pseudo?: string; userId?: string }) => void;
  'room:leave': () => void;
  'room:ready': () => void;
  'room:kick': (data: { playerId: string }) => void;
  'game:start': () => void;
  'game:answer': (data: { answer: string; timestamp: number }) => void;
  'game:skip': () => void;
  'chat:message': (data: { content: string }) => void;
}
