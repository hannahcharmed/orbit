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
        'deep-void': '#06080F',
        'space-black': '#0B0F1E',
        'nebula-navy': '#141B38',
        'cosmic-purple': '#3D3A9E',
        'orbit-blue': '#5B6EFF',
        'nova-violet': '#A78BFA',
        'cyan-pulse': '#00D4FF',
        'starlight': '#E4ECFF',
        // Semantic
        'success': '#39D98A',
        'alert-red': '#FF6B6B',
        'amber': '#F5A623',
        // Text shades
        'text-secondary': '#7A8BAD',
        'text-tertiary': '#566082',
        'text-quaternary': '#3A456A',
        'text-faint': '#252E4A',
        // Card surfaces
        'card-bg': '#0C1020',
        'notification-bg': '#080C1A',
        'dark-alert-bg': '#090716',
        'success-alert-bg': '#07150E',
        'warning-alert-bg': '#140D00',
        'error-alert-bg': '#150808',
        // Borders
        'border-default': '#1A2245',
        'border-purple': '#2A1852',
        'border-success': '#0F2A1A',
        'border-error': '#3D1010',
        'navy-bg': '#141A30',
        'purple-bg': '#150E2C',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
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
        'enter-up': 'enter-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'glow-breathe': 'glow-breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'border-shimmer': 'border-shimmer 3s linear infinite',
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
        'enter-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-breathe': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'border-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(91, 110, 255, 0.35), 0 0 60px rgba(91, 110, 255, 0.12)',
        'glow-violet': '0 0 30px rgba(167, 139, 250, 0.3), 0 0 60px rgba(167, 139, 250, 0.1)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)',
        'glow-sm-blue': '0 0 16px rgba(91, 110, 255, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.04) inset',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.06) inset',
      },
    },
  },
  plugins: [],
};
