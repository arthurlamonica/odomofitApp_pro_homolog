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
        gym: {
          dark: '#1E1E1E',
          card: 'rgba(38, 38, 38, 0.85)',
          cardHover: 'rgba(48, 48, 48, 0.95)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(189, 249, 0, 0.35)',
          primary: '#bdf900',
          primaryGlow: '#a6db00',
          accent: '#bdf900',
          flame: '#F43F5E',
          gold: '#F59E0B',
          cyan: '#06B6D4',
        },
        brand: {
          green: '#bdf900',
          greenHover: '#aee800',
          gray: '#1E1E1E',
          card: '#262626',
          cardHover: '#303030',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'antigravity': '0 24px 48px -12px rgba(0, 0, 0, 0.65), 0 0 24px -4px rgba(189, 249, 0, 0.15)',
        'antigravity-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.8), 0 0 36px 0px rgba(189, 249, 0, 0.25)',
        'glass-glow': '0 0 20px rgba(189, 249, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        'accent-glow': '0 0 20px rgba(189, 249, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
