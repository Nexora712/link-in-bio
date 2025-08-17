"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Link as LinkIcon, Palette, Users, TrendingUp, TrendingDown } from "lucide-react"
import { useUserStats } from "@/hooks/use-dashboard-data"
import { cn } from "@/lib/utils"

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  isLoading,
}: {
  title: string
  value: string | number
  change: number
  icon: any
  color: string
  isLoading: boolean
}) => {
  const isPositive = change >= 0

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-24" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", color)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="flex items-center text-xs mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
          )}
          <span className={cn(isPositive ? "text-green-600" : "text-red-600")}>
            {isPositive ? "+" : ""}
            {change}
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricCards() {
  const { data: stats, isLoading, error, isError } = useUserStats()

  console.log('MetricCards render:', { stats, isLoading, error, isError })

  if (isError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-full text-center p-8">
          <p className="text-red-500 mb-2">Failed to load metrics. Please try again.</p>
          {error && (
            <p className="text-sm text-muted-foreground">
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          )}
        </div>
      </div>
    )
  }

  const metrics = [
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
      change: stats?.viewsChange || 0,
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Links Created",
      value: stats?.linksCreated || 0,
      change: stats?.linksChange || 0,
      icon: LinkIcon,
      color: "text-green-600",
    },
    {
      title: "Themes Used",
      value: stats?.themesUsed || 0,
      change: stats?.themesChange || 0,
      icon: Palette,
      color: "text-purple-600",
    },
    {
      title: "Profile Visits",
      value: stats?.profileVisits || 0,
      change: stats?.visitsChange || 0,
      icon: Users,
      color: "text-orange-600",
    },
  ] as const

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} isLoading={isLoading} />
      ))}
    </div>
  )
}