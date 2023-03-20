/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				splash: ["Splash"],
				bodoni: ["Libre Bodoni"],
				nunito: ["Nunito", "sans-serif"],
			},
			backgroundColor: {
				layout: "#6a465b",
				bg: "#dfdee9",
			},
		},
	},
	plugins: [],
}
