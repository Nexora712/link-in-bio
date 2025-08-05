"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useUserStats } from "@/hooks/use-dashboard-data"
import { Skeleton } from "@/components/ui/skeleton"

type ThemeDatum = {
  name: string
  value: number
  color: string
}

export function ThemeChart() {
  const { data: stats, isLoading, error } = useUserStats()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Theme Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load theme usage data.</p>
        </CardContent>
      </Card>
    )
  }

  const data: ThemeDatum[] = [
    { name: "Modern Dark", value: stats?.themesUsed || 0, color: "#8b5cf6" },
    { name: "Classic Light", value: 25, color: "#06b6d4" },
    { name: "Minimal", value: 20, color: "#10b981" },
    { name: "Gradient", value: 15, color: "#f59e0b" },
    { name: "Glassmorphism", value: 5, color: "#ef4444" },
  ]

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
