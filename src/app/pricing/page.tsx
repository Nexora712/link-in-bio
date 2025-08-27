'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Check, 
  Star, 
  Shield, 
  Clock, 
  Users,
  ArrowLeft,
  Zap,
  BarChart3,
  Palette,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { themeConfigs } from "@/lib/themes/theme-mappings"
import { useAuth } from '@/hooks/use-auth'
import Navbar from '@/components/Navbar'

interface PricingData {
  currency: 'INR' | 'USD'
  symbol: string
  free: number
  pro: {
    earlyBird: number
    current: number
    future: number
    nextFuture: number
  }
  premium: number
}

const pricingData: Record<'INR' | 'USD', PricingData> = {
  INR: {
    currency: 'INR',
    symbol: '₹',
    free: 0,
    pro: {
      earlyBird: 199,
      current: 299,
      future: 499,
      nextFuture: 799
    },
    premium: 799
  },
  USD: {
    currency: 'USD',
    symbol: '$',
    free: 0,
    pro: {
      earlyBird: 7,
      current: 9,
      future: 19,
      nextFuture: 29
    },
    premium: 29
  }
}

export default function PricingPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD')
  const [spotsLeft, setSpotsLeft] = useState(2)
  const { user } = useAuth()

  const currentPricing = pricingData[currency]
  const progressPercentage = ((10 - spotsLeft) / 10) * 100

  const plans = [
    {
      name: 'Free',
      price: currentPricing.free,
      popular: false,
      features: [
        'Access to 5 basic templates',
        'Default LinkNest branding',
        'Limited analytics (total clicks only)',
        '1 active bio page',
        'Community support'
      ],
      cta: 'Get Started Free',
      ctaVariant: 'outline' as const
    },
    {
      name: 'Pro',
      price: currentPricing.pro.current,
      popular: true,
      features: [
        'All templates unlocked',
        'Custom branding (logo, themes, colors)',
        'Advanced analytics (clicks, device, location)',
        'Unlimited bio pages',
        'Priority email support',
        'Early bird pricing available'
      ],
      cta: 'Lock My Price',
      ctaVariant: 'primary' as const
    },
    {
      name: 'Premium',
      price: currentPricing.premium,
      popular: false,
      features: [
        'Everything in Pro',
        'Exclusive premium templates',
        'Advanced analytics & engagement reports',
        'Team collaboration features',
        '1:1 priority support',
        'Grandfathered pricing guarantee'
      ],
      cta: 'Upgrade to Premium',
      ctaVariant: 'outline' as const
    }
  ]

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
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight mb-8 font-['Clash_Display']">
              Choose the Perfect Plan for{' '}
              <span className="text-gray-600 dark:text-gray-300">Your Growth</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Lock your price today before the next increase. Join creators building with LinkNest.
            </p>
            
            {/* Currency Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-lg p-1 flex">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    currency === 'INR'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  ₹ India
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    currency === 'USD'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  $ Global
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/get-started">
                <motion.button
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scarcity Bar for Pro Plan */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/50 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                  Early Bird Pricing
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Current Price: <span className="font-bold">{currentPricing.symbol}{currentPricing.pro.current}/month</span>. 
                Only <span className="font-bold text-orange-600 dark:text-orange-400">{spotsLeft} spots left</span> before it rises to {currentPricing.symbol}{currentPricing.pro.future}/month.
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {10 - spotsLeft} of 10 early bird spots taken
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`bg-white dark:bg-[#0A0A0A] border-2 rounded-2xl p-8 h-full transition-all duration-300 ${
                  plan.popular 
                    ? 'border-black dark:border-white shadow-2xl' 
                    : 'border-gray-200 dark:border-[#1F1F1F] hover:border-gray-300 dark:hover:border-gray-600 shadow-lg hover:shadow-xl'
                }`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 font-['Clash_Display']">
                      {plan.name}
                    </h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-black dark:text-white">
                        {currentPricing.symbol}{plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      plan.ctaVariant === 'primary'
                        ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                        : 'bg-gray-100 dark:bg-[#111111] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1F1F1F] hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
          >
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'SSL Secure Checkout',
                description: 'Your data is encrypted and protected'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Cancel Anytime',
                description: 'No long-term commitments required'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'No Hidden Fees',
                description: 'What you see is what you pay'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Trusted by Creators',
                description: '50,000+ active users worldwide'
              }
            ].map((trust, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-[#111111] rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <div className="text-black dark:text-white">
                    {trust.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-black dark:text-white mb-2">{trust.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{trust.description}</p>
              </motion.div>
            ))}
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
              Don't Wait. Prices Only Go Up as We Grow.
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Lock in your price today and start building your perfect link-in-bio page.
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
              
              <Link href="/templates">
                <motion.button
                  className="px-10 py-5 rounded-lg text-xl font-bold text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 border border-gray-600 dark:border-gray-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Templates
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
