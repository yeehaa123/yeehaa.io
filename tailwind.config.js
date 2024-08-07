/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const twColors = require('tailwindcss/colors');
const colors = require('./styles/colorSchemes/BambooCurtain');
export default {
  darkMode: "class",
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
			colors: {
				'pitch-black': twColors.black,
				'pure-white': twColors.white,
				...colors,

			},
			fontFamily: {
				mono: ['Nitti', ...defaultTheme.fontFamily.sans],
				sans: ['GT Ultra Standard', ...defaultTheme.fontFamily.sans],
				serif: ['GT Ultra Median', ...defaultTheme.fontFamily.serif],
			},
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}
