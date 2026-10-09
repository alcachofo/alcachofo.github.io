import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['src/components/ui/*.{ts,tsx}'],
  entry: ['content-collections.ts', 'scripts/covers.mjs'],
}

export default config
