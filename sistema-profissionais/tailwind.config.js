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
          black: '#0B0D0A',
          obsidian: '#11140F',
          card: '#181B15',
          cardElevated: '#1F241B',
          olive: '#23281E',
          volt: '#CEFA03',
          voltHover: '#D8FF29',
          voltMuted: '#A3C902',
          mint: '#D9E8B5',
          emerald: '#22C55E',
        },
        gym: {
          dark: '#0B0D0A',
          card: 'rgba(24, 27, 21, 0.88)',
          cardHover: 'rgba(31, 36, 27, 0.95)',
          border: 'rgba(255, 255, 255, 0.07)',
          borderGlow: 'rgba(206, 250, 3, 0.4)',
          primary: '#CEFA03',
          primaryGlow: '#A3C902',
          accent: '#CEFA03',
          flame: '#FF4D4D',
          gold: '#FACC15',
          cyan: '#4ADE80',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'antigravity': '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 24px -6px rgba(206, 250, 3, 0.10)',
        'antigravity-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.9), 0 0 36px 0px rgba(206, 250, 3, 0.22)',
        'volt-glow': '0 10px 30px -5px rgba(206, 250, 3, 0.35), 0 0 15px rgba(206, 250, 3, 0.2)',
        'glass-glow': '0 0 20px rgba(206, 250, 3, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
      }
    },
  },
  plugins: [],
}
