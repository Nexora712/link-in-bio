'use client'

import { useState, useCallback, memo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useNetworkStatus } from '@/lib/network-utils'
import { checkFirebaseConnectivity } from '@/lib/network-utils'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Wifi, WifiOff, ArrowLeft, Moon, Sun } from 'lucide-react'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/components/common/LoadingSpinner'

// Memoized Login Form Component
const LoginForm = memo(({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleLogin,
  handleGoogleLogin,
  isLoading,
  isOnline,
  isFirebaseOnline,
}: {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  isLoading: boolean;
  isOnline: boolean;
  isFirebaseOnline: boolean;
}) => {
  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2 font-['Clash_Display']">
          Welcome back 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Log in to access your dashboard
        </p>
      </div>

      {!isOnline && (
        <motion.div
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400 text-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <WifiOff className="w-4 h-4 mr-2" />
          You are currently offline. Please check your internet connection.
        </motion.div>
      )}

      {error && (
        <motion.div
          className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
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
                disabled={isLoading || !isOnline || !isFirebaseOnline}
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
                disabled={isLoading || !isOnline || !isFirebaseOnline}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            Forgot your password?
          </Link>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || !isOnline || !isFirebaseOnline}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </motion.button>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200 dark:border-[#1F1F1F]"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-200 dark:border-[#1F1F1F]"></div>
        </div>

        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || !isOnline || !isFirebaseOnline}
          className="w-full bg-gray-50 dark:bg-[#111111] text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-semibold border border-gray-200 dark:border-[#1F1F1F] hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Signing in...</span>
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
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-black dark:text-white hover:underline">
              Sign up →
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  )
})

LoginForm.displayName = 'LoginForm'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isOnline } = useNetworkStatus()
  const [isFirebaseOnline, setIsFirebaseOnline] = useState(true)
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

  // Check Firebase connectivity
  useEffect(() => {
    const checkConnectivity = async () => {
      const online = await checkFirebaseConnectivity()
      setIsFirebaseOnline(online)
      if (!online) {
        setError('Firebase is currently unavailable. Please check your internet connection and try again.')
      } else {
        setError(null)
      }
    }

    checkConnectivity()
    const intervalId = setInterval(checkConnectivity, 10000)
    return () => clearInterval(intervalId)
  }, [])

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading || !isOnline) return

    setIsLoading(true)
    setError(null)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userDocRef = doc(db, 'users', userCredential.user.uid)
      const userDoc = await getDoc(userDocRef)

      setIsLoading(false)

      if (userDoc.exists() && userDoc.data().onboardingCompleted) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.')
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.')
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.')
      } else if (error.code === 'auth/invalid-login-credentials') {
        setError('Invalid email or password. Please try again.')
      } else {
        setError(error.message || 'An error occurred during login. Please try again.')
      }
      setIsLoading(false)
    }
  }, [email, password, router, isLoading, isOnline])

  const handleGoogleLogin = useCallback(async () => {
    if (isLoading || !isOnline) return

    setIsLoading(true)
    setError(null)
    const provider = new GoogleAuthProvider()

    try {
      const userCredential = await signInWithPopup(auth, provider)
      const userDocRef = doc(db, 'users', userCredential.user.uid)
      const userDoc = await getDoc(userDocRef)

      setIsLoading(false)

      if (userDoc.exists() && userDoc.data().onboardingCompleted) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site and try again.')
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign in popup was closed. Please try again.')
      } else if (error.code !== 'auth/cancelled-popup-request') {
        setError(error.message || 'An error occurred during Google login. Please try again.')
      }
      setIsLoading(false)
    }
  }, [router, isLoading, isOnline])

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
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleLogin={handleLogin}
          handleGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
          isOnline={isOnline}
          isFirebaseOnline={isFirebaseOnline}
        />
      </div>

      {/* Network Status Indicator */}
      {!isOnline && (
        <motion.div
          className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WifiOff className="w-4 h-4 mr-2" />
          Offline
        </motion.div>
      )}

      {isOnline && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Wifi className="w-4 h-4 mr-2" />
          Online
        </motion.div>
      )}
    </div>
  )
}
