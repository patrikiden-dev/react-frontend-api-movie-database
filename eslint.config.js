import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    // Feature-Frist Architecture Configuration:
    // To automatically block deep imports and enforce your feature boundaries, you can use the built-in
    // no-restricted-imports rule in ESLint. This prevents developers from bypassing the index.ts barrel file.
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // Blocks absolute deep imports (e.g., '@/features/auth/components/X')
              group: ['@/features/*/*/**', 'src/features/*/*/**'],
              message: 'Deep imports into features are forbidden. Please import directly from the feature root (e.g., "@/features/auth").'
            },
            {
              // Blocks relative cross-feature deep imports (e.g., '../dashboard/components/X')
              group: ['**/features/*/*/**'],
              message: 'Do not reach into sibling features. Import from their root entry point.'
            }
          ]
        }
      ]
    },
  },
])
