/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/{app,components}/**/*.tsx'],
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
