/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A192F',
          deep: '#060D1A',
          surface: '#0E223D',
          accent: '#C2410C',
          glow: '#FF6B35',
          cyan: '#00E5FF',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(255, 107, 53, 0.4)',
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.22)',
        executive: '0 20px 60px -15px rgba(6, 13, 26, 0.14)',
      },
    },
  },
  plugins: [],
};
