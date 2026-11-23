import { createHash, timingSafeEqual } from 'node:crypto'

type AnalyticsSecrets = {
  ANALYTICS_ADMIN_USERNAME?: string
  ANALYTICS_ADMIN_PASSWORD?: string
  ANALYTICS_ACCOUNT_ID?: string
  ANALYTICS_READ_TOKEN?: string
}

type DailyRow = { day: string; browsers: number; total: number }
type EventRow = { event: string; path: string; drill: string; source: string; action: string; total: number }

const headers = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
}

const trainingEvents = "'diagnostic_start', 'diagnostic_complete', 'drill_start', 'drill_complete', 'next_round_start', 'exam_start', 'exam_complete', 'exam_timeout'"
const sourceLabels = new Map([
  ['search', 'Search'], ['social', 'Social'], ['referral', 'Other referral'], ['direct_unknown', 'Direct / unknown'],
])
const conversionPages = new Set([
  '/criticall-test', '/911-dispatcher-assessment-test', '/dispatcher-typing-test', '/data-entry-practice-test',
  '/memory-recall-test', '/criticall-multitasking-test', '/audio-data-entry-practice', '/exam',
])
const labels = new Map(Object.entries({
  criticall: 'CritiCall practice test',
  '/911-dispatcher-assessment-test': 'Pressure assessment',
  '/assessment': 'Pressure assessment',
  typing: 'Typing', entry: 'Data entry', memory: 'Memory recall', audio: 'Audio data entry',
  summary: 'Call summary', pressure: 'Multitasking', simulation: 'Full simulation', exam: 'Timed exam',
}))

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function authorize(request: Request, username: string, password: string) {
  const credentials = request.headers.get('Authorization')?.match(/^Basic ([A-Za-z0-9+/=]+)$/i)?.[1]
  if (!credentials) return false

  try {
    const actual = createHash('sha256').update(atob(credentials), 'latin1').digest()
    const expected = createHash('sha256').update(`${username}:${password}`, 'utf8').digest()
    return timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

async function query<T>(accountId: string, token: string, sql: string) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
    body: sql,
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) throw new Error(`Analytics SQL returned ${response.status}`)
  const result = await response.json<{ data: T[] }>()
  return result.data
}

function conversionTables(events: EventRow[]) {
  const entries = new Map<string, { path: string; source: string; count: number }>()
  const funnels = new Map<string, { views: number; starts: number; completes: number; timeouts: number }>()
  const resultActions = new Map<string, { practice: number; progress: number; retry: number }>()

  for (const { event, path, source, action, total } of events) {
    const count = Number(total)
    const sourceName = sourceLabels.get(source)
    if (event === 'visit_entry' && sourceName) {
      const key = `${path}:${source}`
      const entry = entries.get(key) ?? { path, source: sourceName, count: 0 }
      entry.count += count
      entries.set(key, entry)
    }
    if (event === 'result_action' && (action === 'practice' || action === 'progress' || action === 'retry')) {
      const counts = resultActions.get(path) ?? { practice: 0, progress: 0, retry: 0 }
      counts[action] += count
      resultActions.set(path, counts)
    }
    if (!conversionPages.has(path)) continue
    const counts = funnels.get(path) ?? { views: 0, starts: 0, completes: 0, timeouts: 0 }
    if (event === 'page_view') counts.views += count
    if (event === 'diagnostic_start' || event === 'drill_start' || event === 'exam_start') counts.starts += count
    if (event === 'diagnostic_complete' || event === 'drill_complete' || event === 'exam_complete') counts.completes += count
    if (event === 'exam_timeout') counts.timeouts += count
    funnels.set(path, counts)
  }

  const table = (columns: string[], rows: string, empty: string) => rows
    ? `<table><thead><tr>${columns.map((column) => `<th scope="col">${column}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`
    : `<p>${empty}</p>`
  const row = (label: string, ...cells: (string | number)[]) => `<tr><th scope="row">${escapeHtml(label)}</th>${cells.map((cell) => `<td>${escapeHtml(String(cell))}</td>`).join('')}</tr>`
  const entryRows = [...entries.values()].sort((a, b) => b.count - a.count).map(({ path, source, count }) => row(path, source, count)).join('')
  const funnelRows = [...funnels].sort(([, a], [, b]) => b.views - a.views).map(([path, counts]) => row(path, counts.views, counts.starts, counts.completes, counts.timeouts)).join('')
  const actionRows = [...resultActions].sort(([a], [b]) => a.localeCompare(b)).map(([path, counts]) => row(path, counts.practice, counts.progress, counts.retry)).join('')

  return `<section aria-labelledby="conversion"><h2 id="conversion">Practice funnel by page</h2>${table(['Page', 'Views', 'Starts', 'Completions', 'Timed out'], funnelRows, 'No practice page activity recorded in this range.')}<p>These are event totals. One browser may start or complete more than one attempt. Older exam completions can include timeouts.</p></section>
<section aria-labelledby="result-actions"><h2 id="result-actions">After seeing results</h2>${table(['Result page', 'Practice next', 'View progress', 'Try again'], actionRows, 'No result actions recorded in this range.')}</section>
<section aria-labelledby="sources"><h2 id="sources">First page and traffic source</h2>${table(['Entry page', 'Source', 'Entries'], entryRows, 'No entry sources recorded in this range.')}<p>Source is inferred from the browser referrer when available. Internal navigation is excluded from this report.</p></section>`
}

function renderDashboard(days: number, dates: string[], visits: DailyRow[], active: DailyRow[], events: EventRow[]) {
  const daily = dates.map((day) => ({
    day,
    visits: Number(visits.find((row) => row.day === day)?.browsers ?? 0),
    views: Number(visits.find((row) => row.day === day)?.total ?? 0),
    active: Number(active.find((row) => row.day === day)?.browsers ?? 0),
  }))
  const today = daily.at(-1)!
  const peak = Math.max(1, ...daily.flatMap((row) => [row.visits, row.active]))
  const pageRows: EventRow[] = []
  const features = new Map<string, { started: number; completed: number; repeated: number }>()
  let pdfClicks = 0
  let typingClicks = 0
  let calculations = 0

  for (const row of events) {
    if (row.event === 'visit_entry' || row.event === 'result_action' || row.event === 'exam_timeout') continue
    const count = Number(row.total)
    if (row.event === 'page_view') { pageRows.push(row); continue }
    if (row.event === 'pdf_download_click') { pdfClicks += count; continue }
    if (row.event === 'wpm_typing_test_click') { typingClicks += count; continue }
    if (row.event === 'wpm_calculation') { calculations += count; continue }

    const key = row.drill || row.path
    const name = labels.get(key) ?? key
    const counts = features.get(name) ?? { started: 0, completed: 0, repeated: 0 }
    if (row.event.endsWith('_complete')) counts.completed += count
    else if (row.event === 'next_round_start') counts.repeated += count
    else counts.started += count
    features.set(name, counts)
  }

  const pages = pageRows.sort((a, b) => b.total - a.total).map((row) =>
    `<tr><th scope="row">${escapeHtml(row.path)}</th><td>${Number(row.total)}</td></tr>`).join('')
  const drills = [...features].sort(([, a], [, b]) => b.started - a.started || b.completed - a.completed)
    .map(([name, counts]) => `<tr><th scope="row">${escapeHtml(name)}</th><td>${counts.started}</td><td>${counts.completed}</td><td>${counts.repeated}</td></tr>`).join('')
  const chart = daily.map((row) => `<tr><th scope="row">${row.day}</th><td><meter min="0" max="${peak}" value="${row.visits}" aria-label="Visiting browsers"></meter> ${row.visits}</td><td><meter min="0" max="${peak}" value="${row.active}" aria-label="Training browsers"></meter> ${row.active}</td><td>${row.views}</td></tr>`).reverse().join('')

  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Usage analytics | DispatchReady</title>
<style>
  :root{font:16px/1.5 system-ui,sans-serif;color:#17233c;background:#f4f6fb}body{margin:0}main{max-width:68rem;margin:auto;padding:2rem 1rem 4rem}
  h1{font-size:clamp(2rem,5vw,2.8rem);margin:.2rem 0}h2{font-size:1.2rem;margin:0 0 .75rem}p{margin:.25rem 0;color:#475569}
  header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem}
  nav{display:flex;gap:.5rem}nav a{padding:.4rem .7rem;border-radius:.4rem;color:#1e40af}nav [aria-current]{background:#e0e9ff;font-weight:700}
  section{background:#fff;border:1px solid #dbe2ed;border-radius:.7rem;padding:1rem;margin:1rem 0;overflow:auto}
  dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:1rem;margin:.5rem 0}dt{color:#475569}dd{font-size:1.7rem;font-weight:700;margin:0}
  table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}th,td{text-align:right;padding:.5rem;border-bottom:1px solid #e4e9f1}th:first-child{text-align:left;overflow-wrap:anywhere}thead{background:#f4f6fb}tbody th{font-weight:500}meter{width:clamp(1rem,12vw,8rem);vertical-align:middle}
</style>
<main><header><div><h1>Usage analytics</h1><p>DispatchReady · UTC · Today is in progress</p></div>
<nav aria-label="Date range"><a href="?days=1"${days === 1 ? ' aria-current="page"' : ''}>Today</a><a href="?days=7"${days === 7 ? ' aria-current="page"' : ''}>7 days</a><a href="?days=28"${days === 28 ? ' aria-current="page"' : ''}>28 days</a></nav></header>
<section aria-labelledby="today"><h2 id="today">Today</h2><dl><div><dt>Visiting browsers</dt><dd>${today.visits}</dd></div><div><dt>Training browsers</dt><dd>${today.active}</dd></div><div><dt>Page views</dt><dd>${today.views}</dd></div></dl></section>
<section aria-labelledby="daily"><h2 id="daily">Daily usage</h2><table><thead><tr><th scope="col">Date</th><th scope="col">Visiting browsers</th><th scope="col">Training browsers</th><th scope="col">Page views</th></tr></thead><tbody>${chart}</tbody></table></section>
${conversionTables(events)}
<section aria-labelledby="training"><h2 id="training">Training activity</h2>${drills ? `<table><thead><tr><th scope="col">Activity</th><th scope="col">Started</th><th scope="col">Completed</th><th scope="col">Next round</th></tr></thead><tbody>${drills}</tbody></table>` : '<p>No training events recorded in this range.</p>'}<p>Start counts include rounds shown automatically in Training Mode.</p></section>
<section aria-labelledby="pages"><h2 id="pages">Page views</h2>${pages ? `<table><thead><tr><th scope="col">Page</th><th scope="col">Views</th></tr></thead><tbody>${pages}</tbody></table>` : '<p>No page views recorded in this range.</p>'}<p>PDF download clicks: ${pdfClicks} · WPM calculations: ${calculations} · WPM calculator to typing test clicks: ${typingClicks}</p></section>
<p>Browser counts use a random identifier that changes each UTC day. Browsers without local storage are omitted from unique counts. New metrics begin when tracking is enabled. Cloudflare may sample events. Training totals count actions, including repeat attempts.</p>
</main></html>`
}

export async function analyticsDashboard(request: Request, env: Env & AnalyticsSecrets) {
  const { ANALYTICS_ADMIN_USERNAME: username, ANALYTICS_ADMIN_PASSWORD: password, ANALYTICS_ACCOUNT_ID: accountId, ANALYTICS_READ_TOKEN: token } = env
  if (!username?.trim() || username.includes(':') || !password?.trim()) return new Response('Not found', { status: 404, headers })
  if (!authorize(request, username, password)) {
    return new Response('Sign in to view usage analytics.', { status: 401, headers: { ...headers, 'WWW-Authenticate': 'Basic realm="DispatchReady analytics", charset="UTF-8"' } })
  }
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { ...headers, Allow: 'GET' } })
  if (!accountId || !/^[0-9a-f]{32}$/i.test(accountId) || !token) {
    return new Response('Analytics credentials are missing or invalid.', { status: 503, headers })
  }

  const rangeParam = new URL(request.url).searchParams.get('days')
  const days = rangeParam === '1' ? 1 : rangeParam === '28' ? 28 : 7
  const now = Date.now()
  const dates = Array.from({ length: days }, (_, index) => new Date(now - (days - index - 1) * 86_400_000).toISOString().slice(0, 10))
  const range = `timestamp >= toDateTime('${dates[0]} 00:00:00', 'Etc/UTC')`
  const date = "formatDateTime(timestamp, '%Y-%m-%d', 'Etc/UTC')"
  const dailyColumns = `${date} AS day, count(DISTINCT blob5) - max(if(blob5 = '', 1, 0)) AS browsers, sum(_sample_interval) AS total`

  try {
    const [visits, active, events] = await Promise.all([
      query<DailyRow>(accountId, token, `SELECT ${dailyColumns} FROM dispatchready_funnel WHERE ${range} AND blob1 = 'page_view' GROUP BY day`),
      query<DailyRow>(accountId, token, `SELECT ${dailyColumns} FROM dispatchready_funnel WHERE ${range} AND blob1 IN (${trainingEvents}) AND blob5 != '' AND (blob1 != 'drill_start' OR blob2 != '/train') GROUP BY day`),
      query<EventRow>(accountId, token, `SELECT blob1 AS event, blob2 AS path, blob3 AS drill, blob6 AS source, blob7 AS action, sum(_sample_interval) AS total FROM dispatchready_funnel WHERE ${range} AND blob1 IN (${trainingEvents}, 'page_view', 'visit_entry', 'result_action', 'pdf_download_click', 'wpm_calculation', 'wpm_typing_test_click') GROUP BY event, path, drill, source, action`),
    ])
    return new Response(renderDashboard(days, dates, visits, active, events), { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } })
  } catch (error) {
    console.error('Analytics dashboard query failed', error instanceof Error ? error.message : 'Unknown error')
    return new Response('Usage analytics is temporarily unavailable.', { status: 502, headers })
  }
}
