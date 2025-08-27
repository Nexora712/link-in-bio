const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable react strict mode for improved error handling
  reactStrictMode: true,
  
  // Enable compression to reduce bundle sizes
  compress: true,
  
  // Optimize images
  images: {
    // Add domains for external images if needed
    // domains: ['example.com'],
    
    // Enable image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact in production for smaller bundle size
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }
    
    return config
  },
  
  // Enable experimental optimizations
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },
  
  // Enable automatic static optimization
  poweredByHeader: false,
  
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)