/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}"],
	darkMode: 'media',
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui"),
		require('tailwind-scrollbar'),
	],
	daisyui: {
		themes: ["halloween"],
	},
}
