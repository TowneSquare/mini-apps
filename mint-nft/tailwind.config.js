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
        bgorange: "#f2eee3",
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
        "title-scale": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.3)" },
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
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "sloth-bubble-appear-up": {
          "0%": { transform: "translateY(100%)", opacity: 1 },
          "25%": { transform: "translateY(0)", opacity: 1 },
          "80%": {
            transform: "translateY(0) translateX(0)",
            opacity: 1,
          },
          "90%": {
            transform: "translateY(0) translateX(-50%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) translateX(-100%)",
            opacity: 0,
          },
        },
        "sloth-bubble-appear-up2": {
          "0%": { transform: "translateY(100%) translateX(0)", opacity: 1 },
          "9%": { transform: "translateY(0) translateX(0)", opacity: 1 },
          "60%": {
            transform: "translateY(0) translateX(0)",
            opacity: 1,
          },
          "70%": {
            transform: "translateY(0) translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) translateX(-100%)",
            opacity: 0,
          },
        },
        "sloth-bubble-appear-up3": {
          "0%": { transform: "translateY(100%) translateX(0)", opacity: 1 },
          "5%": { transform: "translateY(0) translateX(0)", opacity: 1 },
          "55%": {
            transform: "translateY(0) translateX(0)",
            opacity: 1,
          },
          "60%": {
            transform: "translateY(0) translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) translateX(-100%)",
            opacity: 0,
          },
        },
        "sloth-smile-appear-left": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "20%": { transform: "translateX(80)", opacity: 1 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "sloth-smile-appear-left1": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "0%": { transform: "translateX(99%)", opacity: 1 },
          "8%": { transform: "translateX(0)", opacity: 1 },
          "60%": { transform: "translateX(0)", opacity: 1 },
          "70%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(-100%)", opacity: 0 },
        },
        "button-appear-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(-1rem)" },
        },
        "appear-left": {
          from: { transform: "translateX(calc(50vw - 31rem))", opacity: 0 },
          to: { transform: "translateX(calc(50vw - 17rem))", opacity: 1 },
        },
        "appear-left-sm": {
          "0%": { transform: "translateX(calc(50vw - 31rem))", opacity: 0 },
          // "20%": { transform: "translateX(calc(50vw - 27rem)", opacity: 1 },
          "100%": { transform: "translateX(calc(50vw - 10.5rem))", opacity: 1 },
        },
        "appear-right": {
          from: { transform: "translateX(calc(-50vw + 36rem))", opacity: 0 },
          to: { transform: "translateX(calc(-50vw + 17rem))", opacity: 1 },
        },
        "appear-right-sm": {
          from: { transform: "translateX(calc(-50vw + 31rem))", opacity: 0 },
          to: { transform: "translateX(calc(-50vw + 10.5rem))", opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "home-title-ani": "title-scale 0.4s 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
