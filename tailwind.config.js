/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.html',
    './src/**/*.js',
    './public/**/*.html',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'ot-blue': '#1e87f0',
        'ot-bg-black': '#161e2e',
        'ot-bg-blue': '#2286e2d1',
        'ot-font-black': '#160647'
      },
      animation: {
        text: 'text 5s ease-in-out infinite'
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    }
  },
  plugins: []
};
