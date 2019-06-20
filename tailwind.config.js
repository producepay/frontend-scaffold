let defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  theme: {
    colors: {
      primary: '#5CB65B',
      ...defaultConfig.theme.colors,
    },
    spacing: {
      ...defaultConfig.theme.spacing,
      '100': '25rem',
    },
    fontSize: {
      ...defaultConfig.theme.fontSize,
      'xxs-xs': '.6875rem', // 11px
      '6xl': '4rem',
    },
    lineHeight: {
      ...defaultConfig.theme.lineHeight,
      base: '1.15',
    },
  },
  variants: {
    ...defaultConfig.variants,
  },
  corePlugins: {},
  plugins: [],
};
