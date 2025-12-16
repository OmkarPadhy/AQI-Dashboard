/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: 'var(--brand-50)',
                    100: 'var(--brand-100)',
                    400: 'var(--brand-400)',
                    600: 'var(--brand-600)',
                },
                teal: {
                    400: 'var(--teal-400)',
                },
                amber: {
                    400: 'var(--amber-400)',
                },
                rose: {
                    500: 'var(--rose-500)',
                },
                slate: {
                    900: 'var(--slate-900)',
                    800: 'var(--slate-800)',
                },
            },
        },
    },


    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}