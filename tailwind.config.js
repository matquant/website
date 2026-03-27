/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c', // Deeper, more solid black
        surface: '#111114',
        surfaceHighlight: '#1a1a1e',
        primary: '#FFCB05',    // UMich Maize
        primaryDim: '#E6B705',
        secondary: '#00274C',  // UMich Blue
        accent: '#003B72',     // Lighter UMich Blue for accents
        text: '#f2f2f2',       // Slightly brighter for contrast
        muted: '#94a3b8',      // More slate-gray than simple gray
        border: '#ffffff10',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'solid-radial': "radial-gradient(circle at top, rgba(255,203,5,0.05) 0%, transparent 70%)",
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
      },
      boxShadow: {
        'flat': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'hard': '4px 4px 0px 0px rgba(255, 203, 5, 0.2)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
