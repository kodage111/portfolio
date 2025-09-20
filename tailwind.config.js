/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xxs': '320px',
            },
            colors: {
                primary: '#16A34A',
                'primary-container': '#DCFCE7',
                'on-primary': '#FFFFFF',
                'on-primary-container': '#052E16',
                background: '#D7D7D7',
                'background-dark': '#1D1F1D'
            },
            fontFamily: {
                'Rajdhani': ['Rajdhani', 'sans-serif'],
                'oswald': ['Oswald', 'sans-serif'],
                'limelight': ['Limelight', 'sans-serif'],
            },
            fontWeight: {
                'rajdhani-regular': '400',
                'rajdhani-bold': '700',
                'oswald-medium': '500',
                'limelight-regular': '400',
            }
        },
    },
    plugins: [],
}
