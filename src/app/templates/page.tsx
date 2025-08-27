'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter, ExternalLink, ArrowRight, Zap, Smartphone, TrendingUp, Eye, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import Navbar from '@/components/Navbar'
import { getTemplates, Template } from '@/lib/firebase'

const categories = ["All", "Minimal", "Professional", "Creative", "Modern", "Spiritual"]

export default function TemplatesPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const { user } = useAuth()
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const fetchTemplates = async () => {
        setIsLoading(true)
        try {
          const templatesData = await getTemplates()
          if (templatesData.length === 0) {
            // Fallback templates with all required fields
            setTemplates([
              {
                id: 'minimal',
                name: 'Minimal Elegance',
                description: 'Clean and sophisticated design perfect for professionals who value clarity and focus.',
                category: 'Minimal',
                thumbnail: '/templates/minimal-thumb.png',
                tags: ['clean', 'simple', 'professional'],
                popularity: 95,
                createdAt: new Date().toISOString(),
                codeRef: 'minimal',
                tier: 'free'
              },
              {
                id: 'creative',
                name: 'Creative Canvas',
                description: 'Bold and artistic template for creative professionals who want to make an impact.',
                category: 'Creative',
                thumbnail: '/templates/creative-thumb.png',
                tags: ['artistic', 'bold', 'creative'],
                popularity: 87,
                createdAt: new Date().toISOString(),
                codeRef: 'creative',
                tier: 'pro'
              },
              {
                id: 'professional',
                name: 'Corporate Pro',
                description: 'Corporate-friendly design for business professionals and entrepreneurs.',
                category: 'Professional',
                thumbnail: '/templates/professional-thumb.png',
                tags: ['corporate', 'business', 'professional'],
                popularity: 92,
                createdAt: new Date().toISOString(),
                codeRef: 'professional',
                tier: 'free'
              },
              {
                id: 'modern',
                name: 'Modern Edge',
                description: 'Contemporary design with cutting-edge aesthetics for forward-thinking professionals.',
                category: 'Modern',
                thumbnail: '/templates/modern-thumb.png',
                tags: ['modern', 'contemporary', 'sleek'],
                popularity: 90,
                createdAt: new Date().toISOString(),
                codeRef: 'modern',
                tier: 'pro'
              },
              {
                id: 'spiritual',
                name: 'Spiritual Serenity',
                description: 'Peaceful and harmonious design for spiritual coaches and wellness professionals.',
                category: 'Spiritual',
                thumbnail: '/templates/spiritual-thumb.png',
                tags: ['spiritual', 'wellness', 'peaceful'],
                popularity: 84,
                createdAt: new Date().toISOString(),
                codeRef: 'spiritual',
                tier: 'pro'
              }
            ])
          } else {
            setTemplates(templatesData)
          }
        } catch (error) {
          console.error('Error fetching templates:', error)
          // Set fallback templates on error
          setTemplates([
            {
              id: 'minimal',
              name: 'Minimal Elegance',
              description: 'Clean and sophisticated design perfect for professionals.',
              category: 'Minimal',
              thumbnail: '/templates/minimal-thumb.png',
              tags: ['clean', 'simple'],
              popularity: 95,
              createdAt: new Date().toISOString(),
              codeRef: 'minimal',
              tier: 'free'
            }
          ])
        } finally {
          setIsLoading(false)
        }
      }
      fetchTemplates()
    }
  }, [mounted])

  const filteredTemplates = useMemo(() => {
    if (!templates || templates.length === 0) return []
    
    let filtered = templates

    // Filter by category with safe property access
    if (selectedCategory !== "All") {
      filtered = filtered.filter(template => 
        template?.category === selectedCategory
      )
    }

    // Filter by search query with safe property access and null coalescing
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(template => {
        const name = template?.name?.toLowerCase() ?? ""
        const description = template?.description?.toLowerCase() ?? ""
        const tags = template?.tags ?? []
        
        return (
          name.includes(query) ||
          description.includes(query) ||
          tags.some(tag => (tag?.toLowerCase() ?? "").includes(query))
        )
      })
    }

    // Sort templates with safe property access
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b?.createdAt ?? 0).getTime() - new Date(a?.createdAt ?? 0).getTime()
        case "oldest":
          return new Date(a?.createdAt ?? 0).getTime() - new Date(b?.createdAt ?? 0).getTime()
        case "name":
          return (a?.name ?? "").localeCompare(b?.name ?? "")
        default: // popular
          return (b?.popularity ?? 0) - (a?.popularity ?? 0)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy, templates])

  const useTemplate = useCallback((templateId: string) => {
    try {
      localStorage.setItem('selected-template', templateId)
    } catch (error) {
      console.warn('Could not save to localStorage:', error)
    }
    
    if (user) {
      router.push(`/builder?template=${encodeURIComponent(templateId)}`)
    } else {
      router.push(`/auth?redirect=${encodeURIComponent(`/builder?template=${templateId}`)}`)
    }
  }, [router, user])

  const previewTemplate = useCallback((templateId: string) => {
    const previewUrl = `/preview/${templateId}`
    window.open(previewUrl, '_blank', 'noopener,noreferrer')
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("popular")
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      <div className="bg-white dark:bg-black">
        {/* Back to Home Link */}
        <div className="container mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white leading-[0.9]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Templates That{' '}
              <span className="text-black dark:text-white">
                Convert
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#444444] dark:text-[#CCCCCC] mb-12 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Choose from premium, high-converting templates crafted by world-class designers. Customize in seconds — launch instantly.
            </p>
            <Link href="/builder">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Search + Filter Toolbar */}
        <div className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#444444] dark:text-[#CCCCCC] w-5 h-5" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-white dark:bg-black border-[#E5E5E5] dark:border-[#222222] text-black dark:text-white placeholder-[#444444] dark:placeholder-[#CCCCCC] rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* Category Filter Pills */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                          : 'bg-white dark:bg-black text-[#444444] dark:text-[#CCCCCC] border border-[#E5E5E5] dark:border-[#222222] hover:text-black dark:hover:text-white hover:shadow-sm'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-[#E5E5E5] dark:border-[#222222] rounded-xl bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>

              {/* Filter Summary */}
              {(searchQuery || selectedCategory !== "All") && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== "All" && ` in ${selectedCategory}`}
                  </div>
                  <Button
                    onClick={handleClearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Templates Grid */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              /* Loading State */
              <div className="text-center py-24">
                <div className="w-16 h-16 mx-auto mb-6 border-4 border-[#E5E5E5] dark:border-[#222222] border-t-black dark:border-t-white rounded-full animate-spin"></div>
                <p className="text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Loading templates...
                </p>
              </div>
            ) : filteredTemplates.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
                      {/* Template Preview */}
                      <div className="aspect-[4/3] bg-[#F8F8F8] dark:bg-[#111111] relative overflow-hidden">
                        {/* Template Thumbnail */}
                        <div className="absolute inset-0 p-6 flex items-center justify-center">
                          <div className="w-full max-w-[200px] h-full max-h-[150px] relative">
                            <img
                              src={template.thumbnail}
                              alt={`${template.name} template preview`}
                              className="w-full h-full object-contain rounded-lg shadow-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-20 h-20 mx-auto bg-white dark:bg-black rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center">
                                      <svg class="w-10 h-10 text-[#444444] dark:text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <p class="text-[#444444] dark:text-[#CCCCCC] text-sm font-medium mt-4 text-center" style="font-family: Inter, sans-serif">${template.name}</p>
                                  `;
                                }
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                          <Button
                            onClick={() => previewTemplate(template.id)}
                            size="sm"
                            className="bg-white/90 text-black hover:bg-white shadow-lg"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            onClick={() => useTemplate(template.id)}
                            size="sm"
                            className="bg-black text-white hover:bg-[#444444] shadow-lg"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Use Now
                          </Button>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl font-bold text-black dark:text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {template.name}
                          </CardTitle>
                          <Badge 
                            className={`ml-3 flex-shrink-0 ${
                              template.tier === 'pro' 
                                ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
                                : 'bg-[#F8F8F8] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC] border border-[#E5E5E5] dark:border-[#222222]'
                            }`}
                          >
                            {template.tier === 'pro' ? (
                              <>
                                <Sparkles className="w-3 h-3 mr-1" />
                                PRO
                              </>
                            ) : (
                              'FREE'
                            )}
                          </Badge>
                        </div>
                        <CardDescription className="text-[#444444] dark:text-[#CCCCCC] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardFooter className="pt-0 flex gap-3">
                        <Button
                          onClick={() => previewTemplate(template.id)}
                          variant="outline"
                          className="flex-1 border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#111111] transition-colors duration-200"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          onClick={() => useTemplate(template.id)}
                          className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-[#444444] dark:hover:bg-[#CCCCCC] transition-colors duration-200 shadow-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-24"
              >
                <div className="w-24 h-24 mx-auto mb-8 bg-[#F8F8F8] dark:bg-[#111111] rounded-full border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center">
                  <Filter className="w-12 h-12 text-[#444444] dark:text-[#CCCCCC]" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-black dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  No Templates Found
                </h3>
                <p className="text-lg text-[#444444] dark:text-[#CCCCCC] mb-8 max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                  We couldn't find any templates matching your criteria. Try adjusting your search or filters.
                </p>
                <Button
                  onClick={handleClearFilters}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#444444] dark:hover:bg-[#CCCCCC] px-8 py-3 shadow-lg"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="container mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] rounded-3xl p-16 text-center shadow-sm">
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-black dark:text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ready to Build Your Perfect Page?
              </h2>
              <p className="text-xl text-[#444444] dark:text-[#CCCCCC] mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Join thousands of creators who chose LinkNest to showcase their work and connect with their audience in style.
              </p>
              <Link href="/builder">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Start Building Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#111111] text-gray-600 dark:text-gray-400 py-16 border-t border-gray-200 dark:border-[#1F1F1F] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-black dark:text-white mb-4 font-['Clash_Display']">LinkNest</div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The premium platform for creating beautiful, high-converting link-in-bio pages.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4 font-['Clash_Display']">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/templates" className="hover:text-black dark:hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/analytics" className="hover:text-black dark:hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/integrations" className="hover:text-black dark:hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4 font-['Clash_Display']">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-black dark:hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4 font-['Clash_Display']">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-black dark:hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-black dark:hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/community" className="hover:text-black dark:hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/status" className="hover:text-black dark:hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-[#1F1F1F] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
              © 2025 LinkNest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Terms</Link>
              <Link href="/security" className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
