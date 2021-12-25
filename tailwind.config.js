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

      // Primary
      "primary-50": "#E3F8FF",
      "primary-100": "#B3ECFF",
      "primary-200": "#81DEFD",
      "primary-300": "#5ED0FA",
      "primary-400": "#40C3F7",
      "primary-500": "#2BB0ED",
      "primary-600": "#1992D4",
      "primary-700": "#127FBF",
      "primary-800": "#0B69A3",
      "primary-900": "#035388",

      // Neutrals
      "neutral-50": "#F5F7FA",
      "neutral-100": "#E4E7EB",
      "neutral-200": "#CBD2D9",
      "neutral-300": "#9AA5B1",
      "neutral-400": "#7B8794",
      "neutral-500": "#616E7C",
      "neutral-600": "#52606D",
      "neutral-700": "#3E4C59",
      "neutral-800": "#323F4B",
      "neutral-900": "#1F2933",

      // Supporting
      "supporting-50": "#EFFCF6",
      "supporting-100": "#C6F7E2",
      "supporting-200": "#8EEDC7",
      "supporting-300": "#65D6AD",
      "supporting-400": "#3EBD93",
      "supporting-500": "#27AB83",
      "supporting-600": "#199473",
      "supporting-700": "#147D64",
      "supporting-800": "#0C6B58",
      "supporting-900": "#014D40",

      "yellow-50": "#FFFBEA",
      "yellow-100": "#FFF3C4",
      "yellow-200": "#FCE588",
      "yellow-300": "#FADB5F",
      "yellow-400": "#F7C948",
      "yellow-500": "#F0B429",
      "yellow-600": "#DE911D",
      "yellow-700": "#CB6E17",
      "yellow-800": "#B44D12",
      "yellow-900": "#8D2B0B",
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
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    extend: {
      maxWidth: {
        cart: "min(320px, 100vw - 16px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addBase, theme }) {
      addBase({
        html: {
          backgroundColor: theme("colors.neutral-50"),
          color: theme("colors.neutral-900"),
          fontFamily: theme("fontFamily.sans"),
        },
        "h1, h2, h3, h4": {
          fontWeight: theme("fontWeight.bold"),
        },
        main: {
          minHeight: "calc(100vh - 80px - 128px)", // screen - (header + footer)
        },
      });
    }),
  ],
};
