import * as Sentry from '@sentry/nextjs'
import { clientEnv } from '@/server/client-env'

const ENABLE_SENTRY = clientEnv.NEXT_PUBLIC_ENABLE_SENTRY

export async function register() {
  if (!ENABLE_SENTRY) return

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./lib/sentry/sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./lib/sentry/sentry.edge.config')
  }
}

export const onRequestError = (...args: Parameters<typeof Sentry.captureRequestError>) => {
  if (!ENABLE_SENTRY) return
  return Sentry.captureRequestError(...args)
}
