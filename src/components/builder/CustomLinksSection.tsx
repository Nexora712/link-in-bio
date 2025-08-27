'use client'

import React, { useState, useEffect } from "react"
import { Plus, GripVertical, X, Info, ExternalLink, Link as LinkIcon, Edit3, Trash2, Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkFormData } from "@/types/link"

interface CustomLinksSectionProps {
  formData: LinkFormData
  setFormData: (data: LinkFormData | ((prev: LinkFormData) => LinkFormData)) => void
}

interface CustomLink {
  id: string
  title: string
  url: string
  description?: string
  order?: number
}

const CustomLinksSection = ({ formData, setFormData }: CustomLinksSectionProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Monitor dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const addNewLink = () => {
    const newLink: CustomLink = {
      id: Date.now().toString(),
      title: '',
      url: '',
      description: '',
      order: formData.customLinks.length
    }

    setFormData(prev => ({
      ...prev,
      customLinks: [...prev.customLinks, newLink]
    }))

    setEditingId(newLink.id)
  }

  const updateLink = (id: string, field: keyof CustomLink, value: string) => {
    setFormData(prev => ({
      ...prev,
      customLinks: prev.customLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }))
  }

  const removeLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customLinks: prev.customLinks.filter(link => link.id !== id)
    }))
  }

  const duplicateLink = (link: CustomLink) => {
    const duplicatedLink: CustomLink = {
      ...link,
      id: Date.now().toString(),
      title: `${link.title} (Copy)`,
      order: formData.customLinks.length
    }

    setFormData(prev => ({
      ...prev,
      customLinks: [...prev.customLinks, duplicatedLink]
    }))
  }

  const reorderLinks = (startIndex: number, endIndex: number) => {
    const result = Array.from(formData.customLinks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    setFormData(prev => ({
      ...prev,
      customLinks: result.map((link, index) => ({ ...link, order: index }))
    }))
  }

  const validateUrl = (url: string) => {
    if (!url) return true
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Native HTML5 drag event handlers (properly typed)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, linkId: string) => {
    setDraggedItem(linkId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', linkId)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData('text/plain')
    
    if (draggedId && draggedId !== targetId) {
      const draggedIndex = formData.customLinks.findIndex(link => link.id === draggedId)
      const targetIndex = formData.customLinks.findIndex(link => link.id === targetId)
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        reorderLinks(draggedIndex, targetIndex)
      }
    }
    
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 
            className="text-xl font-bold text-black dark:text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Custom Links
          </h3>
          <p 
            className="text-sm text-[#444444] dark:text-[#CCCCCC] mt-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Add your important links and resources
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span 
            className="text-xs px-2 py-1 rounded-full bg-[#F8F8F8] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {formData.customLinks.length} links
          </span>
        </div>
      </div>

      {/* Section Content */}
      <div className="space-y-4">
        {/* Links List */}
        <AnimatePresence>
          {formData.customLinks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12 rounded-xl border-2 border-dashed border-[#E5E5E5] dark:border-[#222222]"
            >
              <LinkIcon className="w-12 h-12 text-[#444444] dark:text-[#CCCCCC] mx-auto mb-4" />
              <h4 
                className="text-lg font-semibold text-black dark:text-white mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                No custom links yet
              </h4>
              <p 
                className="text-[#444444] dark:text-[#CCCCCC]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Add your first link to get started
              </p>
            </motion.div>
          ) : (
            formData.customLinks.map((link, index) => {
              const isEditing = editingId === link.id
              const isValidUrl = validateUrl(link.url)

              return (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className={`relative p-6 rounded-xl border transition-all duration-200 ${
                    draggedItem === link.id 
                      ? 'shadow-lg transform rotate-2' 
                      : 'shadow-sm hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                    borderColor: isDarkMode ? '#222222' : '#E5E5E5',
                  }}
                >
                  {/* FIXED: Use regular div with native drag events instead of motion.div */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, link.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, link.id)}
                    className="absolute left-2 top-6 cursor-move p-1"
                  >
                    <GripVertical 
                      className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors" 
                    />
                  </div>

                  {/* Link Content */}
                  <div className="ml-6 space-y-4">
                    {/* Link Number & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="text-xs font-semibold px-2 py-1 rounded-full bg-[#F8F8F8] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          #{index + 1}
                        </span>
                        {link.url && isValidUrl && (
                          <span 
                            className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Valid URL
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setEditingId(isEditing ? null : link.id)}
                          className="p-2 hover:opacity-70 transition-opacity rounded-lg"
                          style={{
                            color: isDarkMode ? '#CCCCCC' : '#444444',
                            backgroundColor: isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode ? '#333333' : '#CCCCCC'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => duplicateLink(link)}
                          className="p-2 hover:opacity-70 transition-opacity rounded-lg"
                          style={{
                            color: isDarkMode ? '#CCCCCC' : '#444444',
                            backgroundColor: isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode ? '#333333' : '#CCCCCC'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => removeLink(link.id)}
                          className="p-2 hover:opacity-70 transition-opacity rounded-lg"
                          style={{
                            color: '#EF4444',
                            backgroundColor: isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEF2F2'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Link Fields */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <label 
                          className="block text-sm font-medium text-black dark:text-white mb-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Link Title
                        </label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                          placeholder="Enter a descriptive title"
                          className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
                          style={{
                            backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                            borderColor: isDarkMode ? '#222222' : '#E5E5E5',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                            fontFamily: 'Inter, sans-serif'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = isDarkMode ? '#FFFFFF' : '#000000'
                            e.target.style.outline = 'none'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                        />
                      </div>

                      {/* URL */}
                      <div>
                        <label 
                          className="block text-sm font-medium text-black dark:text-white mb-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          URL
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 pr-10 rounded-lg border transition-all duration-200"
                            style={{
                              backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                              borderColor: link.url && !isValidUrl
                                ? '#EF4444'
                                : (isDarkMode ? '#222222' : '#E5E5E5'),
                              color: isDarkMode ? '#FFFFFF' : '#000000',
                              fontFamily: 'Inter, sans-serif'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = link.url && !isValidUrl ? '#EF4444' : (isDarkMode ? '#FFFFFF' : '#000000')
                              e.target.style.outline = 'none'
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = link.url && !isValidUrl ? '#EF4444' : (isDarkMode ? '#222222' : '#E5E5E5')
                            }}
                          />
                          {link.url && (
                            <button
                              onClick={() => window.open(link.url, '_blank')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
                            >
                              <ExternalLink className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC]" />
                            </button>
                          )}
                        </div>
                        {link.url && !isValidUrl && (
                          <p 
                            className="text-red-500 text-xs mt-1"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Please enter a valid URL starting with http:// or https://
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <label 
                          className="block text-sm font-medium text-black dark:text-white mb-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Description (Optional)
                        </label>
                        <input
                          type="text"
                          value={link.description || ''}
                          onChange={(e) => updateLink(link.id, 'description', e.target.value)}
                          placeholder="Brief description of this link"
                          className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
                          style={{
                            backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                            borderColor: isDarkMode ? '#222222' : '#E5E5E5',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                            fontFamily: 'Inter, sans-serif'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = isDarkMode ? '#FFFFFF' : '#000000'
                            e.target.style.outline = 'none'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = isDarkMode ? '#222222' : '#E5E5E5'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>

        {/* Add New Link Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addNewLink}
          className="w-full py-4 px-6 rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center space-x-3"
          style={{
            borderColor: isDarkMode ? '#222222' : '#E5E5E5',
            color: isDarkMode ? '#CCCCCC' : '#444444',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isDarkMode ? '#FFFFFF' : '#000000'
            e.currentTarget.style.color = isDarkMode ? '#FFFFFF' : '#000000'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = isDarkMode ? '#222222' : '#E5E5E5'
            e.currentTarget.style.color = isDarkMode ? '#CCCCCC' : '#444444'
          }}
        >
          <Plus className="w-5 h-5" />
          <span 
            className="font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {formData.customLinks.length === 0 ? 'Add Your First Link' : 'Add Another Link'}
          </span>
        </motion.button>

        {/* Help Section */}
        {formData.customLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222]"
          >
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#444444] dark:text-[#CCCCCC] mt-0.5 flex-shrink-0" />
              <div>
                <h4 
                  className="font-semibold text-black dark:text-white mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Custom Links Tips
                </h4>
                <ul 
                  className="text-sm text-[#444444] dark:text-[#CCCCCC] space-y-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <li>• Drag and drop links to reorder them on your page</li>
                  <li>• Use descriptive titles to help visitors understand where the link goes</li>
                  <li>• Add descriptions for additional context (optional)</li>
                  <li>• Only links with valid URLs will be displayed on your live page</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CustomLinksSection
