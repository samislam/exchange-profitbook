import * as Icons from '@mdi/js'
import { Icon } from '@mdi/react'
import React, { ComponentProps } from 'react'

/** You can find more icons at: https://pictogrammers.com/library/mdi/ */
export type MdiIcon = keyof typeof Icons

export interface MaterialIconProps extends Omit<ComponentProps<typeof Icon>, 'path'> {
  iconName: MdiIcon
}

const MaterialIcon = ({ iconName, ...props }: MaterialIconProps) => {
  return <Icon path={Icons[iconName]} {...props} />
}

export default MaterialIcon
