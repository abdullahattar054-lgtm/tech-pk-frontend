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
        // Theme Colors (Variable based)
        background: 'var(--color-bg)',
        'background-alt': 'var(--color-bg-alt)',
        foreground: 'var(--color-text)',
        'foreground-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        'glass-bg': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',

        // Primary Colors
        primary: {
          DEFAULT: '#0066FF',
          light: '#00A3FF',
          dark: '#0052CC',
        },
        // Secondary Colors
        secondary: {
          DEFAULT: 'var(--color-bg-alt)', // Using variable for secondary bg
          light: '#33DDFF',
          dark: '#00A3CC',
        },
        // Dark Theme Colors (Legacy)
        dark: {
          DEFAULT: '#000000',
          light: '#0A0A0A',
          lighter: '#1A1A1A',
        },
        // Status Colors
        success: '#00FF88',
        warning: '#FFB800',
        error: '#FF3B3B',
        // UI Colors
        'muted-foreground': 'var(--color-text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1', fontWeight: '900' }],
        'display': ['48px', { lineHeight: '1.1', fontWeight: '800' }],
        'heading': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-xl': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-lg': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0066FF, 0 0 10px #0066FF' },
          '100%': { boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 102, 255, 0.5)',
        'glow-strong': '0 0 30px rgba(0, 212, 255, 0.7)',
      },
    },
  },
  plugins: [],
}