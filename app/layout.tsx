import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dispatchready.org'),
  title: 'DispatchReady — 911 Dispatcher Test Prep',
  description:
    'Free 911 dispatcher test practice for typing, data entry, audio recall, memory, call summaries, and multitasking under pressure.',
  keywords: [
    'criticall practice test',
    'criticall test prep',
    '911 dispatcher test',
    'dispatcher practice test',
    'criticall data entry practice',
    'dispatcher typing test',
    'emergency dispatcher assessment practice',
  ],
  alternates: { canonical: '/' },
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
  return (
    <html
      lang="en"
      className="light bg-background"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
