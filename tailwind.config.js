export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        paper: '#FFFFFF',
        ink: { DEFAULT: '#111111', soft: '#2B2B2B' },
        muted: '#666666',
        line: '#E8E8E8',
        // Accent: orange. DEFAULT fills buttons (use black text on it), dark is for orange text/icons on white.
        forest: { DEFAULT: '#F76707', dark: '#C2410C', soft: '#FFF3EB' },
        // Neutral surface: light grey for secondary buttons and quiet section backgrounds.
        sand: { DEFAULT: '#F3F3F3', dark: '#E8E8E8' },
        danger: { DEFAULT: '#B42318', soft: '#FDECEA' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['11px', '16px'],
        sm: ['13px', '20px'],
        base: ['14px', '22px'],
        lg: ['15px', '24px'],
        xl: ['17px', '26px'],
        '2xl': ['20px', '28px'],
        '3xl': ['24px', '30px'],
        '4xl': ['28px', '34px'],
        '5xl': ['34px', '40px'],
        '6xl': ['42px', '46px'],
        '7xl': ['50px', '54px'],
      },
      borderRadius: {
        xl: '10px',
        '2xl': '12px',
        '3xl': '16px',
      },
      maxWidth: {
        // Full-width page shell: lets content span nearly the whole viewport
        // instead of stopping at max-w-6xl (72rem), which left large side gaps.
        page: '94rem',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};
