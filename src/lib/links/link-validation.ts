export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validateLink(title: string, url: string): { isValid: boolean; error?: string } {
  if (!title.trim()) {
    return { isValid: false, error: "Link title is required" }
  }
  
  if (!url.trim()) {
    return { isValid: false, error: "URL is required" }
  }
  
  if (!isValidUrl(url)) {
    return { isValid: false, error: "Please enter a valid URL" }
  }
  
  return { isValid: true }
}

export function sanitizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
} 