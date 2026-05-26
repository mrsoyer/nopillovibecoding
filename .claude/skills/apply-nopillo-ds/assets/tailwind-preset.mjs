/**
 * Tailwind preset — Design System Nopillo
 *
 * Importer dans tailwind.config.mjs :
 *   import nopilloPreset from './tailwind.nopillo.preset.mjs';
 *   export default { presets: [nopilloPreset], content: [...] };
 *
 * Source : docs/design-system-extraction/nopillo-extracted/
 * Date : 2026-05-26
 */

export default {
  theme: {
    extend: {
      colors: {
        // Brand
        black: '#09090B',         // chaleureux, jamais #000
        'brand-indigo': '#4033DB', // alias --indigo-600
        'brand-soft': '#DEDAFF',   // alias --indigo-100
        'brand-mint': '#0CC28C',   // alias --secondary-600

        // Indigo scale
        indigo: {
          5:   '#FAFAFE',
          10:  '#EEECFF',
          50:  '#F6F5FD',
          100: '#DEDAFF',
          200: '#BDB5FF',
          300: '#9C90FF',
          400: '#8275FF',
          500: '#5747FF',
          600: '#4033DB',
          700: '#2D23B7',
          800: '#1E1693',
          900: '#0F0167',
        },

        // Graycool (neutres avec sous-ton bleu)
        graycool: {
          25:  '#FCFCFD',
          50:  '#F9F9FB',
          100: '#EFF1F5',
          200: '#DCDFEA',
          300: '#B9C0D4',
          400: '#7D89B0',
          500: '#5D6B98',
          600: '#4A5578',
          700: '#404968',
          800: '#30374F',
        },

        // Secondary (vert mint)
        secondary: {
          10:  '#EEFCF0',
          50:  '#E4FFEA',
          100: '#CEFDD8',
          200: '#93FCBB',
          400: '#48ED9B',
          600: '#0CC28C',
        },

        // Orange (headband annonces)
        orange: {
          50:  '#FFFBF5',
          100: '#FFF3DF',
          200: '#FFE9C9',
          600: '#FFA057',
        },

        // Danger
        danger: {
          50:  '#FDEAED',
          500: '#DB3352',
        },
      },

      fontFamily: {
        display: ['futura-pt', 'Futura', 'Avenir Next', 'Trebuchet MS', 'sans-serif'],
        body:    ['"Futura PT"', 'futura-pt', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },

      fontSize: {
        xs:           ['12px', { lineHeight: '16px' }],
        sm:           ['14px', { lineHeight: '20px' }],
        base:         ['16px', { lineHeight: '24px' }],     // body default
        lg:           ['18px', { lineHeight: '28px' }],     // boutons
        xl:           ['20px', { lineHeight: '32px' }],     // lead
        '2xl':        ['24px', { lineHeight: '32px' }],
        '3xl':        ['28px', { lineHeight: '32px' }],
        '4xl':        ['40px', { lineHeight: '48px' }],
        'display-sm': ['48px', { lineHeight: '56px' }],
        'display-md': ['56px', { lineHeight: '64px' }],     // H2
        'display-lg': ['60px', { lineHeight: '72px' }],     // H1
        'display-xl': ['68px', { lineHeight: '76px' }],
      },

      fontWeight: {
        regular:  '400',
        medium:   '500',
        demi:     '600',
        bold:     '700',
      },

      spacing: {
        // Échelle Nopillo (multiples de 4)
        '0.5': '2px',
        1:    '4px',
        2:    '8px',
        3:    '12px',
        4:    '16px',     // grid gap default
        6:    '24px',     // card padding
        8:    '32px',
        12:   '48px',
        16:   '64px',
        20:   '80px',     // section padding
        24:   '96px',
        32:   '128px',
      },

      borderRadius: {
        xs:    '4px',
        sm:    '6px',
        md:    '8px',
        lg:    '16px',    // cards (signature)
        xl:    '24px',
        '2xl': '32px',
        pill:  '999px',   // boutons (signature)
        full:  '9999px',
      },

      boxShadow: {
        card:     '0 1px 10px rgba(0, 0, 0, 0.06)',  // signature
        elevated: '0 1px 16px rgba(0, 0, 0, 0.08)',
        subtle:   '0 1px 10px rgba(0, 0, 0, 0.05)',
      },

      maxWidth: {
        container:        '1120px',  // container regular
        'container-wide': '1408px',  // navbar
      },

      transitionTimingFunction: {
        nopillo: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
};
