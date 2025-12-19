/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    darkMode: "class",

    theme: {
        extend: {
            colors: {
                /* ===== BRAND COLORS (AQI THEME) ===== */
                brand: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8", // ⭐ MAIN BRAND
                    500: "#0ea5e9",
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                },

                /* ===== STATUS COLORS ===== */
                success: "#22c55e",
                warning: "#facc15",
                danger: "#ef4444",

                /* ===== GLASS BACKGROUNDS ===== */
                glass: "rgba(255,255,255,0.08)",
                glassDark: "rgba(0,0,0,0.35)",
            },

            boxShadow: {
                glow: "0 0 25px rgba(56,189,248,0.45)",
                alert: "0 0 20px rgba(239,68,68,0.6)",
                ambient: "0 10px 40px rgba(0,0,0,0.25)",
            },

            backdropBlur: {
                xs: "2px",
            },

            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
            },
        },
    },

    plugins: [],
};
