export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
        },
        secondary: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        background: 'var(--color-bg)',
        card: {
          DEFAULT: 'var(--color-card-bg)',
          border: 'var(--color-card-border)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        status: {
          taken: '#10B981',
          pending: '#F59E0B',
          missed: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.04)',
        sidebar: '2px 0 8px 0 rgba(0,0,0,0.05)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
