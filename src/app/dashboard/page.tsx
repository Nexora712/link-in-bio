'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Plus, 
  User, 
  BarChart3, 
  Link as LinkIcon, 
  MousePointerClick, 
  Users, 
  TrendingUp, 
  Activity, 
  ArrowRight,
  Settings,
  ExternalLink,
  Clock
} from 'lucide-react'

// Refined overview data - monochrome styling, focused KPIs
const overviewData = [
  {
    id: 1,
    title: 'Total Links Created',
    value: '1,240',
    change: '+20.1%',
    changeText: 'from last month',
    icon: LinkIcon,
  },
  {
    id: 2,
    title: 'Active Links',
    value: '89',
    change: '+8.2%',
    changeText: 'from last month',
    icon: Activity,
  },
  {
    id: 3,
    title: 'Monthly Clicks',
    value: '37,642',
    change: '+15.3%',
    changeText: 'from last month',
    icon: MousePointerClick,
  }
]

// Refined recent activities - last 4 events only
const recentActivities = [
  {
    id: 1,
    type: 'New Link Created',
    description: 'Shortened URL: bit.ly/xyz123',
    time: '2 hours ago',
    icon: LinkIcon,
    clickable: true,
    action: '/dashboard/links/xyz123'
  },
  {
    id: 2,
    type: 'Profile Updated',
    description: 'User updated profile photo',
    time: '5 hours ago',
    icon: User,
    clickable: true,
    action: '/dashboard/account'
  },
  {
    id: 3,
    type: 'New Link Created',
    description: 'Shortened URL: bit.ly/abc789',
    time: '1 day ago',
    icon: LinkIcon,
    clickable: true,
    action: '/dashboard/links/abc789'
  },
  {
    id: 4,
    type: 'Analytics Updated',
    description: 'Weekly performance report generated',
    time: '2 days ago',
    icon: BarChart3,
    clickable: true,
    action: '/dashboard/analytics'
  }
]

// Simple weekly trend data for mini chart
const chartData = [
  { day: 'Mon', clicks: 240 },
  { day: 'Tue', clicks: 300 },
  { day: 'Wed', clicks: 280 },
  { day: 'Thu', clicks: 350 },
  { day: 'Fri', clicks: 420 },
  { day: 'Sat', clicks: 380 },
  { day: 'Sun', clicks: 290 }
]

// Mock user data
const userData = {
  name: 'holy',
  avatar: '/avatars/default.jpg',
  lastActiveLink: 'My Latest Project',
  hasActiveLinks: true
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const greeting = getGreeting()

  return (
    <div className="space-y-8">
      {/* Enhanced Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center">
            <User className="w-6 h-6 text-[#444444] dark:text-[#CCCCCC]" />
          </div>
          <div>
            <h1 
              className="text-3xl font-bold text-black dark:text-white mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {greeting}, {userData.name}!
            </h1>
            <p 
              className="text-[#444444] dark:text-[#CCCCCC]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Here&apos;s what&apos;s happening with your links today.
            </p>
          </div>
        </div>
        
        {/* Resume Editing Button */}
        {userData.hasActiveLinks && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/builder">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#111111] shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Resume Editing
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Overview Cards - Monochrome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {overviewData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ 
              y: -4,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)"
            }}
          >
            <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle 
                  className="text-sm font-medium text-[#444444] dark:text-[#CCCCCC]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.title}
                </CardTitle>
                <div className="w-8 h-8 rounded-full bg-[#F8F8F8] dark:bg-[#111111] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC]" />
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-2xl font-bold text-black dark:text-white mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item.value}
                </div>
                <p 
                  className="text-xs text-[#444444] dark:text-[#CCCCCC]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="text-black dark:text-white font-medium">
                    {item.change}
                  </span>{' '}
                  {item.changeText}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Click Analytics - Simple Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F8F8F8] dark:bg-[#111111] flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC]" />
                  </div>
                  <CardTitle 
                    className="text-lg font-bold text-black dark:text-white"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Click Analytics
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Simple Bar Chart */}
              <div className="space-y-4">
                <div className="flex items-end justify-between h-32 px-2">
                  {chartData.map((item, index) => (
                    <motion.div
                      key={item.day}
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.clicks / 420) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div 
                        className="bg-[#F8F8F8] dark:bg-[#111111] hover:bg-[#E5E5E5] dark:hover:bg-[#222222] w-8 rounded-sm transition-colors duration-200 cursor-pointer"
                        style={{ height: `${(item.clicks / 420) * 80}px`, minHeight: '8px' }}
                        title={`${item.day}: ${item.clicks} clicks`}
                      />
                      <span 
                        className="text-xs text-[#444444] dark:text-[#CCCCCC]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.day}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* View Full Analytics CTA */}
                <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#222222]">
                  <Link href="/dashboard/analytics">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#111111] rounded-xl"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        View full analytics
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F8F8F8] dark:bg-[#111111] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC]" />
                </div>
                <CardTitle 
                  className="text-lg font-bold text-black dark:text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Recent Activity
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {activity.clickable ? (
                    <Link href={activity.action}>
                      <motion.div
                        whileHover={{ scale: 1.01, x: 2 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F8F8] dark:bg-[#111111] hover:bg-[#E5E5E5] dark:hover:bg-[#222222] transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-6 h-6 rounded-full bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <activity.icon className="w-3 h-3 text-[#444444] dark:text-[#CCCCCC]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p 
                            className="text-sm font-medium text-black dark:text-white group-hover:text-[#444444] dark:group-hover:text-[#CCCCCC] transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {activity.type}
                          </p>
                          <p 
                            className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-1 line-clamp-2"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="w-3 h-3 text-[#CCCCCC] dark:text-[#444444]" />
                            <span 
                              className="text-xs text-[#CCCCCC] dark:text-[#444444]"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F8F8] dark:bg-[#111111]">
                      <div className="w-6 h-6 rounded-full bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <activity.icon className="w-3 h-3 text-[#444444] dark:text-[#CCCCCC]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p 
                          className="text-sm font-medium text-black dark:text-white"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {activity.type}
                        </p>
                        <p 
                          className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-1"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3 text-[#CCCCCC] dark:text-[#444444]" />
                          <span 
                            className="text-xs text-[#CCCCCC] dark:text-[#444444]"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-wrap gap-4 pt-4"
      >
        <Link href="/builder">
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#444444] dark:hover:bg-[#CCCCCC] px-6 py-3 rounded-xl shadow-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Link
            </Button>
          </motion.div>
        </Link>
        
        <Link href="/dashboard/account">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#111111] px-6 py-3 rounded-xl shadow-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <User className="w-4 h-4 mr-2" />
              Customize Profile
            </Button>
          </motion.div>
        </Link>
        
        <Link href="/dashboard/analytics">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#111111] px-6 py-3 rounded-xl shadow-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  )
}
