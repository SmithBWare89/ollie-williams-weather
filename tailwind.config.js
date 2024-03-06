/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {},
    backgroundColor: {
      low: "darkgreen",
      moderate: "yellow",
      high: "darkorange",
      veryHigh: "red",
      extreme: "#800080",
      default: "#4d5dfb",
    },
    backgroundImage: {
      gradientPattern: "linear-gradient(315deg, #4d5dfb 0%, #08c8f6 74%)",
    },
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xlg: "1920px",
    },
  },
  plugins: [],
};
