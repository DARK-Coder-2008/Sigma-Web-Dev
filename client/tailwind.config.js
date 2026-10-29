/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Coder Official Palette
        darkBg: '#080B16',
        darkBgSecondary: '#0D1222',
        darkCard: '#11182A',
        primaryViolet: '#8B5CF6',
        navyBlue: '#2563EB',
        lightPurple: '#A78BFA',
        mainText: '#F8FAFC',
        secondaryText: '#94A3B8',
        successGreen: '#22C55E',
        errorRed: '#EF4444',

        // Compatibility aliases
        background: '#080B16',
        surface: '#0D1222',
        surfaceLight: '#11182A',
        borderDark: '#1E293B',
        neonCyan: '#38BDF8',
        neonPurple: '#8B5CF6',
        neonPink: '#EC4899',
        neonGreen: '#22C55E',
        electricYellow: '#FACC15'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.45)',
        'glow-navy': '0 0 25px -5px rgba(37, 99, 235, 0.45)',
      }
    },
  },
  plugins: [],
}
