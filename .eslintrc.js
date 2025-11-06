module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // Allow console statements and debugger during development and library builds
    'no-console': 'off',
    'no-debugger': 'off',

    // You can keep additional rules here if needed
    // 'semi': ['error', 'always'],
    // 'quotes': ['error', 'single']
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
