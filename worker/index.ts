import handler from 'vinext/server/fetch-handler'
import { analyticsDashboard } from './analytics-dashboard'

const allowedEvents = new Set([
  'page_view',
  'visit_entry',
  'result_action',
  'pdf_download_click',
  'diagnostic_start',
  'diagnostic_complete',
  'drill_start',
  'drill_complete',
  'next_round_start',
  'exam_start',
  'exam_complete',
  'exam_timeout',
  'progress_view',
  'wpm_calculator_view',
  'wpm_calculation',
  'wpm_typing_test_click',
])

const allowedDrills = new Set(['entry', 'typing', 'memory', 'audio', 'summary', 'pressure', 'simulation', 'exam', 'criticall'])
const allowedDifficulties = new Set(['easy', 'normal', 'hard'])
const allowedSources = new Set(['search', 'social', 'referral', 'direct_unknown'])
const allowedActions = new Set(['practice', 'progress', 'retry'])
const trackedPages = new Set([
  '/', '/criticall-test', '/assessment', '/911-dispatcher-assessment-test', '/train', '/exam', '/progress',
  '/dispatcher-typing-test', '/data-entry-practice-test', '/memory-recall-test', '/criticall-multitasking-test',
  '/audio-data-entry-practice', '/criticall-practice-test-pdf', '/wpm-calculator', '/privacy', '/terms', '/refunds', '/contact',
])
const maxBodyBytes = 1024

type EventPayload = {
  event?: unknown
  path?: unknown
  drill?: unknown
  difficulty?: unknown
  browser?: unknown
  source?: unknown
  action?: unknown
}

async function readSmallBody(request: Request) {
  if (!request.body) return ''

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let bytes = 0
  let body = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > maxBodyBytes) {
      await reader.cancel()
      return null
    }
    body += decoder.decode(value, { stream: true })
  }

  return body + decoder.decode()
}

async function recordEvent(request: Request, env: Env) {
  const requestUrl = new URL(request.url)
  const origin = request.headers.get('origin')
  if (origin && origin !== requestUrl.origin) return new Response(null, { status: 403 })

  const rawBody = await readSmallBody(request)
  if (rawBody === null) return new Response(null, { status: 413 })

  let payload: EventPayload | null
  try {
    payload = JSON.parse(rawBody) as EventPayload
  } catch {
    return Response.json({ error: 'Invalid event payload.' }, { status: 400 })
  }

  if (!payload || typeof payload.event !== 'string' || !allowedEvents.has(payload.event)) {
    return Response.json({ error: 'Unknown event.' }, { status: 400 })
  }

  const path = typeof payload.path === 'string' && trackedPages.has(payload.path) ? payload.path : '(other)'
  const drill = typeof payload.drill === 'string' && allowedDrills.has(payload.drill) ? payload.drill : ''
  const difficulty = typeof payload.difficulty === 'string' && allowedDifficulties.has(payload.difficulty) ? payload.difficulty : ''
  const browser = typeof payload.browser === 'string' && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(payload.browser) ? payload.browser : ''
  const source = payload.event === 'visit_entry' && typeof payload.source === 'string' && allowedSources.has(payload.source) ? payload.source : ''
  const action = payload.event === 'result_action' && typeof payload.action === 'string' && allowedActions.has(payload.action) ? payload.action : ''
  if ((payload.event === 'visit_entry' && !source) || (payload.event === 'result_action' && !action)) return new Response(null, { status: 400 })

  env.FUNNEL_ANALYTICS.writeDataPoint({
    indexes: [payload.event],
    blobs: [payload.event, path, drill, difficulty, browser, source, action],
    doubles: [1],
  })

  return new Response(null, { status: 204 })
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    if (url.protocol === 'http:' || url.hostname === 'www.dispatchready.org') {
      url.protocol = 'https:'
      url.hostname = 'dispatchready.org'
      return Response.redirect(url.toString(), 308)
    }

    if (request.method === 'POST' && url.pathname === '/api/events') {
      return recordEvent(request, env)
    }
    if (url.pathname === '/api/events') return new Response(null, { status: 405 })
    if (url.pathname === '/admin/analytics' || url.pathname === '/admin/analytics/') {
      return analyticsDashboard(request, env)
    }

    return handler.fetch(request, env, ctx)
  },
} satisfies ExportedHandler<Env>
