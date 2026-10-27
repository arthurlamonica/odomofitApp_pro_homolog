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
        domo: {
          black: '#1e1e1e',
          obsidian: '#181818',
          card: '#282828',
          cardElevated: '#2D2D2D',
          olive: '#323232',
          volt: '#bdf900',
          voltHover: '#c9ff1a',
          voltMuted: '#9ecf00',
          mint: '#D9E8B5',
          emerald: '#22C55E',
        },
        gym: {
          dark: '#1e1e1e',
          card: 'rgba(24, 27, 21, 0.88)',
          cardHover: 'rgba(31, 36, 27, 0.95)',
          border: 'rgba(255, 255, 255, 0.07)',
          borderGlow: 'rgba(189, 249, 0, 0.4)',
          primary: '#bdf900',
          primaryGlow: '#9ecf00',
          accent: '#bdf900',
          flame: '#FF4D4D',
          gold: '#FACC15',
          cyan: '#4ADE80',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'antigravity': '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 24px -6px rgba(189, 249, 0, 0.12)',
        'antigravity-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.9), 0 0 36px 0px rgba(189, 249, 0, 0.25)',
        'volt-glow': '0 10px 30px -5px rgba(189, 249, 0, 0.4), 0 0 15px rgba(189, 249, 0, 0.25)',
        'glass-glow': '0 0 20px rgba(189, 249, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
      }
    },
  },
  plugins: [],
}
