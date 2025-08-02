import Link from 'next/link'
import { ArrowRight, Sparkles, Palette, Smartphone, Zap, Users, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Themes",
      description: "Choose from multiple stunning themes or create your own custom design"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Perfect display on all devices - mobile, tablet, and desktop"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate your bio page instantly with our optimized tools"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Integration",
      description: "Connect all your social media profiles in one place"
    }
  ]

  const benefits = [
    "No coding required",
    "Custom themes and colors",
    "Mobile responsive design",
    "Social media integration",
    "Analytics tracking",
    "Custom domain support"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden border-b bg-background">
        <div className="relative container mx-auto px-4 py-8">
          <nav className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">LinkNest</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                Pricing
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Link-in-Bio</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn followers into clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/builder"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Creating Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="inline-flex items-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">Turn followers into clicks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have already built their perfect bio page.
            It only takes a few minutes to create something amazing.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Create Your Bio Page
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">LinkNest</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 LinkNest Generator. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}