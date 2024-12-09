'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default function Home() {
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
        <div>
          <h1 className="text-4xl font-bold mb-6">Welcome to LabNose</h1>
          <p className="text-xl mb-8">Your advanced laboratory management solution</p>
        </div>
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
          <Card className="w-full md:w-auto">
            <CardContent className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link href="/login">
                <Button className="w-full md:w-auto">
                  Login
                </Button>
              </Link>
              <Link href="/analysis">
                <Button variant="outline" className="w-full md:w-auto">
                  Analytics
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="w-full md:w-auto">
                  Profile
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="w-full md:w-auto">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Efficient Data Management"
            description="Streamline your lab data with our intuitive management system."
          />
          <FeatureCard
            title="Real-time Analytics"
            description="Get instant insights with our powerful analytics tools."
          />
          <FeatureCard
            title="Secure Collaboration"
            description="Collaborate safely with team members across different locations."
          />
        </div>
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} LabNose. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
