import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, User, Music, Users, Trophy, Zap, Star, ArrowRight } from 'lucide-react';
import { Button, Card } from '@components/ui';

const features = [
  {
    icon: Zap,
    title: 'Instantane',
    description: 'Jouez en 3 secondes sans inscription',
  },
  {
    icon: Users,
    title: 'Multijoueur',
    description: 'Rooms publiques et privees jusqu\'a 8 joueurs',
  },
  {
    icon: Trophy,
    title: 'Progression',
    description: 'XP, niveaux, badges et classements',
  },
  {
    icon: Star,
    title: 'Defis',
    description: 'Defi quotidien et duels entre amis',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow-primary">
              <Music className="w-7 h-7 text-white" />
            </div>
            <span className="font-display font-bold text-2xl">BlindTest Party</span>
          </div>
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Se connecter
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="font-display font-extrabold text-5xl md:text-7xl mb-6">
              Le blindtest
              <span className="block gradient-text">multijoueur instantane</span>
            </h1>
            <p className="text-xl text-white/60 mb-12">
              Jouez sans inscription ou creez votre compte pour progresser,
              debloquer des badges et defier vos amis !
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/play">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="xl" leftIcon={<Gamepad2 className="w-6 h-6" />}>
                    Jouer direct
                  </Button>
                </motion.div>
              </Link>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" size="xl" leftIcon={<User className="w-6 h-6" />}>
                    Creer un compte
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Mode Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24"
          >
            {/* Guest Mode Card */}
            <Card variant="interactive" className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-secondary-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Mode Guest</h3>
                </div>
                <ul className="space-y-2 text-white/60 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                    Pseudo temporaire
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                    Multijoueur uniquement
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                    Rooms publiques/privees
                  </li>
                </ul>
                <Link to="/play" className="inline-flex items-center gap-2 text-secondary-400 font-medium hover:text-secondary-300 transition-colors">
                  Jouer maintenant <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>

            {/* Account Mode Card */}
            <Card variant="interactive" className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Mode Compte</h3>
                </div>
                <ul className="space-y-2 text-white/60 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    Progression complete (XP, Niveaux)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    Solo + Multijoueur
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    Stats, Badges, Classements
                  </li>
                </ul>
                <Link to="/register" className="inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors">
                  Creer un compte <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-600/20 to-accent-500/20 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40 text-sm">
          <p>BlindTest Party - Le blindtest multijoueur instantane</p>
        </div>
      </footer>
    </div>
  );
}
