import type { Metadata } from 'next'

const siteUrl = 'https://dispatchready.org'

export function createSeoMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string
  description: string
  path: `/${string}` | '/'
  keywords?: string[]
}): Metadata {
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'DispatchReady',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export { siteUrl }
