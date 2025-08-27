import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
// Remove the old theme provider import and use our updated providers
import dynamic from 'next/dynamic'
import { Providers } from './providers'

// Dynamically import components to avoid bloating the main bundle
const NotFoundErrorBoundary = dynamic(() => import('@/components/common/NotFoundErrorBoundary'), { 
  ssr: false 
})

const Chatbot = dynamic(() => import('@/components/common/chatbot'), { 
  ssr: false 
})

// Preload performance utilities
import { preloadResources } from '@/lib/performance-utils'

// Preload critical resources if running in browser
if (typeof window !== 'undefined') {
  preloadResources();
}

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap', 
  preload: true, 
  variable: '--font-inter' 
})

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
})

export const metadata: Metadata = {
  title: 'LinkNest - Create Beautiful Bio Pages',
  description: 'Create stunning link-in-bio pages with custom themes, social media integration, and professional styling. Perfect for influencers, creators, and businesses.',
  keywords: 'link in bio, bio page, social media links, influencer tools, creator tools, bio link generator',
  authors: [{ name: 'LinkNest' }],
  creator: 'LinkNest',
  publisher: 'LinkNest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'LinkNest - Create Beautiful Bio Pages',
    description: 'Create stunning link-in-bio pages with custom themes, social media integration, and professional styling.',
    url: '/',
    siteName: 'LinkNest',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkNest',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkNest - Create Beautiful Bio Pages',
    description: 'Create stunning link-in-bio pages with custom themes, social media integration, and professional styling.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Core meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Performance: preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance: preconnect to OpenRouter for AI endpoints */}
        <link rel="preconnect" href="https://openrouter.ai" />
        
        {/* SVG fallback for error prevention */}
        <style dangerouslySetInnerHTML={{
          __html: `
            svg { 
              display: block; 
              max-width: 100%; 
              height: auto; 
            }
          `
        }} />
        
        {/* Prevent FOUC (Flash of Unstyled Content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('linknest-theme') === 'dark' || 
                    (!localStorage.getItem('linknest-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Providers>
          <main className="relative">
            {children}
          </main>
          <Chatbot />
        </Providers>
      </body>
    </html>
  )
}
