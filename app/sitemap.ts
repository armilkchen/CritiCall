import type { MetadataRoute } from 'next'

const siteUrl = 'https://dispatchready.org'
const publicRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/assessment', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/train', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/exam', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/progress', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/refunds', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'monthly' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
