import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          suffix: ['T', 'Type'],
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          prefix: ['T', 'K'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          suffix: ['Enum'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      'no-console': ['warn'],
      'no-var': 'error',
      'newline-before-return': 'error',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          ignoreUsingDeclarations: false,
          reportUsedIgnorePattern: false,
        },
      ],
    },
  },
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
