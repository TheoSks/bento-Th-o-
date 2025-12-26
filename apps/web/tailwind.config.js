/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        accent: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        dark: {
          bg: '#0f0f1a',
          secondary: '#1a1a2e',
          tertiary: '#252542',
          card: 'rgba(255, 255, 255, 0.05)',
          'card-hover': 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'Audiowide', 'sans-serif'],
        heading: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-secondary': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-accent': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.4)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
        'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'score-pop': 'score-pop 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'countdown': 'countdown 1s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'score-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'countdown': {
          'from': { transform: 'scale(2)', opacity: '0' },
          '50%': { opacity: '1' },
          'to': { transform: 'scale(1)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
