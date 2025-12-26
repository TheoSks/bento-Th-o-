import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Trophy, User, LogOut, Menu, X, Music } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@stores/authStore';
import { Avatar } from '@components/ui';

const navItems = [
  { path: '/dashboard', label: 'Accueil', icon: Home },
  { path: '/leaderboard', label: 'Classement', icon: Trophy },
  { path: '/profile', label: 'Profil', icon: User },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">
              BlindTest Party
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary-600/20 text-primary-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <Avatar src={user.avatar} size="sm" showLevel level={user.level} />
                <div className="text-sm">
                  <p className="font-medium text-white">{user.username}</p>
                  <p className="text-white/50">Niveau {user.level}</p>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors hidden md:block"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white/60 hover:text-white md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark-secondary border-b border-white/5"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${isActive
                        ? 'bg-primary-600/20 text-primary-400'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-error-400 hover:bg-error-500/10 w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Deconnexion</span>
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
