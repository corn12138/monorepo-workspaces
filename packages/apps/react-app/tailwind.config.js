/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx, ts, jsx, js}",
  ],
  theme: {
    extend: {
      spacing: {
        13: "3.25rem",
        '5/7': "71.4%",
        "2/7": "28.6%"
      },
      minWidth: {
        '6xl': '68rem'
      },

      colors: {
        black: "var(--black)",
        white: "var(--white)",
        slate: {
            950: "var(--slate-950)",
            900: "var(--slate-900)",
            800: "var(--slate-800)",
            700: "var(--slate-700)",
            600: "var(--slate-600)",
            500: "var(--slate-500)",
            400: "var(--slate-400)",
            300: "var(--slate-300)",
            200: "var(--slate-200)",
            100: "var(--slate-100)",
            50: "var(--slate-50)",
        },
      }
    },
  },
  plugins: [],
}

