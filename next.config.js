/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'ltdtgkmvljsrfroeljyw.supabase.co']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
