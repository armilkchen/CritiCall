import type { MetadataRoute } from 'next'

const siteUrl = 'https://dispatchready.org'

const publicRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly', lastModified: '2026-10-23T08:10:00.000Z' },
  { path: '/criticall-test', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-23T08:22:00.000Z' },
  { path: '/911-dispatcher-assessment-test', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-23T08:35:00.000Z' },
  { path: '/dispatcher-typing-test', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-10-23T08:48:00.000Z' },
  { path: '/data-entry-practice-test', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-10-23T09:02:00.000Z' },
  { path: '/memory-recall-test', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-10-23T09:16:00.000Z' },
  { path: '/criticall-multitasking-test', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-10-23T09:30:00.000Z' },
  { path: '/audio-data-entry-practice', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-10-23T09:44:00.000Z' },
  { path: '/criticall-practice-test-pdf', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-10-23T09:58:00.000Z' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
