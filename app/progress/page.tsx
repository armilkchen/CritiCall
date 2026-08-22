'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Brain, ClipboardCheck, Headphones, Keyboard, Layers, FileText, TimerReset } from 'lucide-react'
import { clearProgress, loadProgress, type DrillType, type ProgressData } from '@/lib/progress'

const drillLabels: Record<DrillType, string> = {
  entry: 'Data Entry',
  memory: 'Memory Recall',
  audio: 'Audio Data Entry',
  summary: 'Call Summary',
  pressure: 'Pressure Drill',
  simulation: 'Full Simulation',
}

const drillIcons = {
  entry: Keyboard,
  memory: Brain,
  audio: Headphones,
  summary: FileText,
  pressure: Layers,
  simulation: TimerReset,
}

const emptyProgress: ProgressData = { assessments: [], drills: [] }

function average(values: number[]) {
  if (!values.length) return 0
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressData | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => setProgress(loadProgress()), 0)
    return () => window.clearTimeout(timeout)
  }, [])

  const latestAssessment = progress?.assessments[0]
  const averageDrillScore = useMemo(() => average(progress?.drills.map((result) => result.score) ?? []), [progress?.drills])
  const bestDrillScore = progress?.drills.length ? Math.max(...progress.drills.map((result) => result.score)) : 0

  function resetDemoProgress() {
    if (!window.confirm('Clear the saved demo progress from this browser?')) return
    clearProgress()
    setProgress(emptyProgress)
  }

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Local progress dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Track what changes with practice.</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4"><p className="text-slate-600">Your assessment and drill history is stored only in this browser for the MVP preview.</p>{progress && (progress.assessments.length > 0 || progress.drills.length > 0) && <button type="button" onClick={resetDemoProgress} className="text-sm font-medium text-slate-500 underline-offset-4 transition hover:text-slate-950 hover:underline">Reset demo data</button>}</div>
        </div>

        {!progress ? null : !latestAssessment && !progress.drills.length ? (
          <section className="mt-10 rounded-xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            <ClipboardCheck className="size-7 text-blue-700" />
            <h2 className="mt-4 text-xl font-semibold">No results saved yet</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">Start with the short assessment to establish a baseline, then complete training rounds to build your history.</p>
            <Link href="/assessment" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Take the free assessment <ArrowRight className="size-4" /></Link>
          </section>
        ) : (
          <>
            <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Latest readiness" value={latestAssessment ? `${latestAssessment.readiness}/100` : '—'} />
              <Metric label="Latest pressure drop" value={latestAssessment ? `-${latestAssessment.pressureDrop}%` : '—'} />
              <Metric label="Average drill score" value={progress.drills.length ? `${averageDrillScore}%` : '—'} />
              <Metric label="Rounds completed" value={String(progress.drills.length)} />
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.8fr]">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4"><div><p className="font-mono text-[.68rem] font-semibold uppercase tracking-[.16em] text-slate-500">Recent training</p><h2 className="mt-2 text-xl font-semibold">Round history</h2></div><span className="rounded-md bg-blue-50 px-3 py-2 font-mono text-sm font-semibold text-blue-800">Best {bestDrillScore}%</span></div>
                <div className="mt-5 divide-y divide-slate-200">
                  {progress.drills.slice(0, 8).map((result) => {
                    const Icon = drillIcons[result.drill]
                    return <div key={result.id} className="flex items-center justify-between gap-4 py-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-slate-100 text-blue-700"><Icon className="size-4" /></span><div><p className="text-sm font-semibold">{drillLabels[result.drill]}</p><p className="mt-0.5 text-xs text-slate-500">{formatDate(result.completedAt)}{result.difficulty ? ` · ${result.difficulty}` : ''}</p></div></div><span className="font-mono text-lg font-bold">{result.score}%</span></div>
                  })}
                  {!progress.drills.length && <p className="py-8 text-sm text-slate-500">Complete a training round to see it here.</p>}
                </div>
              </section>

              <aside className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
                <p className="font-mono text-[.68rem] font-semibold uppercase tracking-[.16em] text-blue-300">Latest pressure profile</p>
                {latestAssessment ? <><div className="mt-5 flex items-end gap-3"><strong className="font-mono text-5xl">{latestAssessment.readiness}</strong><span className="mb-1 text-slate-400">/ 100</span></div><div className="mt-6 space-y-3 text-sm"><ScoreRow label="Baseline skills" value={latestAssessment.baselineScore} /><ScoreRow label="Under pressure" value={latestAssessment.pressureScore} /></div><div className="mt-6 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4"><p className="text-xs uppercase tracking-wider text-amber-200">Current focus</p><p className="mt-2 font-semibold">{latestAssessment.risk}</p></div><p className="mt-5 text-xs text-slate-400">Completed {formatDate(latestAssessment.completedAt)}</p></> : <p className="mt-5 text-sm leading-relaxed text-slate-300">Take the assessment to add baseline and pressure metrics.</p>}
                <Link href="/assessment" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-slate-950">Retake assessment</Link>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 font-mono text-3xl font-bold tracking-tight">{value}</p></div>
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return <div><div className="flex justify-between"><span className="text-slate-300">{label}</span><span className="font-mono font-semibold">{value}%</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-400" style={{ width: `${value}%` }} /></div></div>
}
