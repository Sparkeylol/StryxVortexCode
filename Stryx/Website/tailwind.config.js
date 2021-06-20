const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors,
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  variants: {
    extend: {},
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
};
