'use client'

import { forwardRef, ForwardedRef, ReactNode } from 'react'
import { useImperativeHandle, useRef, PropsWithoutRef } from 'react'

export interface FormMethods {
  submit: () => void
}

export const createForm = <P,>(
  Cb: (props: PropsWithoutRef<P>, ref: ForwardedRef<HTMLFormElement>) => ReactNode
) => {
  const Component = (props: PropsWithoutRef<P>, ref: ForwardedRef<FormMethods>) => {
    const formRef = useRef<HTMLFormElement>(null)

    useImperativeHandle(ref, () => ({
      submit: () => {
        if (formRef.current) {
          formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
        }
      },
    }))

    return Cb(props, formRef)
  }

  return forwardRef<FormMethods, P>(Component)
}
