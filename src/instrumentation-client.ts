// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { clientEnv } from '@/server/client-env'

const ENABLE_SENTRY = clientEnv.NEXT_PUBLIC_ENABLE_SENTRY

if (ENABLE_SENTRY) {
  void import('@/lib/sentry/sentry.client.config')
}

export const onRouterTransitionStart = (
  ...args: Parameters<typeof Sentry.captureRouterTransitionStart>
) => {
  if (!ENABLE_SENTRY) return
  return Sentry.captureRouterTransitionStart(...args)
}
