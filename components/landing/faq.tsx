import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Is this the official CritiCall test?',
    a: 'No. DispatchReady is not affiliated with CritiCall or any official testing body, and we do not provide real exam questions. We offer CritiCall-style skills practice for the abilities commonly assessed in dispatcher hiring tests.',
  },
  {
    q: 'Will my score tell me if I passed?',
    a: 'Different hiring agencies configure their own modules, difficulty, and passing standards, so there is no single national score. Your result is a practice readiness estimate to highlight strengths and weak spots — not an official score or a guarantee of passing.',
  },
  {
    q: 'What makes this different from a question bank?',
    a: 'Our drills are generated on demand, so you get unlimited adaptive reps. More importantly, we measure your accuracy under interruptions and multitasking — the pressure that a static PDF or question list can never replicate.',
  },
  {
    q: 'Do I need an account to try it?',
    a: 'No. The free 8–10 minute pressure assessment starts immediately with no sign-up. You only create an account after purchasing full training access.',
  },
  {
    q: 'How does the audio practice work?',
    a: 'A generated caller reads structured details — names, addresses, phone numbers, plates — and you enter each field. Difficulty scales with faster speech, corrections, and distractions, mirroring real call conditions.',
  },
]

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          FAQ
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Questions before you start
        </h2>
      </div>

      <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((faq) => (
          <details key={faq.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-foreground">
              {faq.q}
              <Plus
                className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
