/** Tailwind de Nuwa: colores y tipografías del manual de marca. */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        terracota: '#AD5E50',
        arcilla: '#D29179',
        marfil: '#EEE7DF',
        verde: '#3B514C',
        salvia: '#9AACAF',
        tierra: '#AE886A',
        crema: '#F7F2EC',
        sello: { verde: '#566B57', azul: '#567690', cafe: '#A07058', malva: '#AF8296' },
      },
      fontFamily: {
        logo: ['Fraunces', 'Georgia', 'serif'],
        titulo: ['Lexend', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        impacto: ['"Climate Crisis"', 'Lexend', 'sans-serif'],
      },
      borderRadius: { blob: '42% 58% 63% 37% / 41% 44% 56% 59%' },
      keyframes: {
        blob: {
          '0%,100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' },
          '33%': { borderRadius: '58% 42% 38% 62% / 55% 38% 62% 45%' },
          '66%': { borderRadius: '36% 64% 52% 48% / 38% 61% 39% 62%' },
        },
        flotar: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-14px) rotate(3deg)' } },
        mecer: { '0%,100%': { transform: 'rotate(-4deg)' }, '50%': { transform: 'rotate(4deg)' } },
        cinta: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        trazo: { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
        latido: { '0%': { boxShadow: '0 0 0 0 rgba(173,94,80,.45)' }, '70%': { boxShadow: '0 0 0 16px rgba(173,94,80,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(173,94,80,0)' } },
        girar: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        blob: 'blob 14s ease-in-out infinite',
        flotar: 'flotar 6s ease-in-out infinite',
        'flotar-lento': 'flotar 9s ease-in-out infinite',
        mecer: 'mecer 7s ease-in-out infinite',
        cinta: 'cinta 32s linear infinite',
        trazo: 'trazo 2.8s ease-out forwards',
        latido: 'latido 2.4s ease-out infinite',
        girar: 'girar 40s linear infinite',
      },
    },
  },
  plugins: [
    // Estados que el JS activa con una sola clase; los estilos quedan en el HTML.
    plugin(({ addVariant }) => {
      addVariant('revealed', '&.is-revealed');
      addVariant('scrolled', '.is-scrolled &');
      addVariant('menu-open', '.menu-abierto &');
      addVariant('activo', '&[aria-current="page"]');
      addVariant('pressed', '&[aria-pressed="true"]');
    }),
  ],
};
