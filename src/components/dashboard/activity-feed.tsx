import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

const activities = [
  {
    id: 1,
    action: "Created new link",
    details: "Added Instagram profile link",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "link",
  },
  {
    id: 2,
    action: "Changed theme",
    details: "Switched to Dark Modern theme",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "theme",
  },
  {
    id: 3,
    action: "Profile viewed",
    details: "Someone visited your profile",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    type: "view",
  },
  {
    id: 4,
    action: "Link clicked",
    details: "YouTube link was clicked 5 times",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "click",
  },
] as const

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {activity.type === "link"
                  ? "L"
                  : activity.type === "theme"
                  ? "T"
                  : activity.type === "view"
                  ? "V"
                  : "C"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}