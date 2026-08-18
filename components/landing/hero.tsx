import Image from 'next/image'
import { ArrowRight, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const specs = [
  { label: 'Duration', value: '8–10 min' },
  { label: 'Sign-up', value: 'None' },
  { label: 'Report', value: 'Instant' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium tabular-nums text-primary">
              01
            </span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-primary/60 to-transparent"
            />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Dispatcher hiring prep
            </span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]">
            Your skills aren&apos;t the problem.{' '}
            <span className="text-primary">The pressure is.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Typing, memory, and decision-making might be strong on their own.
            The real question is what happens to your accuracy under
            interruptions, multitasking, and the clock. Find out in 8 minutes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/assessment" className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/80">
              Take a free pressure test
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <Button
              size="lg"
              variant="outline"
              className="h-12 bg-card px-6 text-base"
            >
              See how it works
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 border-t border-border pt-6">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1">
                <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                  {spec.label}
                </dt>
                <dd className="text-sm font-semibold text-foreground">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          {/* corner framing — precise, instrument-like */}
          <div
            aria-hidden="true"
            className="absolute -left-2 -top-2 size-6 border-l-2 border-t-2 border-primary/70"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-2 -right-2 size-6 border-b-2 border-r-2 border-primary/70"
          />
          <div className="relative overflow-hidden border border-border bg-card">
            <Image
              src="/images/dispatcher-hero.png"
              alt="A 911 dispatcher wearing a headset working at a multi-monitor emergency dispatch workstation"
              width={1024}
              height={1024}
              priority
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
            />

            {/* live status strip */}
            <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/15 bg-ink/70 px-2.5 py-1 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-white/90">
                Live console
              </span>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 w-56 border border-border bg-card p-4 shadow-lg sm:-left-8 sm:w-60">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                Pressure drop
              </span>
              <span className="flex items-center gap-1 bg-destructive/10 px-1.5 py-0.5 text-destructive">
                <TrendingDown className="size-3.5" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold">-24%</span>
              </span>
            </div>
            <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground">
              64<span className="text-base text-muted-foreground">/100</span>
            </p>
            <div className="mt-2 h-1 w-full overflow-hidden bg-secondary">
              <div className="h-full w-[64%] bg-primary" />
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
              Biggest risk: multitasking accuracy
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
