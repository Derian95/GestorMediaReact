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
      input:'#353b42',
      white:'#fff',
      primary:'#3f6ad8',
      success:'rgb(27, 128, 106)',
      successG:'rgba(54, 179, 126, 0.16)',
      error:'#fc424a',
      gray:'#d4d2d2',
      danger:'rgb(183, 29, 24)',
      dargerG:'rgba(255, 86, 48, 0.16)',
      info:'#16aaff',
      base:'rgb(32, 101, 209)',
      baseH:'rgb(16, 57, 150)',
      font:'rgb(99, 115, 129)',
      hov:'rgba(99, 115, 129, 0.08)'

    }
  },
  plugins: [],
}