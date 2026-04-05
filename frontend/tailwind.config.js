/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#f5f0e8',
          100: '#ede5d8',
          200: '#e8e2d8',
          300: '#d4c4b5',
          400: '#b8a999',
          500: '#9c8e7e',
          600: '#7a6e60',
          700: '#5a5048',
          800: '#3a3430',
          900: '#1a1614',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
