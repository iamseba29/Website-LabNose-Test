'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer } from '@/components/ui/chart'
import Link from 'next/link'

const dummyData = [
  { name: 'Jan', temperature: 20, humidity: 45 },
  { name: 'Feb', temperature: 22, humidity: 48 },
  { name: 'Mar', temperature: 25, humidity: 52 },
  { name: 'Apr', temperature: 28, humidity: 55 },
  { name: 'May', temperature: 30, humidity: 58 },
  { name: 'Jun', temperature: 32, humidity: 60 },
]

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--primary))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--secondary))",
  },
}

export default function AnalysisPage() {
  const [isConnected, setIsConnected] = React.useState(false)

  const handleConnect = () => {
    setIsConnected(true)
  }

  return (
    <div>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">LabNose</Link>
          <div className="space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/authentication/analysis" className="text-gray-600 hover:text-gray-900">Analysis</Link>
            <Link href="/authentication/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
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
            {isConnected ? (
              <ChartContainer data={dummyData} config={chartConfig} className="mt-4" />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Device Connected</CardTitle>
                  <CardDescription>Please connect a device to view data.</CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="new-device">
            <Card>
              <CardHeader>
                <CardTitle>Connect a New Device</CardTitle>
                <CardDescription>Add a new LabNose device to your network</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleConnect}>Connect Device</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}