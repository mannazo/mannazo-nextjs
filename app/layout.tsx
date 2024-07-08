import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainHeader from '@/components/main-header/main-header'
import { UiProvider } from './providers/ui-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MANNAZU',
  description: 'Travel to make Friend! 😁',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  )
}
