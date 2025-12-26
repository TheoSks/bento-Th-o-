import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Copy,
  Settings,
  Play,
  Users,
  Crown,
  Clock,
  Music,
  Check,
  X,
  LogOut,
} from 'lucide-react';
import { Button, Card, Avatar, Badge } from '@components/ui';
import { useRoomStore } from '@stores/roomStore';
import type { Player, GameSettings } from '@/types';

const defaultSettings: GameSettings = {
  rounds: 15,
  timePerRound: 20,
  playlistIds: [],
  answerMode: 'both',
  difficulty: 'medium',
  allowHints: false,
  pointsSystem: 'speed',
};

const mockPlayers: Player[] = [
  { id: '1', name: 'MusicMaster', score: 0, isHost: true, isReady: true },
  { id: '2', name: 'SoundHunter', score: 0, isHost: false, isReady: true },
  { id: '3', name: 'PopQueen', score: 0, isHost: false, isReady: false },
  { id: '4', name: 'RockFan', score: 0, isHost: false, isReady: true },
];

export default function Room() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isHost = players[0]?.isHost; // For demo, assume first player is current user
  const allReady = players.every((p) => p.isReady || p.isHost);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    navigate(`/game/${code}`);
  };

  const handleLeave = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Room Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold font-display">{code}</h1>
                  <Badge variant="primary">Privee</Badge>
                </div>
                <p className="text-white/50">
                  {players.length}/8 joueurs
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyCode}
                  leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                >
                  {copied ? 'Copie !' : 'Copier le code'}
                </Button>
                {isHost && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    leftIcon={<Settings className="w-4 h-4" />}
                  >
                    Parametres
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLeave}
                  className="text-error-400 hover:text-error-300"
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Quitter
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Players List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary-400" />
                <h2 className="font-bold text-lg">Joueurs</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5"
                  >
                    <Avatar size="md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{player.name}</span>
                        {player.isHost && (
                          <Crown className="w-4 h-4 text-warning-400" />
                        )}
                      </div>
                      {!player.isHost && (
                        <span className={`text-sm ${player.isReady ? 'text-success-400' : 'text-white/40'}`}>
                          {player.isReady ? 'Pret' : 'En attente...'}
                        </span>
                      )}
                    </div>
                    {!player.isHost && (
                      <div className={`w-3 h-3 rounded-full ${player.isReady ? 'bg-success-500' : 'bg-white/20'}`} />
                    )}
                  </motion.div>
                ))}
                {/* Empty slots */}
                {Array.from({ length: 8 - players.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-white/10 text-white/30"
                  >
                    Slot vide
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-secondary-400" />
                <h2 className="font-bold text-lg">Parametres</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Rounds</span>
                  <span className="font-bold">{settings.rounds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Temps/round</span>
                  <span className="font-bold">{settings.timePerRound}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Mode</span>
                  <span className="font-bold capitalize">{settings.answerMode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Difficulte</span>
                  <Badge variant="warning">{settings.difficulty}</Badge>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                {isHost ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleStartGame}
                    disabled={!allReady || players.length < 2}
                    leftIcon={<Play className="w-5 h-5" />}
                  >
                    Lancer la partie
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" variant="secondary">
                    Pret !
                  </Button>
                )}
                {!allReady && isHost && (
                  <p className="text-center text-white/50 text-sm mt-2">
                    En attente que tous soient prets...
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
