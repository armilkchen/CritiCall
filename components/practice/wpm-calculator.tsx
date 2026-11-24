'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { trackFunnelEvent } from '@/lib/analytics'

const fieldClass = 'mt-2 block h-11 w-full rounded-lg border border-input bg-card px-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
const format = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })

type CountUnit = 'characters' | 'words'
type Counts = { count: string; mistakes: string }

function calculateMetrics(count: number, mistakes: number, minutes: number, unit: CountUnit) {
  const charactersPerMinute = (unit === 'words' ? count * 5 : count) / minutes
  const accuracy = (count - mistakes) / count
  const gross = charactersPerMinute / 5
  return [
    { label: 'Net WPM', value: gross * accuracy },
    { label: 'Gross WPM', value: gross },
    { label: 'Accuracy', value: accuracy * 100, suffix: '%' },
    { label: 'Characters per minute', value: charactersPerMinute },
    { label: 'Keystrokes per hour', value: charactersPerMinute * 60 },
  ]
}

const exampleMetrics = calculateMetrics(300, 15, 1, 'characters')

export function WpmCalculator() {
  const [unit, setUnit] = useState<CountUnit>('characters')
  const [counts, setCounts] = useState<Record<CountUnit, Counts>>({
    characters: { count: '', mistakes: '0' },
    words: { count: '', mistakes: '0' },
  })
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateMetrics> | null>(null)
  const [error, setError] = useState('')
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    trackFunnelEvent('wpm_calculator_view')
  }, [])

  function clearResult() {
    setMetrics(null)
    setError('')
  }

  function updateCount(field: keyof Counts, value: string) {
    setCounts((previous) => ({ ...previous, [unit]: { ...previous[unit], [field]: value } }))
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const count = Number(data.get('count'))
    const mistakes = Number(data.get('mistakes'))
    const minutes = Number(data.get('minutes')) + Number(data.get('seconds')) / 60

    if (minutes === 0) {
      setError('Enter a time greater than zero.')
      return
    }
    if (mistakes > count) {
      setError(`Incorrect ${unit} cannot exceed the total typed.`)
      return
    }

    setMetrics(calculateMetrics(count, mistakes, minutes, unit))
    setError('')
    trackFunnelEvent('wpm_calculation')
  }

  return (
    <div className="grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2">
      <form onSubmit={calculate} onChange={clearResult} className="space-y-5 p-5 sm:p-7">
        <label className="block text-sm font-medium">
          Count by
          <select className={fieldClass} value={unit} onChange={(event) => setUnit(event.target.value === 'words' ? 'words' : 'characters')}>
            <option value="characters">Characters</option>
            <option value="words">Words</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            Total {unit}
            <input name="count" className={fieldClass} type="number" inputMode="numeric" min={1} max={1000000} step={1} required value={counts[unit].count} onChange={(event) => updateCount('count', event.target.value)} />
          </label>
          <label className="block text-sm font-medium">
            Incorrect {unit}
            <input name="mistakes" className={fieldClass} type="number" inputMode="numeric" min={0} max={1000000} step={1} value={counts[unit].mistakes} onChange={(event) => updateCount('mistakes', event.target.value)} />
          </label>
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Elapsed time</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label className="text-sm text-muted-foreground">
              Minutes
              <input name="minutes" className={fieldClass} type="number" inputMode="numeric" min={0} max={1440} step={1} defaultValue={1} />
            </label>
            <label className="text-sm text-muted-foreground">
              Seconds
              <input name="seconds" className={fieldClass} type="number" inputMode="numeric" min={0} max={59} step={1} defaultValue={0} />
            </label>
          </div>
        </fieldset>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button type="submit" className="min-h-11 w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto">
          Calculate typing speed
        </button>
      </form>
      <section className="border-t border-border bg-muted p-5 sm:p-7 md:border-l md:border-t-0" aria-labelledby="typing-results">
        <div aria-live="polite" aria-atomic="true">
          <h2 id="typing-results" className="text-lg font-semibold">{metrics ? 'Your results' : 'Example results'}</h2>
          {!metrics && <p className="mt-2 text-sm leading-6 text-muted-foreground">300 characters, 15 incorrect, in 1 minute.</p>}
          <dl className="mt-3 divide-y divide-border">
            {(metrics ?? exampleMetrics).map(({ label, value, suffix }) => (
              <div key={label} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="font-mono text-lg font-semibold tabular-nums">{format.format(value)}{suffix}</dd>
              </div>
            ))}
          </dl>
          {metrics && unit === 'words' && <p className="mt-3 text-sm text-muted-foreground">Word mode uses word-level accuracy and estimates five characters per word.</p>}
        </div>
      </section>
    </div>
  )
}

export function WpmTypingTestLink() {
  return (
    <Link href="/dispatcher-typing-test" onClick={() => trackFunnelEvent('wpm_typing_test_click')} className="font-medium text-primary underline underline-offset-4">
      Take the 911 dispatcher typing test
    </Link>
  )
}
