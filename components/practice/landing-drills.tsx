'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Play, Volume2 } from 'lucide-react'
import { speakEnglish } from '@/lib/english-speech'
import {
  copyEntryFields,
  copyEntryLabels,
  difficultySettings,
  generateCopyEntryRound,
  generateDataEntryScenario,
  generateDecisionScenario,
  generateMemoryCode,
  normalizeCopyEntry,
  recordToAudioScript,
  type CopyEntryField,
  type DispatchService,
  type RecordFields,
} from '@/lib/generators/dispatcher-drills'
import { saveDrillResult } from '@/lib/progress'

const services: DispatchService[] = ['Police', 'Fire', 'EMS', 'Utility']

function elapsedSeconds(startedAt: number) {
  return Math.max(1, Math.round((Date.now() - startedAt) / 1000))
}

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function netWpm(passage: string, response: string, seconds: number) {
  const correctCharacters = Array.from(response).reduce((total, character, index) => total + Number(character === passage[index]), 0)
  const typedCharacters = response.length
  const accuracy = typedCharacters ? Math.round((correctCharacters / typedCharacters) * 100) : 0
  const wpm = Math.round(((typedCharacters / 5) / seconds) * 60 * (accuracy / 100))
  return { wpm, accuracy, correctCharacters, typedCharacters }
}

function fieldAccuracy(record: RecordFields, response: RecordFields) {
  const keys = Object.keys(record) as Array<keyof RecordFields>
  const correct = keys.filter((key) => normalizeCopyEntry(record[key]) === normalizeCopyEntry(response[key]) && normalizeCopyEntry(record[key]).length > 0).length
  return { score: Math.round((correct / keys.length) * 100), correct, total: keys.length }
}

function callerPassage(record: RecordFields) {
  return `Caller ${record.name} is at ${record.address}. Callback ${record.phone}. Vehicle plate ${record.plate}. The caller is still on the line and can point out the vehicle.`
}

function emptyRecord(): RecordFields {
  return { name: '', address: '', phone: '', plate: '' }
}

const inputClass = 'h-11 w-full rounded-md border border-slate-300 px-3 font-mono text-sm uppercase outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-100'

export function TypingLandingDrill() {
  const [passage, setPassage] = useState<string | null>(null)
  const [response, setResponse] = useState('')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [now, setNow] = useState(0)
  const [result, setResult] = useState<ReturnType<typeof netWpm> | null>(null)
  const [seconds, setSeconds] = useState<number | null>(null)
  const activePassage = useRef('')

  useEffect(() => {
    if (startedAt === null || result) return
    const timer = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(timer)
  }, [result, startedAt])

  function restart() {
    const next = callerPassage(generateDataEntryScenario('normal'))
    activePassage.current = next
    setPassage(next)
    setResponse('')
    setStartedAt(null)
    setResult(null)
    setSeconds(null)
  }

  function score() {
    if (startedAt === null) return
    const spent = elapsedSeconds(startedAt)
    const next = netWpm(activePassage.current, response, spent)
    setSeconds(spent)
    setResult(next)
    saveDrillResult('typing', next.accuracy, undefined, { wpm: next.wpm, accuracy: next.accuracy })
  }

  const clock = startedAt === null ? '0:00' : formatClock(seconds ?? Math.max(1, Math.round((((now || Date.now()) - startedAt) / 1000))))

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">Type the caller record exactly. The clock starts when you do. Score the run when you finish. Pasting is off.</p>
      {startedAt === null ? <div className="mt-6"><button type="button" onClick={() => { const next = passage ?? callerPassage(generateDataEntryScenario('normal')); activePassage.current = next; setPassage(next); setStartedAt(Date.now()); setNow(Date.now()) }} className="inline-flex h-11 items-center rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Start typing</button></div> : null}
      {startedAt !== null ? (
        <>
          <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-[.15em] text-slate-500">Elapsed</span>
            <strong className="font-mono text-3xl">{clock}</strong>
          </div>
          <p className="mt-5 select-none rounded-lg border border-slate-200 bg-slate-50 p-5 text-base leading-8 text-slate-800">{activePassage.current}</p>
          <textarea value={response} disabled={result !== null} onPaste={(event) => event.preventDefault()} onChange={(event) => setResponse(event.target.value)} rows={5} spellCheck={false} className="mt-5 w-full rounded-md border border-slate-300 p-4 text-base leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-100" />
          {result === null || seconds === null ? <div className="mt-6 flex justify-end"><button type="button" onClick={score} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Score this run <Check className="size-4" /></button></div> : (
            <div className="mt-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-950 p-4 text-white"><p className="font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-400">Net WPM</p><p className="mt-1 font-mono text-3xl font-bold">{result.wpm}</p></div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-500">Accuracy</p><p className="mt-1 font-mono text-3xl font-bold">{result.accuracy}%</p><p className="mt-1 text-sm text-slate-600">{result.correctCharacters} of {result.typedCharacters} characters matched, in {seconds} seconds.</p></div>
              </div>
              <div className="mt-4 flex justify-end"><button type="button" onClick={restart} className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white">Run another record</button></div>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

function pickEntryFields(random = Math.random) {
  const record = generateCopyEntryRound(random).record
  const count = 4 + Math.floor(random() * 5)
  const pool = [...copyEntryFields]
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = pool[index]
    pool[index] = pool[swap]
    pool[swap] = current
  }
  const picked = new Set(pool.slice(0, count))
  return { record, keys: copyEntryFields.filter((key) => picked.has(key)) }
}

export function EntryLandingDrill() {
  const [task, setTask] = useState<ReturnType<typeof pickEntryFields> | null>(null)
  const [values, setValues] = useState<Partial<Record<CopyEntryField, string>>>({})
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [now, setNow] = useState(0)
  const [graded, setGraded] = useState<Array<{ key: CopyEntryField; correct: boolean }> | null>(null)
  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    if (startedAt === null || graded) return
    const timer = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(timer)
  }, [graded, startedAt])

  function score() {
    if (startedAt === null || task === null) return
    const next = task.keys.map((key) => ({ key, correct: normalizeCopyEntry(values[key] ?? '') === normalizeCopyEntry(task.record[key]) && normalizeCopyEntry(task.record[key]).length > 0 }))
    const spent = elapsedSeconds(startedAt)
    setGraded(next)
    setSeconds(spent)
    saveDrillResult('entry', Math.round((next.filter((field) => field.correct).length / next.length) * 100))
  }

  const clock = startedAt === null ? '0:00' : formatClock(seconds ?? Math.max(1, Math.round((((now || Date.now()) - startedAt) / 1000))))

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">Copy only the fields on the card. One wrong character misses the whole field. Phone dashes are optional. Pasting is off.</p>
      {startedAt === null || task === null ? <div className="mt-6"><button type="button" onClick={() => { setTask(pickEntryFields()); setStartedAt(Date.now()); setNow(Date.now()) }} className="inline-flex h-11 items-center rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Start timed entry</button></div> : (
        <>
          <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-[.15em] text-slate-500">{task.keys.length} fields</span>
            <strong className="font-mono text-3xl">{clock}</strong>
          </div>
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800">
            {task.keys.map((key) => <div key={key}>{copyEntryLabels[key].toUpperCase()}: {task.record[key]}</div>)}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {task.keys.map((key) => (
              <label key={key} className={key === 'address' || key === 'vin' ? 'sm:col-span-2' : undefined}>
                <span className="mb-1.5 block font-mono text-[.65rem] font-medium uppercase tracking-[.15em] text-slate-500">{copyEntryLabels[key]}</span>
                <input disabled={graded !== null} value={values[key] ?? ''} autoComplete="off" spellCheck={false} onPaste={(event) => event.preventDefault()} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value.toUpperCase() }))} className={inputClass} />
              </label>
            ))}
          </div>
          {graded === null || seconds === null ? <div className="mt-6 flex justify-end"><button type="button" onClick={score} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Score this run <Check className="size-4" /></button></div> : (
            <div className="mt-6">
              <p className="text-lg font-semibold">{graded.filter((field) => field.correct).length} of {graded.length} fields exact · {seconds} seconds</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {graded.map((field) => <div key={field.key} className={`rounded-md border px-3 py-2 text-sm ${field.correct ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-950'}`}><span className="font-semibold">{copyEntryLabels[field.key]}: </span>{field.correct ? 'Correct' : `Expected ${task.record[field.key]}`}</div>)}
              </div>
              <div className="mt-4 flex justify-end"><button type="button" onClick={() => { setTask(pickEntryFields()); setValues({}); setStartedAt(null); setGraded(null); setSeconds(null) }} className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white">Next record</button></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function MemoryLandingDrill() {
  const [code, setCode] = useState('')
  const [phase, setPhase] = useState<'ready' | 'show' | 'answer' | 'scored'>('ready')
  const [answer, setAnswer] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    if (phase !== 'show') return
    const timer = window.setTimeout(() => setPhase('answer'), difficultySettings.normal.memoryDuration)
    return () => window.clearTimeout(timer)
  }, [phase, code])

  function score() {
    const next = normalizeCopyEntry(answer) === normalizeCopyEntry(code)
    setCorrect(next)
    setPhase('scored')
    saveDrillResult('memory', next ? 100 : 0, 'normal')
  }

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">A 6-character code stays up for 3.5 seconds. Type it back with every character in order. A partial match scores 0.</p>
      {phase === 'ready' ? <div className="mt-6"><button type="button" onClick={() => { setCode(generateMemoryCode('normal')); setPhase('show') }} className="inline-flex h-11 items-center rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Show the code</button></div> : null}
      {phase !== 'ready' ? <div className="mt-6 grid min-h-32 place-items-center rounded-lg border border-slate-200 bg-slate-50 px-5 text-center font-mono text-4xl font-bold tracking-[.24em]">{phase === 'show' ? code : '••••••'}</div> : null}
      {phase === 'answer' || phase === 'scored' ? (
        <>
          <input autoFocus value={answer} disabled={phase === 'scored'} onChange={(event) => setAnswer(event.target.value.toUpperCase())} maxLength={6} placeholder="ENTER CODE" className="mt-6 h-14 w-full rounded-md border border-slate-300 px-4 text-center font-mono text-xl font-semibold tracking-[.2em] outline-none focus:border-blue-600" />
          {phase === 'answer' ? <div className="mt-6 flex justify-end"><button type="button" onClick={score} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Score recall <Check className="size-4" /></button></div> : (
            <div className="mt-6">
              <p className={`rounded-lg border p-4 text-sm ${correct ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-950'}`}>{correct ? 'Exact match.' : <>Expected <strong className="font-mono tracking-[.14em]">{code}</strong></>}</p>
              <div className="mt-4 flex justify-end"><button type="button" onClick={() => { setCode(''); setAnswer(''); setCorrect(null); setPhase('ready') }} className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white">Next code</button></div>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

export function MultitaskLandingDrill() {
  const [baselineRecord, setBaselineRecord] = useState<RecordFields | null>(null)
  const [pressureRecord, setPressureRecord] = useState<RecordFields | null>(null)
  const [decision, setDecision] = useState<ReturnType<typeof generateDecisionScenario> | null>(null)
  const [baselineValue, setBaselineValue] = useState<RecordFields>(emptyRecord)
  const [pressureValue, setPressureValue] = useState<RecordFields>(emptyRecord)
  const [phase, setPhase] = useState<'baseline' | 'pressure' | 'report'>('baseline')
  const [interrupted, setInterrupted] = useState(false)
  const [choice, setChoice] = useState<DispatchService | null>(null)
  const [report, setReport] = useState<{ baseline: number; pressure: number; decisionCorrect: boolean } | null>(null)

  useEffect(() => {
    if (phase !== 'pressure' || interrupted) return
    const timer = window.setTimeout(() => setInterrupted(true), difficultySettings.normal.interruptionDelay)
    return () => window.clearTimeout(timer)
  }, [interrupted, phase])

  function finishBaseline() {
    setPhase('pressure')
  }

  function finishPressure() {
    if (!baselineRecord || !pressureRecord || !decision) return
    const baseline = fieldAccuracy(baselineRecord, baselineValue).score
    const pressure = fieldAccuracy(pressureRecord, pressureValue).score
    const decisionCorrect = choice === decision.answer
    setReport({ baseline, pressure, decisionCorrect })
    setPhase('report')
    saveDrillResult('pressure', pressure, 'normal')
  }

  function restart() {
    setBaselineRecord(generateDataEntryScenario('normal'))
    setPressureRecord(generateDataEntryScenario('normal'))
    setDecision(generateDecisionScenario())
    setBaselineValue(emptyRecord())
    setPressureValue(emptyRecord())
    setInterrupted(false)
    setChoice(null)
    setReport(null)
    setPhase('baseline')
  }

  if (!baselineRecord || !pressureRecord || !decision) {
    return <div><p className="text-sm leading-relaxed text-slate-600">Enter one quiet record, then a second record with a classification card in the way.</p><div className="mt-6"><button type="button" onClick={() => { setBaselineRecord(generateDataEntryScenario('normal')); setPressureRecord(generateDataEntryScenario('normal')); setDecision(generateDecisionScenario()) }} className="inline-flex h-11 items-center rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Start the pair</button></div></div>
  }

  const activeRecord = phase === 'baseline' ? baselineRecord : pressureRecord
  const activeValue = phase === 'baseline' ? baselineValue : pressureValue
  const setActive = phase === 'baseline' ? setBaselineValue : setPressureValue
  const drop = report ? report.baseline - report.pressure : 0

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">{phase === 'baseline' ? 'Enter this record with no interruption. This accuracy is the baseline.' : 'Enter the next record. An incident will appear before you finish. Classify it, then return to the same fields.'}</p>
      {phase !== 'report' ? (
        <>
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7">CALLER: {activeRecord.name}<br />LOCATION: {activeRecord.address}<br />CALLBACK: {activeRecord.phone}<br />VEHICLE PLATE: {activeRecord.plate}</div>
          {interrupted && choice === null ? (
            <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-950">For this drill: threats and property damage go to Police. Flames or smoke go to Fire. Injury or a medical symptom goes to EMS. A damaged public service goes to Utility.</p>
              <p className="mt-3 text-sm leading-6 text-amber-950">{decision.prompt}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {services.map((service) => <button key={service} type="button" onClick={() => setChoice(service)} className="h-10 rounded-md bg-slate-950 text-sm font-semibold text-white">{service}</button>)}
              </div>
            </div>
          ) : null}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {([['name', 'Caller name'], ['address', 'Address'], ['phone', 'Phone'], ['plate', 'Plate']] as Array<[keyof RecordFields, string]>).map(([key, label]) => (
              <label key={key}>
                <span className="mb-1.5 block font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-500">{label}</span>
                <input disabled={interrupted && choice === null} value={activeValue[key]} onChange={(event) => setActive({ ...activeValue, [key]: event.target.value })} className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 disabled:bg-slate-100" />
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end"><button type="button" onClick={phase === 'baseline' ? finishBaseline : finishPressure} className="inline-flex h-11 items-center rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">{phase === 'baseline' ? 'Score baseline and continue' : 'Score the interrupted record'}</button></div>
        </>
      ) : report ? (
        <div className="mt-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-500">Baseline</p><p className="mt-1 font-mono text-3xl font-bold">{report.baseline}%</p></div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-500">Under pressure</p><p className="mt-1 font-mono text-3xl font-bold">{report.pressure}%</p></div>
            <div className="rounded-lg bg-slate-950 p-4 text-white"><p className="font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-400">Pressure drop</p><p className="mt-1 font-mono text-3xl font-bold">{drop > 0 ? `-${drop}` : drop < 0 ? `+${Math.abs(drop)}` : '0'}</p></div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">The classification was {report.decisionCorrect ? 'correct' : `incorrect. The card answer was ${decision.answer}`}. Pressure drop is baseline accuracy minus the interrupted record. A larger drop means the interruption cost you characters, even if the classification was right.</p>
          <div className="mt-4 flex justify-end"><button type="button" onClick={restart} className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white">Run the pair again</button></div>
        </div>
      ) : null}
    </div>
  )
}

export function AudioLandingDrill() {
  const [record, setRecord] = useState<RecordFields | null>(null)
  const [value, setValue] = useState<RecordFields>(emptyRecord)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  function play() {
    const next = record ?? generateDataEntryScenario('normal')
    if (!record) setRecord(next)
    const started = speakEnglish(recordToAudioScript(next), difficultySettings.normal.audioRate, {
      onStart: () => { setPlaying(true); setUnavailable(false) },
      onEnd: () => setPlaying(false),
      onError: () => { setPlaying(false); setUnavailable(true) },
    })
    if (!started) setUnavailable(true)
  }

  function finish() {
    if (!record) return
    const next = fieldAccuracy(record, value).score
    setScore(next)
    saveDrillResult('audio', next, 'normal')
  }

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">Play the caller, then enter the name, address, phone, and plate. Replay is allowed on this practice page.</p>
      <button type="button" onClick={play} className="mt-6 flex w-full items-center gap-4 rounded-lg bg-slate-950 p-5 text-left text-white"><span className="grid size-11 place-items-center rounded bg-blue-600">{playing ? <Volume2 className="size-5" /> : <Play className="size-5" />}</span><span className="font-semibold">{playing ? 'Playing caller audio…' : 'Play caller audio'}</span></button>
      {unavailable && record ? <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">Transcript fallback, because this browser has no English voice: {recordToAudioScript(record)}</p> : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {([['name', 'Caller name'], ['address', 'Address'], ['phone', 'Phone'], ['plate', 'Plate']] as Array<[keyof RecordFields, string]>).map(([key, label]) => (
          <label key={key}>
            <span className="mb-1.5 block font-mono text-[.65rem] uppercase tracking-[.15em] text-slate-500">{label}</span>
            <input disabled={score !== null} value={value[key]} onChange={(event) => setValue({ ...value, [key]: event.target.value })} className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 disabled:bg-slate-100" />
          </label>
        ))}
      </div>
      {score === null ? <div className="mt-6 flex justify-end"><button type="button" onClick={finish} className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white">Score audio entry <Check className="size-4" /></button></div> : (
        <div className="mt-6">
          <p className="text-lg font-semibold">Accuracy: {score}%</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {record ? ([['name', 'Caller name'], ['address', 'Address'], ['phone', 'Phone'], ['plate', 'Plate']] as Array<[keyof RecordFields, string]>).map(([key, label]) => {
              const correct = normalizeCopyEntry(record[key]) === normalizeCopyEntry(value[key])
              return <div key={key} className={`rounded-md border px-3 py-2 text-sm ${correct ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-950'}`}><span className="font-semibold">{label}: </span>{correct ? 'Correct' : `Expected ${record[key]}`}</div>
            }) : null}
          </div>
          <div className="mt-4 flex justify-end"><button type="button" onClick={() => { setRecord(generateDataEntryScenario('normal')); setValue(emptyRecord()); setScore(null); setUnavailable(false) }} className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white">Next caller</button></div>
        </div>
      )}
    </div>
  )
}

export function PdfLandingDownload() {
  return (
    <div>
      <p className="text-base leading-7 text-slate-700">Use the sheet to practice item types. Use the online version to practice under pressure.</p>
      <a href="/downloads/criticall-practice-test.pdf" download className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-blue-700 px-6 text-sm font-semibold text-white">Download PDF</a>
      <p className="mt-4 text-sm leading-6 text-slate-500">Three original records, four memory codes, and six rule-based decisions. The answer key is the last page. This file is not an official exam.</p>
    </div>
  )
}
