import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
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
    darkMode: 'class',
    plugins: [nextui()],
};
