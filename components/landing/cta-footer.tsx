import { ArrowRight } from 'lucide-react'

export function CtaFooter() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(255,255,255,0.18)_0%,transparent_70%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Find out how you hold up under pressure
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Take the free 8-minute dispatcher pressure test. No sign-up, no
              credit card — just an honest look at your readiness.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="/assessment" className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-secondary px-6 text-base font-medium text-secondary-foreground transition hover:bg-secondary/80">
                Take a free pressure test
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
  )
}
