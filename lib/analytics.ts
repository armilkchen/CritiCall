'use client'

export type FunnelEvent =
  | 'diagnostic_start'
  | 'diagnostic_complete'
  | 'drill_start'
  | 'drill_complete'
  | 'next_round_start'
  | 'exam_start'
  | 'exam_complete'
  | 'progress_view'

type FunnelProperties = {
  drill?: string
  difficulty?: string
}

export function trackFunnelEvent(event: FunnelEvent, properties: FunnelProperties = {}) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return

  const body = JSON.stringify({
    event,
    path: window.location.pathname,
    ...properties,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/events', new Blob([body], { type: 'application/json' }))
    return
  }

  void fetch('/api/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  })
}
