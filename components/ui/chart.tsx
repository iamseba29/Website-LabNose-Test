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
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<ChartTooltip />} />
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

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
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
