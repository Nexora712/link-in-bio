"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Eye, Clock } from "lucide-react"
import { useLinkAnalytics } from "@/hooks/use-dashboard-data"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

export function RecentLinks() {
  const { data: links, isLoading, error } = useLinkAnalytics()

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <p className="text-red-500">Failed to load links. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))
          ) : links?.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No links created yet. Start building your link-in-bio!
            </div>
          ) : (
            links?.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 border rounded-lg transition-all duration-200 hover:shadow-md hover:border-primary/50"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{link.title}</h4>
                  <p className="text-sm text-muted-foreground truncate max-w-md">{link.url}</p>
                  {link.lastClicked && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Last clicked {formatDistanceToNow(link.lastClicked, { addSuffix: true })}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{link.clicks.toLocaleString()}</span>
                  </div>
                  <Badge
                    variant={link.status === "active" ? "default" : "secondary"}
                    className="transition-all duration-200 capitalize"
                  >
                    {link.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}