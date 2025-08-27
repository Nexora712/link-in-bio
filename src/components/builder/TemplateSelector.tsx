'use client'

import { useState, useEffect } from "react"
import { Palette, Check, Crown, Loader2, X, Eye, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link";

interface Template {
  id: string
  name: string
  tier: "free" | "pro"
  thumbnail: string
  description?: string
  styles: {
    background: string
    fontFamily: string
    primaryColor: string
    secondaryColor?: string
    [key: string]: any
  }
}

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (template: Template) => void
}

const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [showProModal, setShowProModal] = useState(false)
  const [selectedProTemplate, setSelectedProTemplate] = useState<Template | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const { user, userProfile } = useAuth()
  const isProUser = userProfile?.plan === 'pro' || false

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

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const templatesRef = collection(db, "templates")
      const snapshot = await getDocs(templatesRef)
      
      const templatesData: Template[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        
        // Clean thumbnail URL if it has extra quotes
        let thumbnail = data.thumbnail || ''
        if (thumbnail.startsWith('"') && thumbnail.endsWith('"')) {
          thumbnail = thumbnail.slice(1, -1)
        }
        
        templatesData.push({ 
          id: doc.id, 
          ...data,
          thumbnail: thumbnail 
        } as Template)
      })
      
      setTemplates(templatesData)
      
      if (templatesData.length === 0) {
        // Fallback templates with enhanced descriptions
        setTemplates([
          {
            id: 'minimal',
            name: 'Minimal',
            tier: 'free',
            description: 'Clean and simple design focusing on content',
            thumbnail: '/templates/minimal-thumb.png',
            styles: {
              background: '#FFFFFF',
              fontFamily: 'Inter',
              primaryColor: '#000000',
              secondaryColor: '#444444'
            }
          },
          {
            id: 'modern',
            name: 'Modern',
            tier: 'pro',
            description: 'Contemporary design with bold typography',
            thumbnail: '/templates/modern-thumb.png',
            styles: {
              background: '#000000',
              fontFamily: 'Inter',
              primaryColor: '#FFFFFF',
              secondaryColor: '#CCCCCC'
            }
          },
          {
            id: 'elegant',
            name: 'Elegant',
            tier: 'pro',
            description: 'Sophisticated layout with premium styling',
            thumbnail: '/templates/elegant-thumb.png',
            styles: {
              background: '#F8F8F8',
              fontFamily: 'Playfair Display',
              primaryColor: '#000000',
              secondaryColor: '#444444'
            }
          },
          {
            id: 'creative',
            name: 'Creative',
            tier: 'pro',
            description: 'Bold and artistic design for creatives',
            thumbnail: '/templates/creative-thumb.png',
            styles: {
              background: '#FFFFFF',
              fontFamily: 'Inter',
              primaryColor: '#000000',
              secondaryColor: '#444444'
            }
          }
        ])
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
      // Fallback templates on error
      setTemplates([
        {
          id: 'minimal',
          name: 'Minimal',
          tier: 'free',
          description: 'Clean and simple design focusing on content',
          thumbnail: '/templates/minimal-thumb.png',
          styles: {
            background: '#FFFFFF',
            fontFamily: 'Inter',
            primaryColor: '#000000',
            secondaryColor: '#444444'
          }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateSelect = (template: Template) => {
    if (template.tier === 'pro' && !isProUser) {
      setSelectedProTemplate(template)
      setShowProModal(true)
      return
    }

    onTemplateChange(template)
  }

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId)
    // Auto-hide preview after 3 seconds
    setTimeout(() => setPreviewTemplate(null), 3000)
  }

  const getFreeTemplatesCount = () => templates.filter(t => t.tier === 'free').length
  const getProTemplatesCount = () => templates.filter(t => t.tier === 'pro').length

  const TemplateCard = ({ template }: { template: Template }) => {
    const isSelected = selectedTemplate === template.id
    const isLocked = template.tier === 'pro' && !isProUser
    const isPreviewing = previewTemplate === template.id
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className={`group relative rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${isPreviewing ? 'ring-4' : ''} ${isDarkMode ? 'dark-mode-template' : 'light-mode-template'} ${isSelected ? 'selected-template' : ''}`}
        style={isPreviewing ? { '--ring-color': isDarkMode ? '#FFFFFF40' : '#00000040' } as React.CSSProperties : {}}
      >
        {/* Template Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={template.thumbnail} 
            alt={`${template.name} template preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjhGOEY4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzQ0NDQ0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='
            }}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            {!isLocked && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePreview(template.id)
                }}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all"
              >
                <Eye className="w-5 h-5 text-white" />
              </button>
            )}
            <button
              onClick={() => handleTemplateSelect(template)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all"
            >
              {isLocked ? (
                <Crown className="w-5 h-5 text-white" />
              ) : (
                <Check className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Pro Badge */}
          {template.tier === 'pro' && (
            <div className="absolute top-4 right-4 pro-badge">
              <span 
                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full shadow-lg template-pro-badge"
              >
                <Crown className="w-3 h-3" />
                PRO
              </span>
            </div>
          )}

          {/* Selected Indicator */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${isDarkMode ? 'dark-mode-selected' : 'light-mode-selected'}`}
            >
              <Check
                className="w-5 h-5" 
              />
            </motion.div>
          )}

          {/* Preview Indicator */}
          {isPreviewing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-3 left-3 right-3 px-2 py-1 rounded-md text-center text-xs previewing-indicator"
            >
              Previewing...
            </motion.div>
          )}
        </div>

        {/* Template Info */}
        <div 
          className="p-6 template-info"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 
                className="font-bold text-lg mb-2 template-name"
              >
                {template.name}
              </h4>
              {template.description && (
                <p 
                  className="text-sm template-description"
                >
                  {template.description}
                </p>
              )}
            </div>
            
            {template.tier === 'free' && (
              <span 
                className="text-xs font-bold px-3 py-1.5 rounded-full ml-3 border free-template-badge"
              >
                FREE
              </span>
            )}
          </div>
          
          {/* Color Palette Preview */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div 
                className="w-5 h-5 rounded-full border-2"
                style={{ 
                  backgroundColor: template.styles.background,
                  borderColor: isDarkMode ? '#222222' : '#E5E5E5'
                }}
              />
              <div 
                className="w-5 h-5 rounded-full border-2"
                style={{ 
                  backgroundColor: template.styles.primaryColor,
                  borderColor: isDarkMode ? '#222222' : '#E5E5E5'
                }}
              />
              {template.styles.secondaryColor && (
                <div 
                  className="w-5 h-5 rounded-full border-2"
                  style={{ 
                    backgroundColor: template.styles.secondaryColor,
                    borderColor: isDarkMode ? '#222222' : '#E5E5E5'
                  }}
                />
              )}
            </div>
            <span 
              className="text-xs template-font"
            >
              {template.styles.fontFamily}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  const ProUpgradeModal = () => {
    return (
      <AnimatePresence>
        {showProModal && selectedProTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pro-modal-overlay"
            onClick={() => setShowProModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl p-8 w-full max-w-lg shadow-2xl border pro-modal-content"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold template-modal-title">
                    Upgrade to Pro
                  </h3>
                </div>
                <button
                  onClick={() => setShowProModal(false)}
                  className="p-2 hover:opacity-70 transition-opacity rounded-lg pro-modal-close-button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Template Preview */}
              <div className="mb-6">
                <img
                  src={selectedProTemplate.thumbnail}
                  alt={selectedProTemplate.name}
                  className="w-full h-48 object-cover rounded-xl border"
                />
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold mb-3 template-modal-template-name">
                  {selectedProTemplate.name} Template
                </h4>
                <p className="mb-6 template-modal-description">
                  {selectedProTemplate?.description || `The ${selectedProTemplate?.name} template is available with Pro.`}
                </p>
                <div className="rounded-xl p-4 border pro-modal-features">
                  <h5 className="font-semibold mb-3 template-modal-features-title">
                    Pro Features Include:
                  </h5>
                  <ul className="text-sm space-y-2 text-left template-modal-features-list">
                    <li>• Premium template designs</li>
                    <li>• Advanced customization options</li>
                    <li>• Priority customer support</li>
                    <li>• Analytics and insights</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl transition-colors font-semibold pro-modal-maybe-later"
                >
                  Maybe Later
                </button>
                <Link href="/pricing" className="flex-1">
                  <button 
                    className="w-full px-4 py-3 font-bold rounded-xl transition-all shadow-lg pro-modal-upgrade"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Upgrade Now
                    </span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <>
      <style jsx>{`
        .template-selector {
          background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
          border: 1px solid ${isDarkMode ? '#222222' : '#E5E5E5'};
        }
        .section-header {
          background-color: ${isDarkMode ? '#111111' : '#F8F8F8'};
          border-bottom-color: ${isDarkMode ? '#222222' : '#E5E5E5'};
        }
        .palette-icon {
          background-color: ${isDarkMode ? '#FFFFFF' : '#000000'};
        }
        .loading-spinner {
          border-color: ${isDarkMode ? '#FFFFFF' : '#000000'};
          border-top-color: transparent;
        }
        .templates-info {
          background-color: ${isDarkMode ? '#111111' : '#F8F8F8'};
          border-color: ${isDarkMode ? '#222222' : '#E5E5E5'};
        }
        .pro-modal-content {
          background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
          border-color: ${isDarkMode ? '#222222' : '#E5E5E5'};
        }
        .pro-modal-close-button {
          background-color: ${isDarkMode ? '#111111' : '#F8F8F8'};
        }
        .pro-modal-features {
          background-color: ${isDarkMode ? '#111111' : '#F8F8F8'};
          border-color: ${isDarkMode ? '#222222' : '#E5E5E5'};
        }
        .pro-modal-maybe-later {
          background-color: ${isDarkMode ? '#111111' : '#F8F8F8'};
          color: ${isDarkMode ? '#CCCCCC' : '#444444'};
          border-color: ${isDarkMode ? '#222222' : '#E5E5E5'};
          border: 1px solid;
          font-family: 'Inter, sans-serif';
        }
        .pro-modal-upgrade {
          background-color: ${isDarkMode ? '#FFFFFF' : '#000000'};
          color: ${isDarkMode ? '#000000' : '#FFFFFF'};
          font-family: 'Inter, sans-serif';
        }
        .dark-mode-selected {
          background-color: #FFFFFF;
        }
        .light-mode-selected {
          background-color: #000000;
        }
        .template-info {
          background-color: ${isDarkMode ? '#111111' : '#F8F8F8'};
        }
        .free-template-badge {
          font-family: 'Inter, sans-serif';
          color: ${isDarkMode ? '#FFFFFF' : '#000000'};
          background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
          border-color: ${isDarkMode ? '#222222' : '#E5E5E5'};
        }
        .template-name {
          font-family: 'Playfair Display, serif';
          color: ${isDarkMode ? '#FFFFFF' : '#000000'};
        }
        .template-description {
          font-family: 'Inter, sans-serif';
          color: ${isDarkMode ? '#CCCCCC' : '#444444'};
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl overflow-hidden shadow-sm template-selector"
      >
        {/* Section Header */}
        <div
          className="p-8 border-b section-header"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm palette-icon"
            >
              <Palette
                className="w-6 h-6 palette-icon-inner"
              />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl font-bold mb-1 template-name"
              >
                Choose Template
              </h3>
              <p
                className="text-base template-description"
              >
                Select a design that matches your style
              </p>
            </div>
            <div className="text-right">
              <div
                className="text-sm font-semibold template-font"
              >
                {getFreeTemplatesCount()} Free • {getProTemplatesCount()} Pro
              </div>
              <div
                className="text-xs template-font"
              >
                {templates.length} total templates
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div
          className="p-8 section-content"
        >
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <motion.div
                className="w-8 h-8 border-4 border-t-transparent rounded-full loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span
                className="ml-4 text-base template-font"
              >
                Loading templates...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {templates.map((template, index) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}

          {/* Templates Info */}
          {templates.length > 0 && (
            <div className="mt-8 p-6 rounded-xl border templates-info">
              <h4 className="font-bold mb-3 template-name">Template Selection Tips</h4>
              <p className="mb-4 text-sm template-description">
                Choose a template that best represents your personality and brand. You can always change it later.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="template-font">{getFreeTemplatesCount()} Free templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="template-font">{getProTemplatesCount()} Pro templates</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

            {/* Pro Upgrade Modal */}
      <ProUpgradeModal />
    </>
  )
}

export default TemplateSelector
