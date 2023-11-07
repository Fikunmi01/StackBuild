/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`'Open Sans', sans-serif`],
        serif: [`'Libre Baskerville', serif`]
      },
      colors: {
        lightGray: 'rgba(28, 28, 28, 0.50)',
      }
    },
  },
  plugins: [],
}

