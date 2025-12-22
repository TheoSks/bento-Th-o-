'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Bento
        </h1>
        <p className="text-xl md:text-2xl text-muted mb-8">
          Create your personal link-in-bio page with a beautiful bento grid layout
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/editor')}
            className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Create Your Bento
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/demo')}
            className="px-8 py-4 bg-secondary text-foreground rounded-xl font-semibold text-lg border border-border hover:bg-opacity-80 transition-opacity"
          >
            View Demo
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 grid grid-cols-3 gap-4 max-w-md opacity-30"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`bg-widget-bg rounded-xl ${
              i === 0 || i === 4 ? 'col-span-2 h-24' : 'h-24'
            }`}
          />
        ))}
      </motion.div>

      <footer className="absolute bottom-8 text-center text-sm text-muted">
        Built with Next.js and Tailwind CSS
      </footer>
    </main>
  );
}
