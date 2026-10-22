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
    ]
  },
}

export default nextConfig
