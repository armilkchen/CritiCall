'use client'

export type FunnelEvent =
  | 'page_view'
  | 'visit_entry'
  | 'result_action'
  | 'pdf_download_click'
  | 'diagnostic_start'
  | 'diagnostic_complete'
  | 'drill_start'
  | 'drill_complete'
  | 'next_round_start'
  | 'exam_start'
  | 'exam_complete'
  | 'exam_timeout'
  | 'progress_view'
  | 'wpm_calculator_view'
  | 'wpm_calculation'
  | 'wpm_typing_test_click'

type FunnelProperties = {
  drill?: string
  difficulty?: string
  source?: 'search' | 'social' | 'referral' | 'direct_unknown'
  action?: 'practice' | 'progress' | 'retry'
}

function dailyBrowser() {
  try {
    const day = new Date().toISOString().slice(0, 10)
    const key = 'dispatchready.analytics-day'
    const stored = window.localStorage.getItem(key)
    if (stored?.startsWith(`${day}:`)) return stored.slice(day.length + 1)

    const browser = window.crypto.randomUUID()
    window.localStorage.setItem(key, `${day}:${browser}`)
    return browser
  } catch {
    return undefined
  }
}

export function trackFunnelEvent(event: FunnelEvent, properties: FunnelProperties = {}) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return

  const body = JSON.stringify({
    event,
    path: window.location.pathname,
    browser: dailyBrowser(),
    ...properties,
  })

  if (navigator.sendBeacon?.('/api/events', new Blob([body], { type: 'application/json' }))) return

  void fetch('/api/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}
