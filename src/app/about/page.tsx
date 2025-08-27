'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Target, 
  Zap, 
  Users, 
  Shield,
  Heart,
  Lightbulb,
  TrendingUp,
  ArrowLeft
} from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight mb-6 font-['Clash_Display']">
              About LinkNest
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Helping creators turn followers into customers with the most intuitive link-in-bio experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 font-['Clash_Display']">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                We believe every creator deserves a professional online presence that converts. LinkNest was built to bridge the gap between social media followers and meaningful business outcomes.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Our platform empowers creators, influencers, and businesses to showcase their content, products, and services in a beautiful, conversion-optimized format that actually drives results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-12 shadow-2xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-black dark:bg-white rounded-2xl mx-auto mb-8 flex items-center justify-center">
                    <Target className="w-12 h-12 text-white dark:text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-4 font-['Clash_Display']">
                    Creators First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every feature we build starts with one question: How can we help creators succeed?
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 dark:bg-[#111111] rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-50 dark:bg-[#111111] rounded-full blur-2xl opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
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
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a simple idea to a platform trusted by thousands of creators worldwide.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  year: "2023",
                  title: "The Problem",
                  description: "We noticed creators struggling with clunky, expensive link-in-bio solutions that didn't convert visitors into customers."
                },
                {
                  year: "2024",
                  title: "Building the Solution",
                  description: "We spent months researching, designing, and building a platform that prioritizes both beauty and conversion optimization."
                },
                {
                  year: "2025",
                  title: "Growing Community",
                  description: "Today, LinkNest serves over 50,000 creators, helping them generate millions in revenue through their bio pages."
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row items-start gap-8"
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl flex items-center justify-center">
                      <span className="text-lg font-bold text-black dark:text-white font-['Clash_Display']">
                        {story.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 font-['Clash_Display']">
                      {story.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 font-['Clash_Display']">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Simplicity',
                description: 'We believe the best tools are the ones that get out of your way and let you focus on what matters.'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Performance',
                description: 'Every feature we build is optimized for speed, conversions, and user experience.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Community',
                description: 'We are driven by our community of creators and their feedback shapes our roadmap.'
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: 'Innovation',
                description: 'We continuously push boundaries to bring cutting-edge features to link-in-bio pages.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 h-full hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-[#111111] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div className="text-black dark:text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-['Clash_Display']">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The passionate individuals behind LinkNest, working to empower creators worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alex Johnson",
                role: "Co-Founder & CEO",
                bio: "Former product lead at major social platforms, passionate about creator economy."
              },
              {
                name: "Sarah Chen",
                role: "Co-Founder & CTO",
                bio: "Full-stack engineer with expertise in scalable systems and user experience."
              },
              {
                name: "Marcus Rodriguez",
                role: "Head of Design",
                bio: "Award-winning designer focused on conversion-optimized interfaces."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 text-center hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-[#0A0A0A] rounded-full mx-auto mb-6 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-black font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-['Clash_Display']">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
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
              Join thousands of creators who have already built their perfect bio page with LinkNest.
            </p>
            
            <Link href="/get-started">
              <motion.button
                className="bg-white dark:bg-black text-black dark:text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 inline-flex items-center"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your Bio Page
                <ArrowRight className="w-6 h-6 ml-3" />
              </motion.button>
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
                <li><Link href="/#features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link></li>
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
