'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Palette, BarChart3, Shuffle, Shield, Bot, Play, ArrowLeft, Quote } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] font-['Inter'] transition-colors duration-300">
      <Navbar />

      {/* Back to Home Link */}
      <div className="container mx-auto px-6 pt-8">
        <Link href="/">
          <motion.div
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </motion.div>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight mb-8 font-['Clash_Display']">
              Everything You Need to Turn{' '}
              <span className="text-gray-600 dark:text-gray-300">Followers Into Customers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-4xl mx-auto">
              From AI-powered tools to stunning templates, LinkNest gives you the unfair advantage to grow, convert, and scale.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/get-started">
                <motion.button
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              
              <motion.button
                className="px-8 py-4 rounded-lg text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#111111] transition-all duration-300 border border-gray-200 dark:border-[#1F1F1F] flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Bot className="w-10 h-10" />,
                title: 'AI Bio Generator',
                description: 'Stop struggling with words. Instantly craft captivating bios that spark attention and build trust — powered by AI trained for creators.'
              },
              {
                icon: <Shuffle className="w-10 h-10" />,
                title: 'Drag-and-Drop Builder',
                description: 'No coding. No complexity. Customize your page with a simple, fluid editor that feels effortless yet powerful.'
              },
              {
                icon: <Palette className="w-10 h-10" />,
                title: 'Premium Templates',
                description: 'Choose from world-class, conversion-optimized templates designed to make your brand stand out — sleek, bold, unforgettable.'
              },
              {
                icon: <BarChart3 className="w-10 h-10" />,
                title: 'Analytics That Convert',
                description: 'Numbers that actually matter. See where your traffic comes from, what clicks, and what drives growth — all in one dashboard.'
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: 'All-in-One Integrations',
                description: 'From Instagram to Shopify, YouTube to Calendly — connect everything you need into one seamless hub.'
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Scalable & Secure',
                description: 'Whether you\'re just starting out or scaling to millions, LinkNest delivers enterprise-grade performance and ironclad security.'
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
                  {/* Feature Icon */}
                  <div className="w-20 h-20 bg-gray-100 dark:bg-[#111111] rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-black dark:text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Feature Content */}
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-6 font-['Clash_Display']">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Screenshot Placeholder */}
                  <div className="mt-8 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-xl h-48 flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-600 text-sm">Feature Screenshot</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 font-['Clash_Display']">
              Trusted by 50,000+ Creators Worldwide
            </h2>
          </motion.div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "LinkNest transformed my Instagram bio into a revenue machine. I've never seen conversion rates this high.",
                author: "Sarah Johnson",
                role: "Content Creator",
                avatar: "SJ"
              },
              {
                quote: "The AI bio generator alone saved me hours of writing. It perfectly captured my brand voice.",
                author: "Marcus Chen",
                role: "Digital Marketer",
                avatar: "MC"
              },
              {
                quote: "Finally, a link-in-bio tool that doesn't look like everyone else's. My brand stands out now.",
                author: "Emma Rodriguez",
                role: "Influencer",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8"
              >
                <Quote className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-6" />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mr-4">
                    <span className="text-white dark:text-black font-bold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">{testimonial.author}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Brand Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-8">Featured in and used by creators from:</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {['TechCrunch', 'Forbes', 'Mashable', 'Product Hunt', 'The Verge'].map((brand, index) => (
                <div key={index} className="bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-lg px-6 py-3">
                  <span className="text-gray-500 dark:text-gray-500 font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
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
              Ready to Build Your Perfect Link-in-Bio?
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators who are already turning their followers into customers with LinkNest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <motion.button
                  className="bg-white dark:bg-black text-black dark:text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 inline-flex items-center"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                  <ArrowRight className="w-6 h-6 ml-3" />
                </motion.button>
              </Link>
              
              <Link href="/pricing">
                <motion.button
                  className="px-10 py-5 rounded-lg text-xl font-bold text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 border border-gray-600 dark:border-gray-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Pricing
                </motion.button>
              </Link>
            </div>
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
  )
}
