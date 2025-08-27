import { useState, useCallback } from 'react'
import { renderLink } from '@/lib/links/link-renderer'
import type { LinkItem } from '@/types/link'

interface Link extends LinkItem {
  isActive: boolean;
}

interface LinkPreview {
  title: string;
  url: string;
  displayUrl: string;
  icon: string;
}

export function usePreview() {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)

  const generatePreview = useCallback((links: Link[]): LinkPreview[] => {
    return links
      .filter(link => link.isActive)
      .map(link => renderLink(link.title, link.url))
  }, [])

  const togglePreviewMode = useCallback(() => {
    setPreviewMode(prev => prev === 'desktop' ? 'mobile' : 'desktop')
  }, [])

  const togglePreviewVisibility = useCallback(() => {
    setIsPreviewVisible(prev => !prev)
  }, [])

  return {
    previewMode,
    isPreviewVisible,
    generatePreview,
    togglePreviewMode,
    togglePreviewVisibility,
  }
} 