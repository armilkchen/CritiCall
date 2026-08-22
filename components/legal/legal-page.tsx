import type { ReactNode } from 'react'

type LegalPageProps = {
  eyebrow: string
  title: string
  updated: string
  children: ReactNode
}

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#f4f6f8] px-4 py-8 text-slate-950 sm:px-6 lg:py-14">
      <article className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
          <div className="mt-8 space-y-7 text-sm leading-7 text-slate-700">{children}</div>
        </div>
      </article>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="text-lg font-semibold text-slate-950">{title}</h2><div className="mt-2 space-y-3">{children}</div></section>
}
