import React from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '../components/main-header'
import { Providers } from '@/components/provider/Providers'
import { siteConfig } from '@/config/site'
import clsx from 'clsx'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/header/Navbar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*이 빈 <head /> 태그는 호환성을 위해 존재함
      서드파티 라이브러리나 스크립트가 필요할 때 <head> 내용을 조작할 수 있게 함.
      Next.js의 App Router에서는 일반적으로 메타데이터 API를 사용하여 <head> 내용을 관리하지만,
      이 방식으로 기존의 <head> 조작 방식과의 호환성도 유지할 수 있음.*/}
      <head />
      <body
        className={clsx(
          'h-screen min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'system' }}>
          <Navbar />
          {/*<Header />*/}
          {children}
        </Providers>
      </body>
    </html>
  )
}
