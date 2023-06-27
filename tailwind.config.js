/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				splash: ["Splash"],
				bodoni: ["Libre Bodoni"],
				nunito: ["Nunito", "sans-serif"],
				roboto: ["Roboto", "sans-serif"],
			},
			backgroundColor: {
				layout: "#6A2147",
				bg: "#dfdee9",
				secondary: "#a87e2d",
				yellow: "yellow",
			},
		},
	},
	plugins: [],
}
