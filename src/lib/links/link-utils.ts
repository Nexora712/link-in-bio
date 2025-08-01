export function generateLinkId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function formatLinkTitle(title: string): string {
  return title.trim()
}

export function getLinkDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

export function isSocialMediaLink(url: string): boolean {
  const socialDomains = [
    'instagram.com',
    'twitter.com',
    'x.com',
    'facebook.com',
    'youtube.com',
    'linkedin.com',
    'github.com',
    'tiktok.com',
    'snapchat.com',
    'pinterest.com',
  ]
  
  const domain = getLinkDomain(url)
  return socialDomains.some(socialDomain => domain.includes(socialDomain))
} 