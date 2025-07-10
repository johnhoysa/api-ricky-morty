/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-out'
      },
      backdropBlur: {
        xs: '2px'
      },
      backgroundImage: (theme) => ({
        // hero: "url('./../images/wood.png')",
        // 'hero-mobile': "url('./../images/wood-mobile.png')",
        // 'footer-trees': "url('./../images/trees.png')"
      }),
      colors: {
        dirt: '#23201A',
        'dirt-400': '#292622',
        'dirt-300': '#312F2B',
        'pine-cone': '#EE684A',
        'northern-lights': '#9CE7DB',
        primary: '#9CE7DB'
      },

      fontFamily: {
        primary: ['Clarika Grotesque', 'serif']
      },
      fontSize: {
        sm: [
          '16px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.1px',
            fontWeight: '300'
          }
        ],
        base: [
          '20px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.1px',
            fontWeight: '300'
          }
        ],
        '2xl': [
          '24px',
          {
            lineHeight: '28px',
            letterSpacing: '-0.1px',
            fontWeight: '600'
          }
        ],

        '5xl': [
          '40px',
          {
            lineHeight: '40px',
            letterSpacing: '-0.1px',
            fontWeight: '600'
          }
        ],
        'hero-mobile': [
          '24px',
          {
            lineHeight: '120%',
            letterSpacing: '-0.1px',
            fontWeight: '500'
          }
        ],
        'hero-tablet': [
          '38px',
          {
            lineHeight: '120%',
            letterSpacing: '-0.1px',
            fontWeight: '500'
          }
        ],
        'hero-desktop': [
          '48px',
          {
            lineHeight: '120%',
            letterSpacing: '-0.1px',
            fontWeight: '500'
          }
        ],
        'hero-desktop-xl': [
          '60px',
          {
            lineHeight: '120%',
            letterSpacing: '-0.1px',
            fontWeight: '500'
          }
        ]
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      maxWidth: {
        md: '1280px',
        lg: '1440px',
        xl: '1768px'
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  safelist: [],
  content: ['*.html', 'index.html', './src/**/*.{css,js,html,twig}']
};
