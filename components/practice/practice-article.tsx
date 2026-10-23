import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'
import { createSeoMetadata, safeJsonLd, siteUrl } from '@/lib/seo'

export type PracticeSection = {
  heading: string
  paragraphs: string[]
}

export type PracticeFaq = {
  question: string
  answer: string
}

export type PracticeLink = {
  href: string
  label: string
}

type PracticeArticleProps = {
  path: `/${string}`
  eyebrow: string
  title: string
  description: string
  h1: string
  lede: string
  breadcrumb: string
  points: Array<{ title: string; body: string }>
  startHref: string
  startLabel: string
  startDownload?: boolean
  sections: PracticeSection[]
  faqHeading: string
  faq: PracticeFaq[]
  keepTraining: string[]
  links: PracticeLink[]
  children: ReactNode
}

export function practiceMetadata(path: PracticeArticleProps['path'], title: string, description: string) {
  return createSeoMetadata({ title, description, path })
}

export function PracticeArticle({
  path,
  eyebrow,
  title,
  description,
  h1,
  lede,
  breadcrumb,
  points,
  startHref,
  startLabel,
  startDownload = false,
  sections,
  faqHeading,
  faq,
  keepTraining,
  links,
  children,
}: PracticeArticleProps) {
  const pageUrl = `${siteUrl}${path}`
  const icons = [Clock3, CheckCircle2, ShieldCheck]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumb, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <main className="bg-[#f4f6f8] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <article>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-20">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="font-medium text-blue-700 underline-offset-4 hover:underline">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li>{breadcrumb}</li>
                </ol>
              </nav>
              <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">{eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{h1}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{lede}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={startHref} {...(startDownload ? { download: true } : {})} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-6 text-sm font-semibold text-white transition hover:bg-blue-800">{startLabel} <ArrowRight className="size-4" /></a>
              </div>
              <p className="mt-5 max-w-2xl text-xs leading-relaxed text-slate-500">Independently created practice based on publicly described dispatcher skills. Not affiliated with or endorsed by CritiCall or Biddle Consulting Group.</p>
            </div>
            <aside className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[.16em] text-blue-300">{title}</p>
              <div className="mt-6 space-y-5">
                {points.map((point, index) => {
                  const Icon = icons[index] ?? CheckCircle2
                  return (
                    <div key={point.title} className="flex gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-600/20 text-blue-300"><Icon className="size-5" /></span>
                      <div>
                        <p className="font-semibold">{point.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">{point.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-300">{description}</p>
            </aside>
          </div>
        </section>

        <section id="practice" className="scroll-mt-24 border-b border-slate-200 px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {children}
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.heading} className="border-b border-slate-200 px-4 py-14 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight">{section.heading}</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>
        ))}

        <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">{faqHeading}</h2>
            <div className="mt-7 divide-y divide-slate-200 rounded-xl border border-slate-200 px-6 sm:px-8">
              {faq.map((item) => (
                <section key={item.question} className="py-6">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Keep training</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              {keepTraining.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
