'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BellRing, Brain, Check, Keyboard, RotateCcw } from 'lucide-react'

type Drill = 'entry' | 'memory' | 'pressure'
type RecordFields = { name: string; address: string; phone: string; plate: string }

const records: RecordFields[] = [
  { name: 'Avery Collins', address: '710 North Harbor Road', phone: '555-638-1904', plate: '8JQ41L' },
  { name: 'Theo Bennett', address: '62 Maple Court', phone: '555-204-7718', plate: '4VX92P' },
  { name: 'Nora Patel', address: '3916 East Willow Avenue', phone: '555-816-0432', plate: '6RB73C' },
]

const pressureRecord: RecordFields = { name: 'Keira Lewis', address: '219 West Ridge Drive', phone: '555-391-6208', plate: '2MN84K' }
const initialFields = (): RecordFields => ({ name: '', address: '', phone: '', plate: '' })
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

function score(answer: RecordFields, response: RecordFields) {
  return Math.round((Object.keys(answer) as Array<keyof RecordFields>).reduce((total, key) => total + Number(normalize(answer[key]) === normalize(response[key])), 0) * 25)
}

const drillInfo = {
  entry: { label: 'Data Entry', detail: 'Structured details · accuracy first', icon: Keyboard },
  memory: { label: 'Memory Recall', detail: 'Brief visual recall', icon: Brain },
  pressure: { label: 'Pressure Drill', detail: 'Interrupted data entry', icon: BellRing },
}

export default function TrainPage() {
  const [drill, setDrill] = useState<Drill>('entry')
  const [round, setRound] = useState(0)

  function selectDrill(next: Drill) {
    setDrill(next)
    setRound((value) => value + 1)
  }

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-slate-950">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800"><span className="grid size-8 place-items-center rounded bg-blue-700 text-white"><Keyboard className="size-4" /></span>DispatchReady</Link><span className="font-mono text-xs uppercase tracking-[.16em] text-slate-500">Training console</span></div></header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[250px_1fr] lg:py-10">
        <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:h-fit"><p className="px-3 pb-3 pt-2 font-mono text-[.65rem] font-semibold uppercase tracking-[.16em] text-slate-500">Core drills</p><div className="space-y-1">{(Object.keys(drillInfo) as Drill[]).map((key) => { const item = drillInfo[key]; const Icon = item.icon; return <button type="button" key={key} onClick={() => selectDrill(key)} className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition ${drill === key ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'}`}><Icon className={`mt-0.5 size-4 shrink-0 ${drill === key ? 'text-blue-300' : 'text-blue-700'}`} /><span><span className="block text-sm font-semibold">{item.label}</span><span className={`mt-0.5 block text-xs leading-relaxed ${drill === key ? 'text-slate-400' : 'text-slate-500'}`}>{item.detail}</span></span></button> })}</div><div className="mx-3 mt-5 border-t border-slate-200 pt-4"><p className="text-xs leading-relaxed text-slate-500">Practice mode does not create an official score. Paid access control and training history are the next MVP layer.</p></div></aside>
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,.55)]"><div className="border-b border-slate-200 bg-[linear-gradient(120deg,#0f172a_0%,#172554_100%)] px-6 py-6 text-white sm:px-8"><p className="font-mono text-xs uppercase tracking-[.18em] text-blue-300">{drillInfo[drill].label}</p><h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Train one ability at a time.</h1><p className="mt-2 text-sm leading-relaxed text-slate-300">Repeat the round until precision feels automatic, then layer in the interruption.</p></div><div className="p-6 sm:p-8">{drill === 'entry' && <EntryRound key={round} onNext={() => setRound((value) => value + 1)} />}{drill === 'memory' && <MemoryRound key={round} onNext={() => setRound((value) => value + 1)} />}{drill === 'pressure' && <PressureRound key={round} onNext={() => setRound((value) => value + 1)} />}</div></section>
      </div>
    </main>
  )
}

function DataFields({ value, onChange, disabled = false }: { value: RecordFields; onChange: (next: RecordFields) => void; disabled?: boolean }) {
  return <div className="grid gap-4 sm:grid-cols-2">{([['name', 'Caller name'], ['address', 'Address'], ['phone', 'Phone'], ['plate', 'Plate']] as Array<[keyof RecordFields, string]>).map(([key, label]) => <label key={key}><span className="mb-1.5 block font-mono text-[.65rem] font-medium uppercase tracking-[.15em] text-slate-500">{label}</span><input disabled={disabled} value={value[key]} onChange={(event) => onChange({ ...value, [key]: event.target.value })} className="h-11 w-full rounded-md border border-slate-300 px-3 font-mono text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-100" /></label>)}</div>
}

function RecordCard({ record }: { record: RecordFields }) {
  return <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">CALLER: {record.name}<br />LOCATION: {record.address}<br />CALLBACK: {record.phone}<br />VEHICLE PLATE: {record.plate}</div>
}

function Result({ value, onNext }: { value: number; onNext: () => void }) {
  return <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4"><div><p className="font-mono text-[.65rem] font-semibold uppercase tracking-[.15em] text-emerald-700">Round complete</p><p className="mt-1 text-lg font-semibold text-slate-950">Accuracy: {value}%</p></div><button type="button" onClick={onNext} className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800">Next round <ArrowRight className="size-4" /></button></div>
}

function EntryRound({ onNext }: { onNext: () => void }) {
  const record = useMemo(() => records[Math.floor(Math.random() * records.length)], [])
  const [value, setValue] = useState(initialFields)
  const [result, setResult] = useState<number | null>(null)
  return <><p className="text-sm leading-relaxed text-slate-600">Read the record, then enter the details without copying and pasting.</p><div className="mt-6"><RecordCard record={record} /></div><div className="mt-6"><DataFields value={value} onChange={setValue} disabled={result !== null} /></div>{result === null ? <RoundButton label="Score this round" onClick={() => setResult(score(record, value))} /> : <Result value={result} onNext={onNext} />}</>
}

function MemoryRound({ onNext }: { onNext: () => void }) {
  const code = useMemo(() => `${Math.random().toString(36).slice(2, 8).toUpperCase()}`, [])
  const [visible, setVisible] = useState(true)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<number | null>(null)
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 3500); return () => window.clearTimeout(timer) }, [])
  return <><p className="text-sm leading-relaxed text-slate-600">Memorize the code before it clears. No notes—just recall.</p><div className="mt-8 grid min-h-32 place-items-center rounded-lg border border-slate-200 bg-slate-50 px-5 text-center font-mono text-3xl font-bold tracking-[.24em] text-slate-950 sm:text-4xl">{visible ? code : '••••••'}</div>{!visible && <><input autoFocus value={answer} onChange={(event) => setAnswer(event.target.value.toUpperCase())} disabled={result !== null} maxLength={6} placeholder="ENTER CODE" className="mt-7 h-14 w-full rounded-md border border-slate-300 px-4 text-center font-mono text-xl font-semibold tracking-[.2em] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" />{result === null ? <RoundButton label="Score recall" onClick={() => setResult(answer === code ? 100 : 0)} /> : <Result value={result} onNext={onNext} />}</>}</>
}

function PressureRound({ onNext }: { onNext: () => void }) {
  const [value, setValue] = useState(initialFields)
  const [interrupted, setInterrupted] = useState(false)
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState<number | null>(null)
  useEffect(() => { const timer = window.setTimeout(() => setInterrupted(true), 7000); return () => window.clearTimeout(timer) }, [])
  const total = Math.round(score(pressureRecord, value) * .75 + (decision === 'Fire' ? 25 : 0))
  return <><p className="text-sm leading-relaxed text-slate-600">Enter the details. Stay with the task if a priority incident appears.</p><div className="mt-6"><RecordCard record={pressureRecord} /></div><div className="mt-6"><DataFields value={value} onChange={setValue} disabled={(interrupted && !decision) || result !== null} /></div>{interrupted && !decision && <div className="mt-6 rounded-lg border-2 border-rose-400 bg-rose-50 p-5"><div className="flex gap-3"><BellRing className="mt-0.5 size-5 shrink-0 text-rose-600" /><div><p className="font-mono text-[.65rem] font-semibold uppercase tracking-[.15em] text-rose-700">Incoming incident</p><p className="mt-2 font-semibold text-slate-950">Flames are visible from a vehicle in a parking lot. Which service receives it?</p><div className="mt-4 grid grid-cols-3 gap-2">{['Police', 'Fire', 'EMS'].map((option) => <button type="button" key={option} onClick={() => setDecision(option)} className="h-10 rounded-md border border-rose-200 bg-white text-sm font-semibold transition hover:border-rose-500 hover:bg-rose-100">{option}</button>)}</div></div></div></div>}{decision && <p className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-700"><Check className="size-4" /> Routed. Finish the original record.</p>}{result === null ? <RoundButton label={decision ? 'Score pressure round' : interrupted ? 'Route the incident first' : 'Waiting for interruption…'} disabled={!decision} onClick={() => setResult(total)} /> : <Result value={result} onNext={onNext} />}</>
}

function RoundButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <div className="mt-8 flex justify-end"><button type="button" disabled={disabled} onClick={onClick} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300">{label}<Check className="size-4" /></button></div>
}
