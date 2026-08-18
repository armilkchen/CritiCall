import { SectionLabel } from './section-label'

const steps = [
  {
    title: 'Find your test',
    body: 'Land here while researching your CritiCall-style dispatcher hiring test. Start immediately — no account needed.',
  },
  {
    title: 'Take the pressure test',
    body: 'An 8–10 minute assessment across typing, memory, audio entry, and decisions — with real interruptions layered in.',
  },
  {
    title: 'Get your readiness report',
    body: 'See your baseline vs. under-pressure accuracy, your pressure drop, and the single skill most likely to fail you.',
  },
  {
    title: 'Train your weak spots',
    body: 'Unlock unlimited adaptive drills and full simulations built to keep you accurate when the pressure hits.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="max-w-2xl">
        <SectionLabel index="02" tag="How it works" />
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          From search to test-ready in four steps
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          A focused funnel that surfaces your weaknesses first, then fixes them
          before test day.
        </p>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="group relative bg-card p-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
            />
            <span className="font-mono text-sm font-semibold tabular-nums text-primary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
