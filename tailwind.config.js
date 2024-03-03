/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kedo-mono': ["Open Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}