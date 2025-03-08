import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import AdminNavBar from './components/AdminNavBar'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rewards App',
  description: 'Earn stars and unlock rewards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <AdminNavBar />
        </Providers>
      </body>
    </html>
  )
} 