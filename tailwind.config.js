const {heroui} = require('@heroui/theme');
import twAnimate from "tw-animate-css";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|input|modal|spinner|form).js"
  ],
    theme: {
        extend: {},
    },
  plugins: [heroui()],
};
