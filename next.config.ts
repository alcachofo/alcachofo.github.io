import type { NextConfig } from 'next'

import { withContentCollections } from '@content-collections/next'
import createNextIntlPlugin from 'next-intl/plugin'

import { env } from '@/env'

import { IS_PRODUCTION } from './src/constants/common'

const withNextIntl = createNextIntlPlugin()

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  {
    protocol: 'https',
    hostname: 'avatars.githubusercontent.com',
  },
  {
    protocol: 'https',
    hostname: 'github.com',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
  {
    protocol: 'https',
    hostname: '**.googleusercontent.com',
  },
]

if (!IS_PRODUCTION) {
  remotePatterns.push({
    protocol: 'http',
    hostname: 'localhost',
  })
}

const config: NextConfig = {
  // Static export for GitHub Pages (alcachofo.github.io, served at root).
  output: 'export',

  reactCompiler: true,

  productionBrowserSourceMaps: true,

  typescript: {
    ignoreBuildErrors: env.CI,
  },

  images: {
    // Static export cannot run the image optimizer.
    unoptimized: true,
    qualities: [75, 100],
    remotePatterns,
  },

  skipTrailingSlashRedirect: true,
}

export default withContentCollections(withNextIntl(config))
