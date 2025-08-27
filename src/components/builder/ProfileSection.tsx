'use client'

import { useState, useEffect } from "react"
import { User, Upload, Sparkles, Info, Camera } from "lucide-react"
import { motion } from "framer-motion"
import { LinkFormData } from "@/types/link"

interface ProfileSectionProps {
  formData: LinkFormData
  setFormData: (data: LinkFormData | ((prev: LinkFormData) => LinkFormData)) => void
}

const ProfileSection = ({ formData, setFormData }: ProfileSectionProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
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

  // Set initial image preview if profileImage exists
  useEffect(() => {
    if (formData.profileImage) {
      if (typeof formData.profileImage === 'string') {
        setImagePreview(formData.profileImage)
      } else if (formData.profileImage instanceof File) {
        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target?.result as string)
        reader.readAsDataURL(formData.profileImage)
      }
    }
  }, [formData.profileImage])

  const handleImageUpload = (file: File) => {
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, profileImage: file }))
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image smaller than 5MB')
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const aiSuggestions = [
        "Creative professional passionate about design, technology, and making meaningful connections.",
        "Digital innovator focused on building engaging experiences and sharing knowledge with the community.",
        "Designer and developer who loves crafting beautiful solutions for complex problems.",
        "Tech enthusiast dedicated to creating impactful digital experiences and fostering collaboration."
      ]
      const randomBio = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
      setFormData(prev => ({ ...prev, bio: randomBio }))
    } catch (error) {
      console.error('Error generating AI bio:', error)
    } finally {
      setIsGeneratingAI(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
            <User 
              className="w-6 h-6" 
              style={{ color: isDarkMode ? '#000000' : '#FFFFFF' }}
            />
          </div>
          <div>
            <h3 
              className="text-xl font-bold mb-1"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}
            >
              Profile Information
            </h3>
            <p 
              className="text-base"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: isDarkMode ? '#CCCCCC' : '#444444'
              }}
            >
              Your display name, bio, and photo
            </p>
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div 
        className="p-8 space-y-8"
        style={{ backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }}
      >
        
        {/* Profile Image Upload */}
        <div className="space-y-4">
          <label 
            className="flex items-center gap-3 text-sm font-semibold"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: isDarkMode ? '#FFFFFF' : '#000000'
            }}
          >
            Profile Photo
            <div className="group relative">
              <Info 
                className="w-4 h-4 cursor-help" 
                style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}
              />
              <div 
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg"
                style={{
                  backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
                  color: isDarkMode ? '#000000' : '#FFFFFF',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Upload PNG or JPG up to 5MB
              </div>
            </div>
          </label>
          
          <div className="flex items-start gap-6">
            {/* Image Preview */}
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-2xl border-2 overflow-hidden group"
                style={{
                  backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
                  borderColor: isDarkMode ? '#222222' : '#E5E5E5'
                }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera 
                      className="w-8 h-8" 
                      style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="flex-1">
              <div
                className="relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                  borderColor: isDragging 
                    ? (isDarkMode ? '#FFFFFF' : '#000000')
                    : (isDarkMode ? '#222222' : '#E5E5E5')
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('image-upload')?.click()}
                onMouseEnter={(e) => {
                  if (!isDragging) {
                    e.currentTarget.style.borderColor = isDarkMode ? '#444444' : '#CCCCCC'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDragging) {
                    e.currentTarget.style.borderColor = isDarkMode ? '#222222' : '#E5E5E5'
                  }
                }}
              >
                <div className="text-center">
                  <Upload 
                    className="w-8 h-8 mx-auto mb-3" 
                    style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}
                  />
                  <div 
                    className="text-sm mb-2"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: isDarkMode ? '#CCCCCC' : '#444444'
                    }}
                  >
                    Drop your image here, or{' '}
                    <span 
                      className="font-semibold hover:underline"
                      style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                    >
                      browse
                    </span>
                  </div>
                  <div 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: isDarkMode ? '#CCCCCC' : '#444444'
                    }}
                  >
                    PNG, JPG up to 5MB
                  </div>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display Name */}
        <div className="space-y-3">
          <label 
            className="flex items-center gap-3 text-sm font-semibold"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: isDarkMode ? '#FFFFFF' : '#000000'
            }}
          >
            Display Name
            <div className="group relative">
              <Info 
                className="w-4 h-4 cursor-help" 
                style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}
              />
              <div 
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg"
                style={{
                  backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
                  color: isDarkMode ? '#000000' : '#FFFFFF',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                This is how your name appears on your page
              </div>
            </div>
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
            placeholder="Enter your display name"
            className="w-full px-4 py-3 rounded-xl border transition-all duration-200"
            style={{
              backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
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

        {/* Bio */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label 
              className="flex items-center gap-3 text-sm font-semibold"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}
            >
              Bio
              <div className="group relative">
                <Info 
                  className="w-4 h-4 cursor-help" 
                  style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}
                />
                <div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg"
                  style={{
                    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
                    color: isDarkMode ? '#000000' : '#FFFFFF',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  A compelling description about yourself
                </div>
              </div>
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateAI}
              disabled={isGeneratingAI}
              className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-full border transition-colors disabled:opacity-50"
              style={{
                backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
                borderColor: isDarkMode ? '#222222' : '#E5E5E5',
                color: isDarkMode ? '#FFFFFF' : '#000000',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#222222' : '#E5E5E5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#111111' : '#F8F8F8'
              }}
            >
              <Sparkles className={`w-3 h-3 ${isGeneratingAI ? 'animate-spin' : ''}`} />
              {isGeneratingAI ? 'Generating...' : 'Generate with AI'}
            </motion.button>
          </div>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell people about yourself and what you do..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border resize-none transition-all duration-200 leading-relaxed"
            style={{
              backgroundColor: isDarkMode ? '#111111' : '#F8F8F8',
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
          <div 
            className="flex items-center justify-between text-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}>
              Write a compelling bio that tells visitors about you
            </span>
            <span style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}>
              {formData.bio?.length || 0}/500
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileSection
