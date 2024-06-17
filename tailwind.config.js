/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'half-green': 'linear-gradient(to right, #1DA573 42%, transparent 58%)',
      },
    },
  },
  plugins: [],
}