import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-zodiak-regular)', 'serif'],
        thin: ['var(--font-zodiak-thin)', 'serif'],
        light: ['var(--font-zodiak-light)', 'serif'],
        regular: ['var(--font-zodiak-regular)', 'serif'],
        bold: ['var(--font-zodiak-bold)', 'serif'],
        extrabold: ['var(--font-zodiak-extrabold)', 'serif'],
        black: ['var(--font-zodiak-black)', 'serif'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '1.1', letterSpacing: '-0.04em', fontFamily: 'var(--font-zodiak-black)' }],
        'h1': ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontFamily: 'var(--font-zodiak-extrabold)' }],
        'h2': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontFamily: 'var(--font-zodiak-bold)' }],
        'h3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontFamily: 'var(--font-zodiak-bold)' }],
        'h4': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontFamily: 'var(--font-zodiak-bold)' }],
        'body-lg': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.6', fontFamily: 'var(--font-zodiak-regular)' }],
        'body': ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.6', fontFamily: 'var(--font-zodiak-regular)' }],
        'body-sm': ['clamp(0.875rem, 1.25vw, 1rem)', { lineHeight: '1.5', fontFamily: 'var(--font-zodiak-light)' }],
      },
    },
  },
  plugins: [],
};
export default config;

