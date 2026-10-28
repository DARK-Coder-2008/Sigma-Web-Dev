/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#0f172a',
        surfaceLight: '#1e293b',
        borderDark: '#334155',
        neonCyan: '#06b6d4',
        neonPurple: '#a855f7',
        neonPink: '#ec4899',
        neonGreen: '#10b981',
        electricYellow: '#facc15'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.9, filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))' },
          '50%': { opacity: 0.6, filter: 'drop-shadow(0 0 5px rgba(6, 182, 212, 0.4))' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}

