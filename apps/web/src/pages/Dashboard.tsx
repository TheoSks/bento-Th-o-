import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Users,
  Hash,
  Trophy,
  Flame,
  Target,
  Clock,
  Gamepad2,
  Plus,
  ArrowRight,
  Calendar,
  Zap,
} from 'lucide-react';
import { Button, Card, Avatar, ProgressBar, Badge, Modal, Input } from '@components/ui';
import { useAuthStore } from '@stores/authStore';

const gameModes = [
  {
    id: 'solo',
    name: 'Solo',
    description: 'Entraine-toi a ton rythme',
    icon: Gamepad2,
    color: 'from-secondary-600 to-secondary-400',
  },
  {
    id: 'multi',
    name: 'Multijoueur',
    description: 'Affronte d\'autres joueurs',
    icon: Users,
    color: 'from-primary-600 to-accent-500',
  },
  {
    id: 'daily',
    name: 'Defi du jour',
    description: 'Un nouveau defi chaque jour',
    icon: Calendar,
    color: 'from-warning-500 to-warning-400',
  },
  {
    id: 'survival',
    name: 'Survie',
    description: '3 vies, tiens le plus longtemps',
    icon: Flame,
    color: 'from-error-600 to-error-400',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  // Mock data for demonstration
  const mockUser = user || {
    username: 'Player',
    level: 12,
    xp: 2450,
    gamesPlayed: 142,
    gamesWon: 95,
    currentStreak: 5,
    bestStreak: 14,
  };

  const xpForNextLevel = 3000;
  const xpProgress = (mockUser.xp / xpForNextLevel) * 100;
  const winRate = mockUser.gamesPlayed > 0
    ? Math.round((mockUser.gamesWon / mockUser.gamesPlayed) * 100)
    : 0;

  const handleCreateRoom = () => {
    // Navigate to room creation
    navigate('/room/new');
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
            <Avatar size="xl" showLevel level={mockUser.level} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{mockUser.username}</h1>
                <Badge variant="primary">Connaisseur</Badge>
              </div>
              <p className="text-white/50 mb-4">Niveau {mockUser.level}</p>
              <ProgressBar
                value={mockUser.xp}
                max={xpForNextLevel}
                showLabel
                label="XP"
                variant="xp"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button onClick={handleCreateRoom} leftIcon={<Plus className="w-5 h-5" />}>
                Creer une room
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsJoinModalOpen(true)}
                leftIcon={<Hash className="w-5 h-5" />}
              >
                Rejoindre
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
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
            <p className="text-white/50 text-sm">Streak</p>
          </Card>
          <Card className="text-center">
            <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-primary-400" />
            <p className="text-2xl font-bold">{mockUser.gamesPlayed}</p>
            <p className="text-white/50 text-sm">Parties</p>
          </Card>
        </motion.div>

        {/* Game Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Modes de jeu</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  variant="interactive"
                  className="h-full group"
                  onClick={() => navigate(`/${mode.id}`)}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <mode.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{mode.name}</h3>
                  <p className="text-white/50 text-sm">{mode.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="highlighted" className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-warning-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-warning-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Defi du jour</h3>
                    <p className="text-white/50 text-sm">Pop des annees 2000</p>
                  </div>
                </div>
                <Badge variant="warning">+100 XP</Badge>
              </div>
              <div className="flex items-center gap-2 mb-4 text-white/60">
                <Clock className="w-4 h-4" />
                <span className="text-sm">14h 32min restantes</span>
              </div>
              <Button className="w-full" leftIcon={<Play className="w-5 h-5" />}>
                Jouer le defi
              </Button>
            </Card>
          </motion.div>

          {/* Recent Activity / Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Classement</h3>
                <Link
                  to="/leaderboard"
                  className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1"
                >
                  Voir tout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((rank) => (
                  <div
                    key={rank}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        rank === 1
                          ? 'bg-warning-500/20 text-warning-400'
                          : rank === 2
                          ? 'bg-white/20 text-white/80'
                          : 'bg-warning-700/20 text-warning-600'
                      }`}
                    >
                      {rank}
                    </span>
                    <Avatar size="sm" />
                    <div className="flex-1">
                      <p className="font-medium">Player{rank}</p>
                      <p className="text-white/50 text-sm">
                        {(50000 - rank * 5000).toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Join Room Modal */}
        <Modal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          title="Rejoindre une room"
        >
          <div className="space-y-4">
            <Input
              label="Code de la room"
              placeholder="ABCD-1234"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              leftIcon={<Hash className="w-5 h-5" />}
            />
            <Button className="w-full" onClick={handleJoinRoom}>
              Rejoindre
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
