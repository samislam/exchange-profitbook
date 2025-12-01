'use client'

import { T } from '@tolgee/react'
import { pageDefs } from '@/config/pages.config'

export const HomeDescription = () => {
  return (
    <div className="text-muted-foreground mt-4 max-w-2xl text-center text-lg leading-relaxed">
      <T
        keyName={pageDefs.home.description}
        params={{
          b: (children) => <b className="text-foreground font-semibold">{children}</b>,
        }}
      />
    </div>
  )
}
