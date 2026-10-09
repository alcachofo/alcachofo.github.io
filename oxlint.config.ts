import { defineConfig, nextjs, react, tailwindcss } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/styles/globals.css',
    },
  },
  overrides: [
    react(),
    nextjs(),
    tailwindcss({
      rules: {
        'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['not-prose', 'shiki', 'toaster'] }],
      },
    }),
  ],
})
