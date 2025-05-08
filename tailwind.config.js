/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        secondaryLightBg: "#B297ED",
        secondaryDarkBg: "#493A68",
        lightBg: "#9F7EE6",
        darkBg: "#312746",
        primary: "#BF93FF",
        superDarkBg: "#241C33",
        customLightShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        customDarkShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
      },
      backgroundImage: {
        "gradient-main-light": "linear-gradient(to bottom, #EAEEFC, #BF93FF)",
        "gradient-main-dark": "linear-gradient(to bottom, #000000, #BF93FF)",
      },
    },
  },
  plugins: [],
};
