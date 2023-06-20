/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        mili: '380px',
        atom: '200px'
      }
    }
  },
  plugins: []
}
