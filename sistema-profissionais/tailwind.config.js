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
          dark: '#08090C',
          card: 'rgba(18, 20, 26, 0.75)',
          cardHover: 'rgba(26, 30, 40, 0.85)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(99, 102, 241, 0.35)',
          primary: '#6366F1',
          primaryGlow: '#4F46E5',
          accent: '#10B981',
          flame: '#F43F5E',
          gold: '#F59E0B',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'antigravity': '0 24px 48px -12px rgba(0, 0, 0, 0.65), 0 0 24px -4px rgba(99, 102, 241, 0.15)',
        'antigravity-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.8), 0 0 36px 0px rgba(99, 102, 241, 0.25)',
        'glass-glow': '0 0 20px rgba(99, 102, 241, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        'accent-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
