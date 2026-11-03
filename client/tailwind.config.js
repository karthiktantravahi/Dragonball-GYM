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
          black: '#070709',
          dark: '#0e0e11',
          card: '#141417',
          cardLight: '#1c1c22',
          border: '#26262e',
          red: '#ff1e27',
          redHover: '#e0161f',
          redGlow: 'rgba(255, 30, 39, 0.4)',
          orange: '#ff5e00',
          muted: '#8e8e93',
          light: '#f5f5f7',
        }
      },
      fontFamily: {
        display: ['"Montserrat"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(255, 30, 39, 0.45)',
        'glow-red-lg': '0 0 40px -5px rgba(255, 30, 39, 0.65)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, rgba(7,7,9,0.3) 0%, rgba(7,7,9,0.95) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
