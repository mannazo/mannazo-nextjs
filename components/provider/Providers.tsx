'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface ProvidersProps {
  children: React.ReactNode
  // 버전 불일치 문제?
  // themeProps?: ThemeProviderProps
  themeProps?: Partial<ThemeProviderProps>
}

const queryClient = new QueryClient()

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </QueryClientProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}
