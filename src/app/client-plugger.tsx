'use client'

import { useEffect } from 'react'
import { useScroll } from '@/hooks/use-scroll'
import { useIsMountedState } from 'use-is-mounted-hook'

export const ClientPlugger = () => {
  const [, scroll] = useScroll()
  const isMounted = useIsMountedState()

  // Scrolls to the section defined in the current URL hash on initial page load.
  useEffect(() => {
    if (!isMounted) return
    const hash = window.location.hash
    if (hash) scroll(hash)
  }, [scroll, isMounted])

  return null
}
