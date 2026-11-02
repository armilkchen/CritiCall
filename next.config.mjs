/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/assessment',
        destination: '/911-dispatcher-assessment-test',
        permanent: true,
      },
      {
        source: '/911-dispatcher-typing-test',
        destination: '/dispatcher-typing-test',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
