import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			"2xl": "1400px",
		},
		extend: {
			colors: {
				textLight: "#262c35",
				textDark: "#c8c8c9",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
