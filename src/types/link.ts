export interface Link {
  id: string
  title: string
  url: string
  icon?: string
  order: number
  isActive: boolean
}

export interface LinkFormData {
  name: string
  bio?: string
  links: Link[]
  theme: string
}

export interface LinkPreview {
  title: string
  url: string
  displayUrl: string
  icon: string
  platform?: string
}

export interface SocialPlatform {
  name: string
  domain: string
  icon: string
  color?: string
} 