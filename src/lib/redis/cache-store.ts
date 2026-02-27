import ms from 'ms'
import { withCache } from '@/lib/redis/with-cache'
import type { ApiResult } from '@/lib/query-helpers/api-call'
import { getMainApiClient_server } from '@/lib/main-api-sdk/server-client'
import type { WhoAmIResponse } from '@/lib/main-api-sdk/modules/auth/auth-responses'
import { exchangeService } from '@/app/api/[[...slugs]]/exchange/exchange.service'
import type { ExchangeRateMap } from '@/app/api/[[...slugs]]/exchange/exchange.types'

export const whoami_cache = withCache<ApiResult<WhoAmIResponse>>({
  cacheTtlMs: ms('30s'),
  cachePrefix: 'whoami',
  shouldCache: (result) => result.success,
  callback: async () => {
    const serverClient = await getMainApiClient_server()
    return await serverClient.auth.whoami()
  },
})

export const exchange_cache = withCache<ExchangeRateMap>({
  cacheTtlMs: ms('2h'),
  cachePrefix: 'exchange',
  shouldCache: () => true,
  callback: async () => {
    return await exchangeService.fetchExchangeRatesFromSource()
  },
})
