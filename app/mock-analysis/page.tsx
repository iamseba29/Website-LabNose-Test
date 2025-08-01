'use client'

import { useEffect, useState } from 'react';
import VocChart from '@/components/ui/VocChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MockAnalysisPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fallback mock data when Pi is offline
    const generateMockReading = () => {
      const now = new Date();
      return {
        timestamp: now.toISOString(),
        voc: +(Math.random() * 10).toFixed(2),
        temperature: +(20 + Math.random() * 5).toFixed(1),
        humidity: +(40 + Math.random() * 20).toFixed(1)
      };
    };

    // Update every 5 seconds with new mock data
    const interval = setInterval(() => {
      setData((prev) => {
        const newEntry = generateMockReading();
        const next = [...prev, newEntry];
        return next.slice(-20); // Keep last 20 entries
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mock VOC Sensor Chart</h1>

      <VocChart data={data} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>VOC Level</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.at(-1)?.voc.toFixed(2)} ppm</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Temperature</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.at(-1)?.temperature.toFixed(1)}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Humidity</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.at(-1)?.humidity.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
