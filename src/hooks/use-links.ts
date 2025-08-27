import { useState, useCallback } from 'react'
import { generateLinkId } from '@/lib/links/link-utils'
import type { LinkItem } from '@/types/link'

interface Link extends LinkItem {
  order: number;
  isActive: boolean;
}

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([])

  const addLink = useCallback((title: string, url: string) => {
    const newLink: Link = {
      id: generateLinkId(),
      title: title.trim(),
      url: url.trim(),
      order: links.length,
      isActive: true,
    }
    setLinks(prev => [...prev, newLink])
  }, [links.length])

  const removeLink = useCallback((id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id))
  }, [])

  const updateLink = useCallback((id: string, updates: Partial<Link>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ))
  }, [])

  const reorderLinks = useCallback((fromIndex: number, toIndex: number) => {
    setLinks(prev => {
      const newLinks = [...prev]
      const [movedLink] = newLinks.splice(fromIndex, 1)
      newLinks.splice(toIndex, 0, movedLink)
      return newLinks.map((link, index) => ({ ...link, order: index }))
    })
  }, [])

  const toggleLink = useCallback((id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ))
  }, [])

  return {
    links,
    addLink,
    removeLink,
    updateLink,
    reorderLinks,
    toggleLink,
  }
} 