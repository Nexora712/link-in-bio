"use client"

import { useQuery } from "@tanstack/react-query"
import type { UserStats, Notification, User, LinkAnalytics } from "@/types/dashboard"

// Mock API functions (replace with your actual API calls)
const fetchUserStats = async (): Promise<UserStats> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    totalViews: Math.floor(Math.random() * 50000) + 10000,
    linksCreated: Math.floor(Math.random() * 50) + 10,
    themesUsed: Math.floor(Math.random() * 15) + 3,
    profileVisits: Math.floor(Math.random() * 5000) + 500,
    viewsChange: Math.floor(Math.random() * 50) + 10,
    linksChange: Math.floor(Math.random() * 10) + 1,
    themesChange: Math.floor(Math.random() * 5) + 1,
    visitsChange: Math.floor(Math.random() * 30) + 5,
  }
}

const fetchNotifications = async (): Promise<Notification[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    {
      id: "1",
      title: "New Link Click",
      message: "Your Instagram link was clicked 5 times",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: "2",
      title: "Profile View Milestone",
      message: "Your profile reached 1,000 views!",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
    },
    {
      id: "3",
      title: "Theme Updated",
      message: "Successfully switched to Dark Modern theme",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
    },
  ]
}

const fetchCurrentUser = async (): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/01.png",
  }
}

const fetchLinkAnalytics = async (): Promise<LinkAnalytics[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return [
    {
      id: "1",
      title: "Instagram Profile",
      url: "https://instagram.com/username",
      clicks: Math.floor(Math.random() * 500) + 100,
      status: "active",
      lastClicked: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "2",
      title: "YouTube Channel",
      url: "https://youtube.com/channel",
      clicks: Math.floor(Math.random() * 300) + 50,
      status: "active",
      lastClicked: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "3",
      title: "Portfolio Website",
      url: "https://portfolio.dev",
      clicks: Math.floor(Math.random() * 150) + 20,
      status: "active",
      lastClicked: new Date(Date.now() - 1000 * 60 * 120),
    },
  ]
}

export const useUserStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: fetchUserStats,
    refetchInterval: 30000,
  })
}

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 60000,
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
  })
}

export const useLinkAnalytics = () => {
  return useQuery({
    queryKey: ["link-analytics"],
    queryFn: fetchLinkAnalytics,
    refetchInterval: 30000,
  })
}