import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About LabNose</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            LabNose is dedicated to revolutionizing laboratory management through advanced environmental monitoring and data analysis. Our goal is to empower researchers and lab managers with real-time insights and powerful tools to optimize their work environments.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time environmental monitoring (temperature, humidity, and more)</li>
            <li>Intuitive data visualization and analytics</li>
            <li>Device management and connectivity</li>
            <li>User-friendly profile management</li>
            <li>Secure authentication and data protection</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Future Developments</h2>
          <p className="text-lg mb-4">
            We're constantly working to improve LabNose. Our roadmap includes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced predictive analytics for lab conditions</li>
            <li>Integration with popular lab equipment and LIMS</li>
            <li>Customizable alerts and notifications</li>
            <li>Comprehensive reporting and data export options</li>
            <li>Mobile app for on-the-go monitoring</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-lg mb-4">
            Ready to transform your lab management experience? Sign up for LabNose today and take the first step towards a smarter, more efficient laboratory.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} LabNose. All rights reserved.
        </div>
      </footer>
    </div>
  )
}