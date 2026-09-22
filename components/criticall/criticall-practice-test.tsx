'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BellRing, Brain, Check, Headphones, Keyboard, Play, RotateCcw, Volume2 } from 'lucide-react'
import { trackFunnelEvent } from '@/lib/analytics'
import { speakEnglish } from '@/lib/english-speech'
import {
  generateDataEntryScenario,
  generateDecisionScenario,
  generateMemoryCode,
  recordToAudioScript,
  type DecisionScenario,
  type DispatchService,
  type RecordFields,
} from '@/lib/generators/dispatcher-drills'
import { saveDrillResult } from '@/lib/progress'

type Stage = 'intro' | 'rules' | 'entry' | 'memory-show' | 'memory-answer' | 'audio' | 'decision' | 'results'
type SkillKey = 'entry' | 'memory' | 'audio' | 'decision'

const services: DispatchService[] = ['Police', 'Fire', 'EMS', 'Utility']
const emptyFields = (): RecordFields => ({ name: '', address: '', phone: '', plate: '' })

const skillDetails: Record<SkillKey, { label: string; href: string; action: string }> = {
  entry: { label: 'Visual data entry', href: '/train?drill=entry', action: 'Practice data entry' },
  memory: { label: 'Short-term memory', href: '/train?drill=memory', action: 'Practice memory recall' },
  audio: { label: 'Audio detail entry', href: '/train?drill=audio', action: 'Practice audio entry' },
  decision: { label: 'Rapid decisions', href: '/train?drill=pressure', action: 'Practice pressure decisions' },
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function fieldScore(answer: RecordFields, response: RecordFields) {
  const correct = (Object.keys(answer) as Array<keyof RecordFields>).filter((key) => normalize(answer[key]) === normalize(response[key])).length
  return Math.round((correct / 4) * 100)
}

function createDecisions() {
  const decisions: DecisionScenario[] = []
  const prompts = new Set<string>()
  const answers = new Set<DispatchService>()
  while (decisions.length < 3) {
    const scenario = generateDecisionScenario()
    if (prompts.has(scenario.prompt) || answers.has(scenario.answer)) continue
    prompts.add(scenario.prompt)
    answers.add(scenario.answer)
    decisions.push(scenario)
  }
  return decisions
}

function createAttempt() {
  return {
    entryRecord: generateDataEntryScenario('normal'),
    memoryCode: generateMemoryCode('normal'),
    audioRecord: generateDataEntryScenario('normal'),
    decisions: createDecisions(),
  }
}

export function CriticallPracticeTest() {
  const [attempt, setAttempt] = useState(0)

  function retry() {
    trackFunnelEvent('next_round_start', { drill: 'criticall', difficulty: 'normal' })
    setAttempt((value) => value + 1)
  }

  return <PracticeAttempt key={attempt} onRetry={retry} />
}

function PracticeAttempt({ onRetry }: { onRetry: () => void }) {
  const [session] = useState(createAttempt)
  const [stage, setStage] = useState<Stage>('intro')
  const [entry, setEntry] = useState<RecordFields>(emptyFields)
  const [memory, setMemory] = useState('')
  const [audio, setAudio] = useState<RecordFields>(emptyFields)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioUnavailable, setAudioUnavailable] = useState(false)
  const [transcriptVisible, setTranscriptVisible] = useState(false)
  const [decisionIndex, setDecisionIndex] = useState(0)
  const [decisionSeconds, setDecisionSeconds] = useState(15)
  const [decisionResolved, setDecisionResolved] = useState(false)
  const [selectedService, setSelectedService] = useState<DispatchService | null>(null)
  const [decisionResults, setDecisionResults] = useState<boolean[]>([])
  const resultSaved = useRef(false)

  const scores = useMemo(() => {
    const decisionScore = Math.round((decisionResults.filter(Boolean).length / 3) * 100)
    return {
      entry: fieldScore(session.entryRecord, entry),
      memory: normalize(memory) === normalize(session.memoryCode) ? 100 : 0,
      audio: fieldScore(session.audioRecord, audio),
      decision: decisionScore,
    }
  }, [audio, decisionResults, entry, memory, session])

  const totalScore = Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / 4)
  const weakestSkill = (Object.entries(scores) as Array<[SkillKey, number]>).sort((a, b) => a[1] - b[1])[0][0]
  const recommendation = skillDetails[weakestSkill]

  useEffect(() => {
    if (stage !== 'memory-show') return
    const timer = window.setTimeout(() => setStage('memory-answer'), 3500)
    return () => window.clearTimeout(timer)
  }, [stage])

  useEffect(() => {
    if (stage !== 'decision' || decisionResolved || decisionSeconds === 0) return
    const timer = window.setTimeout(() => {
      if (decisionSeconds === 1) {
        setDecisionSeconds(0)
        setDecisionResults((results) => [...results, false])
        setDecisionResolved(true)
        return
      }
      setDecisionSeconds((value) => value - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [decisionResolved, decisionSeconds, stage])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  useEffect(() => {
    if (stage !== 'results' || resultSaved.current) return
    saveDrillResult('criticall', totalScore, 'normal')
    trackFunnelEvent('diagnostic_complete', { drill: 'criticall', difficulty: 'normal' })
    resultSaved.current = true
  }, [stage, totalScore])

  function start() {
    trackFunnelEvent('diagnostic_start', { drill: 'criticall', difficulty: 'normal' })
    setStage('rules')
  }

  function playAudio() {
    const started = speakEnglish(recordToAudioScript(session.audioRecord), 0.88, {
      onStart: () => { setAudioPlaying(true); setAudioUnavailable(false) },
      onEnd: () => { setAudioPlaying(false); setAudioPlayed(true) },
      onError: () => { setAudioPlaying(false); setAudioUnavailable(true) },
    })
    if (!started) setAudioUnavailable(true)
  }

  function chooseService(service: DispatchService) {
    if (decisionResolved) return
    setSelectedService(service)
    setDecisionResults((results) => [...results, service === session.decisions[decisionIndex].answer])
    setDecisionResolved(true)
  }

  function continueDecision() {
    if (decisionIndex === session.decisions.length - 1) {
      setStage('results')
      return
    }
    setDecisionIndex((value) => value + 1)
    setDecisionSeconds(15)
    setDecisionResolved(false)
    setSelectedService(null)
  }

  const currentDecision = session.decisions[decisionIndex]
  const progress = stage === 'intro' ? 0 : stage === 'rules' ? 5 : stage === 'entry' ? 25 : stage.startsWith('memory') ? 42 : stage === 'audio' ? 75 : stage === 'decision' ? 75 + ((decisionIndex + 1) / 3) * 25 : 100

  if (stage === 'intro') {
    return <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="bg-slate-950 p-6 text-white sm:p-8"><p className="font-mono text-xs uppercase tracking-[.16em] text-blue-300">Free generated attempt</p><h3 className="mt-3 text-2xl font-semibold">Four skills. Twelve scored items.</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">You will see four record fields, one memory code, four spoken record fields, and three timed decisions. Allow 6–8 minutes and use headphones if available.</p></div><div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><p className="text-sm text-slate-600">No account · no payment · results stored only in this browser</p><button type="button" onClick={start} className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800">Start practice test <ArrowRight className="size-4" /></button></div></section>
  }

  if (stage === 'results') {
    return (
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-950 p-6 text-white sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[.16em] text-blue-300">Practice result · not an official score</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <div><h3 className="text-3xl font-semibold">Your skill snapshot</h3><p className="mt-2 text-sm text-slate-300">Use the lowest category to choose the next focused drill.</p></div>
            <div><strong className="font-mono text-5xl">{totalScore}</strong><span className="ml-1 text-slate-400">/100</span></div>
          </div>
        </div>
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_.8fr]">
          <div className="space-y-4">
            {(Object.entries(scores) as Array<[SkillKey, number]>).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-600">{skillDetails[key].label}{key === 'audio' && transcriptVisible ? ' (transcript fallback)' : ''}</span>
                  <strong className="font-mono">{value}%</strong>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-700" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
            {transcriptVisible && <p className="rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">The audio transcript was visible, so this category measured visual data entry rather than listening accuracy.</p>}
          </div>
          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.14em] text-amber-800">Recommended next step</p>
            <h4 className="mt-2 text-lg font-semibold">{recommendation.label}</h4>
            <p className="mt-2 text-sm leading-6 text-amber-950/75">Repeat this skill on its own before adding more speed or interruptions.</p>
            <Link href={recommendation.href} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white">{recommendation.action} <ArrowRight className="size-4" /></Link>
            <button type="button" onClick={onRetry} className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 text-sm font-semibold text-amber-950/70"><RotateCcw className="size-4" /> Generate another test</button>
            <Link href="/progress" className="inline-flex h-10 w-full items-center justify-center text-sm font-semibold text-amber-950/70">View local progress</Link>
          </aside>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-700 transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[.12em] text-slate-500"><span>{stage === 'rules' ? 'Instructions' : stage === 'entry' ? 'Items 1–4' : stage.startsWith('memory') ? 'Item 5' : stage === 'audio' ? 'Items 6–9' : `Item ${10 + decisionIndex}`}</span><span>{Math.round(progress)}%</span></div>

      {stage === 'rules' && <Rules onContinue={() => setStage('entry')} />}
      {stage === 'entry' && <><TaskHeading icon={Keyboard} eyebrow="Visual data entry · 4 scored fields" title="Enter the record exactly" body="Copy the visible dispatch details into the matching fields. Blank fields receive no credit." /><RecordCard record={session.entryRecord} /><div className="mt-6"><FieldInputs value={entry} onChange={setEntry} /></div><NextButton label="Continue to memory" onClick={() => setStage('memory-show')} /></>}
      {stage === 'memory-show' && <><TaskHeading icon={Brain} eyebrow="Short-term memory · 1 scored item" title="Hold this code for 3.5 seconds" body="The code will disappear automatically. Do not write it down." /><div className="my-10 rounded-lg border border-blue-200 bg-blue-50 px-5 py-10 text-center font-mono text-4xl font-bold tracking-[.25em] text-blue-950 sm:text-5xl">{session.memoryCode}</div></>}
      {stage === 'memory-answer' && <><TaskHeading icon={Brain} eyebrow="Short-term memory · item 5" title="Enter the code you saw" body="Accuracy is exact; all characters must be in the correct order." /><input autoFocus value={memory} onChange={(event) => setMemory(event.target.value.toUpperCase())} maxLength={6} spellCheck={false} className="mt-8 h-16 w-full rounded-md border border-slate-300 px-4 text-center font-mono text-2xl font-bold tracking-[.24em] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" placeholder="______" /><NextButton label="Continue to audio" onClick={() => setStage('audio')} /></>}
      {stage === 'audio' && <><TaskHeading icon={Headphones} eyebrow="Audio data entry · 4 scored fields" title="Listen and enter the exact details" body="The browser voice reads numbers digit by digit in English. Replay is available during this learning diagnostic." /><button type="button" onClick={playAudio} className="mt-7 flex w-full items-center gap-4 rounded-lg bg-slate-950 p-5 text-left text-white transition hover:bg-slate-800"><span className="grid size-11 place-items-center rounded-md bg-blue-600">{audioPlaying ? <Volume2 className="size-5" /> : <Play className="size-5" />}</span><span><span className="block font-semibold">{audioPlaying ? 'Playing caller audio…' : audioPlayed ? 'Replay caller audio' : 'Play caller audio'}</span><span className="mt-1 block font-mono text-xs uppercase tracking-wider text-slate-400">English voice · normal pace</span></span></button>{audioUnavailable && <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">An English browser voice is unavailable. Try Chrome or reveal the accessible transcript; transcript use changes this section from listening to visual entry. <button type="button" onClick={() => setTranscriptVisible(true)} className="font-semibold underline underline-offset-4">Reveal transcript</button></div>}{transcriptVisible && <RecordCard record={session.audioRecord} compact />}<div className="mt-6"><FieldInputs value={audio} onChange={setAudio} /></div><NextButton label="Continue to timed decisions" disabled={!audioPlayed && !transcriptVisible} onClick={() => setStage('decision')} /></>}
      {stage === 'decision' && <><TaskHeading icon={BellRing} eyebrow={`Rapid decision · item ${10 + decisionIndex} of 12`} title="Route the incident within 15 seconds" body="Use only the four practice rules shown before the test." /><div className="mt-7 rounded-lg border-2 border-rose-300 bg-rose-50 p-5"><div className="flex items-center justify-between gap-4"><p className="font-mono text-xs font-semibold uppercase tracking-[.14em] text-rose-700">Incoming incident</p><span aria-live="polite" className="font-mono text-lg font-bold text-rose-700">{decisionSeconds}s</span></div><p className="mt-3 text-lg font-semibold leading-7">{currentDecision.prompt}</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{services.map((service) => <button key={service} type="button" disabled={decisionResolved} onClick={() => chooseService(service)} className={`h-11 rounded-md border text-sm font-semibold transition ${selectedService === service ? 'border-blue-700 bg-blue-700 text-white' : 'border-rose-200 bg-white hover:border-rose-500'} disabled:cursor-default`}>{service}</button>)}</div></div>{decisionResolved && <div className={`mt-4 rounded-md border p-4 text-sm ${selectedService === currentDecision.answer ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-amber-200 bg-amber-50 text-amber-950'}`}><strong>{selectedService === currentDecision.answer ? 'Correct.' : decisionSeconds === 0 ? 'Time expired.' : 'Not this time.'}</strong> The practice rule routes this incident to {currentDecision.answer}.</div>}<NextButton label={decisionIndex === 2 ? 'View skill results' : 'Continue to next decision'} disabled={!decisionResolved} onClick={continueDecision} /></>}
    </section>
  )
}

function Rules({ onContinue }: { onContinue: () => void }) {
  const rules = [['Police', 'Threats, intentional harm, property crime, or damage'], ['Fire', 'Smoke, active fire, alarms, or a person trapped'], ['EMS', 'An emergency medical condition requiring trained help'], ['Utility', 'Public power, gas, water, sewer, streetlight, or signal failure']]
  return <div className="mt-7"><TaskHeading icon={Check} eyebrow="Instructions · not scored" title="Use these four rules" body="For this practice test, classify each incident only by the supplied rule. Do not add assumptions from real-world agency procedure." /><div className="mt-7 grid gap-3 sm:grid-cols-2">{rules.map(([service, rule]) => <div key={service} className="rounded-lg border border-slate-200 bg-slate-50 p-4"><h4 className="font-semibold">{service}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{rule}</p></div>)}</div><NextButton label="Begin visual data entry" onClick={onContinue} /></div>
}

function TaskHeading({ icon: Icon, eyebrow, title, body }: { icon: typeof Keyboard; eyebrow: string; title: string; body: string }) {
  return <div className="mt-7"><p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[.14em] text-blue-700"><Icon className="size-4" /> {eyebrow}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-2 max-w-2xl leading-7 text-slate-600">{body}</p></div>
}

function RecordCard({ record, compact = false }: { record: RecordFields; compact?: boolean }) {
  return <div className={`${compact ? 'mt-4' : 'mt-7'} rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800`}>CALLER: {record.name}<br />LOCATION: {record.address}<br />CALLBACK: {record.phone}<br />VEHICLE PLATE: {record.plate}</div>
}

function FieldInputs({ value, onChange }: { value: RecordFields; onChange: (next: RecordFields) => void }) {
  const fields: Array<[keyof RecordFields, string, string]> = [['name', 'Caller name', 'First and last name'], ['address', 'Address', 'Street address'], ['phone', 'Callback number', '555-000-0000'], ['plate', 'Vehicle plate', 'Letters and numbers']]
  return <div className="grid gap-4 sm:grid-cols-2">{fields.map(([key, label, placeholder]) => <label key={key}><span className="mb-1.5 block font-mono text-[.68rem] font-semibold uppercase tracking-[.14em] text-slate-500">{label}</span><input value={value[key]} onChange={(event) => onChange({ ...value, [key]: event.target.value })} placeholder={placeholder} spellCheck={false} autoComplete="off" className="h-11 w-full rounded-md border border-slate-300 px-3 font-mono text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" /></label>)}</div>
}

function NextButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <div className="mt-8 flex justify-end"><button type="button" disabled={disabled} onClick={onClick} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300">{label} <ArrowRight className="size-4" /></button></div>
}
