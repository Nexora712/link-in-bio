'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Check, 
  ArrowRight, 
  Zap, 
  Globe, 
  BarChart3, 
  Shield, 
  Star, 
  Users,
  Palette,
  Smartphone,
  Link as LinkIcon,
  TrendingUp,
  Moon,
  Sun
} from 'lucide-react'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] font-['Inter'] transition-colors duration-300">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#1F1F1F] shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold text-black dark:text-white font-['Clash_Display'] font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              LinkNest
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/features" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Features</a>
              <a href="/templates" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Templates</a>
              <a href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Pricing</a>
              <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">About</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111111] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.div>
              </Link>
              <Link href="/signup" className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white dark:bg-[#0A0A0A]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-[#111111]/50"></div>
        </div>
        
        {/* Subtle Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gray-100 dark:bg-[#111111] rounded-full blur-3xl opacity-50"
          style={{ y: y1, opacity }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gray-50 dark:bg-[#111111] rounded-full blur-3xl opacity-30"
          style={{ y: y2, opacity }}
        ></motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-full text-sm text-gray-600 dark:text-gray-400 mb-8"
              >
                <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3 animate-pulse"></div>
                Trusted by 50,000+ creators worldwide
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight mb-6 font-['Clash_Display']">
                Create Your Perfect{' '}
                <span className="text-gray-600 dark:text-gray-300">
                  Link-in-Bio
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
                Transform your social media presence into a powerful conversion engine. 
                Turn followers into customers with beautiful, high-converting bio pages.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/signup" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Your Bio Page
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.div>
                </Link>
                
                <motion.button
                  className="px-8 py-4 rounded-lg text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#111111] transition-all duration-300 border border-gray-200 dark:border-[#1F1F1F]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Modern Geometric Shape */}
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-80 h-80 mx-auto"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gray-100 dark:bg-[#111111] rounded-3xl opacity-60 blur-xl"></div>
                    <div className="absolute inset-4 bg-gray-50 dark:bg-[#111111] rounded-2xl opacity-80 blur-lg"></div>
                    <div className="absolute inset-8 bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-[#1F1F1F] shadow-2xl">
                      <div className="p-8 h-full flex flex-col justify-center items-center">
                        <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl mb-4 flex items-center justify-center">
                          <LinkIcon className="w-8 h-8 text-white dark:text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-['Clash_Display']">Your Bio Page</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">Beautiful, responsive, and optimized for conversions</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 -left-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black dark:bg-white rounded-full"></div>
                    <span className="text-sm font-semibold text-black dark:text-white">+300% CTR</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-sm font-semibold text-black dark:text-white">50K+ Users</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 font-['Clash_Display']">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Powerful features designed to help you maximize your online presence and convert followers into customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Custom Domains',
                description: 'Use your own domain to build trust and brand recognition with your audience.'
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Advanced Analytics',
                description: 'Track clicks, views, and conversions with detailed insights and reports.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Enterprise Security',
                description: 'Bank-level security with SSL encryption and data protection compliance.'
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: 'Beautiful Themes',
                description: 'Choose from dozens of professionally designed themes that convert.'
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: 'Mobile Optimized',
                description: 'Perfect on every device with responsive design and fast loading.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Team Collaboration',
                description: 'Work together with your team to create and manage multiple bio pages.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 h-full hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-[#111111] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-black dark:text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-['Clash_Display']">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 font-['Clash_Display']">
                Why Choose LinkNest?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Join thousands of creators, businesses, and influencers who trust LinkNest to power their online presence.
              </p>

              <div className="space-y-6">
                {[
                  'Increase click-through rates by up to 300%',
                  'Professional design that builds trust',
                  '24/7 customer support and guidance',
                  'Mobile-optimized for all devices',
                  'SEO-friendly pages that rank well',
                  'Integrates with all major platforms'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-8 h-8 bg-gray-100 dark:bg-[#111111] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check className="w-5 h-5 text-black dark:text-white" />
                    </div>
                    <span className="text-lg text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                  <div className="text-gray-400 dark:text-gray-600 text-lg"><img src="/hero/dashboard_preview.png" alt="Premium Dashboard Preview" /></div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 dark:bg-[#111111] rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-50 dark:bg-[#111111] rounded-full blur-2xl opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black dark:bg-white transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-black mb-8 font-['Clash_Display']">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators who have already built their perfect bio page. 
              It only takes a few minutes to create something amazing.
            </p>
            
            <Link href="/signup" className="bg-white dark:bg-black text-black dark:text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 inline-flex items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your Bio Page
                <ArrowRight className="w-6 h-6 ml-3" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

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
                <li><a href="/features" className="hover:text-black dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="/templates" className="hover:text-black dark:hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4 font-['Clash_Display']">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-black dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Careers</a></li>
                <li><a href="/support" className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4 font-['Clash_Display']">Support</h4>
              <ul className="space-y-2">
                <li><a href="/support" className="hover:text-black dark:hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-[#1F1F1F] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
              © 2025 LinkNest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
