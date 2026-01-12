/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          blue: '#2481cc',
          dark: '#17212b',
          light: '#f5f5f5'
        },
        dubai: {
          gold: '#D4AF37',
          accent: '#0088cc'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'sans-serif']
      }
    },
  },
  plugins: [],
}
