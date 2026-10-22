import type { MetadataRoute } from 'next'

const siteUrl = 'https://dispatchready.org'
const publicRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/criticall-test', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/911-dispatcher-assessment-test', priority: 0.9, changeFrequency: 'weekly' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
