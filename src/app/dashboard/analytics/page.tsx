import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeChart } from "@/components/dashboard/theme-chart"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your link-in-bio performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThemeChart />
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Direct</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Social Media</span>
                <span className="font-semibold">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Search</span>
                <span className="font-semibold">23%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}