'use client'

import { useState, useEffect } from "react"
import { Link as LinkIcon, Info, Instagram, Twitter, Linkedin, Youtube, Music, ExternalLink, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkFormData } from "@/types/link"

interface SocialLinksSectionProps {
  formData: LinkFormData
  setFormData: (data: LinkFormData | ((prev: LinkFormData) => LinkFormData)) => void
}

const socialPlatforms = [
  { 
    key: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    color: 'text-pink-500',
    bgGradient: 'from-pink-500 to-purple-600',
    placeholder: 'https://instagram.com/username'
  },
  { 
    key: 'twitter', 
    name: 'Twitter/X', 
    icon: Twitter, 
    color: 'text-blue-400',
    bgGradient: 'from-blue-400 to-blue-600',
    placeholder: 'https://twitter.com/username'
  },
  { 
    key: 'linkedin', 
    name: 'LinkedIn', 
    icon: Linkedin, 
    color: 'text-blue-600',
    bgGradient: 'from-blue-600 to-indigo-700',
    placeholder: 'https://linkedin.com/in/username'
  },
  { 
    key: 'youtube', 
    name: 'YouTube', 
    icon: Youtube, 
    color: 'text-red-500',
    bgGradient: 'from-red-500 to-red-600',
    placeholder: 'https://youtube.com/@username'
  },
  { 
    key: 'tiktok', 
    name: 'TikTok', 
    icon: Music, 
    color: 'text-black dark:text-white',
    bgGradient: 'from-gray-800 to-black',
    placeholder: 'https://tiktok.com/@username'
  },
] as const

const SocialLinksSection = ({ formData, setFormData }: SocialLinksSectionProps) => {
  const [enabledPlatforms, setEnabledPlatforms] = useState<Record<string, boolean>>(() => {
    const enabled: Record<string, boolean> = {}
    socialPlatforms.forEach(platform => {
      enabled[platform.key] = Boolean(formData.socialLinks[platform.key as keyof typeof formData.socialLinks])
    })
    return enabled
  })
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

  const togglePlatform = (platform: string) => {
    const newEnabled = { ...enabledPlatforms, [platform]: !enabledPlatforms[platform] }
    setEnabledPlatforms(newEnabled)

    if (!newEnabled[platform]) {
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: ''
        }
      }))
    }
  }

  const updateSocialLink = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }))
  }

  const getEnabledCount = () => {
    return Object.values(enabledPlatforms).filter(Boolean).length
  }

  const validateUrl = (url: string, platform: string) => {
    if (!url) return true
    try {
      const urlObj = new URL(url)
      const platformDomains = {
        instagram: ['instagram.com', 'www.instagram.com'],
        twitter: ['twitter.com', 'www.twitter.com', 'x.com', 'www.x.com'],
        linkedin: ['linkedin.com', 'www.linkedin.com'],
        youtube: ['youtube.com', 'www.youtube.com'],
        tiktok: ['tiktok.com', 'www.tiktok.com']
      }
      return platformDomains[platform as keyof typeof platformDomains]?.some(domain => 
        urlObj.hostname === domain
      ) ?? true
    } catch {
      return false
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl overflow-hidden shadow-sm"
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#222222' : '#E5E5E5'}`
      }}
    >
      {/* Section Header */}
      <div 
        className="p-8 border-b"
        style={{
          backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
          borderBottomColor: isDarkMode ? '#222222' : '#E5E5E5'
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            <LinkIcon 
              className="w-6 h-6" 
              style={{ color: isDarkMode ? '#000000' : '#FFFFFF' }}
            />
          </div>
          <div className="flex-1">
            <h3 
              className="text-xl font-bold mb-1"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}
            >
              Social Media Links
            </h3>
            <p 
              className="text-base"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: isDarkMode ? '#CCCCCC' : '#444444'
              }}
            >
              Connect your social profiles
            </p>
          </div>
          <div className="text-right">
            <div 
              className="text-sm font-semibold"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}
            >
              {getEnabledCount()}/{socialPlatforms.length}
            </div>
            <div 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: isDarkMode ? '#CCCCCC' : '#444444'
              }}
            >
              enabled
            </div>
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div 
        className="p-8 space-y-6"
        style={{ backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}
      >
        
        {/* Platform Grid */}
        <div className="grid grid-cols-1 gap-6">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon
            const isEnabled = enabledPlatforms[platform.key]
            const currentUrl = formData.socialLinks[platform.key as keyof typeof formData.socialLinks] || ''
            const isValidUrl = validateUrl(currentUrl, platform.key)
            
            return (
              <motion.div
                key={platform.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-xl border-2 transition-all duration-200"
                style={{
                  backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                  borderColor: isEnabled 
                    ? (isDarkMode ? '#FFFFFF' : '#000000')
                    : (isDarkMode ? '#222222' : '#E5E5E5')
                }}
              >
                {/* Platform Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Platform Icon */}
                      <div className={`w-12 h-12 bg-gradient-to-r ${platform.bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Platform Info */}
                      <div>
                        <h4 
                          className="font-bold"
                          style={{ 
                            fontFamily: 'Playfair Display, serif',
                            color: isDarkMode ? '#FFFFFF' : '#000000'
                          }}
                        >
                          {platform.name}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            color: isDarkMode ? '#CCCCCC' : '#444444'
                          }}
                        >
                          {isEnabled ? 'Active' : 'Disabled'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="flex items-center gap-3">
                      {isEnabled && currentUrl && isValidUrl && (
                        <div 
                          className="flex items-center gap-1 text-xs"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            color: '#22C55E'
                          }}
                        >
                          <Check className="w-3 h-3" />
                          Valid
                        </div>
                      )}
                      
                      <button
                        onClick={() => togglePlatform(platform.key)}
                        className="relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none"
                        style={{
                          backgroundColor: isEnabled 
                            ? (isDarkMode ? '#FFFFFF' : '#000000')
                            : (isDarkMode ? '#222222' : '#E5E5E5')
                        }}
                      >
                        <motion.span
                          className="inline-block h-6 w-6 transform rounded-full shadow-lg transition-transform duration-300"
                          style={{
                            backgroundColor: isEnabled 
                              ? (isDarkMode ? '#000000' : '#FFFFFF')
                              : (isDarkMode ? '#CCCCCC' : '#FFFFFF'),
                            transform: isEnabled ? 'translateX(30px)' : 'translateX(4px)'
                          }}
                          layout
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* URL Input */}
                <AnimatePresence>
                  {isEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="space-y-2">
                        <div className="relative">
                          <input
                            type="url"
                            value={currentUrl}
                            onChange={(e) => updateSocialLink(platform.key, e.target.value)}
                            placeholder={platform.placeholder}
                            className="w-full px-4 py-3 pr-10 rounded-xl border transition-all duration-200"
                            style={{
                              backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
                              borderColor: currentUrl && !isValidUrl
                                ? '#EF4444'
                                : (isDarkMode ? '#222222' : '#E5E5E5'),
                              color: isDarkMode ? '#FFFFFF' : '#000000',
                              fontFamily: 'Inter, sans-serif'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = currentUrl && !isValidUrl ? '#EF4444' : (isDarkMode ? '#FFFFFF' : '#000000')
                              e.target.style.outline = 'none'
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = currentUrl && !isValidUrl ? '#EF4444' : (isDarkMode ? '#222222' : '#E5E5E5')
                            }}
                          />
                          {currentUrl && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              {isValidUrl ? (
                                <Check className="w-4 h-4" style={{ color: '#22C55E' }} />
                              ) : (
                                <ExternalLink className="w-4 h-4" style={{ color: '#EF4444' }} />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {currentUrl && !isValidUrl && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              color: '#EF4444'
                            }}
                          >
                            Please enter a valid {platform.name} URL
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Help Section */}
        <div 
          className="mt-8 p-6 rounded-xl border"
          style={{
            backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
            borderColor: isDarkMode ? '#222222' : '#E5E5E5'
          }}
        >
          <div className="flex items-start gap-3">
            <Info 
              className="w-5 h-5 mt-0.5 flex-shrink-0" 
              style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}
            />
            <div>
              <h4 
                className="font-semibold mb-2"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: isDarkMode ? '#FFFFFF' : '#000000'
                }}
              >
                Social Media Tips
              </h4>
              <ul 
                className="space-y-1 text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: isDarkMode ? '#CCCCCC' : '#444444'
                }}
              >
                <li>• Only enabled platforms with valid URLs will be displayed on your page</li>
                <li>• Make sure to use complete URLs (including https://)</li>
                <li>• Your social links will appear as clickable icons below your bio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SocialLinksSection
