import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/[locale]/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {

      textColor: {
        'white-light': 'rgb(0 0 0)', 
        'white-dark': 'rgb(255 255 255)'
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'home-background': "url('/Home.png')",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'surface-0': '#ffffff',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#006BE4',
          foreground: '#FFFFFF',
        },
        primary_green: {
          DEFAULT: '#375B42',
          foreground: '#FFFFFF',
        },
        revolutionary_green: {
          DEFAULT: '#A0D911',
          foreground: '#FFFFFF',
        },
        forest: {
          50: '#f0f7f2',
          100: '#dbede0',
          200: '#b9dcc4',
          300: '#8cc29e',
          400: '#5ba373',
          500: '#3e8654',
          600: '#2f6a42',
          700: '#316a3c',
          800: '#24532f',
          900: '#1e4428',
          950: '#0f2516',
        },
        brand: {
          50: '#f6f9f7',
          100: '#e8f0ea',
          200: '#d1e1d5',
          300: '#b1ceb8',
          400: '#8eae9b',
          500: '#6f927e',
          600: '#597768',
          700: '#486156',
          800: '#3c5048',
          900: '#34433c',
          950: '#1b2420',
        },
        filter_active: {
          DEFAULT: '#375B42',
          foreground: '#FFFFFF',
        },
        clear_filter: {
          DEFAULT: '#FF8A33',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
