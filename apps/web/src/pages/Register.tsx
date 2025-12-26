import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Button, Input, Card } from '@components/ui';
import { useAuthStore } from '@stores/authStore';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres');
      return;
    }

    try {
      await register(email, username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'inscription');
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

          <h1 className="text-2xl font-bold text-center mb-2">Inscription</h1>
          <p className="text-white/50 text-center mb-8">
            Cree ton compte pour progresser et debloquer des badges
          </p>

          {error && (
            <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 mb-6">
              <p className="text-error-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              type="text"
              label="Pseudo"
              placeholder="TonPseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
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

            <Input
              type="password"
              label="Confirmer le mot de passe"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Creer mon compte
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50">
              Deja un compte ?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                Se connecter
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
