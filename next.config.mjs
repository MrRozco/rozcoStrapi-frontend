/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'faithful-thrill-248faae4b1.media.strapiapp.com', // Add your Strapi media domain here
      'faithful-thrill-248faae4b1.strapiapp.com',
    ],
  },
  // Ensure pages are properly generated at build time
  experimental: {
    isrMemoryCacheSize: 0, // Disable ISR memory cache on Vercel (use disk cache)
  },
  // Log build info
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // Keep pages in memory for 1 hour
  },
};

export default nextConfig;