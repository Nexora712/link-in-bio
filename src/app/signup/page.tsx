'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User as UserIcon, ArrowLeft, Moon, Sun, Check } from 'lucide-react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

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

  const createUserDocument = async (user: User) => {
    const userRef = doc(db, 'users', user.uid)
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: name || user.displayName,
      plan: 'free',
      joinedAt: serverTimestamp(),
    })
  }

  const handleSignup = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await createUserDocument(userCredential.user)
      router.push('/onboarding')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak')
      } else {
        setError(error.message || 'An error occurred during signup')
      }
      setIsLoading(false)
    }
  }, [name, email, password, confirmPassword, router])

  const handleGoogleSignup = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    setIsLoading(true)
    setError(null)

    try {
      const userCredential = await signInWithPopup(auth, provider)
      await createUserDocument(userCredential.user)
      router.push('/onboarding')
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site and try again.')
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign in popup was closed. Please try again.')
      } else if (error.code !== 'auth/cancelled-popup-request') {
        setError(error.message || 'An error occurred during Google signup')
      }
      setIsLoading(false)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] font-['Inter'] transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0A0A0A] dark:via-[#111111] dark:to-[#0A0A0A] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-transparent dark:from-gray-800/10"></div>

      {/* Top Navigation */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Link href="/">
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white font-['Clash_Display']">
                LinkNest
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 -mt-1">
                Your digital identity, simplified.
              </p>
            </div>
          </motion.div>
        </Link>

        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-[#111111] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          
          {/* Left Side - Branding */}
          <motion.div
            className="hidden lg:flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-black dark:text-white mb-6 font-['Clash_Display']">
                Unlock Your Digital Potential
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Join our community and start building your ultimate link-in-bio page today.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Build your page in minutes',
                'Free starter plan available', 
                'Join creators worldwide'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            className="w-full max-w-md mx-auto lg:mx-0 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2 font-['Clash_Display']">
                Join LinkNest 🚀
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Start building your digital home today
              </p>
            </div>

            {error && (
              <motion.div
                className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-[#0A0A0A] px-2 text-sm font-medium text-gray-700 dark:text-gray-300 z-10">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="Your full name"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-[#0A0A0A] px-2 text-sm font-medium text-gray-700 dark:text-gray-300 z-10">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-[#0A0A0A] px-2 text-sm font-medium text-gray-700 dark:text-gray-300 z-10">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-[#0A0A0A] px-2 text-sm font-medium text-gray-700 dark:text-gray-300 z-10">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-lg text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </motion.button>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-[#1F1F1F]"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-500">or continue with</span>
                <div className="flex-grow border-t border-gray-200 dark:border-[#1F1F1F]"></div>
              </div>

              <motion.button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="w-full bg-gray-50 dark:bg-[#111111] text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-semibold border border-gray-200 dark:border-[#1F1F1F] hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Creating account...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </motion.button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/signin" className="font-semibold text-black dark:text-white hover:underline">
                    Log in →
                  </Link>
                </p>
              </div>
            </form>

            {/* Mobile Benefits - Only show on small screens */}
            <div className="lg:hidden mt-8 pt-6 border-t border-gray-200 dark:border-[#1F1F1F]">
              <div className="space-y-3">
                {[
                  'Build your page in minutes',
                  'Free starter plan available', 
                  'Join creators worldwide'
                ].map((benefit, index) => (
                  <div key={benefit} className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
