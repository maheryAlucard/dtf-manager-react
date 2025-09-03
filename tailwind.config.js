/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette (CMYK-inspired)
        // Used for main CTAs, active menu items, and progress indicators
        'primary-cyan': '#06B6D4',
        // Used for secondary actions, highlights, and accents (ex: "Create New Invoice")
        'secondary-magenta': '#DB2777',
        // Used sparingly for alerts, warnings, or stock-low indicators
        'highlight-yellow': '#EAB308',
        // Used for positive states (payments complete, stock replenished)
        'success-lime': '#84CC16',
        // Used only for errors (failed actions, overdue invoices, stock empty)
        'error-red': '#DC2626',

        // Neutral Palette (backgrounds & text)
        // Light mode background
        'background-white': '#FFFFFF',
        // Dark mode background / panels
        'background-dark-gray': '#1F2937',
        // Primary text color (dark text on light backgrounds)
        'text-primary': '#1F2937',
        // Secondary / muted text color
        'text-secondary': '#9CA3AF',
      },
      // You can also extend other properties like borderRadius or boxShadow
      // to match your component styling guidelines more closely.
      // For example, for 'rounded-xl' and 'rounded-lg':
      borderRadius: {
        'lg': '0.5rem', // For buttons
        'xl': '0.75rem', // For cards/panels
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // For cards/panels
      },
    },
  },
  plugins: [],
}
