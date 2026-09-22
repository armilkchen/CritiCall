import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'
import { CriticallPracticeTest } from '@/components/criticall/criticall-practice-test'
import { createSeoMetadata, safeJsonLd, siteUrl } from '@/lib/seo'

export const metadata = createSeoMetadata({
  title: 'Free CritiCall Practice Test for 911 Dispatchers',
  description: 'Free CritiCall practice test for 911 dispatchers: 12 original sample tasks, instant skill score, no sign-up, and a recommended next practice drill.',
  path: '/criticall-test',
})

const faq = [
  {
    question: 'Is this an official CritiCall practice test?',
    answer: 'No. DispatchReady is independently created and is not affiliated with or endorsed by CritiCall or Biddle Consulting Group. The practice activities are original and based on publicly described dispatcher skills.',
  },
  {
    question: 'Does every agency use the same CritiCall test?',
    answer: 'No. CritiCall describes a configurable collection of more than 20 tests, and each hiring agency selects the tests it considers appropriate for the position.',
  },
  {
    question: 'Do I need an account or credit card?',
    answer: 'No. The practice test, skill feedback, focused drills, and local progress tools are available during the free beta without sign-up or payment.',
  },
  {
    question: 'Is my DispatchReady score an official score?',
    answer: 'No. It is a practice metric designed to identify a useful next training step. Hiring agencies set their own modules, procedures, and passing standards.',
  },
  {
    question: 'What skills does this 911 dispatcher practice test cover?',
    answer: 'This free sample covers exact visual data entry, short-term memory, English audio detail entry, and timed dispatch decisions. It is a focused diagnostic, not a replica of every module an agency may select.',
  },
  {
    question: 'Does this free test include CritiCall sample questions?',
    answer: 'It includes original dispatcher practice questions and data-entry tasks based on publicly described skills. They are not official, copied, recalled, or leaked CritiCall questions.',
  },
]

export default function CriticallTestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free CritiCall Practice Test for 911 Dispatchers',
    description: 'A free, independently created dispatcher skills practice test with instant skill feedback.',
    url: `${siteUrl}/criticall-test`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    inLanguage: 'en-US',
  }

  return (
    <main className="bg-[#f4f6f8] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Free dispatcher skills practice</p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Free CritiCall Practice Test for 911 Dispatchers</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">Complete 12 original sample tasks in a free 911 dispatcher practice test covering visual data entry, short-term memory, audio detail entry, and rapid dispatch decisions. No sign-up or payment.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#free-practice-test" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-6 text-sm font-semibold text-white transition hover:bg-blue-800">Start the free practice test <ArrowRight className="size-4" /></a>
              <Link href="/assessment" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">Take the pressure assessment</Link>
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-relaxed text-slate-500">Independently created practice based on publicly described dispatcher skills. Not affiliated with or endorsed by CritiCall or Biddle Consulting Group.</p>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[.16em] text-blue-300">What you get</p>
            <div className="mt-6 space-y-5">
              <HeroPoint icon={Clock3} title="About 6–8 minutes" body="Four short sections with one 15-second decision timer." />
              <HeroPoint icon={CheckCircle2} title="Instant skill breakdown" body="See which practice category should come next." />
              <HeroPoint icon={ShieldCheck} title="Private by default" body="No account. Results stay in this browser." />
            </div>
          </aside>
        </div>
      </section>

      <section id="free-practice-test" className="scroll-mt-24 border-b border-slate-200 px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-7 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">12 scored items · generated for this attempt</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Find the skill to train next.</h2>
            <p className="mt-3 leading-relaxed text-slate-600">Blank or incorrect fields receive no credit. This is a practice diagnostic, not an official exam or hiring prediction.</p>
          </div>
          <CriticallPracticeTest />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Skills and scoring</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">What this free CritiCall practice test covers</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">These original sample questions and data-entry tasks provide a focused starting point for CritiCall test prep and broader 911 dispatcher practice. They train four public-safety hiring skills without claiming to reproduce an agency&apos;s exact test configuration.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CoverageCard title="Visual data entry" body="Copy a caller name, address, callback number, and vehicle plate exactly. Each correct field earns equal credit within the category." />
            <CoverageCard title="Memory recall" body="Study one generated code for 3.5 seconds, then enter it from memory. This item uses exact-match scoring." />
            <CoverageCard title="Audio data entry" body="Listen to English caller details and enter four fields. If speech is unavailable, the transcript fallback is labelled separately." />
            <CoverageCard title="Timed decisions" body="Route three incidents using only the supplied Police, Fire, EMS, and Utility rules. Each item allows 15 seconds." />
          </div>
          <p className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">The overall practice score is the equal-weight average of the four categories. Use the category breakdown to choose your next focused drill; do not treat it as an official CritiCall score or hiring prediction.</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <article>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Test overview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">What is the CritiCall test?</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>CritiCall is a configurable pre-employment testing system used by public-safety agencies. Its official applicant FAQ says the software contains more than 20 tests, while each agency selects the tests that fit its position.</p>
              <p>Public materials describe skills such as data entry, listening, memory recall, decision-making, multitasking, map reading, comprehension, spelling, and keyboarding. Your invitation or hiring agency is the best source for the exact process you will take.</p>
            </div>
            <a href="https://criticall911.com/company/news/criticall-dispatcher-applicant" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-blue-700 underline-offset-4 hover:underline">Read the official applicant FAQ <span aria-hidden="true">↗</span></a>
          </article>

          <article>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Preparation</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">How to prepare for the CritiCall test</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <li><strong className="text-slate-950">1. Train exact entry.</strong> Practice names, addresses, telephone numbers, plates, and similar character sequences without sacrificing accuracy.</li>
              <li><strong className="text-slate-950">2. Practice listening in English.</strong> Enter spoken numbers digit by digit and summarize only the essential facts.</li>
              <li><strong className="text-slate-950">3. Learn the supplied rules.</strong> Decision tasks reward following the test&apos;s instructions, not importing assumptions from real agency procedure.</li>
              <li><strong className="text-slate-950">4. Add pressure gradually.</strong> Establish accurate single-skill performance before combining timers and interruptions.</li>
            </ol>
            <a href="https://criticall911.com/hubfs/Criticall-Website-Files/CritiCall_Candidate_Test_Preparation_Guide_2023.pdf" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-blue-700 underline-offset-4 hover:underline">Open the official candidate preparation guide <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Common questions</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">CritiCall practice test FAQ</h2>
          <div className="mt-7 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6 shadow-sm sm:px-8">
            {faq.map((item) => <article key={item.question} className="py-6"><h3 className="text-lg font-semibold">{item.question}</h3><p className="mt-2 leading-7 text-slate-600">{item.answer}</p></article>)}
          </div>
          <div className="mt-8 flex flex-col gap-3 rounded-xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div><h2 className="text-xl font-semibold">Keep training after the diagnostic.</h2><p className="mt-1 text-sm text-slate-300">Repeat one weak skill, then combine the work in Exam Mode.</p></div>
            <div className="flex gap-2"><Link href="/train" className="inline-flex h-11 items-center rounded-md bg-white px-4 text-sm font-semibold text-slate-950">Open training</Link><Link href="/exam" className="inline-flex h-11 items-center rounded-md border border-white/20 px-4 text-sm font-semibold text-white">Exam Mode</Link></div>
          </div>
        </div>
      </section>
    </main>
  )
}

function HeroPoint({ icon: Icon, title, body }: { icon: typeof Clock3; title: string; body: string }) {
  return <div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-600/20 text-blue-300"><Icon className="size-5" /></span><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-300">{body}</p></div></div>
}

function CoverageCard({ title, body }: { title: string; body: string }) {
  return <article className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>
}
