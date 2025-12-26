import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button, Input, Card } from '@components/ui';
import { useAuthStore } from '@stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/20 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <Card className="p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow-primary">
              <Music className="w-7 h-7 text-white" />
            </div>
            <span className="font-display font-bold text-2xl">BlindTest Party</span>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Connexion</h1>
          <p className="text-white/50 text-center mb-8">
            Connecte-toi pour acceder a ton compte
          </p>

          {error && (
            <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 mb-6">
              <p className="text-error-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              type="password"
              label="Mot de passe"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                S'inscrire
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link to="/play">
              <Button variant="ghost" className="w-full">
                Jouer sans compte
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
