'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout, isAuthenticated, isLoading } = useAuth0()
  const router = useRouter()

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    router.push('/')
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            LabNose
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/authentication/analysis" passHref>
                  <Button variant="ghost">Analysis</Button>
                </Link>
              </li>
              <li>
                <Link href="/authentication/profile" passHref>
                  <Button variant="ghost">Profile</Button>
                </Link>
              </li>
              <li>
                <Button variant="outline" onClick={handleLogout}>Log Out</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} LabNose. All rights reserved.
        </div>
      </footer>
    </div>
  )
}