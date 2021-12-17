const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "white",
      primary: colors.red,
      neutral: colors.neutral,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    fontFamily: {
      sans: ["proxima-nova", "sans-serif"],
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addBase, theme }) {
      addBase({
        html: {
          backgroundColor: theme("colors.neutral.50"),
          color: theme("colors.neutral.900"),
          fontFamily: theme("fontFamily.sans"),
        },
        "h1, h2, h3, h4": { fontWeight: theme("fontWeight.bold") },
      });
    }),
  ],
};
