import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Target,
  Gamepad2,
  Clock,
  Music,
  Star,
  Award,
  Calendar,
} from 'lucide-react';
import { Card, Avatar, Badge, ProgressBar } from '@components/ui';
import { useAuthStore } from '@stores/authStore';

const mockBadges = [
  { id: '1', name: 'Premiere note', icon: '🎵', unlocked: true },
  { id: '2', name: 'Melomane', icon: '🎧', unlocked: true },
  { id: '3', name: 'Speed Demon', icon: '🏃', unlocked: true },
  { id: '4', name: 'Perfect', icon: '⭐', unlocked: true },
  { id: '5', name: 'Roi du Rock', icon: '🎸', unlocked: false },
  { id: '6', name: 'Legende', icon: '👑', unlocked: false },
];

const mockGenreStats = [
  { genre: 'Pop', correct: 450, total: 520, color: 'from-accent-500 to-accent-400' },
  { genre: 'Rock', correct: 380, total: 480, color: 'from-error-500 to-error-400' },
  { genre: 'Rap/Hip-Hop', correct: 210, total: 300, color: 'from-warning-500 to-warning-400' },
  { genre: 'Electro', correct: 180, total: 250, color: 'from-secondary-500 to-secondary-400' },
  { genre: 'Classique', correct: 90, total: 150, color: 'from-primary-500 to-primary-400' },
];

export default function Profile() {
  const { user } = useAuthStore();

  const mockUser = user || {
    username: 'MusicMaster',
    level: 24,
    xp: 12450,
    gamesPlayed: 342,
    gamesWon: 215,
    totalCorrect: 4520,
    totalAnswers: 5130,
    currentStreak: 7,
    bestStreak: 21,
  };

  const xpForNextLevel = 15000;
  const winRate = Math.round((mockUser.gamesWon / mockUser.gamesPlayed) * 100);
  const accuracy = Math.round((mockUser.totalCorrect / mockUser.totalAnswers) * 100);

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar size="xl" showLevel level={mockUser.level} />
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{mockUser.username}</h1>
                  <Badge variant="primary">Expert</Badge>
                </div>
                <p className="text-white/50 mb-4">Niveau {mockUser.level}</p>
                <ProgressBar
                  value={mockUser.xp}
                  max={xpForNextLevel}
                  showLabel
                  label="XP vers niveau suivant"
                  variant="xp"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <Card className="text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-warning-400" />
            <p className="text-2xl font-bold">{mockUser.gamesWon}</p>
            <p className="text-white/50 text-sm">Victoires</p>
          </Card>
          <Card className="text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-success-400" />
            <p className="text-2xl font-bold">{winRate}%</p>
            <p className="text-white/50 text-sm">Win rate</p>
          </Card>
          <Card className="text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-error-400" />
            <p className="text-2xl font-bold">{mockUser.currentStreak}</p>
            <p className="text-white/50 text-sm">Streak actuel</p>
          </Card>
          <Card className="text-center">
            <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-primary-400" />
            <p className="text-2xl font-bold">{mockUser.gamesPlayed}</p>
            <p className="text-white/50 text-sm">Parties jouees</p>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Streak Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-error-400" />
                <h2 className="font-bold text-lg">Streak : {mockUser.currentStreak} jours</h2>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <div key={i} className="text-center text-white/50 text-sm">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center ${
                      i < mockUser.currentStreak
                        ? 'bg-success-500/20 text-success-400'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {i < mockUser.currentStreak ? '✓' : ''}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/50">
                <p>Meilleur streak : {mockUser.bestStreak} jours</p>
              </div>
            </Card>
          </motion.div>

          {/* Detailed Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-warning-400" />
                <h2 className="font-bold text-lg">Statistiques</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Bonnes reponses</span>
                  <span className="font-bold">{mockUser.totalCorrect.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Precision</span>
                  <span className="font-bold text-success-400">{accuracy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Temps moyen</span>
                  <span className="font-bold">4.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Parties parfaites</span>
                  <span className="font-bold">12</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-primary-400" />
              <h2 className="font-bold text-lg">Badges</h2>
              <span className="text-white/50 text-sm ml-auto">
                {mockBadges.filter((b) => b.unlocked).length}/{mockBadges.length}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {mockBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center p-4 rounded-xl ${
                    badge.unlocked
                      ? 'bg-white/5'
                      : 'bg-white/[0.02] opacity-50'
                  }`}
                >
                  <span className="text-3xl mb-2 block">{badge.icon}</span>
                  <p className="text-xs font-medium">{badge.name}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Genre Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-secondary-400" />
              <h2 className="font-bold text-lg">Stats par genre</h2>
            </div>
            <div className="space-y-4">
              {mockGenreStats.map((stat) => (
                <div key={stat.genre}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{stat.genre}</span>
                    <span className="text-white/50 text-sm">
                      {stat.correct}/{stat.total} ({Math.round((stat.correct / stat.total) * 100)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.correct / stat.total) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
