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
        'deep-void': '#04060D',
        'space-black': '#080C18',
        'nebula-navy': '#101830',
        'cosmic-purple': '#2E2E8E',
        'orbit-blue': '#3D7AFF',
        'nova-violet': '#9B7FFF',
        'cyan-pulse': '#00E5FF',
        'starlight': '#DDE8FF',
        // Semantic
        'success': '#00FF94',
        'alert-red': '#FF3E6C',
        'amber': '#FFB020',
        // Text shades
        'text-secondary': '#6A7A9C',
        'text-tertiary': '#4A5575',
        'text-quaternary': '#2E3858',
        'text-faint': '#1E2540',
        // Card surfaces
        'card-bg': '#080C1C',
        'notification-bg': '#060918',
        'dark-alert-bg': '#07061A',
        'success-alert-bg': '#04120A',
        'warning-alert-bg': '#120A00',
        'error-alert-bg': '#120408',
        // Borders
        'border-default': '#141C3A',
        'border-purple': '#20104A',
        'border-success': '#0A2016',
        'border-error': '#300810',
        'navy-bg': '#0E1428',
        'purple-bg': '#0C0820',
      },
      fontFamily: {
        // Plus Jakarta Sans: modern geometric, clean and highly readable
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        // Playfair Display: editorial serif for headings
        serif: ['Playfair Display', 'Georgia', 'serif'],
        // JetBrains Mono: excellent legibility for data/code readouts
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
        'enter-up': 'enter-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'glow-breathe': 'glow-breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'scan-pass': 'scan-pass 9s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.65' },
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
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-breathe': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'scan-pass': {
          '0%':   { top: '-4px', opacity: '0' },
          '1%':   { opacity: '1' },
          '97%':  { opacity: '0.4' },
          '99%':  { top: '100vh', opacity: '0' },
          '100%': { top: '-4px', opacity: '0' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue':   '0 0 30px rgba(61, 122, 255, 0.4), 0 0 80px rgba(61, 122, 255, 0.12)',
        'glow-violet': '0 0 30px rgba(155, 127, 255, 0.3), 0 0 80px rgba(155, 127, 255, 0.08)',
        'glow-cyan':   '0 0 30px rgba(0, 229, 255, 0.4), 0 0 80px rgba(0, 229, 255, 0.12)',
        'glow-sm-blue':'0 0 16px rgba(61, 122, 255, 0.5)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.04) inset',
        'card-hover':  '0 8px 40px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.06) inset',
      },
    },
  },
  plugins: [],
};
