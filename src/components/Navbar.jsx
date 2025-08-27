'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Moon,
  Sun
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { user, signOutUser } = useAuth();

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
    <motion.nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
            <Link href="/features" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Features</Link>
            <Link href="/templates" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Templates</Link>
            <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">About</Link>
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
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </motion.div>
                </Link>
                <button onClick={signOutUser} className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.div>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}