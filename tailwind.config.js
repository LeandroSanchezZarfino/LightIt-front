/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('../public/assets/background.jpg')",
      }
    },
  },
  plugins: [],
}

