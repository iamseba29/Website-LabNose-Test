'use client'

import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartProps {
  data: any[]
  config: {
    [key: string]: {
      label: string
      color: string
    }
  }
  className?: string
}

export function ChartContainer({ data, config, className }: ChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>LabNose Data Visualization</CardTitle>
        <CardDescription>Real-time sensor data from your LabNose device</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.entries(config).map(([key, value]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={value.color}
                name={value.label}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ChartTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-2">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function ChartTooltipContent({ children }: { children: React.ReactNode }) {
  return <div className="bg-background border rounded-lg shadow-lg p-2">{children}</div>
}