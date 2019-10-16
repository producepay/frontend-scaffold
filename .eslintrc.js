module.exports = {
  extends: ['react-app'],
  rules: {
    'prefer-const': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'indent': ['error', 2, {
      SwitchCase: 1,
      MemberExpression: 'off',
      flatTernaryExpressions: true,
    }],
    'quote-props': ['error', 'consistent-as-needed'],
    'object-curly-spacing': ['warn', 'always'],
    'keyword-spacing': ['warn', { before: true, after: true }],
    'max-len': ['warn', {
      code: 120,
      tabWidth: 2,
      ignoreTrailingComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
  },
};
