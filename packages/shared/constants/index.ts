// XP & Level constants
export const XP_PER_CORRECT = 10;
export const XP_PER_FAST_CORRECT = 15;
export const XP_PER_WIN = 50;
export const XP_PER_TOP3 = 25;
export const XP_PER_GAME = 20;
export const XP_DAILY_CHALLENGE = 100;
export const XP_DAILY_FIRST = 200;

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function levelFromXp(xp: number): number {
  return Math.floor(Math.log(xp / 100 + 1) / Math.log(1.5)) + 1;
}

// Level titles
export const LEVEL_TITLES: Record<number, string> = {
  1: 'Debutant',
  5: 'Amateur',
  10: 'Connaisseur',
  20: 'Expert',
  35: 'Maitre',
  50: 'Legende',
  75: 'Mythique',
  100: 'Immortel',
};

export function getTitleForLevel(level: number): string {
  const thresholds = Object.keys(LEVEL_TITLES)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of thresholds) {
    if (level >= threshold) {
      return LEVEL_TITLES[threshold];
    }
  }
  return LEVEL_TITLES[1];
}

// Scoring
export function calculatePoints(
  responseTime: number,
  maxTime: number,
  isCorrect: boolean,
  streak: number = 0
): number {
  if (!isCorrect) return 0;

  const basePoints = 1000;
  const timeBonus = Math.floor((1 - responseTime / maxTime) * 500);
  const streakBonus = Math.min(streak * 50, 250);

  return basePoints + timeBonus + streakBonus;
}

// Game defaults
export const DEFAULT_GAME_SETTINGS = {
  rounds: 15,
  timePerRound: 20,
  playlistIds: [],
  answerMode: 'both' as const,
  difficulty: 'medium' as const,
  allowHints: false,
  pointsSystem: 'speed' as const,
};

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 8;
export const MIN_ROUNDS = 5;
export const MAX_ROUNDS = 30;
export const MIN_TIME = 10;
export const MAX_TIME = 60;

// Streak bonuses
export const STREAK_BONUSES: Record<number, number> = {
  3: 30,
  7: 70,
  14: 140,
  30: 300,
};
