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
    },
    plugins: [],
}
