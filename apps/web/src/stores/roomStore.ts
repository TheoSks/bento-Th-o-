import { create } from 'zustand';
import type { Room, Player, GameSettings } from '@/types';

interface RoomState {
  room: Room | null;
  players: Player[];
  isConnected: boolean;
  isHost: boolean;

  // Actions
  setRoom: (room: Room) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayer: (playerId: string, data: Partial<Player>) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  room: null,
  players: [],
  isConnected: false,
  isHost: false,

  setRoom: (room) => set({ room }),

  setPlayers: (players) => set({ players }),

  addPlayer: (player) => set((state) => ({
    players: [...state.players, player],
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter((p) => p.id !== playerId),
  })),

  updatePlayer: (playerId, data) => set((state) => ({
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, ...data } : p
    ),
  })),

  updateSettings: (settings) => set((state) => ({
    room: state.room
      ? { ...state.room, settings: { ...state.room.settings, ...settings } }
      : null,
  })),

  setConnected: (connected) => set({ isConnected: connected }),

  reset: () => set({
    room: null,
    players: [],
    isConnected: false,
    isHost: false,
  }),
}));
