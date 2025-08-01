export function renderLink(title: string, url: string) {
  return {
    title,
    url,
    displayUrl: getDisplayUrl(url),
    icon: getIconForUrl(url),
  }
}

function getDisplayUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

function getIconForUrl(url: string): string {
  const hostname = url.toLowerCase()
  
  if (hostname.includes('instagram')) return 'instagram'
  if (hostname.includes('twitter') || hostname.includes('x.com')) return 'twitter'
  if (hostname.includes('facebook')) return 'facebook'
  if (hostname.includes('youtube')) return 'youtube'
  if (hostname.includes('linkedin')) return 'linkedin'
  if (hostname.includes('github')) return 'github'
  if (hostname.includes('tiktok')) return 'tiktok'
  
  return 'link'
} 