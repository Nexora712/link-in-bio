# **Dashboard Implementation**

## **1. Dashboard Layout Structure**

First, let's create the main dashboard layout:



#### \- src/app/dashboard/layout.tsx



import { Sidebar } from "@/components/dashboard/sidebar"

import { Navbar } from "@/components/dashboard/navbar"



export default function DashboardLayout({

&nbsp; children,

}: {

&nbsp; children: React.ReactNode

}) {

&nbsp; return (

&nbsp;   <div className="flex h-screen bg-background">

&nbsp;     <Sidebar />

&nbsp;     <div className="flex-1 flex flex-col overflow-hidden">

&nbsp;       <Navbar />

&nbsp;       <main className="flex-1 overflow-y-auto p-6">

&nbsp;         {children}

&nbsp;       </main>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; )

}





## **2. Sidebar Component**


**-src/components/dashboard/sidebar.tsx**

---

**"use client"**



**import { useState } from "react"**

**import { cn } from "@/lib/utils"**

**import { Button } from "@/components/ui/button"**

**import {** 

  **LayoutDashboard,** 

  **Palette,** 

  **Plus,** 

  **BarChart3,** 

  **User,**

  **ChevronLeft,**

  **ChevronRight**

**} from "lucide-react"**

**import Link from "next/link"**

**import { usePathname } from "next/navigation"**



**const sidebarItems = \[**

  **{ icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },**

  **{ icon: Palette, label: "Templates", href: "/dashboard/templates" },**

  **{ icon: Plus, label: "Builder", href: "/builder" },**

  **{ icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },**

  **{ icon: User, label: "Account", href: "/dashboard/account" },**

**]**



**export function Sidebar() {**

  **const \[collapsed, setCollapsed] = useState(false)**

  **const pathname = usePathname()**



  **return (**

    **<div className={cn(**

      **"bg-card border-r transition-all duration-300 flex flex-col",**

      **collapsed ? "w-16" : "w-64"**

    **)}>**

      **<div className="p-4 border-b flex items-center justify-between">**

        **{!collapsed \&\& (**

          **<h2 className="text-lg font-semibold text-foreground">LinkBio</h2>**

        **)}**

        **<Button**

          **variant="ghost"**

          **size="sm"**

          **onClick={() => setCollapsed(!collapsed)}**

          **className="h-8 w-8"**

        **>**

          **{collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}**

        **</Button>**

      **</div>**

      

      **<nav className="flex-1 p-4 space-y-2">**

        **{sidebarItems.map((item) => (**

          **<Link key={item.href} href={item.href}>**

            **<Button**

              **variant={pathname === item.href ? "secondary" : "ghost"}**

              **className={cn(**

                **"w-full justify-start transition-all duration-200",**

                **collapsed ? "px-2" : "px-4"**

              **)}**

            **>**

              **<item.icon className="h-4 w-4" />**

              **{!collapsed \&\& <span className="ml-3">{item.label}</span>}**

            **</Button>**

          **</Link>**

        **))}**

      **</nav>**

    **</div>**

  **)**

**}**



**3. Navbar Component**
===


**- src/components/dashboard/navbar.tsx


"use client"**



**import { Button } from "@/components/ui/button"**

**import { Input } from "@/components/ui/input"**

**import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"**

**import {**

  **DropdownMenu,**

  **DropdownMenuContent,**

  **DropdownMenuItem,**

  **DropdownMenuLabel,**

  **DropdownMenuSeparator,**

  **DropdownMenuTrigger,**

**} from "@/components/ui/dropdown-menu"**

**import { Bell, Search, Settings, LogOut, User } from "lucide-react"**

**import { Badge } from "@/components/ui/badge"**



**export function Navbar() {**

  **return (**

    **<header className="bg-background border-b px-6 py-4 flex items-center justify-between">**

      **<div className="flex items-center space-x-4 flex-1 max-w-md">**

        **<div className="relative flex-1">**

          **<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />**

          **<Input**

            **placeholder="Search..."**

            **className="pl-10"**

          **/>**

        **</div>**

      **</div>**

      

      **<div className="flex items-center space-x-4">**

        **<Button variant="ghost" size="sm" className="relative">**

          **<Bell className="h-4 w-4" />**

          **<Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">**

            **3**

          **</Badge>**

        **</Button>**

        

        **<DropdownMenu>**

          **<DropdownMenuTrigger asChild>**

            **<Button variant="ghost" className="relative h-8 w-8 rounded-full">**

              **<Avatar className="h-8 w-8">**

                **<AvatarImage src="/avatars/01.png" alt="User" />**

                **<AvatarFallback>JD</AvatarFallback>**

              **</Avatar>**

            **</Button>**

          **</DropdownMenuTrigger>**

          **<DropdownMenuContent className="w-56" align="end" forceMount>**

            **<DropdownMenuLabel className="font-normal">**

              **<div className="flex flex-col space-y-1">**

                **<p className="text-sm font-medium leading-none">John Doe</p>**

                **<p className="text-xs leading-none text-muted-foreground">**

                  **john@example.com**

                **</p>**

              **</div>**

            **</DropdownMenuLabel>**

            **<DropdownMenuSeparator />**

            **<DropdownMenuItem>**

              **<User className="mr-2 h-4 w-4" />**

              **<span>Profile</span>**

            **</DropdownMenuItem>**

            **<DropdownMenuItem>**

              **<Settings className="mr-2 h-4 w-4" />**

              **<span>Settings</span>**

            **</DropdownMenuItem>**

            **<DropdownMenuSeparator />**

            **<DropdownMenuItem>**

              **<LogOut className="mr-2 h-4 w-4" />**

              **<span>Log out</span>**

            **</DropdownMenuItem>**

          **</DropdownMenuContent>**

        **</DropdownMenu>**

      **</div>**

    **</header>**

  **)**

**}**



**4. Dashboard Main Page**
---

#### **-src/app/dashboard/page.tsx**





**import { MetricCards } from "@/components/dashboard/metric-cards"**

**import { ActivityFeed } from "@/components/dashboard/activity-feed"**

**import { ThemeChart } from "@/components/dashboard/theme-chart"**

**import { RecentLinks } from "@/components/dashboard/recent-links"**



**export default function DashboardPage() {**

  **return (**

    **<div className="space-y-6">**

      **<div>**

        **<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>**

        **<p className="text-muted-foreground">**

          **Welcome back! Here's an overview of your link-in-bio performance.**

        **</p>**

      **</div>**

      

      **<MetricCards />**

      

      **<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">**

        **<div className="lg:col-span-2">**

          **<ThemeChart />**

        **</div>**

        **<ActivityFeed />**

      **</div>**

      

      **<RecentLinks />**

    **</div>**

  **)**

**}**





**5. Metric Cards Component**
---

**-src/components/dashboard/metric-cards.tsx


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"**

**import { Eye, Link, Palette, Users } from "lucide-react"**



**const metrics = \[**

  **{**

    **title: "Total Views",**

    **value: "12,345",**

    **change: "+20.1%",**

    **icon: Eye,**

    **color: "text-blue-600"**

  **},**

  **{**

    **title: "Links Created",**

    **value: "23",**

    **change: "+5",**

    **icon: Link,**

    **color: "text-green-600"**

  **},**

  **{**

    **title: "Themes Used",**

    **value: "8",**

    **change: "+2",**

    **icon: Palette,**

    **color: "text-purple-600"**

  **},**

  **{**

    **title: "Profile Visits",**

    **value: "1,234",**

    **change: "+12.5%",**

    **icon: Users,**

    **color: "text-orange-600"**

  **}**

**]**



**export function MetricCards() {**

  **return (**

    **<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">**

      **{metrics.map((metric) => (**

        **<Card key={metric.title} className="relative overflow-hidden">**

          **<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">**

            **<CardTitle className="text-sm font-medium text-muted-foreground">**

              **{metric.title}**

            **</CardTitle>**

            **<metric.icon className={`h-4 w-4 ${metric.color}`} />**

          **</CardHeader>**

          **<CardContent>**

            **<div className="text-2xl font-bold">{metric.value}</div>**

            **<p className="text-xs text-muted-foreground mt-1">**

              **<span className="text-green-600">{metric.change}</span> from last month**

            **</p>**

          **</CardContent>**

        **</Card>**

      **))}**

    **</div>**

  **)**

**}**





**6. Activity Feed Component**
---

**src/components/dashboard/activity-feed.tsx





import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"**

**import { Avatar, AvatarFallback } from "@/components/ui/avatar"**

**import { formatDistanceToNow } from "date-fns"**



**const activities = \[**

  **{**

    **id: 1,**

    **action: "Created new link",**

    **details: "Added Instagram profile link",**

    **timestamp: new Date(Date.now() - 1000 \* 60 \* 30), // 30 minutes ago**

    **type: "link"**

  **},**

  **{**

    **id: 2,**

    **action: "Changed theme",**

    **details: "Switched to Dark Modern theme",**

    **timestamp: new Date(Date.now() - 1000 \* 60 \* 60 \* 2), // 2 hours ago**

    **type: "theme"**

  **},**

  **{**

    **id: 3,**

    **action: "Profile viewed",**

    **details: "Someone visited your profile",**

    **timestamp: new Date(Date.now() - 1000 \* 60 \* 60 \* 5), // 5 hours ago**

    **type: "view"**

  **},**

  **{**

    **id: 4,**

    **action: "Link clicked",**

    **details: "YouTube link was clicked 5 times",**

    **timestamp: new Date(Date.now() - 1000 \* 60 \* 60 \* 24), // 1 day ago**

    **type: "click"**

  **}**

**]**



**export function ActivityFeed() {**

  **return (**

    **<Card>**

      **<CardHeader>**

        **<CardTitle>Recent Activity</CardTitle>**

      **</CardHeader>**

      **<CardContent className="space-y-4">**

        **{activities.map((activity) => (**

          **<div key={activity.id} className="flex items-start space-x-3">**

            **<Avatar className="h-8 w-8">**

              **<AvatarFallback className="text-xs">**

                **{activity.type === 'link' ? 'L' :** 

                 **activity.type === 'theme' ? 'T' :** 

                 **activity.type === 'view' ? 'V' : 'C'}**

              **</AvatarFallback>**

            **</Avatar>**

            **<div className="flex-1 min-w-0">**

              **<p className="text-sm font-medium text-foreground">**

                **{activity.action}**

              **</p>**

              **<p className="text-xs text-muted-foreground">**

                **{activity.details}**

              **</p>**

              **<p className="text-xs text-muted-foreground mt-1">**

                **{formatDistanceToNow(activity.timestamp, { addSuffix: true })}**

              **</p>**

            **</div>**

          **</div>**

        **))}**

      **</CardContent>**

    **</Card>**

  **)**

**}**





**7. Theme Chart Component**
---

**src/components/dashboard/theme-chart.tsx


"use client"**



**import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"**

**import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"**



**const data = \[**

  **{ name: 'Modern Dark', value: 35, color: '#8b5cf6' },**

  **{ name: 'Classic Light', value: 25, color: '#06b6d4' },**

  **{ name: 'Minimal', value: 20, color: '#10b981' },**

  **{ name: 'Gradient', value: 15, color: '#f59e0b' },**

  **{ name: 'Glassmorphism', value: 5, color: '#ef4444' },**

**]**



**export function ThemeChart() {**

  **return (**

    **<Card>**

      **<CardHeader>**

        **<CardTitle>Theme Usage</CardTitle>**

      **</CardHeader>**

      **<CardContent>**

        **<ResponsiveContainer width="100%" height={300}>**

          **<PieChart>**

            **<Pie**

              **data={data}**

              **cx="50%"**

              **cy="50%"**

              **labelLine={false}**

              **outerRadius={80}**

              **fill="#8884d8"**

              **dataKey="value"**

            **>**

              **{data.map((entry, index) => (**

                **<Cell key={`cell-${index}`} fill={entry.color} />**

              **))}**

            **</Pie>**

            **<Tooltip />**

            **<Legend />**

          **</PieChart>**

        **</ResponsiveContainer>**

      **</CardContent>**

    **</Card>**

  **)**

**}**



**8. Recent Links Component**
---

**src/components/dashboard/recent-links.tsx


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"**

**import { Badge } from "@/components/ui/badge"**

**import { Button } from "@/components/ui/button"**

**import { ExternalLink, Eye } from "lucide-react"**



**const recentLinks = \[**

  **{**

    **id: 1,**

    **title: "Instagram Profile",**

    **url: "https://instagram.com/username",**

    **clicks: 245,**

    **status: "active"**

  **},**

  **{**

    **id: 2,**

    **title: "YouTube Channel",**

    **url: "https://youtube.com/channel",**

    **clicks: 189,**

    **status: "active"**

  **},**

  **{**

    **id: 3,**

    **title: "Portfolio Website",**

    **url: "https://portfolio.dev",**

    **clicks: 67,**

    **status: "active"**

  **},**

  **{**

    **id: 4,**

    **title: "Twitter Profile",**

    **url: "https://twitter.com/username",**

    **clicks: 34,**

    **status: "inactive"**

  **}**

**]**



**export function RecentLinks() {**

  **return (**

    **<Card>**

      **<CardHeader>**

        **<CardTitle>Recent Links</CardTitle>**

      **</CardHeader>**

      **<CardContent>**

        **<div className="space-y-4">**

          **{recentLinks.map((link) => (**

            **<div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">**

              **<div className="flex-1">**

                **<h4 className="font-medium text-foreground">{link.title}</h4>**

                **<p className="text-sm text-muted-foreground">{link.url}</p>**

              **</div>**

              **<div className="flex items-center space-x-4">**

                **<div className="flex items-center space-x-2 text-sm text-muted-foreground">**

                  **<Eye className="h-4 w-4" />**

                  **<span>{link.clicks}</span>**

                **</div>**

                **<Badge variant={link.status === 'active' ? 'default' : 'secondary'}>**

                  **{link.status}**

                **</Badge>**

                **<Button variant="ghost" size="sm">**

                  **<ExternalLink className="h-4 w-4" />**

                **</Button>**

              **</div>**

            **</div>**

          **))}**

        **</div>**

      **</CardContent>**

    **</Card>**

  **)**

**}**




**9. Add Required Dependencies**
---

**Update your package.json to include necessary dependencies:



npm install recharts date-fns**

**npm install @types/date-fns # if using TypeScript



10. Additional shadcn/ui Components**
---

**Make sure you have all required shadcn/ui components installed:


npx shadcn-ui@latest add card button avatar dropdown-menu input badge**






**##This dashboard implementation provides:**



**✅ Modern, clean design matching enterprise SaaS standards**



**✅ Responsive layout with collapsible sidebar**



**✅ Metric cards with visual indicators**



**✅ Activity feed showing recent actions**



**✅ Theme usage visualization with Recharts**



**✅ Recent links management interface**



**✅ Full TypeScript support**



**✅ Dark/light theme compatibility**



**✅ Mobile-responsive design**














































