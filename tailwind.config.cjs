/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
	  screens: {
		'tablet': '821px',
		'laptop': '1024px',
		'desktop': '1280px',
	  },
	  extend: {
		spacing: {
		  '72': '18rem',
		  '84': '21rem',
		  '96': '24rem',
		},
		fontFamily: {
		  'poppins': ['Poppins', 'sans-serif'],
		},
	  },
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
	  themes: [
		{
		  "hemnio": {
			"primary": "#ac3c24", // Hemnio Red
			"secondary": "#ebc3a3", // Hemnino Cream
			"accent": "#32021F", // Dark Purple
			"neutral": "#19323C", // Gunmetal
			"base-100": "#ffffff", // White
		  },
		},
	  ],
	},
  }
  