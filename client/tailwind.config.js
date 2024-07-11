/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#CCD1D1',
            },
        },
        fontFamily: {
            sans: ['Noto Sans', 'sans-serif'],
        },
    },
    plugins: [],
};
