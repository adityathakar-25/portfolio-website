/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Custom colour aliases mapped to CSS variables ──────────
      colors: {
        bg: {
          deep: "var(--bg-deep)",
          mid: "var(--bg-mid)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-2)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        // ── Stitch Material-colour palette ──────────────────────
        "surface":                    "#15121b",
        "surface-dim":                "#15121b",
        "surface-bright":             "#3c3742",
        "surface-container-lowest":   "#100d16",
        "surface-container-low":      "#1d1a24",
        "surface-container":          "#221e28",
        "surface-container-high":     "#2c2833",
        "surface-container-highest":  "#37333e",
        "surface-variant":            "#37333e",
        "surface-tint":               "#d2bbff",

        "on-surface":                 "#e8dfee",
        "on-surface-variant":         "#ccc3d8",
        "inverse-surface":            "#e8dfee",
        "inverse-on-surface":         "#332f39",

        "background":                 "#15121b",
        "on-background":              "#e8dfee",

        "outline":                    "#958da1",
        "outline-variant":            "#4a4455",

        "primary":                    "#d2bbff",
        "on-primary":                 "#3f008e",
        "primary-container":          "#7c3aed",
        "on-primary-container":       "#ede0ff",
        "inverse-primary":            "#732ee4",
        "primary-fixed":              "#eaddff",
        "primary-fixed-dim":          "#d2bbff",
        "on-primary-fixed":           "#25005a",
        "on-primary-fixed-variant":   "#5a00c6",

        "secondary":                  "#d2bbff",
        "on-secondary":               "#3b1e6f",
        "secondary-container":        "#523787",
        "on-secondary-container":     "#c3a6ff",
        "secondary-fixed":            "#eaddff",
        "secondary-fixed-dim":        "#d2bbff",
        "on-secondary-fixed":         "#25005a",
        "on-secondary-fixed-variant": "#523787",

        "tertiary":                   "#ffb784",
        "on-tertiary":                "#4f2500",
        "tertiary-container":         "#a15100",
        "on-tertiary-container":      "#ffe0cd",
        "tertiary-fixed":             "#ffdcc6",
        "tertiary-fixed-dim":         "#ffb784",
        "on-tertiary-fixed":          "#301400",
        "on-tertiary-fixed-variant":  "#713700",

        "error":                      "#ffb4ab",
        "on-error":                   "#690005",
        "error-container":            "#93000a",
        "on-error-container":         "#ffdad6",
      },

      // ── Font families ───────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        // Stitch typographic role aliases
        "display-xl":        ['"Plus Jakarta Sans"', 'sans-serif'],
        "display-lg":        ['"Plus Jakarta Sans"', 'sans-serif'],
        "display-xl-mobile": ['"Plus Jakarta Sans"', 'sans-serif'],
        "display-lg-mobile": ['"Plus Jakarta Sans"', 'sans-serif'],
        "headline-md":       ['"Plus Jakarta Sans"', 'sans-serif'],
        "body-lg":           ['Inter', 'sans-serif'],
        "label-sm":          ['Inter', 'sans-serif'],
      },

      // ── Font-size + line-height scale ───────────────────────────
      fontSize: {
        "display-xl":        ["112px", { lineHeight: "1.1",  letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-lg":        ["80px",  { lineHeight: "1.1",  letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-xl-mobile": ["56px",  { lineHeight: "1.1",  fontWeight: "800" }],
        "display-lg-mobile": ["40px",  { lineHeight: "1.1",  fontWeight: "800" }],
        "headline-md":       ["48px",  { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg":           ["18px",  { lineHeight: "1.8",  letterSpacing: "0.01em",  fontWeight: "400" }],
        "label-sm":          ["11px",  { lineHeight: "1",    letterSpacing: "0.3em",   fontWeight: "300" }],
      },

      // ── Spacing tokens from Stitch design system ─────────────────
      spacing: {
        "section-gap":    "160px",
        "container-max":  "1440px",
        "gutter":         "32px",
        "margin-desktop": "80px",
        "margin-mobile":  "24px",
      },

      // ── Border radii ─────────────────────────────────────────────
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },

      maxWidth: {
        "container-max": "1440px",
      },
    },
  },
  plugins: [],
}
