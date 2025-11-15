import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
  			primary: {
  				'50': '#F7F7F7',
  				'100': '#E3E3E3',
  				'200': '#C8C8C8',
  				'300': '#A4A4A4',
  				'400': '#818181',
  				'500': '#666666',
  				'600': '#515151',
  				'700': '#434343',
  				'800': '#2a2a2a',
  				'900': '#1a1a1a',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			gold: {
  				'50': '#FFF9E6',
  				'100': '#FFF2CC',
  				'200': '#FFE699',
  				'300': '#FFD966',
  				'400': '#D4AF37',
  				'500': '#C4A032',
  				'600': '#A68729',
  				'700': '#8C7322',
  				'800': '#735F1C',
  				'900': '#594A15'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				success: '#10B981',
  				warning: '#F59E0B',
  				error: '#EF4444',
  				info: '#3B82F6'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		dropShadow: {
  			'text-sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
  			text: '0 2px 4px rgba(0, 0, 0, 0.2)',
  			'text-lg': '0 4px 8px rgba(0, 0, 0, 0.3)',
  			'text-xl': '0 8px 16px rgba(0, 0, 0, 0.4)'
  		},
  		boxShadow: {
  			gold: '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
  			highlight: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
  			'highlight-strong': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
                    ...defaultTheme.fontFamily.sans
                ],
  			heading: [
  				'var(--font-heading)',
                    ...defaultTheme.fontFamily.sans
                ]
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
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			fadeRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'spin-slow': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			shake: {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'10%, 30%, 50%, 70%, 90%': {
  					transform: 'translateX(-4px)'
  				},
  				'20%, 40%, 60%, 80%': {
  					transform: 'translateX(4px)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'fade-up': 'fadeUp 0.5s ease-in-out',
  			'fade-down': 'fadeDown 0.5s ease-in-out',
  			'fade-left': 'fadeLeft 0.5s ease-in-out',
  			'fade-right': 'fadeRight 0.5s ease-in-out',
  			'spin-slow': 'spin-slow 3s linear infinite',
  			shake: 'shake 0.5s ease-in-out'
  		},
  		transitionTimingFunction: {
  			'bounce-sm': 'cubic-bezier(0.28, 0.84, 0.42, 1)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    function({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities, {
        respectPrefix: true,
        respectImportant: true,
      //  variants: ['hover', 'focus']
      });
    },
  ],
} satisfies Config;

export default config;