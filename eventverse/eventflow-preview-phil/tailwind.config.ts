
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Game icon animations and more
				'electric-pulse': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 2px rgb(234 179 8)) brightness(1)',
						transform: 'scale(1)' 
					},
					'50%': { 
						filter: 'drop-shadow(0 0 8px rgb(234 179 8)) brightness(1.3)',
						transform: 'scale(1.1)' 
					}
				},
				'rapid-tap': {
					'0%, 100%': { transform: 'scale(1)' },
					'25%': { transform: 'scale(0.85)' },
					'50%': { transform: 'scale(1)' },
					'75%': { transform: 'scale(0.9)' }
				},
				'camera-shutter': {
					'0%, 100%': { transform: 'rotate(0deg)', opacity: '1' },
					'25%': { opacity: '0.3' },
					'50%': { transform: 'rotate(180deg)', opacity: '1' }
				},
				'puzzle-assemble': {
					'0%': { transform: 'translate(-20px, -20px) rotate(-45deg)', opacity: '0' },
					'100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' }
				},
				'cell-highlight': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'mystic-glow': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 4px rgb(147 51 234))',
						transform: 'translateY(0px)' 
					},
					'50%': { 
						filter: 'drop-shadow(0 0 12px rgb(147 51 234))',
						transform: 'translateY(-5px)' 
					}
				},
				'page-turn': {
					'0%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(90deg)' },
					'100%': { transform: 'rotateY(0deg)' }
				},
				'pendulum-swing': {
					'0%, 100%': { transform: 'rotate(-15deg)' },
					'50%': { transform: 'rotate(15deg)' }
				},
				'brain-spin': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.1)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'radar-scan': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'electric-pulse': 'electric-pulse 1.5s ease-in-out infinite',
				'rapid-tap': 'rapid-tap 0.6s ease-in-out infinite',
				'camera-shutter': 'camera-shutter 2s ease-in-out infinite',
				'puzzle-assemble': 'puzzle-assemble 1s ease-out',
				'cell-highlight': 'cell-highlight 2s ease-in-out infinite',
				'mystic-glow': 'mystic-glow 2s ease-in-out infinite',
				'page-turn': 'page-turn 3s ease-in-out infinite',
				'pendulum-swing': 'pendulum-swing 2s ease-in-out infinite',
				'brain-spin': 'brain-spin 3s linear infinite',
				'radar-scan': 'radar-scan 3s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
