/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Nitti", ...defaultTheme.fontFamily.sans],
        sans: ["GT Ultra Standard", ...defaultTheme.fontFamily.sans],
        serif: ["GT Ultra Median", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
