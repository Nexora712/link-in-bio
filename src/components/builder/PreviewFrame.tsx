'use client'

import { useState, useEffect } from "react"
import { Smartphone, Monitor, ExternalLink, Instagram, Twitter, Linkedin, Youtube, Music, Maximize2, Minimize2, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkFormData } from "@/types/link"

interface PreviewFrameProps {
  formData: LinkFormData
  device: 'mobile' | 'desktop'
  onDeviceChange?: (device: 'mobile' | 'desktop') => void
}

const PreviewFrame = ({ formData, device, onDeviceChange }: PreviewFrameProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(Date.now())
  const [profileImageUrl, setProfileImageUrl] = useState<string>('')

  // Handle profile image conversion from File to URL
  useEffect(() => {
    if (formData.profileImage) {
      if (typeof formData.profileImage === 'string') {
        setProfileImageUrl(formData.profileImage)
      } else if (formData.profileImage instanceof File) {
        const url = URL.createObjectURL(formData.profileImage)
        setProfileImageUrl(url)
        return () => URL.revokeObjectURL(url) // Cleanup
      }
    } else {
      setProfileImageUrl('')
    }
  }, [formData.profileImage])

  // Update timestamp when formData changes
  useEffect(() => {
    setLastUpdated(Date.now())
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [formData])

  // Apply template styles with premium black/white contrast
  const templateStyles = formData.templateStyles || {
    background: '#FFFFFF',
    fontFamily: 'Inter',
    primaryColor: '#000000',
    secondaryColor: '#444444',
    borderRadius: '12px'
  }

  // Social media icon mapping
  const socialIcons = {
    instagram: { icon: Instagram, bgGradient: 'from-pink-500 to-purple-600' },
    twitter: { icon: Twitter, bgGradient: 'from-blue-400 to-blue-600' },
    linkedin: { icon: Linkedin, bgGradient: 'from-blue-600 to-indigo-700' },
    youtube: { icon: Youtube, bgGradient: 'from-red-500 to-red-600' },
    tiktok: { icon: Music, bgGradient: 'from-gray-800 to-black' }
  }

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  // macOS Window Controls Component
  const WindowControls = () => (
    <div className="flex items-center space-x-2 p-4">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="flex items-center space-x-2 ml-auto">
        <button
          onClick={() => setIsLoading(true)}
          className="p-1 hover:bg-[#F8F8F8] dark:hover:bg-[#111111] rounded"
        >
          <RotateCcw className="w-3 h-3 text-[#444444] dark:text-[#CCCCCC]" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1 hover:bg-[#F8F8F8] dark:hover:bg-[#111111] rounded"
        >
          {isFullscreen ? (
            <Minimize2 className="w-3 h-3 text-[#444444] dark:text-[#CCCCCC]" />
          ) : (
            <Maximize2 className="w-3 h-3 text-[#444444] dark:text-[#CCCCCC]" />
          )}
        </button>
      </div>
    </div>
  )

  // Device Frame Component
  const DeviceFrame = ({ children }: { children: React.ReactNode }) => {
    if (device === 'desktop') {
      return (
        <div className="w-full max-w-sm mx-auto bg-white dark:bg-black rounded-2xl shadow-2xl border border-[#E5E5E5] dark:border-[#222222] overflow-hidden">
          <WindowControls />
          <div className="border-t border-[#E5E5E5] dark:border-[#222222]">
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="relative mx-auto bg-black rounded-[2.5rem] p-2 shadow-2xl">
        <div className="relative bg-white dark:bg-black rounded-[2rem] overflow-hidden w-80 h-[600px]">
          {/* iPhone-style notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Device Toggle */}
      {onDeviceChange && (
        <div className="flex items-center justify-center mb-4 space-x-2">
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`p-2 rounded-lg transition-colors ${
              device === 'mobile'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-[#F8F8F8] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`p-2 rounded-lg transition-colors ${
              device === 'desktop'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-[#F8F8F8] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Preview Frame */}
      <DeviceFrame>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center bg-white dark:bg-black"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide bg-white dark:bg-black transition-colors duration-300"
              style={{
                padding: '32px 20px',
                background: `center center / cover no-repeat ${templateStyles.background}`,
                fontFamily: templateStyles.fontFamily,
                color: templateStyles.primaryColor
              }}
            >
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8 w-full"
                style={{ maxWidth: '260px' }}
              >
                {/* Profile Image */}
                <div className="mx-auto mb-6 overflow-hidden relative group w-20 h-20 rounded-2xl">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-[#E5E5E5] dark:border-[#333333] bg-[#F8F8F8] dark:bg-[#1A1A1A] text-[#444444] dark:text-[#CCCCCC] transition-colors duration-300">
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 opacity-60">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                          </svg>
                        </div>
                        <div className="text-xs text-[#444444] dark:text-[#CCCCCC] transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Add Photo
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Display Name */}
                <h1 
                  className="font-bold mb-3 text-black dark:text-white text-2xl transition-colors duration-300" 
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {formData.displayName || 'Your Name'}
                </h1>

                {/* Bio */}
                <p 
                  className="leading-relaxed mb-8 text-[#444444] dark:text-[#CCCCCC] text-sm transition-colors duration-300"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.6
                  }}
                >
                  {formData.bio || 'Your bio will appear here. Add a compelling description about yourself to engage your visitors and tell them what makes you unique.'}
                </p>
              </motion.div>

              {/* Social Links */}
              {formData.socialLinks && Object.entries(formData.socialLinks).some(([_, url]) => url) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center space-x-3 mb-8"
                >
                  {Object.entries(formData.socialLinks).map(([platform, url]) => {
                    if (!url) return null
                    const social = socialIcons[platform as keyof typeof socialIcons]
                    if (!social) return null
                    const Icon = social.icon

                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.bgGradient} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                </motion.div>
              )}

              {/* Custom Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full space-y-3"
                style={{ maxWidth: '260px' }}
              >
                {formData.customLinks && formData.customLinks.length > 0 ? (
                  formData.customLinks
                    .filter(link => link.title && link.url)
                    .map((link, index) => (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group block w-full p-4 bg-white dark:bg-black border-2 border-[#E5E5E5] dark:border-[#222222] rounded-xl hover:border-black dark:hover:border-white transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 
                              className="font-semibold text-black dark:text-white truncate mb-1"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {link.title}
                            </h3>
                            {link.description && (
                              <p 
                                className="text-sm text-[#444444] dark:text-[#CCCCCC] truncate"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {link.description}
                              </p>
                            )}
                          </div>
                          <ExternalLink className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC] group-hover:text-black dark:group-hover:text-white transition-colors ml-3 flex-shrink-0" />
                        </div>
                      </motion.a>
                    ))
                ) : (
                  <div className="text-center py-12 opacity-40">
                    <ExternalLink className="w-8 h-8 mx-auto mb-3 text-[#444444] dark:text-[#CCCCCC]" />
                    <p 
                      className="text-[#444444] dark:text-[#CCCCCC] text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Your links will appear here
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-6 text-xs text-center text-[#444444] dark:text-[#CCCCCC] transition-colors duration-300"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  opacity: 0.2
                }}
              >
                Powered by LinkNest
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DeviceFrame>

      {/* Update Timestamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-4"
      >
        <span 
          className="text-xs text-[#444444] dark:text-[#CCCCCC]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Updated {formatTimeAgo(lastUpdated)}
        </span>
      </motion.div>
    </div>
  )
}

export default PreviewFrame
