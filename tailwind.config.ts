import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			darkprimary: '#0a0615',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	},
	  keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, 40px) scale(1.1)' }
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(0.9)' },
          '50%': { transform: 'translate(40px, -20px) scale(1)' }
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-20px, -30px) scale(0.8)' }
        },
		'pulse': {
			'0%, 100%': { 'opacity': '1' },
			'50%': { 'opacity': '0.5' },
		},
		'spin': {
			'0%': { transform: 'rotate(0deg)' },
			'100%': { transform: 'rotate(360deg)' },
		}
      },
      animation: {
        'float-1': 'float-1 18s ease-in-out infinite',
        'float-2': 'float-2 22s ease-in-out infinite',
        'float-3': 'float-3 25s ease-in-out infinite',
		'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		'spin': 'spin 2s linear infinite',
      }
  },
  plugins: [],
} satisfies Config;