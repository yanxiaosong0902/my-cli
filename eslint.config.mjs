import pluginJs from '@eslint/js'
import globals from 'globals'
import n from 'eslint-plugin-n'

export default  [
  pluginJs.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.mjs'],
    plugins: {
      n: n
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
    },
    rules: {
      'no-underscore-dangle': 'off',
      'quotes': ['error', 'single'],
      'no-console': 'off',
      'space-infix-ops': ['warn', { 'int32Hint': false }],
      'space-before-blocks': 'error',
      'no-explicit-any': 'off',
      'semi': ['error', 'never'],
      'no-unused-vars': 'off',
      'indent': ['error', 2, {
        'ignoredNodes': ['ConditionalExpression', 'TSTypeParameterInstantiation'],
        'SwitchCase': 1,
      }],
      'eol-last': ['error', 'always'],
      'arrow-spacing': [
        'error',
        {
          'before': true,
          'after': true
        }
      ],
      'no-trailing-spaces': [
        'error',
        {
          'skipBlankLines': false,
          'ignoreComments': false
        }
      ],
    }
  }
]
