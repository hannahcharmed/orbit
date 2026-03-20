/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        'deep-void': '#080B14',
        'space-black': '#0F1628',
        'nebula-navy': '#1A2150',
        'cosmic-purple': '#3D3A9E',
        'orbit-blue': '#6C63FF',
        'nova-violet': '#A78BFA',
        'starlight': '#E8F0FF',
        // Semantic
        'success': '#4ADE80',
        'alert-red': '#F09595',
        'amber': '#EF9F27',
        // Text shades
        'text-secondary': '#8892B0',
        'text-tertiary': '#6B7AB5',
        'text-quaternary': '#4A5280',
        'text-faint': '#2D3260',
        // Card surfaces
        'card-bg': '#0D1228',
        'notification-bg': '#0A0E1E',
        'dark-alert-bg': '#0A0818',
        'success-alert-bg': '#0A1A10',
        'warning-alert-bg': '#1A1000',
        'error-alert-bg': '#1A0A0A',
        // Borders
        'border-default': '#1A2150',
        'border-purple': '#2D1A5E',
        'border-success': '#173404',
        'border-error': '#501313',
        'navy-bg': '#1A1F35',
        'purple-bg': '#1A1035',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        '2xs': '7px',
        '3xs': '8px',
        '4xs': '9px',
        '5xs': '10px',
        '6xs': '11px',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.5s ease-in-out infinite',
        'fade-up': 'fade-up 0.3s ease-out forwards',
        'orbit-spin': 'orbit-spin 20s linear infinite',
        'draw-line': 'draw-line 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'orbit-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'draw-line': {
          from: { strokeDashoffset: '100%' },
          to: { strokeDashoffset: '0%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
