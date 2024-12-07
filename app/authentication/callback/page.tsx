'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth0 } from '@auth0/auth0-react'

export default function CallbackPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/authentication/profile')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return null
}