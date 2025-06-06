// tailwind.config.ts
// This file configures Tailwind CSS for the project.
// It defines theme customizations (colors, fonts, spacing), plugins, and content paths.

import type { Config } from "tailwindcss";

export default {
  // Dark mode strategy: 'class' enables manual toggling via a class (e.g., <html class="dark">).
  darkMode: ["class"],
  
  // Content paths: Tailwind scans these files to generate CSS for used utility classes.
  // 🔍 Ensure all paths containing Tailwind classes are included here.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // Theme customizations: Extends or overrides Tailwind's default theme.
  theme: {
  	extend: { // Use `extend` to add to the default theme rather than replacing it.
  		// Color palette definition using CSS HSL variables defined in `globals.css`.
      // This allows for easy theming (light/dark modes) by changing the CSS variables.
      // 🔍 These color definitions are sourced from CSS variables in `globals.css`.
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
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
  			ring: 'hsl(var(--ring))', // Used for focus rings.
  			chart: { // Custom chart colors.
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Sidebar specific colors, also sourced from CSS variables.
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
  		// Border radius customization, using a CSS variable for consistency.
  		borderRadius: {
  			lg: 'var(--radius)', // Large radius.
  			md: 'calc(var(--radius) - 2px)', // Medium radius.
  			sm: 'calc(var(--radius) - 4px)'  // Small radius.
  		},
  		// Keyframe animations for components like Accordion.
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)' // Animates to content height.
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0' // Animates to zero height.
  				}
  			}
  		},
  		// Animation utilities using the defined keyframes.
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      // TODO: Add font family customizations here if not solely relying on `globals.css` and `--font-inter`.
      // fontFamily: {
      //   sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      // },
  	}
  },
  // Tailwind CSS plugins.
  // `tailwindcss-animate` adds utilities for animations (used by ShadCN components).
  plugins: [require("tailwindcss-animate")],
} satisfies Config; // `satisfies Config` provides type checking for the configuration object.
