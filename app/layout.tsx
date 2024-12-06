import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LabNose',
  description: 'Advanced laboratory management solution',
}

function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">LabNose</Link>
        <div className="space-x-4">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}