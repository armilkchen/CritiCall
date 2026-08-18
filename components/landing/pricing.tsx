import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const freeFeatures = [
  'Free 8–10 minute pressure assessment',
  'Readiness report with your pressure drop',
  'A sample drill from each skill module',
  'No account required to start',
]

const proFeatures = [
  'Unlimited adaptive drills, all modules',
  'Complete audio data entry practice',
  'Multitasking & interruption training',
  'Full 20 and 30-minute simulations',
  'Progress dashboard & weakness tracking',
  '30 days of full access',
]

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-y border-border bg-secondary/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start free. Unlock full training when you&apos;re ready.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            One simple plan built for the weeks before your test — no
            subscription maze.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-7">
            <h3 className="text-lg font-semibold text-foreground">
              Free Assessment
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See where you stand under pressure.
            </p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                $0
              </span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <a href="/assessment" className="mt-7 inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted">
              Take the free test
            </a>
          </div>

          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-7 shadow-xl shadow-primary/10">
            <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Most popular
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              Pressure Prep
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you need to train for test day.
            </p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                $34
              </span>
              <span className="text-sm text-muted-foreground">/ 30 days</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-7 h-11 shadow-sm">Unlock full training</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
