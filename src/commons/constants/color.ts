/**
 * Color Token System
 * 다크모드를 포함한 색상 토큰 정의
 */

// 기본 색상 팔레트
export const colorPalette = {
  // Primary Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Semantic Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
} as const;

// 다크모드 색상 토큰
export const colorTokens = {
  light: {
    // Background
    background: {
      primary: colorPalette.neutral[50],
      secondary: colorPalette.neutral[100],
      tertiary: colorPalette.neutral[200],
      inverse: colorPalette.neutral[900],
    },
    
    // Foreground
    foreground: {
      primary: colorPalette.neutral[900],
      secondary: colorPalette.neutral[700],
      tertiary: colorPalette.neutral[500],
      inverse: colorPalette.neutral[50],
    },
    
    // Border
    border: {
      primary: colorPalette.neutral[200],
      secondary: colorPalette.neutral[300],
      focus: colorPalette.primary[500],
    },
    
    // Primary
    primary: {
      background: colorPalette.primary[500],
      foreground: colorPalette.neutral[50],
      hover: colorPalette.primary[600],
      active: colorPalette.primary[700],
    },
    
    // Secondary
    secondary: {
      background: colorPalette.secondary[100],
      foreground: colorPalette.secondary[900],
      hover: colorPalette.secondary[200],
      active: colorPalette.secondary[300],
    },
    
    // Semantic
    success: {
      background: colorPalette.success[50],
      foreground: colorPalette.success[700],
      border: colorPalette.success[200],
    },
    
    warning: {
      background: colorPalette.warning[50],
      foreground: colorPalette.warning[700],
      border: colorPalette.warning[200],
    },
    
    error: {
      background: colorPalette.error[50],
      foreground: colorPalette.error[700],
      border: colorPalette.error[200],
    },
    
    info: {
      background: colorPalette.info[50],
      foreground: colorPalette.info[700],
      border: colorPalette.info[200],
    },
  },
  
  dark: {
    // Background
    background: {
      primary: colorPalette.neutral[950],
      secondary: colorPalette.neutral[900],
      tertiary: colorPalette.neutral[800],
      inverse: colorPalette.neutral[50],
    },
    
    // Foreground
    foreground: {
      primary: colorPalette.neutral[50],
      secondary: colorPalette.neutral[300],
      tertiary: colorPalette.neutral[500],
      inverse: colorPalette.neutral[900],
    },
    
    // Border
    border: {
      primary: colorPalette.neutral[800],
      secondary: colorPalette.neutral[700],
      focus: colorPalette.primary[400],
    },
    
    // Primary
    primary: {
      background: colorPalette.primary[600],
      foreground: colorPalette.neutral[50],
      hover: colorPalette.primary[500],
      active: colorPalette.primary[400],
    },
    
    // Secondary
    secondary: {
      background: colorPalette.secondary[800],
      foreground: colorPalette.secondary[100],
      hover: colorPalette.secondary[700],
      active: colorPalette.secondary[600],
    },
    
    // Semantic
    success: {
      background: colorPalette.success[900],
      foreground: colorPalette.success[100],
      border: colorPalette.success[700],
    },
    
    warning: {
      background: colorPalette.warning[900],
      foreground: colorPalette.warning[100],
      border: colorPalette.warning[700],
    },
    
    error: {
      background: colorPalette.error[900],
      foreground: colorPalette.error[100],
      border: colorPalette.error[700],
    },
    
    info: {
      background: colorPalette.info[900],
      foreground: colorPalette.info[100],
      border: colorPalette.info[700],
    },
  },
} as const;

// CSS 변수용 색상 토큰 (Tailwind와 호환)
export const cssColorTokens = {
  // Light mode
  '--color-background-primary': colorTokens.light.background.primary,
  '--color-background-secondary': colorTokens.light.background.secondary,
  '--color-background-tertiary': colorTokens.light.background.tertiary,
  '--color-background-inverse': colorTokens.light.background.inverse,
  
  '--color-foreground-primary': colorTokens.light.foreground.primary,
  '--color-foreground-secondary': colorTokens.light.foreground.secondary,
  '--color-foreground-tertiary': colorTokens.light.foreground.tertiary,
  '--color-foreground-inverse': colorTokens.light.foreground.inverse,
  
  '--color-border-primary': colorTokens.light.border.primary,
  '--color-border-secondary': colorTokens.light.border.secondary,
  '--color-border-focus': colorTokens.light.border.focus,
  
  '--color-primary-background': colorTokens.light.primary.background,
  '--color-primary-foreground': colorTokens.light.primary.foreground,
  '--color-primary-hover': colorTokens.light.primary.hover,
  '--color-primary-active': colorTokens.light.primary.active,
  
  '--color-secondary-background': colorTokens.light.secondary.background,
  '--color-secondary-foreground': colorTokens.light.secondary.foreground,
  '--color-secondary-hover': colorTokens.light.secondary.hover,
  '--color-secondary-active': colorTokens.light.secondary.active,
  
  '--color-success-background': colorTokens.light.success.background,
  '--color-success-foreground': colorTokens.light.success.foreground,
  '--color-success-border': colorTokens.light.success.border,
  
  '--color-warning-background': colorTokens.light.warning.background,
  '--color-warning-foreground': colorTokens.light.warning.foreground,
  '--color-warning-border': colorTokens.light.warning.border,
  
  '--color-error-background': colorTokens.light.error.background,
  '--color-error-foreground': colorTokens.light.error.foreground,
  '--color-error-border': colorTokens.light.error.border,
  
  '--color-info-background': colorTokens.light.info.background,
  '--color-info-foreground': colorTokens.light.info.foreground,
  '--color-info-border': colorTokens.light.info.border,
} as const;

// 다크모드 CSS 변수
export const darkModeCssColorTokens = {
  '--color-background-primary': colorTokens.dark.background.primary,
  '--color-background-secondary': colorTokens.dark.background.secondary,
  '--color-background-tertiary': colorTokens.dark.background.tertiary,
  '--color-background-inverse': colorTokens.dark.background.inverse,
  
  '--color-foreground-primary': colorTokens.dark.foreground.primary,
  '--color-foreground-secondary': colorTokens.dark.foreground.secondary,
  '--color-foreground-tertiary': colorTokens.dark.foreground.tertiary,
  '--color-foreground-inverse': colorTokens.dark.foreground.inverse,
  
  '--color-border-primary': colorTokens.dark.border.primary,
  '--color-border-secondary': colorTokens.dark.border.secondary,
  '--color-border-focus': colorTokens.dark.border.focus,
  
  '--color-primary-background': colorTokens.dark.primary.background,
  '--color-primary-foreground': colorTokens.dark.primary.foreground,
  '--color-primary-hover': colorTokens.dark.primary.hover,
  '--color-primary-active': colorTokens.dark.primary.active,
  
  '--color-secondary-background': colorTokens.dark.secondary.background,
  '--color-secondary-foreground': colorTokens.dark.secondary.foreground,
  '--color-secondary-hover': colorTokens.dark.secondary.hover,
  '--color-secondary-active': colorTokens.dark.secondary.active,
  
  '--color-success-background': colorTokens.dark.success.background,
  '--color-success-foreground': colorTokens.dark.success.foreground,
  '--color-success-border': colorTokens.dark.success.border,
  
  '--color-warning-background': colorTokens.dark.warning.background,
  '--color-warning-foreground': colorTokens.dark.warning.foreground,
  '--color-warning-border': colorTokens.dark.warning.border,
  
  '--color-error-background': colorTokens.dark.error.background,
  '--color-error-foreground': colorTokens.dark.error.foreground,
  '--color-error-border': colorTokens.dark.error.border,
  
  '--color-info-background': colorTokens.dark.info.background,
  '--color-info-foreground': colorTokens.dark.info.foreground,
  '--color-info-border': colorTokens.dark.info.border,
} as const;

// Tailwind CSS용 색상 토큰
export const tailwindColors = {
  // Background
  'background-primary': 'var(--color-background-primary)',
  'background-secondary': 'var(--color-background-secondary)',
  'background-tertiary': 'var(--color-background-tertiary)',
  'background-inverse': 'var(--color-background-inverse)',
  
  // Foreground
  'foreground-primary': 'var(--color-foreground-primary)',
  'foreground-secondary': 'var(--color-foreground-secondary)',
  'foreground-tertiary': 'var(--color-foreground-tertiary)',
  'foreground-inverse': 'var(--color-foreground-inverse)',
  
  // Border
  'border-primary': 'var(--color-border-primary)',
  'border-secondary': 'var(--color-border-secondary)',
  'border-focus': 'var(--color-border-focus)',
  
  // Primary
  'primary-background': 'var(--color-primary-background)',
  'primary-foreground': 'var(--color-primary-foreground)',
  'primary-hover': 'var(--color-primary-hover)',
  'primary-active': 'var(--color-primary-active)',
  
  // Secondary
  'secondary-background': 'var(--color-secondary-background)',
  'secondary-foreground': 'var(--color-secondary-foreground)',
  'secondary-hover': 'var(--color-secondary-hover)',
  'secondary-active': 'var(--color-secondary-active)',
  
  // Semantic
  'success-background': 'var(--color-success-background)',
  'success-foreground': 'var(--color-success-foreground)',
  'success-border': 'var(--color-success-border)',
  
  'warning-background': 'var(--color-warning-background)',
  'warning-foreground': 'var(--color-warning-foreground)',
  'warning-border': 'var(--color-warning-border)',
  
  'error-background': 'var(--color-error-background)',
  'error-foreground': 'var(--color-error-foreground)',
  'error-border': 'var(--color-error-border)',
  
  'info-background': 'var(--color-info-background)',
  'info-foreground': 'var(--color-info-foreground)',
  'info-border': 'var(--color-info-border)',
} as const;

// 타입 정의
export type ColorPalette = typeof colorPalette;
export type ColorTokens = typeof colorTokens;
export type CssColorTokens = typeof cssColorTokens;
export type TailwindColors = typeof tailwindColors;
