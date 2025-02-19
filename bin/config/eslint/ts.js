export default {
  rule: `
    {
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
    }
`
}
