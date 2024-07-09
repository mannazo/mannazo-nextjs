// next-ui Provider
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function UiProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
}
