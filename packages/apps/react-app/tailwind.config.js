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
        black: "var(black)",
        white: "var(white)",
        slate: {
            950: "var(slate950)",
            900: "var(slate900)",
            800: "var(slate800)",
            700: "var(slate700)",
            600: "var(slate600)",
            500: "var(slate500)",
            400: "var(slate400)",
            300: "var(slate300)",
            200: "var(slate200)",
            100: "var(slate100)",
            50: "var(slate50)",
        },
      }
    },
  },
  plugins: [],
}

