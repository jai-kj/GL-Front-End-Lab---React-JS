/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#1f1f1f",
                light: "#f9f9f9",
                darkGray: "#444444",
            },
        },
        fontSize: {
            xxxs: "0.5rem",
            xxs: "0.625rem",
            xs: "0.75rem",
            sm: ".875rem",
            rg: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "4rem",
            "7xl": "5rem",
        },
    },
    plugins: [],
}
