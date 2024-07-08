import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>{/* 헤더 내용 */}</header>
        <main>{children}</main>
        <footer>{/* 푸터 내용 */}</footer>
      </body>
    </html>
  )
}
