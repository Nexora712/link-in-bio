"use client"

import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getApps, initializeApp } from 'firebase/app';

import { useQuery } from "@tanstack/react-query";
import type { UserStats, Notification, User, LinkAnalytics } from "@/types/dashboard";
import { useAuth } from "@/contexts/auth-context";


const fetchUserStats = async (): Promise<UserStats> => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return {
      totalViews: 0,
      linksCreated: 0,
      themesUsed: 0,
      profileVisits: 0,
      viewsChange: 0,
      linksChange: 0,
      themesChange: 0,
      visitsChange: 0,
    };
  }

  try {
    const userId = user.uid;
    const currentDate = new Date();
    const endDate = currentDate.toISOString().slice(0, 10);
    const startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().slice(0, 10);

    let totalViews = 0;
    let linksCreated = 0;
    let profileVisits = 0;
    let themesUsed = 0;

    // Fetch analytics data for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const analyticsDocRef = doc(db, `users/${userId}/analytics/${date}`, "data");
      const analyticsDocSnap = await getDoc(analyticsDocRef);

      if (analyticsDocSnap.exists()) {
        const data = analyticsDocSnap.data();
        totalViews += data?.linkClicks || 0;
        profileVisits += data?.profileViews || 0;
      }
    }

    return {
      totalViews,
      linksCreated,
      themesUsed,
      profileVisits,
      viewsChange: 0, // Not implemented
      linksChange: 0, // Not implemented
      themesChange: 0, // Not implemented
      visitsChange: 0, // Not implemented
    };
  } catch (error: any) {
    console.error("Error fetching user stats:", error);
    return {
      totalViews: 0,
      linksCreated: 0,
      themesUsed: 0,
      profileVisits: 0,
      viewsChange: 0,
      linksChange: 0,
      themesChange: 0,
      visitsChange: 0,
    };
  }
};

const fetchNotifications = async (): Promise<Notification[]> => {
  const { user } = useAuth();
  if (!user) {
    return [];
  }

  // Mock data based on user activity
  const notifications: Notification[] = [
    {
      id: "login",
      title: "User Login",
      message: `User ${user.email} logged in`,
      type: "info",
      timestamp: new Date(),
      read: false,
    },
    {
      id: "link_click",
      title: "New Link Click",
      message: "Your Instagram link was clicked 5 times",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
    },
    {
      id: "theme_update",
      title: "Theme Updated",
      message: "Successfully switched to Dark Modern theme",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
    },
  ];

  return notifications;
};

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
  const { loading } = useAuth();

  return useQuery({
    queryKey: ["user-stats"],
    queryFn: fetchUserStats,
    enabled: !loading,
    refetchInterval: 30000,
    retry: 3, // Retry the query up to 3 times
  });
};

export const useNotifications = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 60000,
  });

  const activities = data ? data.map((notification) => ({
    id: notification.id,
    action: notification.title,
    details: notification.message,
    timestamp: notification.timestamp,
    type: notification.title.toLowerCase().includes("link")
      ? "link"
      : notification.title.toLowerCase().includes("theme")
      ? "theme"
      : notification.title.toLowerCase().includes("view")
      ? "view"
      : "click",
  })) : [];

  return { activities, ...rest };
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