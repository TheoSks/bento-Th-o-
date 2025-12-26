import { create } from 'zustand';
import type { Song, PlayerScore, RoundResult, GameStatus } from '@/types';

interface GameState {
  status: GameStatus;
  currentRound: number;
  totalRounds: number;
  currentSong: Song | null;
  timeRemaining: number;
  maxTime: number;
  scores: Record<string, number>;
  roundResults: RoundResult[];
  hasAnswered: boolean;
  myAnswer: string;
  isCorrect: boolean | null;

  // Actions
  setStatus: (status: GameStatus) => void;
  startRound: (round: number, audioUrl: string) => void;
  setTimeRemaining: (time: number) => void;
  submitAnswer: (answer: string) => void;
  setRoundResult: (result: RoundResult) => void;
  updateScores: (scores: Record<string, number>) => void;
  endGame: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'lobby',
  currentRound: 0,
  totalRounds: 15,
  currentSong: null,
  timeRemaining: 20,
  maxTime: 20,
  scores: {},
  roundResults: [],
  hasAnswered: false,
  myAnswer: '',
  isCorrect: null,

  setStatus: (status) => set({ status }),

  startRound: (round, audioUrl) => set({
    currentRound: round,
    hasAnswered: false,
    myAnswer: '',
    isCorrect: null,
    status: 'playing',
  }),

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  submitAnswer: (answer) => set({
    hasAnswered: true,
    myAnswer: answer,
  }),

  setRoundResult: (result) => set((state) => ({
    roundResults: [...state.roundResults, result],
    currentSong: result.song,
    status: 'round_end',
  })),

  updateScores: (scores) => set({ scores }),

  endGame: () => set({ status: 'finished' }),

  reset: () => set({
    status: 'lobby',
    currentRound: 0,
    currentSong: null,
    timeRemaining: 20,
    scores: {},
    roundResults: [],
    hasAnswered: false,
    myAnswer: '',
    isCorrect: null,
  }),
}));
