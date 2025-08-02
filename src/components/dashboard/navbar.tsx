"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Search, Settings, LogOut, User as UserIcon, Moon, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCurrentUser, useNotifications } from "@/hooks/use-dashboard-data"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

export function Navbar() {
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: notifications, isLoading: notificationsLoading } = useNotifications()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const unreadCount = notifications?.filter((n) => !n.read).length || 0

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4 flex-1">
        <div className="hidden md:block">
          {userLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {getGreeting()}, {user?.name?.split(" ")[0] || "User"}!
              </h2>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 flex-1 max-w-md ml-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {mounted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="transition-all duration-200 hover:scale-105"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative transition-all duration-200 hover:scale-105">
              {notificationsLoading ? (
                <Skeleton className="h-4 w-4" />
              ) : (
                <>
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse">
                      {unreadCount}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notificationsLoading ? (
                <div className="p-4 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : notifications?.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No notifications yet</div>
              ) : (
                <div className="divide-y">
                  {notifications?.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-950/10" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative h-8 w-8 rounded-full transition-all duration-200 hover:scale-105" variant="ghost">
              {userLoading ? (
                <Skeleton className="h-8 w-8 rounded-full" />
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.split(" ").map((n) => n[0]).join("") || "U"}</AvatarFallback>
                </Avatar>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "Loading..."}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "Loading..."}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/account")}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}