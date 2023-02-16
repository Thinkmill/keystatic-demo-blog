/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tm-red': {
          light: '#FFF3F3',
          brand: '#ed0000',
          dark: '#e10000',
        },
      },
  },
},
  plugins: [
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false,
  },
}
