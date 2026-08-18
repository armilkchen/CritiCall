'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Brain,
  Check,
  Clock3,
  Headphones,
  Keyboard,
  Play,
  ShieldAlert,
  Volume2,
} from 'lucide-react'

type Stage = 'intro' | 'entry' | 'memory-show' | 'memory-answer' | 'audio' | 'pressure' | 'results'
type Fields = Record<'name' | 'address' | 'phone' | 'plate', string>

const entryAnswer: Fields = {
  name: 'Jordan Matthews',
  address: '214 Cedar Lane',
  phone: '555-014-7829',
  plate: '7KX29B',
}

const pressureAnswer: Fields = {
  name: 'Maya Reynolds',
  address: '1846 West Pine Street',
  phone: '555-827-1946',
  plate: '3HF82M',
}

const memoryCode = 'K7F29Q'
const emptyFields = (): Fields => ({ name: '', address: '', phone: '', plate: '' })

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function fieldScore(answer: Fields, response: Fields) {
  return Math.round(
    (Object.keys(answer) as Array<keyof Fields>).reduce(
      (correct, key) => correct + Number(normalize(answer[key]) === normalize(response[key])),
      0,
    ) * 25,
  )
}

function FieldInputs({ value, onChange, disabled = false }: { value: Fields; onChange: (next: Fields) => void; disabled?: boolean }) {
  const labels: Array<[keyof Fields, string, string]> = [
    ['name', 'Caller name', 'e.g. Jordan Matthews'],
    ['address', 'Address', 'Street address'],
    ['phone', 'Phone', '555-000-0000'],
    ['plate', 'Plate', 'Letters and numbers'],
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {labels.map(([key, label, placeholder]) => (
        <label key={key} className="block">
          <span className="mb-1.5 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">{label}</span>
          <input
            value={value[key]}
            disabled={disabled}
            onChange={(event) => onChange({ ...value, [key]: event.target.value })}
            placeholder={placeholder}
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 font-mono text-sm text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </label>
      ))}
    </div>
  )
}

export function PressureAssessment() {
  const [stage, setStage] = useState<Stage>('intro')
  const [entry, setEntry] = useState<Fields>(emptyFields)
  const [audio, setAudio] = useState<Fields>(emptyFields)
  const [pressure, setPressure] = useState<Fields>(emptyFields)
  const [memory, setMemory] = useState('')
  const [interruption, setInterruption] = useState(false)
  const [decision, setDecision] = useState('')
  const [audioPlayed, setAudioPlayed] = useState(false)
  const audioRef = useRef<SpeechSynthesisUtterance | null>(null)

  const baselineScore = useMemo(() => {
    const entryScore = fieldScore(entryAnswer, entry)
    const memoryScore = normalize(memory) === normalize(memoryCode) ? 100 : 0
    const audioScore = fieldScore(entryAnswer, audio)
    return Math.round((entryScore + memoryScore + audioScore) / 3)
  }, [audio, entry, memory])
  const pressureScore = useMemo(
    () => Math.round(fieldScore(pressureAnswer, pressure) * 0.75 + (decision === 'Fire' ? 25 : 0)),
    [decision, pressure],
  )
  const pressureDrop = Math.max(0, baselineScore - pressureScore)
  const readiness = Math.round(baselineScore * 0.55 + pressureScore * 0.45)

  useEffect(() => {
    if (stage !== 'memory-show') return
    const timeout = window.setTimeout(() => setStage('memory-answer'), 3500)
    return () => window.clearTimeout(timeout)
  }, [stage])

  useEffect(() => {
    if (stage !== 'pressure' || interruption) return
    const timeout = window.setTimeout(() => setInterruption(true), 9000)
    return () => window.clearTimeout(timeout)
  }, [interruption, stage])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function playAudio() {
    window.speechSynthesis?.cancel()
    const utterance = new SpeechSynthesisUtterance(
      'My name is Jordan Matthews. I am at 214 Cedar Lane. My phone number is five five five, zero one four, seven eight two nine. The plate is Seven Kilo X-ray Two Nine Bravo.',
    )
    utterance.rate = 0.88
    utterance.onend = () => setAudioPlayed(true)
    audioRef.current = utterance
    window.speechSynthesis?.speak(utterance)
  }

  const step = stage === 'intro' ? 0 : stage === 'results' ? 4 : stage === 'entry' ? 1 : stage.startsWith('memory') ? 2 : stage === 'audio' ? 3 : 4
  const stageTitle: Record<Exclude<Stage, 'intro' | 'results'>, string> = {
    entry: 'Baseline data entry',
    'memory-show': 'Short-term memory',
    'memory-answer': 'Short-term memory',
    audio: 'Audio data entry',
    pressure: 'Pressure round',
  }

  if (stage === 'results') {
    const risk = pressureDrop >= 18 ? 'Multitasking' : pressureScore < baselineScore ? 'Pressure accuracy' : 'Audio detail recall'
    return (
      <main className="min-h-screen bg-[#f4f6f8] px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"><ArrowLeft className="size-4" /> DispatchReady</Link>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_80px_-42px_rgba(15,23,42,.45)]">
            <div className="border-b border-slate-200 bg-slate-950 px-6 py-7 text-white sm:px-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-300">Practice readiness estimate</p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your pressure profile</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">This is a practice result, not an official CritiCall score or a prediction of hiring outcomes.</p></div><div className="rounded-md border border-rose-300/25 bg-rose-400/10 px-4 py-3"><p className="font-mono text-[0.65rem] uppercase tracking-wider text-rose-200">Pressure drop</p><p className="mt-0.5 font-mono text-3xl font-bold text-white">-{pressureDrop}%</p></div></div>
            </div>
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.1fr_.9fr]">
              <div><p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Overall readiness</p><div className="mt-2 flex items-end gap-3"><strong className="font-mono text-6xl tracking-tighter text-slate-950">{readiness}</strong><span className="mb-2 text-slate-500">/ 100</span></div><div className="mt-6 space-y-4">{[['Baseline skills', baselineScore], ['Under pressure', pressureScore]].map(([label, score]) => <div key={String(label)}><div className="mb-1.5 flex justify-between text-sm"><span className="text-slate-600">{label}</span><span className="font-mono font-semibold text-slate-950">{score}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${score}%` }} /></div></div>)}</div></div>
              <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-amber-900"><ShieldAlert className="size-5" /><p className="font-semibold">Biggest risk: {risk}</p></div><p className="mt-3 text-sm leading-relaxed text-amber-950/75">{pressureDrop >= 18 ? 'Your core skills are stronger than your performance once an interruption appears. Train returning to a task without losing the original details.' : 'You held up well in this short round. Build consistency with longer, mixed drills before test day.'}</p><Link href="/train" className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800">Open pressure training <ArrowRight className="size-4" /></Link><p className="mt-3 text-center text-xs leading-relaxed text-amber-950/60">Practice preview · paid access control comes next</p></aside>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (stage === 'intro') return <Intro onStart={() => setStage('entry')} />

  return (
    <main className="min-h-screen bg-[#f4f6f8] px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-3xl"><header className="flex items-center justify-between"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><span className="grid size-8 place-items-center rounded bg-blue-700 text-white"><Headphones className="size-4" /></span> DispatchReady</Link><span className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">Free pressure test</span></header>
        <div className="mt-8 h-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-blue-700 transition-all duration-500" style={{ width: `${step * 25}%` }} /></div><div className="mt-4 flex items-center justify-between"><p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Step {step} of 4</p><p className="text-sm font-medium text-slate-700">{stageTitle[stage]}</p></div>
        <section className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,.5)] sm:p-9">
          {stage === 'entry' && <><TaskHeading icon={Keyboard} eyebrow="Calm baseline · about 90 seconds" title="Enter the incident details" body="Read the dispatch note once, then enter each detail as accurately as you can. No interruption in this round." /><div className="mt-7 rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">CALLER: Jordan Matthews<br />LOCATION: 214 Cedar Lane<br />CALLBACK: 555-014-7829<br />VEHICLE PLATE: 7KX29B</div><div className="mt-7"><FieldInputs value={entry} onChange={setEntry} /></div><NextButton label="Continue to memory" onClick={() => setStage('memory-show')} /></>}
          {stage === 'memory-show' && <><TaskHeading icon={Brain} eyebrow="Short-term memory · 4 seconds" title="Hold this code in mind" body="You will be asked to type it after it disappears. Do not write it down." /><div className="my-12 rounded-lg border border-blue-200 bg-blue-50 px-6 py-10 text-center font-mono text-4xl font-bold tracking-[0.26em] text-blue-950 sm:text-5xl">{memoryCode}</div><p className="text-center font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Memorize now</p></>}
          {stage === 'memory-answer' && <><TaskHeading icon={Brain} eyebrow="Short-term memory" title="What was the code?" body="Enter the six-character code you just saw." /><input autoFocus value={memory} onChange={(event) => setMemory(event.target.value.toUpperCase())} maxLength={6} className="mt-10 h-16 w-full rounded-md border border-slate-300 bg-white px-5 text-center font-mono text-2xl font-bold tracking-[0.25em] text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" placeholder="______" /><NextButton label="Continue to audio" onClick={() => setStage('audio')} /></>}
          {stage === 'audio' && <><TaskHeading icon={Volume2} eyebrow="Audio data entry · about 90 seconds" title="Listen, then enter what you heard" body="The recording can be replayed. Focus on exact details, not speed." /><button type="button" onClick={playAudio} className="mt-7 flex w-full items-center gap-4 rounded-lg bg-slate-950 p-5 text-left text-white transition hover:bg-slate-800"><span className="grid size-11 place-items-center rounded bg-blue-600"><Play className="size-5" /></span><span><span className="block font-semibold">{audioPlayed ? 'Replay caller audio' : 'Play caller audio'}</span><span className="mt-1 block font-mono text-xs uppercase tracking-wider text-slate-400">Structured details · normal pace</span></span></button><div className="mt-7"><FieldInputs value={audio} onChange={setAudio} /></div><NextButton label="Begin pressure round" onClick={() => setStage('pressure')} /></>}
          {stage === 'pressure' && <><TaskHeading icon={BellRing} eyebrow="Pressure round · interruption expected" title="Keep your place when the task changes" body="Enter the record below. An incoming incident may require immediate classification before you continue." /><div className="mt-7 rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">CALLER: Maya Reynolds<br />LOCATION: 1846 West Pine Street<br />CALLBACK: 555-827-1946<br />VEHICLE PLATE: 3HF82M</div><div className="mt-7"><FieldInputs value={pressure} onChange={setPressure} disabled={interruption && !decision} /></div>{interruption && !decision && <div className="mt-7 rounded-lg border-2 border-rose-400 bg-rose-50 p-5 shadow-lg shadow-rose-500/10"><div className="flex gap-3"><BellRing className="mt-0.5 size-5 shrink-0 text-rose-600" /><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">Incoming incident — respond now</p><h3 className="mt-2 text-lg font-semibold text-slate-950">Smoke is coming from a kitchen outlet. No one is injured.</h3><p className="mt-1 text-sm text-slate-600">Which service should receive this call?</p><div className="mt-4 grid grid-cols-3 gap-2">{['Police', 'Fire', 'EMS'].map((option) => <button key={option} type="button" onClick={() => setDecision(option)} className="h-10 rounded-md border border-rose-200 bg-white text-sm font-semibold text-slate-800 transition hover:border-rose-500 hover:bg-rose-100">{option}</button>)}</div></div></div></div>}{decision && <div className="mt-7 flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950"><Check className="size-4" /> Incident routed. Return to the original record and finish it.</div>}<NextButton label={decision ? 'View my readiness report' : 'Complete the interruption first'} disabled={!decision} onClick={() => setStage('results')} /></>}
        </section>
      </div>
    </main>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return <main className="min-h-screen bg-[#f4f6f8] px-4 py-8 sm:px-6 lg:py-14"><div className="mx-auto max-w-3xl"><Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"><ArrowLeft className="size-4" /> Back to DispatchReady</Link><section className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_80px_-42px_rgba(15,23,42,.45)]"><div className="border-b border-slate-200 bg-slate-950 p-7 text-white sm:p-10"><p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-300">Free dispatcher pressure test</p><h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Find the skill that changes under pressure.</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">This short practice assessment compares your calm baseline against one interrupted task. No account, timer stress, or official score.</p></div><div className="grid gap-6 p-7 sm:grid-cols-3 sm:p-10">{[[Keyboard, 'Data entry', 'Structured details'], [Brain, 'Memory', 'Six-character recall'], [BellRing, 'One interruption', 'Quick routing decision']].map(([Icon, title, body]) => { const I = Icon as typeof Keyboard; return <div key={String(title)}><I className="size-5 text-blue-700" /><h2 className="mt-3 font-semibold text-slate-950">{String(title)}</h2><p className="mt-1 text-sm text-slate-600">{String(body)}</p></div>})}</div><div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:px-10"><p className="flex items-center gap-2 text-sm text-slate-600"><Clock3 className="size-4 text-blue-700" /> About 6–8 minutes</p><button type="button" onClick={onStart} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">Start assessment <ArrowRight className="size-4" /></button></div></section></div></main>
}

function TaskHeading({ icon: Icon, eyebrow, title, body }: { icon: typeof Keyboard; eyebrow: string; title: string; body: string }) {
  return <div><div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-700"><Icon className="size-4" /> {eyebrow}</div><h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1><p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">{body}</p></div>
}

function NextButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <div className="mt-9 flex justify-end"><button type="button" disabled={disabled} onClick={onClick} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300">{label}<ArrowRight className="size-4" /></button></div>
}
