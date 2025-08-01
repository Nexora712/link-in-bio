export interface Theme {
  name: string
  primaryColor: string
  backgroundColor: string
  textColor: string
  description?: string
  gradient?: string
}

export interface ThemeConfig {
  id: string
  name: string
  colors: {
    primary: string
    background: string
    text: string
    accent?: string
  }
  fonts?: {
    heading?: string
    body?: string
  }
  spacing?: {
    padding: string
    margin: string
  }
}

export type ThemeName = 'modern' | 'nature' | 'sunset' | 'dark' | 'custom' 