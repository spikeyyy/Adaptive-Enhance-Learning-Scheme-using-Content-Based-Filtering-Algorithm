/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceAndColorChange: {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%, 80%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        bounceAndColorChange: 'bounceAndColorChange 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}

