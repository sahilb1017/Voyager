/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'main-blue': '#87A1FF',
        'main-grey':'#353535'
      },
      fontFamily:{
        latoFont:"'Lato', serif"
      }
    }
  },
  plugins: [],
}

