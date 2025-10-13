import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors for backward compatibility
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Background colors
        'bg-primary': "var(--color-background-primary)",
        'bg-secondary': "var(--color-background-secondary)",
        'bg-tertiary': "var(--color-background-tertiary)",
        'bg-inverse': "var(--color-background-inverse)",
        
        // Foreground colors
        'fg-primary': "var(--color-foreground-primary)",
        'fg-secondary': "var(--color-foreground-secondary)",
        'fg-tertiary': "var(--color-foreground-tertiary)",
        'fg-inverse': "var(--color-foreground-inverse)",
        
        // Border colors
        'border-primary': "var(--color-border-primary)",
        'border-secondary': "var(--color-border-secondary)",
        'border-focus': "var(--color-border-focus)",
        
        // Primary colors
        'primary-bg': "var(--color-primary-background)",
        'primary-fg': "var(--color-primary-foreground)",
        'primary-hover': "var(--color-primary-hover)",
        'primary-active': "var(--color-primary-active)",
        
        // Secondary colors
        'secondary-bg': "var(--color-secondary-background)",
        'secondary-fg': "var(--color-secondary-foreground)",
        'secondary-hover': "var(--color-secondary-hover)",
        'secondary-active': "var(--color-secondary-active)",
        
        // Semantic colors
        'success-bg': "var(--color-success-background)",
        'success-fg': "var(--color-success-foreground)",
        'success-border': "var(--color-success-border)",
        
        'warning-bg': "var(--color-warning-background)",
        'warning-fg': "var(--color-warning-foreground)",
        'warning-border': "var(--color-warning-border)",
        
        'error-bg': "var(--color-error-background)",
        'error-fg': "var(--color-error-foreground)",
        'error-border': "var(--color-error-border)",
        
        'info-bg': "var(--color-info-background)",
        'info-fg': "var(--color-info-foreground)",
        'info-border': "var(--color-info-border)",
      },
    },
  },
  plugins: [],
};
export default config;
