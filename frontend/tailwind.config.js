/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 15px 5px rgba(117, 117, 117, 0.3)',
        'fancy': '0 0 10px 3px rgba(255, 69, 0, 0.6), 0 0 30px 10px rgba(230, 57, 70, 0.4)',
        'hoverFancy': '0 0 8px 3px rgba(255, 165, 0, 0.4), 0 0 18px 6px rgba(255, 87, 34, 0.3)',
        'activeFancy': '0 0 5px 2px rgba(255, 140, 0, 0.3), 0 0 10px 4px rgba(255, 69, 0, 0.25)',
      },
      colors: {
        richBlack: '#121212',
        orangeRed: '#FF4500',
        carmineRed: '#E63946',
        sandyOrange: '#F4A261',
        coolGray: '#757575',
        offWhite: '#F5F5F5',
      }
    },
  },
  plugins: [
    
],
}

