/**
 * Food Forecast — Design Tokens
 *
 * Calm, trustworthy, empowering. Reference points: Linear, Stripe, Cowrywise.
 * Never alarming, even when communicating rising prices.
 */

export const colors = {
  // Primary — stable / positive (calm Nigerian-leaning green, not lime, not pine)
  primary: {
    50: '#EEF7F2',
    100: '#D6ECDF',
    200: '#AED9BF',
    300: '#7FBF9B',
    400: '#54A57C',
    500: '#2F8A60', // brand
    600: '#246E4C',
    700: '#1C5740',
    800: '#164532',
    900: '#0F3324',
  },

  // Rising prices — warm red-orange (terracotta, not stop-sign red)
  rising: {
    50: '#FBF1EC',
    100: '#F5DDD0',
    200: '#EBBBA1',
    300: '#DF9472',
    400: '#D17249',
    500: '#C25A33', // headline rising tone
    600: '#A24727',
    700: '#80371F',
    800: '#5F2918',
    900: '#3F1B10',
  },

  // Falling prices — muted blue-gray (informational, not "loss" red)
  falling: {
    50: '#F0F3F6',
    100: '#DBE2E9',
    200: '#B6C5D1',
    300: '#8DA5B6',
    400: '#67869C',
    500: '#4A6A82', // headline falling tone
    600: '#3A5468',
    700: '#2D4252',
    800: '#22323F',
    900: '#16212A',
  },

  // Neutrals — surfaces, borders, text
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAF9',  // page background
    100: '#F4F4F2', // subtle surface
    200: '#E7E7E4', // borders
    300: '#D2D2CE',
    400: '#A8A8A3',
    500: '#7A7A75', // muted text
    600: '#575753',
    700: '#3D3D3A', // body text
    800: '#252523',
    900: '#141413', // headings
  },
} as const;

/**
 * Semantic color aliases. Always prefer these in components over raw scale values.
 */
export const semanticColors = {
  background: colors.neutral[50],
  surface: colors.neutral[0],
  surfaceMuted: colors.neutral[100],
  border: colors.neutral[200],
  borderStrong: colors.neutral[300],
  textPrimary: colors.neutral[900],
  textBody: colors.neutral[700],
  textMuted: colors.neutral[500],
  textOnBrand: colors.neutral[0],
  brand: colors.primary[500],
  brandHover: colors.primary[600],
  stable: colors.primary[500],
  rising: colors.rising[500],
  falling: colors.falling[500],
} as const;

/**
 * Typography — Inter, humanist sans. Numbers should feel hero.
 * Sizes are paired with appropriate line-heights and tracking.
 */
export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    // Use tabular numerals for prices so digits don't shift width.
    numeric:
      '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  // Pairs: [fontSize, { lineHeight, letterSpacing, fontWeight }]
  scale: {
    display: {
      fontSize: '3rem',      // 48px — hero price
      lineHeight: '1.05',
      letterSpacing: '-0.02em',
      fontWeight: '600',
    },
    h1: {
      fontSize: '2rem',      // 32px
      lineHeight: '1.15',
      letterSpacing: '-0.018em',
      fontWeight: '600',
    },
    h2: {
      fontSize: '1.5rem',    // 24px
      lineHeight: '1.25',
      letterSpacing: '-0.014em',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.25rem',   // 20px
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    bodyLg: {
      fontSize: '1.0625rem', // 17px
      lineHeight: '1.55',
      letterSpacing: '0',
      fontWeight: '400',
    },
    body: {
      fontSize: '0.9375rem', // 15px
      lineHeight: '1.55',
      letterSpacing: '0',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.8125rem', // 13px
      lineHeight: '1.45',
      letterSpacing: '0.005em',
      fontWeight: '500',
    },
    micro: {
      fontSize: '0.6875rem', // 11px — labels, axis ticks
      lineHeight: '1.4',
      letterSpacing: '0.04em',
      fontWeight: '500',
    },
  },
} as const;

/**
 * Spacing — 4px base. Generous whitespace by default.
 */
export const spacing = {
  0: '0',
  1: '0.25rem', // 4
  2: '0.5rem',  // 8
  3: '0.75rem', // 12
  4: '1rem',    // 16
  5: '1.25rem', // 20
  6: '1.5rem',  // 24
  8: '2rem',    // 32
  10: '2.5rem', // 40
  12: '3rem',   // 48
  16: '4rem',   // 64
  20: '5rem',   // 80
  24: '6rem',   // 96
} as const;

/**
 * Border radius — generous rounding. 12–16px is the default surface feel.
 */
export const radius = {
  none: '0',
  sm: '0.375rem',  // 6  — pills, tags
  md: '0.625rem',  // 10 — buttons
  lg: '0.875rem',  // 14 — cards (default)
  xl: '1rem',      // 16 — feature cards
  '2xl': '1.25rem',// 20 — modals, large surfaces
  full: '9999px',
} as const;

/**
 * Shadows — soft, layered, low-contrast. Never harsh.
 * Two-stop shadows give depth without a "drop shadow" feel.
 */
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(20, 20, 19, 0.04)',
  sm: '0 1px 2px 0 rgba(20, 20, 19, 0.04), 0 1px 3px 0 rgba(20, 20, 19, 0.04)',
  md: '0 2px 4px -1px rgba(20, 20, 19, 0.04), 0 4px 12px -2px rgba(20, 20, 19, 0.06)',
  lg: '0 4px 8px -2px rgba(20, 20, 19, 0.05), 0 12px 24px -6px rgba(20, 20, 19, 0.08)',
  xl: '0 8px 16px -4px rgba(20, 20, 19, 0.06), 0 24px 48px -12px rgba(20, 20, 19, 0.10)',
  // Used for inputs / focus rings — never glow.
  focus: '0 0 0 3px rgba(47, 138, 96, 0.20)',
} as const;

/**
 * Mobile-first breakpoints. Baseline is 360px (low-end phone).
 */
export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

/**
 * Motion — short, calm, never bouncy.
 */
export const motion = {
  duration: {
    fast: '120ms',
    base: '180ms',
    slow: '280ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1.2)',
  },
} as const;

export const tokens = {
  colors,
  semanticColors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  motion,
} as const;

export type DesignTokens = typeof tokens;
