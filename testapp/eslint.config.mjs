import pluginJs from '@eslint/js'
import globals from 'globals'
import ts from '@eslint/typescript'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import a11y from 'eslint-plugin-jsx-a11y'
export default [
  pluginJs.configs.recommended, {
    ignores: ['node_modules', '*.js'],
  }, {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts
    },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }, {
    files: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.mjs'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': a11y,
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
      'no-console': 'warn',
      'space-infix-ops': ['warn', {
        'int32Hint': false
      }],
      'space-before-blocks': 'error',
      'no-explicit-any': 'off',
      'semi': ['error', 'never'],
      'no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-indent': ['error', 2, {
        'indentLogicalExpressions': true
      }],
      'react/jsx-tag-spacing': ['error', {
        'beforeSelfClosing': 'always'
      }],
      'react/jsx-curly-spacing': ['error', 'never', {
        'allowMultiline': true
      }],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': ['error', {
        'maximum': 1,
        'when': 'multiline'
      }],
      'react/self-closing-comp': ['error', {
        'component': true,
        'html': true
      }],
      'indent': ['error', 2, {
        'ignoredNodes': ['ConditionalExpression', 'TSTypeParameterInstantiation'],
        'SwitchCase': 1,
      }],
      'eol-last': ['error', 'always'],
      'arrow-spacing': ['error', {
        'before': true,
        'after': true
      }],
      'no-trailing-spaces': ['error', {
        'skipBlankLines': false,
        'ignoreComments': false
      }],
    }
  }
]
