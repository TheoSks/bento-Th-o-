import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Send,
  Trophy,
  Clock,
  Check,
  X,
  RotateCcw,
  Home,
  Share2,
} from 'lucide-react';
import { Button, Card, Avatar, Input, ProgressBar } from '@components/ui';
import { useGameStore } from '@stores/gameStore';
import type { PlayerScore } from '@/types';

interface LiveScore {
  id: string;
  name: string;
  score: number;
  hasFound: boolean;
  rank: number;
}

const mockScores: LiveScore[] = [
  { id: '1', name: 'MusicMaster', score: 2450, hasFound: true, rank: 1 },
  { id: '2', name: 'You', score: 2100, hasFound: false, rank: 2 },
  { id: '3', name: 'PopQueen', score: 1800, hasFound: false, rank: 3 },
  { id: '4', name: 'RockFan', score: 1200, hasFound: false, rank: 4 },
];

export default function Game() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<'countdown' | 'playing' | 'result' | 'final'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(20);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(15);
  const [answer, setAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scores, setScores] = useState<LiveScore[]>(mockScores);

  // Countdown effect
  useEffect(() => {
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'countdown' && countdown === 0) {
      setPhase('playing');
      inputRef.current?.focus();
    }
  }, [phase, countdown]);

  // Timer effect
  useEffect(() => {
    if (phase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'playing' && timeLeft === 0) {
      setPhase('result');
    }
  }, [phase, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !hasSubmitted) {
      setHasSubmitted(true);
      // Simulate answer check
      setTimeout(() => {
        setScores((prev) =>
          prev.map((s) => (s.name === 'You' ? { ...s, hasFound: true, score: s.score + 420 } : s))
        );
      }, 500);
    }
  };

  const handleNextRound = () => {
    if (round < totalRounds) {
      setRound(round + 1);
      setPhase('countdown');
      setCountdown(3);
      setTimeLeft(20);
      setAnswer('');
      setHasSubmitted(false);
    } else {
      setPhase('final');
    }
  };

  const handlePlayAgain = () => {
    navigate(`/room/${code}`);
  };

  const handleBackToLobby = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-4 px-4 md:py-8 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Countdown Overlay */}
        <AnimatePresence>
          {phase === 'countdown' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/90"
            >
              <motion.div
                key={countdown}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-9xl font-display font-bold gradient-text"
              >
                {countdown || 'GO!'}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Header */}
        <Card className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white/50">Round</span>
              <span className="text-2xl font-display font-bold">
                {round}/{totalRounds}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${timeLeft <= 5 ? 'text-error-400' : 'text-white'}`}>
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-mono font-bold">{timeLeft}s</span>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <ProgressBar
            value={timeLeft}
            max={20}
            size="sm"
            variant={timeLeft <= 5 ? 'primary' : 'secondary'}
            className="mt-4"
          />
        </Card>

        {phase === 'playing' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Audio Visualizer Placeholder */}
            <Card className="mb-4">
              <div className="flex items-center justify-center h-32 bg-gradient-to-r from-primary-600/20 to-accent-500/20 rounded-xl">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [10, Math.random() * 50 + 10, 10],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                      className="w-1.5 bg-gradient-to-t from-primary-600 to-accent-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Answer Input */}
            <Card className="mb-4">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Ta reponse..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={hasSubmitted}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!answer.trim() || hasSubmitted}
                    leftIcon={hasSubmitted ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                  >
                    {hasSubmitted ? 'Envoye !' : 'Valider'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Live Scores */}
            <Card>
              <h3 className="font-bold mb-4">Scores en direct</h3>
              <div className="space-y-2">
                {scores
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <motion.div
                      key={player.id}
                      layout
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        player.name === 'You' ? 'bg-primary-600/20' : 'bg-white/5'
                      }`}
                    >
                      <span className="w-6 text-center font-bold text-white/50">
                        {index + 1}
                      </span>
                      <Avatar size="sm" />
                      <span className="flex-1 font-medium">{player.name}</span>
                      {player.hasFound && (
                        <Check className="w-4 h-4 text-success-400" />
                      )}
                      <span className="font-mono font-bold">{player.score.toLocaleString()}</span>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="text-center mb-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {hasSubmitted ? (
                    <span className="text-success-400">Bonne reponse !</span>
                  ) : (
                    <span className="text-error-400">Temps ecoule !</span>
                  )}
                </h2>
                <div className="flex items-center justify-center gap-4 text-xl">
                  <span className="text-white/70">"Billie Jean"</span>
                  <span className="text-white/50">-</span>
                  <span className="font-bold">Michael Jackson</span>
                </div>
                <p className="text-white/50 mt-1">1982</p>
              </div>

              {/* Round Results */}
              <div className="space-y-2 mb-6">
                {scores
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        index === 0 ? 'bg-warning-500/20' : 'bg-white/5'
                      }`}
                    >
                      <span className={`text-lg ${index === 0 ? 'text-warning-400' : ''}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                      </span>
                      <span className="flex-1 font-medium">{player.name}</span>
                      <span className={`font-bold ${player.hasFound ? 'text-success-400' : 'text-error-400'}`}>
                        {player.hasFound ? '+420 pts' : '+0 pts'}
                      </span>
                    </div>
                  ))}
              </div>

              <Button onClick={handleNextRound} size="lg" className="w-full">
                {round < totalRounds ? 'Round suivant' : 'Voir les resultats'}
              </Button>
            </Card>
          </motion.div>
        )}

        {phase === 'final' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-warning-400" />
              <h1 className="text-3xl font-display font-bold mb-2">Partie terminee !</h1>
              <p className="text-white/50 mb-8">Voici les resultats finaux</p>

              {/* Podium */}
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* 2nd */}
                <div className="text-center">
                  <Avatar size="lg" className="mb-2" />
                  <p className="font-bold">PopQueen</p>
                  <p className="text-white/50 text-sm">4,850 pts</p>
                  <div className="w-20 h-16 bg-white/10 rounded-t-lg mt-2 flex items-center justify-center">
                    <span className="text-2xl">🥈</span>
                  </div>
                </div>
                {/* 1st */}
                <div className="text-center">
                  <Avatar size="xl" className="mb-2 ring-4 ring-warning-400" />
                  <p className="font-bold text-lg">MusicMaster</p>
                  <p className="text-warning-400 font-bold">5,420 pts</p>
                  <div className="w-24 h-24 bg-warning-500/20 rounded-t-lg mt-2 flex items-center justify-center">
                    <span className="text-3xl">🥇</span>
                  </div>
                </div>
                {/* 3rd */}
                <div className="text-center">
                  <Avatar size="lg" className="mb-2" />
                  <p className="font-bold">You</p>
                  <p className="text-white/50 text-sm">3,920 pts</p>
                  <div className="w-20 h-12 bg-white/10 rounded-t-lg mt-2 flex items-center justify-center">
                    <span className="text-2xl">🥉</span>
                  </div>
                </div>
              </div>

              {/* Your Stats */}
              <Card variant="highlighted" className="mb-6">
                <h3 className="font-bold mb-4">Tes stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">12/15</p>
                    <p className="text-white/50 text-sm">Bonnes reponses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4.2s</p>
                    <p className="text-white/50 text-sm">Temps moyen</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success-400">+240</p>
                    <p className="text-white/50 text-sm">XP gagnes</p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button onClick={handlePlayAgain} className="flex-1" leftIcon={<RotateCcw className="w-5 h-5" />}>
                  Rejouer
                </Button>
                <Button onClick={handleBackToLobby} variant="secondary" className="flex-1" leftIcon={<Home className="w-5 h-5" />}>
                  Accueil
                </Button>
                <Button variant="ghost" leftIcon={<Share2 className="w-5 h-5" />}>
                  Partager
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
