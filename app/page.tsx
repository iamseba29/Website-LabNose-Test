'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default function Home() {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">Welcome to LabNose</h1>
          <p className="text-xl mb-8">Your advanced laboratory management solution</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row"
        >
          <Button onClick={handleLogin} className="w-full md:w-auto">
            Login
          </Button>
          <Button variant="outline" className="w-full md:w-auto" onClick={() => router.push('/about')}>
            Learn More
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
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
        </motion.div>
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} LabNose. All rights reserved.
        </div>
      </footer>
    </div>
  )
}