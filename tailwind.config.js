/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c',
        surface: '#111114',
        surfaceHighlight: '#1a1a1e',
        primary: '#FFCB05',    // UMich Maize
        primaryDim: '#E6B705',
        secondary: '#00274C',  // UMich Blue
        accent: '#003B72',     // Lighter UMich Blue for accents
        text: '#f2f2f2',
        muted: '#8a8f98',      // neutral gray, less blue than slate
        border: '#ffffff10',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 20s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
