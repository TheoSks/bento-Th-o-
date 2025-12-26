import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, User, ArrowLeft, Plus, Hash, Globe, Lock, Users } from 'lucide-react';
import { Button, Input, Card } from '@components/ui';

interface PublicRoom {
  code: string;
  host: string;
  players: number;
  maxPlayers: number;
  theme: string;
}

const mockPublicRooms: PublicRoom[] = [
  { code: 'ROCK-4521', host: 'MusicMaster', players: 4, maxPlayers: 8, theme: 'Rock 80s' },
  { code: 'POP-7832', host: 'PopQueen', players: 2, maxPlayers: 6, theme: 'Pop 2000s' },
  { code: 'MIX-1234', host: 'SoundHunter', players: 5, maxPlayers: 8, theme: 'Mix' },
];

export default function GuestLobby() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState('');
  const [step, setStep] = useState<'pseudo' | 'choice'>('pseudo');
  const [roomCode, setRoomCode] = useState('');

  const handlePseudoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pseudo.trim().length >= 2) {
      // Store pseudo in session
      sessionStorage.setItem('guestPseudo', pseudo.trim());
      setStep('choice');
    }
  };

  const handleJoinRoom = (code: string) => {
    navigate(`/room/${code}`);
  };

  const handleCreateRoom = () => {
    navigate('/room/new');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-500/20 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        {step === 'pseudo' ? (
          <Card className="p-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow-primary">
                <Music className="w-7 h-7 text-white" />
              </div>
              <span className="font-display font-bold text-2xl">BlindTest Party</span>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">Choisis ton pseudo</h1>
            <p className="text-white/50 text-center mb-8">
              Ce pseudo sera visible par les autres joueurs
            </p>

            <form onSubmit={handlePseudoSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Ton pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                leftIcon={<User className="w-5 h-5" />}
                minLength={2}
                maxLength={20}
                required
              />

              <Button type="submit" className="w-full" size="lg">
                Continuer
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm">
                Tu veux sauvegarder ta progression ?{' '}
                <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                  Creer un compte
                </Link>
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold">{pseudo}</p>
                  <p className="text-white/50 text-sm">Mode Guest</p>
                </div>
                <button
                  onClick={() => setStep('pseudo')}
                  className="ml-auto text-white/50 hover:text-white text-sm"
                >
                  Changer
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  onClick={handleCreateRoom}
                  leftIcon={<Plus className="w-5 h-5" />}
                  className="w-full"
                >
                  Creer une room
                </Button>
                <div className="flex gap-2">
                  <Input
                    placeholder="CODE"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    className="flex-1"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => handleJoinRoom(roomCode)}
                    disabled={!roomCode.trim()}
                  >
                    <Hash className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Public Rooms */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-secondary-400" />
                <h2 className="font-bold text-lg">Rooms publiques</h2>
              </div>

              {mockPublicRooms.length > 0 ? (
                <div className="space-y-3">
                  {mockPublicRooms.map((room) => (
                    <motion.div
                      key={room.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">{room.theme}</span>
                          <span className="text-white/40 text-sm">{room.code}</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/50 text-sm">
                          <span>Host: {room.host}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {room.players}/{room.maxPlayers}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleJoinRoom(room.code)}
                        disabled={room.players >= room.maxPlayers}
                      >
                        Rejoindre
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-white/50">
                  <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucune room publique disponible</p>
                  <p className="text-sm">Cree la tienne !</p>
                </div>
              )}
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
}
