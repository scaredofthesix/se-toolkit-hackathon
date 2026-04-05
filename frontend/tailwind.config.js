/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: 'rgba(255,255,255,0.55)',
          100: 'rgba(255,255,255,0.35)',
          200: 'rgba(255,255,255,0.15)',
          300: 'rgba(255,255,255,0.08)',
          400: '#1a1a1a',
          500: '#111111',
          600: '#0d0d0d',
          700: '#0a0a0a',
          800: '#050505',
          900: '#000000',
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
