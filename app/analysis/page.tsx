'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function AnalysisPage() {
  // const [isConnected, setIsConnected] = React.useState(false)

  // const handleConnect = () => {
  //   setIsConnected(true)
  // }

  return (
    <div>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">LabNose</Link>
          <div className="space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          </div>
        </nav>
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">LabNose Analysis</h1>
        <Tabs defaultValue="main-device" className="space-y-4">
          <TabsList>
            <TabsTrigger value="main-device">Main Device</TabsTrigger>
            <TabsTrigger value="new-device">Connect New Device</TabsTrigger>
          </TabsList>
          <TabsContent value="main-device">
            <Card>
              <CardHeader>
                <CardTitle>Device Data</CardTitle>
                <CardDescription>View your device data here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Data visualization would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new-device">
            <Card>
              <CardHeader>
                <CardTitle>Connect a New Device</CardTitle>
                <CardDescription>Add a new LabNose device to your network</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Connect Device</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

