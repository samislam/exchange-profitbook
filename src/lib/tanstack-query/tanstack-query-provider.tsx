'use client'

import React, { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { tanstackQueryClient } from './tanstack-query-client'

export const TanstackQueryProvider = (props: PropsWithChildren) => {
  const { children } = props
  return <QueryClientProvider client={tanstackQueryClient}>{children}</QueryClientProvider>
}
