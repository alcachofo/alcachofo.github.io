import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import * as z from 'zod'

export const env = createEnv({
  extends: [vercel()],

  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    CI: z
      .enum(['true', 'false', '1', '0'])
      .default('false')
      .transform((v) => v === 'true' || v === '1'),
  },

  // A static GitHub Pages build has no server, so no server secrets are needed at all.
  server: {},

  client: {
    // Required
    // Falls back to the live address, so a plain `bun run build` works with no .env file.
    NEXT_PUBLIC_SITE_URL: z.url().default('https://alcachofo.github.io'),
    // Optional
    NEXT_PUBLIC_VERCEL_ENV: z.string().optional(),
    NEXT_PUBLIC_VERCEL_BRANCH_URL: z.string().optional(),

    NEXT_PUBLIC_UMAMI_URL: z.url().optional(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.uuid().optional(),
  },

  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,

    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_BRANCH_URL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,

    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },

  emptyStringAsUndefined: true,
})
