/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        116: '28rem',
        125: '32rem'
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      }
    }
  },
  plugins: []
};
