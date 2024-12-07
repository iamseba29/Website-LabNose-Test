'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/authentication/profile')
    }
  }, [isAuthenticated, isLoading, router])

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: pathname },
      authorizationParams: {
        prompt: "login",
      },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Login to LabNose</CardTitle>
          <CardDescription>Click the button below to log in or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full">
            Log In / Sign Up with Auth0
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}