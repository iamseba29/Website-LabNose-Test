'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function ProfilePage() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deviceId, setDeviceId] = React.useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save logic would go here
    console.log('Saving profile:', { name, email, deviceId })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            LabNose
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about">
                  <Button variant="ghost">About</Button>
                </Link>
              </li>
              <li>
                <Link href="/analysis">
                  <Button variant="ghost">Analysis</Button>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information and LabNose device settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
              <div>
                <Label htmlFor="deviceId">LabNose Device ID</Label>
                <Input
                  id="deviceId"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Enter your LabNose device ID"
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} LabNose. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

