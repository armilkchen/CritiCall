import Image from 'next/image'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import { ReadinessCard } from './readiness-card'

const testimonials = [
  {
    quote:
      'My typing speed was never the problem. The pressure drills showed me my accuracy collapsed the moment a second call came in. I trained that specific gap and passed on my first attempt.',
    name: 'Marcus Adeyemi',
    role: 'Hired — County Emergency Communications',
    image: '/images/portrait-1.png',
  },
  {
    quote:
      'The readiness report was brutally honest. It pinpointed memory recall under interruptions as my weakest skill weeks before test day.',
    name: 'Sofia Reyes',
    role: 'Passed CritiCall-style assessment',
    image: '/images/portrait-2.png',
  },
  {
    quote:
      'As a hiring supervisor, I recommend candidates practice under real pressure. This is the closest simulation I have seen to the actual console workload.',
    name: 'Karen Mitchell',
    role: '18 years, Dispatch Training Supervisor',
    image: '/images/portrait-3.png',
  },
]

const reportHighlights = [
  'A single readiness score you can track across every session',
  'Skill-by-skill comparison of your calm baseline vs. under pressure',
  'The one weakness most likely to cost you points on test day',
]

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Your readiness report
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            See exactly where you stand before test day
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every practice session produces a clear readiness estimate — not a
            pass guarantee, but an honest picture of how you perform under
            pressure.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ReadinessCard />
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              A report built to be read in 30 seconds
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              No vanity metrics. Just the numbers that tell you what to train
              next, presented the way a hiring assessment actually scores you.
            </p>
            <ul className="mt-6 space-y-4">
              {reportHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-pretty leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Trusted by candidates and trainers
            </p>
            <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Real preparation, real outcomes
            </h3>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote
                  className="mt-4 size-6 text-primary/25"
                  aria-hidden="true"
                />
                <blockquote className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <Image
                    src={t.image || '/placeholder.svg'}
                    alt={`Portrait of ${t.name}`}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
