// app/layout.tsx
import { Metadata } from 'next'
import NewsHeader from './header'
import NewsFooter from './footer'

export const metadata: Metadata = {
  title: 'News App',
  description: 'A news app using Next.js and NewsAPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NewsHeader />
        {children}
        <NewsFooter/>
      </body>
    </html>
  )
}
