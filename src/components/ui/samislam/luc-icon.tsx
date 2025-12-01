import React from 'react'
import * as Icons from 'lucide-react'
import { ComponentType } from 'react'

export type LucideIcon = keyof typeof Icons

export interface LucIconProps {
  iconName: LucideIcon
  className?: string
}

export const LucIcon = (props: LucIconProps) => {
  const { iconName, className } = props
  const Icon = Icons[iconName] as ComponentType<{ className?: string }>
  return <Icon className={className} />
}
