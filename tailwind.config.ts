import type { Config } from 'tailwindcss'

/* ============================================================
   PHASE 1 — DESIGN TOKENS
   Brutalist Editorial. Three colours. Two typefaces. No more.
   ============================================================ */

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    /* Strict palette — the whole system is void / paper / acid. */
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      void: '#000000',
      paper: '#FFFFFF',
      acid: '#DFFF00',
    },
    fontFamily: {
      /* Display — Fraunces, variable 100..900, optical size maxed for editorial weight */
      display: ['Fraunces', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
      /* UI, metadata, labels — Inter */
      ui: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
    extend: {
      letterSpacing: {
        /* Display tracking is aggressively tight; UI tracking is aggressively wide. */
        display: '-0.08em',
        'display-sm': '-0.05em',
        meta: '0.3em',
        'meta-tight': '0.2em',
      },
      fontSize: {
        /* Fluid editorial scale — every major size is clamp()-driven */
        meta: ['0.625rem', { lineHeight: '1', letterSpacing: '0.3em' }],   /* 10px */
        'meta-lg': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.3em' }], /* 11px */
        'fluid-hero': ['clamp(3.25rem, 13vw, 12rem)', { lineHeight: '0.84' }],
        'fluid-display': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.88' }],
        'fluid-title': ['clamp(2rem, 5.5vw, 4.5rem)', { lineHeight: '0.94' }],
        'fluid-sub': ['clamp(1.5rem, 3.2vw, 2.5rem)', { lineHeight: '1.08' }],
        'fluid-lead': ['clamp(1.125rem, 2.1vw, 1.75rem)', { lineHeight: '1.45' }],
      },
      spacing: {
        grid: '40px',          /* the 40px background cell — the module of the whole layout */
        bar: '70px',           /* sticky status bar height */
        nav: '64px',
        section: 'clamp(5rem, 12vw, 11rem)',
      },
      maxWidth: {
        editorial: '1680px',
        measure: '68ch',
      },
      borderColor: {
        hair: 'rgba(255,255,255,0.14)',
        'hair-soft': 'rgba(255,255,255,0.08)',
      },
      transitionTimingFunction: {
        /* The single easing curve used everywhere */
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        reveal: '1400ms',
      },
      screens: {
        xs: '420px',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.82)' },
        },
        chevron: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        barGrow: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        'pulse-dot': 'pulseDot 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        chevron: 'chevron 2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'bar-grow': 'barGrow 1.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
