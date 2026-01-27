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
        primary: '#00ff94',    // Cyberpunk Green
        primaryDim: '#00cc76',
        secondary: '#00b8ff',  // Cyberpunk Blue
        accent: '#7000ff',     // Cyberpunk Purple
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
        'radial-fade': "radial-gradient(circle, rgba(0,255,148,0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(0, 255, 148, 0.3)',
        'glow-lg': '0 0 30px -5px rgba(0, 255, 148, 0.4)',
      }
    },
  },
  plugins: [],
}
