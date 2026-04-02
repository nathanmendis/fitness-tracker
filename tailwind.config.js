/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D3B66',
          glow: 'rgba(13, 59, 102, 0.2)',
        },
        secondary: '#FAF0CA',
        accent: '#0D3B66',
        card: '#0D3B66',
        bg: '#FAF0CA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
