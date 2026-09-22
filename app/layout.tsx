import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { SiteFooter } from '@/components/site-footer'
import { safeJsonLd, siteUrl } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dispatchready.org'),
  title: 'DispatchReady — 911 Dispatcher Test Prep',
  description:
    'Free 911 dispatcher test practice for typing, data entry, audio recall, memory, call summaries, and multitasking under pressure.',
  openGraph: {
    title: 'DispatchReady — 911 Dispatcher Test Prep',
    description: 'Practice typing, data entry, audio recall, memory, call summaries, and multitasking under pressure.',
    url: '/',
    siteName: 'DispatchReady',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DispatchReady — 911 Dispatcher Test Prep',
    description: 'Free practice for dispatcher hiring-test skills.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1d4ed8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'DispatchReady',
        url: siteUrl,
        logo: `${siteUrl}/images/dispatchready-logo.png`,
        email: 'support@dispatchready.org',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'DispatchReady',
        url: siteUrl,
        description: 'Free practice tools for 911 dispatcher hiring-test skills.',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <html
      lang="en"
      className="light bg-background"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
