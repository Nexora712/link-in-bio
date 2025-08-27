'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/auth-context"
import { LinkFormData } from "@/types/link"
import { motion } from "framer-motion"

// Navbar Component
import Navbar from "@/components/Navbar"

import DownloadButton from "@/components/builder/DownloadButton"

// Builder Components  
import ProfileSection from "@/components/builder/ProfileSection"
import SocialLinksSection from "@/components/builder/SocialLinksSection"
import CustomLinksSection from "@/components/builder/CustomLinksSection"
import TemplateSelector from "@/components/builder/TemplateSelector"
import PreviewFrame from "@/components/builder/PreviewFrame"

const BuilderPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  // Builder State
  const [formData, setFormData] = useState<LinkFormData>({
    displayName: '',
    bio: '',
    profileImage: null,
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      tiktok: ''
    },
    customLinks: [],
    template: 'minimal',
    templateStyles: {
      background: '#FFFFFF',
      fontFamily: 'Inter',
      primaryColor: '#000000',
      secondaryColor: '#444444',
      borderRadius: '12px',
      backgroundImage: null // Add background image support
    },
    theme: 'light'
  })

  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')

  // Load user data on mount
  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      handleAutoSave()
    }, 2000)

    return () => clearTimeout(saveTimeout)
  }, [formData])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            handleManualSave()
            break
          case 'z':
            if (!e.shiftKey) {
              e.preventDefault()
              // Implement undo functionality
            }
            break
          case 'y':
            e.preventDefault()
            // Implement redo functionality
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const loadUserData = async () => {
    setIsLoading(true)
    try {
      console.log('Loading user data...')
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoSave = async () => {
    if (isSaving) return
    
    setAutoSaveStatus('saving')
    try {
      console.log('Auto-saving data...', formData)
      await new Promise(resolve => setTimeout(resolve, 500))
      setAutoSaveStatus('saved')
    } catch (error) {
      console.error('Error auto-saving:', error)
      setAutoSaveStatus('error')
    }
  }

  const handleManualSave = async () => {
    setIsSaving(true)
    try {
      console.log('Manually saving data...', formData)
      await new Promise(resolve => setTimeout(resolve, 1500))
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleTemplateChange = (template: any) => {
    setFormData(prev => ({
      ...prev,
      template: template.id,
      templateStyles: {
        ...template.styles,
        backgroundImage: template.backgroundImage || null
      }
    }))
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Create Your Bio Page
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Real-time preview. Real-time magic.
            </motion.p>

            {/* Download Button */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mb-6"
  >
    <DownloadButton formData={formData} />
  </motion.div>
            
            {/* Auto-save Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex items-center justify-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${
                autoSaveStatus === 'saved' ? 'bg-green-500' : 
                autoSaveStatus === 'saving' ? 'bg-yellow-500 animate-pulse' : 
                'bg-red-500'
              }`} />
              <span 
                className="text-sm text-gray-500 dark:text-gray-400"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {autoSaveStatus === 'saved' ? 'All changes saved' : 
                 autoSaveStatus === 'saving' ? 'Saving...' : 
                 'Error saving changes'}
              </span>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Column: Editor Controls */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <ProfileSection
                  formData={formData}
                  setFormData={setFormData}
                />

                <SocialLinksSection
                  formData={formData}
                  setFormData={setFormData}
                />

                <CustomLinksSection
                  formData={formData}
                  setFormData={setFormData}
                />

                <TemplateSelector
                  selectedTemplate={formData.template}
                  onTemplateChange={handleTemplateChange}
                />
              </motion.div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-8"
              >
                <PreviewFrame
                  formData={formData}
                  device={previewDevice}
                  onDeviceChange={setPreviewDevice}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default BuilderPage