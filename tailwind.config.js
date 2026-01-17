/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'weather-bg': '#F6EDFF',
        'weather-card': '#ECDEFF',
        'weather-tab-active': '#E0B6FF',
        'weather-accent': '#8920D5',
      },
      fontFamily: {
        sans: ['ProductSans-Regular'],
      },
    },
  },
  plugins: [],
};
