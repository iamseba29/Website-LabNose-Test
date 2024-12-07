'use client'

import { useRouter } from 'next/navigation'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth0()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        {isAuthenticated ? children : null}
      </main>
    </div>
  )
}