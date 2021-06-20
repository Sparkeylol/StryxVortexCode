/* eslint-disable quote-props */
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        'canvas-w': '125%',
        'canvas-h': '80%',
        '76': '20rem',
        '-76': '-20rem',
        'inherit': 'inherit',
        'screen-1.25': '125vh',
        'rem-500': '500rem',
        '0.25': '0.0625rem',
      },
      scale: {
        '175': '1.75',
        '200': '2',
        '300': '3',
      },
      animation: {
        'rtl': 'rtl-frames 10s linear infinite',
      },
      keyframes: {
        'rtl-frames': {
          'from': {
            '-webkit-transform': 'translate3d(0,0,0);',
            '-ms-transform': 'translate3d(0,0,0);',
            'transform': 'translate3d(0,0,0);',
          },
          'to': {
            '-webkit-transform': 'translate3d(-50%,0,0);',
            '-ms-transform': 'translate3d(-50%,0,0);',
            'transform': 'translate3d(-50%,0,0);',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
};
