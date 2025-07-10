// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configure files to scan for Tailwind classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define a custom font family for Inter
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
