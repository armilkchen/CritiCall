'use client'

import { useEffect, useState } from 'react'
import { Play, Bell, Check, Volume2 } from 'lucide-react'
import { SectionLabel } from './section-label'

const checklist = [
  'Baseline vs. under-pressure accuracy for every skill',
  'A single "pressure drop" score you can track over time',
  'The exact skill most likely to fail you on test day',
  'Full 20 and 30-minute simulations that combine every module',
]

export function PressureSection() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function playDemoAudio() {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(
      'My name is Jennifer Collins. I am at 1842 West Pine Street. The vehicle is a blue Honda Civic. The plate is Seven Kilo X-ray Two Nine Bravo.',
    )
    utterance.rate = 0.88
    utterance.onstart = () => setPlaying(true)
    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section
      id="report"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* Dispatch console — the dark, high-contrast signature moment */}
          <div className="overflow-hidden rounded-lg border border-ink bg-ink text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-blueprint-invert px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                Audio Data Entry · Hard
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                LIVE DRILL
              </span>
            </div>

            <div className="p-5">
              <button
                type="button"
                onClick={playDemoAudio}
                className="flex w-full items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
              >
                <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  {playing ? <Volume2 className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">{playing ? 'Playing caller audio…' : 'Play caller audio'}</span>
                  <span className="block font-mono text-xs text-white/50">
                    &ldquo;Seven Kilo X-ray Two Nine Bravo&hellip;&rdquo;
                  </span>
                </span>
              </button>

              <div className="mt-4 space-y-3">
                {[
                  { label: 'Address', value: '1842 West Pine St' },
                  { label: 'Vehicle', value: 'Blue Honda Civic' },
                  { label: 'Plate', value: '7KX29B' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="font-mono text-[0.7rem] uppercase tracking-wider text-white/40">
                      {field.label}
                    </label>
                    <div className="mt-1 flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white">
                      {field.value}
                      <Check
                        className="size-4 text-emerald-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/15 px-3 py-2.5 text-sm text-white">
                <Bell className="size-4 shrink-0 text-destructive" aria-hidden="true" />
                <span className="font-medium">
                  Incoming incident — pause and classify before continuing.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel index="04" tag="The pressure difference" />
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Don&apos;t just practice questions. Train to stay accurate under
            pressure.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Interruptions, multitasking, and time pressure are what separate a
            passing score from a near miss. We measure exactly how much your
            accuracy drops — then help you close the gap.
          </p>

          <ul className="mt-8 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
