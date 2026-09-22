import handler from 'vinext/server/fetch-handler'

const allowedEvents = new Set([
  'diagnostic_start',
  'diagnostic_complete',
  'drill_start',
  'drill_complete',
  'next_round_start',
  'exam_start',
  'exam_complete',
  'progress_view',
])

const allowedDrills = new Set(['entry', 'typing', 'memory', 'audio', 'summary', 'pressure', 'simulation', 'exam', 'criticall'])
const allowedDifficulties = new Set(['easy', 'normal', 'hard'])
const maxBodyBytes = 1024

type EventPayload = {
  event?: unknown
  path?: unknown
  drill?: unknown
  difficulty?: unknown
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

  let payload: EventPayload
  try {
    payload = JSON.parse(rawBody) as EventPayload
  } catch {
    return Response.json({ error: 'Invalid event payload.' }, { status: 400 })
  }

  if (typeof payload.event !== 'string' || !allowedEvents.has(payload.event)) {
    return Response.json({ error: 'Unknown event.' }, { status: 400 })
  }

  const path = typeof payload.path === 'string' && /^\/[a-z0-9/_-]*$/i.test(payload.path) ? payload.path.slice(0, 100) : '/'
  const drill = typeof payload.drill === 'string' && allowedDrills.has(payload.drill) ? payload.drill : ''
  const difficulty = typeof payload.difficulty === 'string' && allowedDifficulties.has(payload.difficulty) ? payload.difficulty : ''

  env.FUNNEL_ANALYTICS.writeDataPoint({
    indexes: [payload.event],
    blobs: [payload.event, path, drill, difficulty],
    doubles: [1],
  })

  return new Response(null, { status: 204 })
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    if (request.method === 'POST' && url.pathname === '/api/events') {
      return recordEvent(request, env)
    }
    if (url.pathname === '/api/events') return new Response(null, { status: 405 })

    return handler.fetch(request, env, ctx)
  },
} satisfies ExportedHandler<Env>
