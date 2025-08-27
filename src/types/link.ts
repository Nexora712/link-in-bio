export interface LinkItem {
  id: string
  title: string
  url: string
  description?: string
  icon?: string
  isActive?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  isEnabled: boolean
}

export interface SocialLinks {
  instagram: string
  twitter: string
  linkedin: string
  youtube: string
  tiktok: string
}

export interface LinkFormData {
  displayName: string
  bio: string
  profileImage: File | string | null | undefined
  socialLinks: SocialLinks
  customLinks: LinkItem[]
  template: string
  templateStyles?: {
    background: string
    fontFamily: string
    primaryColor: string
    [key: string]: any
  }
  theme: 'light' | 'dark'
}

export interface Template {
  id: string
  name: string
  description: string
  preview: string
  colors: string[]
  category?: string
}

export interface BuilderState {
  formData: LinkFormData
  isLoading: boolean
  isSaving: boolean
  hasUnsavedChanges: boolean
}
