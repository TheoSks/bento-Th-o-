// Auth types
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

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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

// Daily Challenge types
export interface DailyChallenge {
  id: string;
  date: string;
  playlistId: string;
  playlistName: string;
  topScores: LeaderboardEntry[];
  userScore?: number;
  userRank?: number;
}
