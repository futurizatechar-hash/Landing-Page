/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0A192F', // Azul Futuriza
        'brand-light': '#FFFFFF', // Blanco Puro
        'brand-accent': '#FF6B35', // Naranja Cordobés
        'brand-cyan': '#00E5FF', // Cian Eléctrico
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.4)',
        'glow-accent': '0 0 25px rgba(255, 107, 53, 0.4)',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Roboto', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
