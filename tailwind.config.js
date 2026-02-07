/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030305', // Deep rich black
        surface: '#0d0d10',    // Slightly lighter
        surfaceHighlight: '#16161a',
        primary: '#FFCB05',    // UMich Maize
        primaryDim: '#E6B705',
        secondary: '#00274C',  // UMich Blue
        accent: '#003B72',     // Lighter UMich Blue for accents
        text: '#ededed',
        muted: '#888888',
        border: '#ffffff15',   // Glass border
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'], // Tech feel
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
        'radial-fade': "radial-gradient(circle, rgba(255,203,5,0.1) 0%, transparent 70%)",
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        scan: 'scan 3s linear infinite',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(255, 203, 5, 0.3)',
        'glow-lg': '0 0 30px -5px rgba(255, 203, 5, 0.4)',
      }
    },
  },
  plugins: [],
}
