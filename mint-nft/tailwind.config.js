/** @type {import('tailwindcss').Config} */
module.exports = {
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
        bgorange: "#e1dac4",
        bgbutton: "#d6d3c8",
        bgpink: "#746aa9",
        fgpink: "#b5afd0",
        bggreen: "#82cbca",
        textpink: "#846BE9",
        textgreen: "#84C9CB",
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
        "home-title-animation-x": {
          "0%": { transform: "translateX(100%) translateY(50%)" },
          "22%": { transform: "translateX(-10%) translateY(50%)" },
          "25%": { transform: "translateX(0) translateY(50%)" },
          "50%": { transform: "translateX(0) translateY(50%)" },
          "100%": { transform: "translateX(0) translateY(0%)" },
        },
        "home-title-animation-y": {
          from: { transform: "translateY(50%)" },
          to: { transform: "translateY(0)" },
        },
        "appear-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "sloth-appear-up": {
          from: { transform: "translateY(100%)", top: "20%" },
          to: { transform: "translateY(0)", top: "0" },
        },
        "sloth-bubble-appear-up": {
          "0%": { transform: "translateY(100%)", top: "100%", opacity: 1 },
          "25%": { transform: "translateY(0)", top: "38%", opacity: 1 },
          "80%": {
            transform: "translateY(0) translateX(0)",
            top: "38%",
            opacity: 1,
          },
          "90%": {
            transform: "translateY(0) translateX(-50%)",
            top: "38%",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(0) translateX(-100%)",
            top: "38%",
            opacity: 0,
          },
        },
        "sloth-smile-appear-left": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "20%": { transform: "translateX(80)", opacity: 1 },
          "100%": { transform: "translateX(0)", opacity: 1 },

        },
        "button-appear-up": {
          from: { transform: "translateY(100%)", bottom: "0rem" },
          to: { transform: "translateY(0)", bottom: "1rem" },
        },
        "appear-left": {
          from: { transform: "translateX(-100%)",left: "0rem" },
          to: { transform: "translateX(0)",left: "calc(50vw - 18rem)" },
        },
        "appear-left-sm": {
          from: { transform: "translateX(-100%)", left: "0rem" },
          to: { transform: "translateX(0)", left: "calc(50vw - 11rem)" },
        },
        "appear-right": {
          from: { transform: "translateX(100%)",right: "0rem" },
          to: { transform: "translateX(0)",right: "calc(50vw - 17rem)" },
        },
        "appear-right-sm": {
          from: { transform: "translateX(100%),", right: "0rem" },
          to: { transform: "translateX(0)", right: "calc(50vw - 10rem)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "home-title-ani": "home-title-animation-x 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
