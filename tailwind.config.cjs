/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      semiBlack:'rgb(25, 28, 36)',
      black:'#000',
      input:'#2a3038',
      white:'#fff',
      primary:'#3f6ad8',
      success:'#3ac47d',
      error:'#fc424a',
      gray:'#6c7293',
      danger:'#d92550',
      info:'#16aaff'

    }
  },
  plugins: [],
}