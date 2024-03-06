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
  },
  plugins: [],
};
