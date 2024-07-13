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
