/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    screens: {
      xsm: "220px",
      sm: "480px",
      md: "768px",
      lmd: "888px",
      lg: "1024px",
      xl: "1440px",
    },
    colors: {
      navyBlue: "#202A44",
      lightGreen: "#90FE90",
      gray: "rgba(250,250,250,0.1)",
      grayishWhite: "#c0c7d1",
      white: "#fff",
      black: "#000",
      ssred:"#bc1718",
      ssblue:"#3324A7",
      ssyellow:"#F9C512"
    },
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
      mont: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};