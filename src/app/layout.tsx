import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from "@/context/AuthContext";
// Dynamically import Chatbot so it does not bloat the main bundle
import dynamic from 'next/dynamic'
const Chatbot = dynamic(() => import('@/components/common/chatbot'), { ssr: false })

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true })

export const metadata: Metadata = {
  title: 'Link-in-Bio Generator - Create Beautiful Bio Pages',
  description: 'Create stunning link-in-bio pages with custom themes, social media integration, and professional styling. Perfect for influencers, creators, and businesses.',
  keywords: 'link in bio, bio page, social media links, influencer tools, creator tools, bio link generator',
  authors: [{ name: 'Bio Links Generator' }],
  creator: 'Bio Links Generator',
  publisher: 'Bio Links Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Link-in-Bio Generator - Create Beautiful Bio Pages',
    description: 'Create stunning link-in-bio pages with custom themes, social media integration, and professional styling.',
    url: '/',
    siteName: 'Bio Links Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bio Links Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Link-in-Bio Generator - Create Beautiful Bio Pages',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Core meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#667eea" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Performance: preconnect to OpenRouter for AI endpoints */}
        <link rel="preconnect" href="https://openrouter.ai" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        {/* Chatbot loads after hydration and in a separate chunk */}
        <Chatbot />
      </body>
    </html>
  )
}