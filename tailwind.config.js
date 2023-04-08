/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "olive-dark": "#010101",
        "olive": "#425951",
        "olive-light": "#8EB6AD",
        "olive-semi-light": "#579F93",
        "yellow-green": '#DEECB9'
      },
      fontFamily: {
        poppins: ['var(--poppins-font)', ...fontFamily.sans]
      },
    },
  },
  plugins: [],
}
