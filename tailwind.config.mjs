/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const twColors = require('tailwindcss/colors');
const colors = require('./styles/colorSchemes/BambooCurtain');

export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
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
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		// ...
	],
};
