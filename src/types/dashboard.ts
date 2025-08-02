export interface UserStats {
  totalViews: number
  linksCreated: number
  themesUsed: number
  profileVisits: number
  viewsChange: number
  linksChange: number
  themesChange: number
  visitsChange: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface LinkAnalytics {
  id: string
  title: string
  url: string
  clicks: number
  status: 'active' | 'inactive'
  lastClicked?: Date
}