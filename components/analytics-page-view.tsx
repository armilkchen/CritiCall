'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackFunnelEvent } from '@/lib/analytics'

export function AnalyticsPageView() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return
    const firstPage = lastPath.current === null
    lastPath.current = pathname
    trackFunnelEvent('page_view')
    if (!firstPage) return

    if (!document.referrer) {
      trackFunnelEvent('visit_entry', { source: 'direct_unknown' })
      return
    }

    const referrer = new URL(document.referrer)
    const host = referrer.hostname.toLowerCase()
    if (referrer.origin === window.location.origin || host === 'www.dispatchready.org' || host === 'dispatchready.org') return

    const matchesDomain = (domain: string) => host === domain || host.endsWith(`.${domain}`)
    const search = /(?:^|\.)google\.(?:com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(host)
      || ['bing.com', 'duckduckgo.com', 'search.yahoo.com', 'search.brave.com', 'ecosia.org'].some(matchesDomain)
    const social = ['reddit.com', 'facebook.com', 'instagram.com', 'youtube.com', 'tiktok.com', 'linkedin.com', 'x.com', 't.co'].some(matchesDomain)
    trackFunnelEvent('visit_entry', { source: search ? 'search' : social ? 'social' : 'referral' })
  }, [pathname])

  return null
}
