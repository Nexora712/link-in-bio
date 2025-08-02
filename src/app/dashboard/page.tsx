"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ThemeChart } from "@/components/dashboard/theme-chart";
import { RecentLinks } from "@/components/dashboard/recent-links";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your link-in-bio performance.
          </p>
        </div>

        <MetricCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ThemeChart />
          </div>
          <ActivityFeed />
        </div>

        <RecentLinks />
      </div>
    </ProtectedRoute>
  );
}
