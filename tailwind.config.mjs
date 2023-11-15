/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('./styles/colorSchemes/TaipeiBuilding');

export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors,
			fontFamily: {
				mono: ['Nitti', ...defaultTheme.fontFamily.sans],
				sans: ['GT Ultra Standard', ...defaultTheme.fontFamily.sans],
				serif: ['GT Ultra Median', ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		// ...
	],
};
