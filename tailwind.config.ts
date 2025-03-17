import type { Config } from "tailwindcss"
// Import the plugin using ES Module syntax
import animate from "tailwindcss-animate"

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Food-themed colors
        sage: {
          50: "#f4f7f2",
          100: "#e6ede1",
          200: "#cfdbc5",
          300: "#b0c4a0",
          400: "#8ba878",
          500: "#6d8c5a",
          600: "#567147",
          700: "#445a39",
          800: "#384830",
          900: "#303c29",
          950: "#1a2116",
        },
        tomato: {
          50: "#fff5f5",
          100: "#ffe6e6",
          200: "#ffd0d0",
          300: "#ffadad",
          400: "#ff7a7a",
          500: "#ff4747",
          600: "#e62020",
          700: "#c11818",
          800: "#a01919",
          900: "#841b1b",
          950: "#480909",
        },
        carrot: {
          50: "#fff8ed",
          100: "#ffefd6",
          200: "#ffdcac",
          300: "#ffc478",
          400: "#ffa23d",
          500: "#fd8013",
          600: "#ed6209",
          700: "#c44a09",
          800: "#9c3a10",
          900: "#7e3211",
          950: "#431708",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // Use the imported plugin directly
  plugins: [animate],
} satisfies Config

export default config