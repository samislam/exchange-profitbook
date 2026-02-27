import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'
import createNextIntlPlugin from 'next-intl/plugin'
import { sentryConfig } from '@/lib/sentry/sentry._next_.config'

const IMAGE_OPTIMIZATION = process.env.IMAGE_OPTIMIZATION
const ENABLE_SENTRY = process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true'

const withNextIntl = createNextIntlPlugin('./src/lib/next-intl/i18n-request.ts')

const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: IMAGE_OPTIMIZATION === 'no' ? false : true,
    remotePatterns: [],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
} satisfies NextConfig

const nextIntlConfig = withNextIntl(nextConfig)

export default ENABLE_SENTRY ? withSentryConfig(nextIntlConfig, sentryConfig) : nextIntlConfig
