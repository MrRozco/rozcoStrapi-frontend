/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'faithful-thrill-248faae4b1.media.strapiapp.com', // Add your Strapi media domain here
      'faithful-thrill-248faae4b1.strapiapp.com',
    ],
  },
};

export default nextConfig;