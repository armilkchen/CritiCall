import { ArrowRight, Headphones } from 'lucide-react'

const footerLinks = [
  {
    heading: 'Practice tools',
    links: [
      'CritiCall Typing Test',
      'Data Entry Practice',
      'Memory Test',
      'Multitasking Test',
      'Audio Practice',
    ],
  },
  {
    heading: 'Learn',
    links: [
      'What is the CritiCall test?',
      'How to pass the CritiCall test',
      'CritiCall passing score',
      'How hard is the test?',
      'Test day tips',
    ],
  },
  {
    heading: 'Company',
    links: ['About', 'Pricing', 'Contact', 'Privacy', 'Terms'],
  },
]

export function CtaFooter() {
  return (
    <>
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

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Headphones className="size-5" aria-hidden="true" />
                </span>
                <span className="text-base font-semibold tracking-tight text-foreground">
                  DispatchReady
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Skills practice and pressure simulation for 911 dispatcher
                hiring test applicants.
              </p>
            </div>

            {footerLinks.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-xs leading-relaxed text-muted-foreground">
              DispatchReady is not affiliated with CritiCall or any official
              testing organization and does not provide official exam questions.
              Different hiring agencies may use different modules, configurations,
              and passing standards. All results are practice readiness estimates
              and do not guarantee any outcome.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} DispatchReady. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
