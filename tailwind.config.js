const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [ 
    flowbite.plugin(),
    function ({ addVariant }) {
      addVariant('is-active', '&.is-active');
    },
  ],
}