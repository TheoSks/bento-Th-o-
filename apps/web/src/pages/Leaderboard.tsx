import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Clock, Music } from 'lucide-react';
import { Card, Avatar, Badge, Button } from '@components/ui';

type LeaderboardTab = 'global' | 'weekly' | 'friends' | 'genre';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  winRate: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'MusicMaster', score: 125420, level: 45, winRate: 78 },
  { rank: 2, username: 'PopQueen', score: 118650, level: 42, winRate: 75 },
  { rank: 3, username: 'SoundHunter', score: 112300, level: 40, winRate: 72 },
  { rank: 4, username: 'RockFan', score: 98750, level: 35, winRate: 68 },
  { rank: 5, username: 'BeatDropper', score: 95200, level: 33, winRate: 65 },
  { rank: 6, username: 'MelodyKing', score: 89400, level: 31, winRate: 64 },
  { rank: 7, username: 'TuneWizard', score: 85100, level: 29, winRate: 62 },
  { rank: 8, username: 'HarmonyPro', score: 78900, level: 27, winRate: 60 },
  { rank: 9, username: 'RhythmAce', score: 72500, level: 25, winRate: 58 },
  { rank: 10, username: 'NoteNinja', score: 68200, level: 24, winRate: 56 },
];

const genres = ['Pop', 'Rock', 'Rap/Hip-Hop', 'Electro', 'Classique', 'Jazz'];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('global');
  const [selectedGenre, setSelectedGenre] = useState('Pop');

  const tabs = [
    { id: 'global' as const, label: 'Global', icon: Trophy },
    { id: 'weekly' as const, label: 'Hebdo', icon: Calendar },
    { id: 'friends' as const, label: 'Amis', icon: Users },
    { id: 'genre' as const, label: 'Genre', icon: Music },
  ];

  // Mock current user rank
  const userRank = 42;
  const userScore = 45200;

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Classement</h1>
          <p className="text-white/50 mb-6">Vois ou tu te situes parmi les meilleurs joueurs</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Genre Filter */}
        {activeTab === 'genre' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-2 mb-6 overflow-x-auto pb-2"
          >
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedGenre === genre
                    ? 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/30'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </motion.div>
        )}

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card variant="highlighted">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-400">#{userRank}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold">Ta position</p>
                <p className="text-white/50 text-sm">{userScore.toLocaleString()} points</p>
              </div>
              <Badge variant="primary">Top 5%</Badge>
            </div>
          </Card>
        </motion.div>

        {/* Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-end justify-center gap-4 py-6">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Avatar size="lg" className="mb-2 ring-2 ring-white/30" />
                <p className="font-bold text-sm">{mockLeaderboard[1].username}</p>
                <p className="text-white/50 text-xs">{mockLeaderboard[1].score.toLocaleString()}</p>
                <div className="w-16 h-14 bg-white/10 rounded-t-lg mt-3 flex items-center justify-center">
                  <span className="text-2xl">🥈</span>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-center -mt-4"
              >
                <Avatar size="xl" className="mb-2 ring-4 ring-warning-400" />
                <p className="font-bold">{mockLeaderboard[0].username}</p>
                <p className="text-warning-400 font-bold">{mockLeaderboard[0].score.toLocaleString()}</p>
                <div className="w-20 h-20 bg-warning-500/20 rounded-t-lg mt-3 flex items-center justify-center">
                  <span className="text-3xl">🥇</span>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-center"
              >
                <Avatar size="lg" className="mb-2 ring-2 ring-warning-700/50" />
                <p className="font-bold text-sm">{mockLeaderboard[2].username}</p>
                <p className="text-white/50 text-xs">{mockLeaderboard[2].score.toLocaleString()}</p>
                <div className="w-16 h-10 bg-warning-700/20 rounded-t-lg mt-3 flex items-center justify-center">
                  <span className="text-2xl">🥉</span>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="space-y-2">
              {mockLeaderboard.slice(3).map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <span className="w-8 text-center font-bold text-white/50">{entry.rank}</span>
                  <Avatar size="sm" />
                  <div className="flex-1">
                    <p className="font-medium">{entry.username}</p>
                    <p className="text-white/50 text-sm">Niveau {entry.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">{entry.score.toLocaleString()}</p>
                    <p className="text-white/50 text-xs">{entry.winRate}% WR</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <Button variant="ghost">Charger plus</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
