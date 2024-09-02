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
				dark: {
					100: '#09111F',
					200: '#0B1527',
					300: '#0F1C34',
					350: '#12213B',
					400: '#27344D',
					500: '#2E3D5B',
					600: '#262626',
				},
				light: {
					100: '#FFFFFF',
					200: '#F8FAFC',
					300: '#F1F5F9',
					350: '#E2E8F0',
					400: '#CBD5E1',
					500: '#94A3B8',
					600: "#F0F0F0",
				},
				textLight: "#262c35",
				textDark: "#c8c8c9",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
