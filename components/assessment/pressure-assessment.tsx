'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BellRing,
  Brain,
  Check,
  Clock3,
  Keyboard,
  Play,
  ShieldAlert,
  Volume2,
} from 'lucide-react'
import { saveAssessmentResult } from '@/lib/progress'
import {
  generateDataEntryScenario,
  generateMemoryCode,
  generatePressureScenario,
  type DispatchService,
  type RecordFields,
} from '@/lib/generators/dispatcher-drills'

type Stage = 'intro' | 'entry' | 'memory-show' | 'memory-answer' | 'audio' | 'pressure' | 'results'
type Fields = RecordFields

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

function audioScript(record: Fields) {
  const phone = record.phone.split('').map((character) => (character === '-' ? ', ' : character)).join(' ')
  const plate = record.plate.split('').join(' ')
  return `My name is ${record.name}. I am at ${record.address}. My phone number is ${phone}. The plate is ${plate}.`
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
  const [assessment] = useState(() => ({
    entryRecord: generateDataEntryScenario(),
    audioRecord: generateDataEntryScenario(),
    memoryCode: generateMemoryCode(),
    pressureScenario: generatePressureScenario(),
  }))
  const [stage, setStage] = useState<Stage>('intro')
  const [entry, setEntry] = useState<Fields>(emptyFields)
  const [audio, setAudio] = useState<Fields>(emptyFields)
  const [pressure, setPressure] = useState<Fields>(emptyFields)
  const [memory, setMemory] = useState('')
  const [interruption, setInterruption] = useState(false)
  const [decision, setDecision] = useState<DispatchService | null>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(15)
  const [decisionResponseSeconds, setDecisionResponseSeconds] = useState<number | null>(null)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [audioUnavailable, setAudioUnavailable] = useState(false)
  const [audioTranscriptVisible, setAudioTranscriptVisible] = useState(false)
  const resultSaved = useRef(false)

  const baselineScore = useMemo(() => {
    const entryScore = fieldScore(assessment.entryRecord, entry)
    const memoryScore = normalize(memory) === normalize(assessment.memoryCode) ? 100 : 0
    const audioScore = fieldScore(assessment.audioRecord, audio)
    return Math.round((entryScore + memoryScore + audioScore) / 3)
  }, [assessment, audio, entry, memory])
  const entryScore = fieldScore(assessment.entryRecord, entry)
  const memoryScore = normalize(memory) === normalize(assessment.memoryCode) ? 100 : 0
  const audioScore = fieldScore(assessment.audioRecord, audio)
  const pressureEntryScore = fieldScore(assessment.pressureScenario.record, pressure)
  const decisionScore = decision === assessment.pressureScenario.interruption.answer ? 100 : 0
  const pressureScore = useMemo(
    () => Math.round(pressureEntryScore * 0.75 + (decisionScore ? 25 : 0)),
    [decisionScore, pressureEntryScore],
  )
  const pressureDrop = Math.max(0, baselineScore - pressureScore)
  const readiness = Math.round(baselineScore * 0.55 + pressureScore * 0.45)
  const risk = pressureDrop >= 18 ? 'Multitasking' : audioScore < Math.min(entryScore, memoryScore) ? 'Audio detail recall' : 'Pressure accuracy'
  const interruptionResolved = decision !== null || secondsRemaining === 0

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

  useEffect(() => {
    if (stage !== 'pressure' || !interruption || decision || secondsRemaining === 0) return
    const interval = window.setInterval(() => {
      setSecondsRemaining((value) => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [decision, interruption, secondsRemaining, stage])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  useEffect(() => {
    if (stage !== 'results' || resultSaved.current) return

    saveAssessmentResult({
      baselineScore,
      pressureScore,
      pressureDrop,
      readiness,
      risk,
      decisionResponseSeconds,
      decisionTimedOut: interruption && !decision,
    })
    resultSaved.current = true
  }, [baselineScore, decision, decisionResponseSeconds, interruption, pressureDrop, pressureScore, readiness, risk, stage])

  function playAudio() {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setAudioUnavailable(true)
      return
    }

    window.speechSynthesis?.cancel()
    const utterance = new SpeechSynthesisUtterance(
      audioScript(assessment.audioRecord),
    )
    utterance.rate = 0.88
    utterance.onstart = () => setAudioUnavailable(false)
    utterance.onend = () => setAudioPlayed(true)
    utterance.onerror = () => setAudioUnavailable(true)
    window.speechSynthesis?.speak(utterance)
  }

  function answerInterruption(option: DispatchService) {
    setDecision(option)
    setDecisionResponseSeconds(15 - secondsRemaining)
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
    return (
      <main className="min-h-screen bg-[#f4f6f8] px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_80px_-42px_rgba(15,23,42,.45)]">
            <div className="border-b border-slate-200 bg-slate-950 px-6 py-7 text-white sm:px-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-300">Practice readiness estimate</p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your pressure profile</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">This is a practice result, not an official CritiCall score or a prediction of hiring outcomes.</p></div><div className="rounded-md border border-rose-300/25 bg-rose-400/10 px-4 py-3"><p className="font-mono text-[0.65rem] uppercase tracking-wider text-rose-200">Pressure drop</p><p className="mt-0.5 font-mono text-3xl font-bold text-white">-{pressureDrop}%</p></div></div>
            </div>
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.1fr_.9fr]">
              <div><p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Overall readiness</p><div className="mt-2 flex items-end gap-3"><strong className="font-mono text-6xl tracking-tighter text-slate-950">{readiness}</strong><span className="mb-2 text-slate-500">/ 100</span></div><div className="mt-6 space-y-4">{[['Data entry', entryScore], ['Memory recall', memoryScore], ['Audio detail recall', audioScore], ['Under pressure', pressureScore]].map(([label, score]) => <div key={String(label)}><div className="mb-1.5 flex justify-between text-sm"><span className="text-slate-600">{label}</span><span className="font-mono font-semibold text-slate-950">{score}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${score}%` }} /></div></div>)}</div></div>
              <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-amber-900"><ShieldAlert className="size-5" /><p className="font-semibold">Biggest risk: {risk}</p></div><p className="mt-3 text-sm leading-relaxed text-amber-950/75">{pressureDrop >= 18 ? 'Your core skills are stronger than your performance once an interruption appears. Train returning to a task without losing the original details.' : risk === 'Audio detail recall' ? 'Your audio detail score was the weakest baseline skill. Repeat structured audio entry until names, numbers, and plates stay precise.' : 'Your detail recall held up, but the interrupted round left room for more consistent accuracy.'}</p><div className="mt-6 grid gap-2"><Link href="/train" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800">{risk === 'Multitasking' ? 'Open pressure training' : risk === 'Audio detail recall' ? 'Open data-entry training' : 'Open focused training'} <ArrowRight className="size-4" /></Link><Link href="/assessment" className="inline-flex h-10 w-full items-center justify-center text-sm font-medium text-amber-950/70 underline-offset-4 hover:underline">Retake assessment</Link><Link href="/progress" className="inline-flex h-10 w-full items-center justify-center text-sm font-medium text-amber-950/70 underline-offset-4 hover:underline">View saved progress</Link></div></aside>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (stage === 'intro') return <Intro onStart={() => setStage('entry')} />

  return (
    <main className="min-h-screen bg-[#f4f6f8] px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Free pressure test</p>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-blue-700 transition-all duration-500" style={{ width: `${step * 25}%` }} /></div><div className="mt-4 flex items-center justify-between"><p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Step {step} of 4</p><p className="text-sm font-medium text-slate-700">{stageTitle[stage]}</p></div>
        <section className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,.5)] sm:p-9">
          {stage === 'entry' && <><TaskHeading icon={Keyboard} eyebrow="Calm baseline · about 90 seconds" title="Enter the incident details" body="Read the dispatch note once, then enter each detail as accurately as you can. No interruption in this round." /><div className="mt-7 rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">CALLER: {assessment.entryRecord.name}<br />LOCATION: {assessment.entryRecord.address}<br />CALLBACK: {assessment.entryRecord.phone}<br />VEHICLE PLATE: {assessment.entryRecord.plate}</div><div className="mt-7"><FieldInputs value={entry} onChange={setEntry} /></div><NextButton label="Continue to memory" onClick={() => setStage('memory-show')} /></>}
          {stage === 'memory-show' && <><TaskHeading icon={Brain} eyebrow="Short-term memory · 4 seconds" title="Hold this code in mind" body="You will be asked to type it after it disappears. Do not write it down." /><div className="my-12 rounded-lg border border-blue-200 bg-blue-50 px-6 py-10 text-center font-mono text-4xl font-bold tracking-[0.26em] text-blue-950 sm:text-5xl">{assessment.memoryCode}</div><p className="text-center font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Memorize now</p></>}
          {stage === 'memory-answer' && <><TaskHeading icon={Brain} eyebrow="Short-term memory" title="What was the code?" body="Enter the six-character code you just saw." /><input autoFocus value={memory} onChange={(event) => setMemory(event.target.value.toUpperCase())} maxLength={6} className="mt-10 h-16 w-full rounded-md border border-slate-300 bg-white px-5 text-center font-mono text-2xl font-bold tracking-[0.25em] text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" placeholder="______" /><NextButton label="Continue to audio" onClick={() => setStage('audio')} /></>}
          {stage === 'audio' && <><TaskHeading icon={Volume2} eyebrow="Audio data entry · about 90 seconds" title="Listen, then enter what you heard" body="The recording can be replayed. Focus on exact details, not speed." /><button type="button" onClick={playAudio} className="mt-7 flex w-full items-center gap-4 rounded-lg bg-slate-950 p-5 text-left text-white transition hover:bg-slate-800"><span className="grid size-11 place-items-center rounded bg-blue-600"><Play className="size-5" /></span><span><span className="block font-semibold">{audioPlayed ? 'Replay caller audio' : 'Play caller audio'}</span><span className="mt-1 block font-mono text-xs uppercase tracking-wider text-slate-400">Structured details · normal pace</span></span></button>{audioUnavailable && <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">Audio playback is unavailable in this browser. Try another browser or use the accessible practice transcript below; this changes the exercise from audio practice to visual detail entry.<button type="button" onClick={() => setAudioTranscriptVisible(true)} className="ml-2 font-semibold underline underline-offset-4">Reveal transcript</button></div>}{audioTranscriptVisible && <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">CALLER: {assessment.audioRecord.name}<br />LOCATION: {assessment.audioRecord.address}<br />CALLBACK: {assessment.audioRecord.phone}<br />VEHICLE PLATE: {assessment.audioRecord.plate}</div>}<div className="mt-7"><FieldInputs value={audio} onChange={setAudio} /></div><NextButton label="Begin pressure round" onClick={() => setStage('pressure')} /></>}
          {stage === 'pressure' && <><TaskHeading icon={BellRing} eyebrow="Pressure round · interruption expected" title="Keep your place when the task changes" body="Enter the record below. An incoming incident may require immediate classification before you continue." /><div className="mt-7 rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">CALLER: {assessment.pressureScenario.record.name}<br />LOCATION: {assessment.pressureScenario.record.address}<br />CALLBACK: {assessment.pressureScenario.record.phone}<br />VEHICLE PLATE: {assessment.pressureScenario.record.plate}</div><div className="mt-7"><FieldInputs value={pressure} onChange={setPressure} disabled={interruption && !interruptionResolved} /></div>{interruption && !interruptionResolved && <div className="mt-7 rounded-lg border-2 border-rose-400 bg-rose-50 p-5 shadow-lg shadow-rose-500/10"><div className="flex gap-3"><BellRing className="mt-0.5 size-5 shrink-0 text-rose-600" /><div><div className="flex items-center justify-between gap-4"><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">Incoming incident — respond now</p><span className="font-mono text-sm font-bold text-rose-700">{secondsRemaining}s</span></div><h3 className="mt-2 text-lg font-semibold text-slate-950">{assessment.pressureScenario.interruption.prompt}</h3><p className="mt-1 text-sm text-slate-600">Use only these practice rules: harm/property crime → Police; smoke/fire → Fire; medical emergency → EMS; utility failure → Utility.</p><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{(['Police', 'Fire', 'EMS', 'Utility'] as DispatchService[]).map((option) => <button key={option} type="button" onClick={() => answerInterruption(option)} className="h-10 rounded-md border border-rose-200 bg-white text-sm font-semibold text-slate-800 transition hover:border-rose-500 hover:bg-rose-100">{option}</button>)}</div></div></div></div>}{decision && <div className="mt-7 flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950"><Check className="size-4" /> Incident routed in {decisionResponseSeconds}s. Return to the original record and finish it.</div>}{interruption && secondsRemaining === 0 && !decision && <div className="mt-7 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-950">Time expired. No routing point was awarded; return to the original record and finish it.</div>}<NextButton label={interruptionResolved ? 'View my readiness report' : 'Complete the interruption first'} disabled={!interruptionResolved} onClick={() => setStage('results')} /></>}
        </section>
      </div>
    </main>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return <main className="min-h-screen bg-[#f4f6f8] px-4 py-8 sm:px-6 lg:py-14"><div className="mx-auto max-w-3xl"><section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_80px_-42px_rgba(15,23,42,.45)]"><div className="border-b border-slate-200 bg-slate-950 p-7 text-white sm:p-10"><p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-300">Free dispatcher pressure test</p><h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Find the skill that changes under pressure.</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">This short practice assessment compares your calm baseline against one interrupted task. No account, timer stress, or official score.</p></div><div className="grid gap-6 p-7 sm:grid-cols-3 sm:p-10">{[[Keyboard, 'Data entry', 'Structured details'], [Brain, 'Memory', 'Six-character recall'], [BellRing, 'One interruption', 'Quick routing decision']].map(([Icon, title, body]) => { const I = Icon as typeof Keyboard; return <div key={String(title)}><I className="size-5 text-blue-700" /><h2 className="mt-3 font-semibold text-slate-950">{String(title)}</h2><p className="mt-1 text-sm text-slate-600">{String(body)}</p></div>})}</div><div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:px-10"><p className="flex items-center gap-2 text-sm text-slate-600"><Clock3 className="size-4 text-blue-700" /> About 6–8 minutes</p><button type="button" onClick={onStart} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">Start assessment <ArrowRight className="size-4" /></button></div></section></div></main>
}

function TaskHeading({ icon: Icon, eyebrow, title, body }: { icon: typeof Keyboard; eyebrow: string; title: string; body: string }) {
  return <div><div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-700"><Icon className="size-4" /> {eyebrow}</div><h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1><p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">{body}</p></div>
}

function NextButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <div className="mt-9 flex justify-end"><button type="button" disabled={disabled} onClick={onClick} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300">{label}<ArrowRight className="size-4" /></button></div>
}
