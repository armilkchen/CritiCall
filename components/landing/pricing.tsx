import Link from 'next/link'
import { Check } from 'lucide-react'

const betaFeatures = [
  'Free 8–10 minute pressure assessment',
  'Unlimited training across all six skill modules',
  'Easy, normal, and hard difficulty levels',
  'Full 20-minute timed practice exam',
  'Local progress history and weakness tracking',
  'No account, card, or payment required',
]

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Free public beta</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Build the skills first. Everything is open.</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">We are focused on making the practice useful before introducing any paid plan. Use every current module and tell us what would make it better.</p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border-2 border-primary bg-card p-7 shadow-xl shadow-primary/10 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="text-xl font-semibold text-foreground">DispatchReady beta</h3><p className="mt-1 text-sm text-muted-foreground">All current practice tools, free while we learn from real use.</p></div><span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">$0</span></div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">{betaFeatures.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span className="text-foreground">{feature}</span></li>)}</ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2"><Link href="/assessment" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/80">Start free diagnostic</Link><Link href="/train" className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted">Open training mode</Link></div>
        </div>
      </div>
    </section>
  )
}
