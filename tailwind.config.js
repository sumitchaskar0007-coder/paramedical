/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // Only scan your source files
    "!./node_modules/**",           // Exclude node_modules
    "!./dist/**",                   // Exclude build folder
    "!./public/**"                  // Exclude public assets
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f766e",
          dark: "#0d5d56",
          light: "#14b8a6",
        },
        accent: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fb923c",
        },
        neutral: {
          DEFAULT: "#f8fafc",
          dark: "#0f172a",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  corePlugins: {
    preflight: true, // Keep Tailwind’s base CSS reset
  },
  plugins: [],
  safelist: [
    // Add any dynamic classes here to avoid JIT scanning them
    'bg-primary', 'bg-accent', 'text-neutral', 'hover:bg-primary-dark'
  ]
};
