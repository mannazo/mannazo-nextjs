import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/main-header'
import { UiProvider } from './providers/ui-provider'
import SessionProvider from './providers/session-provider'

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
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          <UiProvider>{children}</UiProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
