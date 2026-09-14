import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DispatchReady — 911 Dispatcher Test Prep',
    short_name: 'DispatchReady',
    description: 'Free practice for 911 dispatcher hiring-test skills.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f6f8',
    theme_color: '#1d4ed8',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
