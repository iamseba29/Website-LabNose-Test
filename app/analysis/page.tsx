'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer } from '@/components/ui/chart'
import Link from 'next/link'

export default function AnalysisPage() {
  const [isNewDeviceConnected, setIsNewDeviceConnected] = useState(false)
  const [sensorData, setSensorData] = useState([])
  const [currentReadings, setCurrentReadings] = useState({ voc: 0, temperature: 0, humidity: 0 })

  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => {
      const timestamp = new Date(Date.now() - (20 - i) * 5000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      return {
        time: timestamp,
        voc: parseFloat((Math.random() * 10).toFixed(2)),
        temperature: parseFloat((20 + Math.random() * 5).toFixed(1)),
        humidity: parseFloat((40 + Math.random() * 10).toFixed(1))
      }
    })
    setSensorData(initialData)
    setCurrentReadings(initialData[initialData.length - 1])

    const fetchVOC = async () => {
      try {
        const response = await fetch('/api/voc-data')
        const data = await response.json()

        if (Array.isArray(data)) {
          const formatted = data.map(entry => ({
            time: new Date(entry.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            voc: entry.voc,
            temperature: entry.temperature,
            humidity: entry.humidity
          }))

          setSensorData(formatted)
          setCurrentReadings(formatted[formatted.length - 1])
        }
      } catch (err) {
        console.error('Failed to fetch VOC data:', err)
      }
    }

    const interval = setInterval(fetchVOC, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleConnectNewDevice = () => {
    setIsNewDeviceConnected(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">LabNose</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/about"><Button variant="ghost">About</Button></Link></li>
              <li><Link href="/analysis"><Button variant="ghost">Analysis</Button></Link></li>
              <li><Link href="/profile"><Button variant="ghost">Profile</Button></Link></li>
              <li><Link href="/login"><Button variant="outline">Login</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">LabNose Analysis</h1>
        <Tabs defaultValue="main-device" className="space-y-4">
          <TabsList>
            <TabsTrigger value="main-device">Main Device</TabsTrigger>
            <TabsTrigger value="new-device">Connect New Device</TabsTrigger>
          </TabsList>

          <TabsContent value="main-device">
            <div className="space-y-4">
              <ChartContainer
                data={sensorData}
                config={{
                  voc: { label: "VOC (ppm)", color: "hsl(var(--chart-1))" },
                  temperature: { label: "Temperature (°C)", color: "hsl(var(--chart-2))" },
                  humidity: { label: "Humidity (%)", color: "hsl(var(--chart-3))" }
                }}
                className="w-full"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader><CardTitle>Current VOC Level</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currentReadings.voc.toFixed(2)} ppm</p>
                    <p className={`text-lg font-semibold ${
                      currentReadings.voc < 3 ? 'text-green-500' :
                      currentReadings.voc < 7 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {currentReadings.voc < 3 ? 'Good' : currentReadings.voc < 7 ? 'Moderate' : 'Poor'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Current Temperature</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currentReadings.temperature.toFixed(1)}°C</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Current Humidity</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{currentReadings.humidity.toFixed(1)}%</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="new-device">
            <Card>
              <CardHeader>
                <CardTitle>Connect a New Device</CardTitle>
                <CardDescription>Add a new LabNose device to your network</CardDescription>
              </CardHeader>
              <CardContent>
                {isNewDeviceConnected ? (
                  <div className="text-center">
                    <p className="text-xl mb-4">New device successfully connected!</p>
                    <Button onClick={() => setIsNewDeviceConnected(false)}>Connect Another Device</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>Follow these steps to connect a new LabNose device:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Power on your new LabNose device</li>
                      <li>Press and hold the connect button for 5 seconds</li>
                      <li>Wait for the LED to start blinking</li>
                      <li>Click the "Connect New Device" button below</li>
                    </ol>
                    <Button onClick={handleConnectNewDevice} className="w-full">Connect New Device</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} LabNose. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
