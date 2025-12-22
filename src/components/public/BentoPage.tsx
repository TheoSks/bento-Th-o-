'use client';

import { motion } from 'framer-motion';
import { Layout, Widget } from '@/types';
import { WidgetRenderer } from '@/components/widgets';
import { gridCols } from '@/types';

interface BentoPageProps {
  username: string;
  name?: string;
  avatar?: string;
  bio?: string;
  layout: Layout;
  widgets: Widget[];
  theme?: 'light' | 'dark';
}

export function BentoPage({
  username,
  name,
  avatar,
  bio,
  layout,
  widgets,
  theme = 'dark',
}: BentoPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      {/* Header with user info */}
      <header className="pt-12 pb-8 text-center">
        {avatar && (
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={avatar}
            alt={name || username}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-widget-bg"
          />
        )}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold"
        >
          {name || username}
        </motion.h1>
        {bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted mt-2 max-w-md mx-auto"
          >
            {bio}
          </motion.p>
        )}
      </header>

      {/* Bento Grid */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 pb-12"
      >
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${gridCols.lg}, 1fr)`,
            gridAutoRows: '80px',
          }}
        >
          {layout.map((item) => {
            const widget = widgets.find((w) => w.id === item.i);
            if (!widget) return null;

            return (
              <motion.div
                key={item.i}
                variants={itemVariants}
                className="bento-widget"
                style={{
                  gridColumn: `span ${item.w}`,
                  gridRow: `span ${item.h}`,
                }}
              >
                <WidgetRenderer widget={widget} />
              </motion.div>
            );
          })}
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted">
        <a
          href="/"
          className="hover:text-foreground transition-colors"
        >
          Made with Bento
        </a>
      </footer>
    </div>
  );
}
