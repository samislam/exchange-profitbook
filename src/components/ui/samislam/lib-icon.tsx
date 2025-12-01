import React from 'react'
import { LucIcon, LucideIcon } from './luc-icon'
import MaterialIcon, { MdiIcon } from './material-icon'

export type IconLibrariy = 'mdi' | 'lucide'
export type LibraryIcon = `mdi:${MdiIcon}` | `lucide:${LucideIcon}`

export interface LibIconProps {
  icon: LibraryIcon
  className?: string
}

export const LibIcon = (props: LibIconProps) => {
  const { icon: Icon, className } = props
  const library = Icon.split(':')[0] as IconLibrariy
  const iconName = Icon.split(':')[1]
  switch (library) {
    case 'mdi':
      return <MaterialIcon iconName={iconName as MdiIcon} className={className} />
    case 'lucide':
      return <LucIcon iconName={iconName as LucideIcon} className={className} />
  }
}
