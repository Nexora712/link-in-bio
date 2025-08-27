"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

type ThemeDatum = {
  name: string
  value: number
  color: string
}

const data: ThemeDatum[] = [
  { name: "Modern Dark", value: 35, color: "#8b5cf6" },
  { name: "Classic Light", value: 25, color: "#06b6d4" },
  { name: "Minimal", value: 20, color: "#10b981" },
  { name: "Gradient", value: 15, color: "#f59e0b" },
  { name: "Glassmorphism", value: 5, color: "#ef4444" },
]

export function ThemeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}