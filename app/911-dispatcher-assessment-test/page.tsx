import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'
import { PressureAssessment } from '@/components/assessment/pressure-assessment'
import { createSeoMetadata, safeJsonLd, siteUrl } from '@/lib/seo'

const title = '911 Dispatcher Assessment Test: Free Practice, No Sign-Up'
const description = 'Free 911 dispatcher assessment test, no sign-up required. Review common hiring skills, try original sample tasks, and keep the result in this browser.'

export const metadata: Metadata = {
  ...createSeoMetadata({
    title,
    description,
    path: '/911-dispatcher-assessment-test',
  }),
  robots: { index: true, follow: true },
}

const lead = 'A 911 dispatcher assessment test is a skills check used when someone applies for a public-safety call-taking or dispatch job. It usually asks whether you can enter details accurately, follow instructions on the screen, and continue when a second task appears. The hiring agency, or a testing vendor that agency chooses, sets the modules, the timing, and any passing standard. This page explains that step and then offers a free practice round with no account. The result stays in this browser. It is a practice estimate, not an official score or a job offer.'

const whatIs = [
  'Applicants often reach this skills check after an application and before an interview or a background step. The hiring agency sets that order. In most cases the session is run by the agency or by a testing vendor the agency has hired. You might sit in a room the employer reserves, or you might receive a link and a time window. There is no single national calendar.',
  'The session samples work-related skills while a clock is running. You may see a form, a short passage, spoken details, or a message that appears while you are already typing. There is no public figure for the item count, the length, or the result that counts as a pass. If your invitation names a vendor and a module list, that document outranks this guide. Ask the recruiting contact on your invitation if that list is still unclear. DispatchReady does not run hiring tests.',
]

const skillsIntro = 'These five skills are a preparation map, not a claim that every agency uses every item.'

const skills = [
  {
    title: 'Data entry and accuracy',
    body: 'Call details help only when they land in the right field. A name in the phone box, or one swapped digit, sends the next person to the wrong record. Copy plates and apartment numbers exactly.',
  },
  {
    title: 'Typing speed',
    body: 'Some processes ask you to type text that is already on the screen and score both pace and mistakes. Only your hiring notice can say whether a speed figure applies to you.',
  },
  {
    title: 'Multitasking',
    body: 'A hiring assessment may pause data entry, ask for a fast choice, and then send you back to the original form. Pause, handle the new item, and return without losing the details you already held.',
  },
  {
    title: 'Prioritization and situational judgment',
    body: 'You may sort short incidents using rules printed on the screen. Those rules can differ from how a live center assigns units. Follow the rules in front of you rather than guessing from television or a previous job.',
  },
  {
    title: 'Reading and memory',
    body: 'You might read a short passage and keep a few facts, or type a code after it disappears. On the job, the same habit matters when a caller gives a plate or an address once and then moves on.',
  },
]

const comparisonLead = 'Dispatcher assessment is a broad label for any skills check an agency uses for call takers and dispatchers. CritiCall is one vendor product an agency may choose and configure. Public applicant materials describe it as modules an agency can turn on or leave out, not as one national paper. An invitation that names that vendor points to that product. An invitation that only says assessment or skills test might use a different vendor, or an exercise the agency wrote itself.'

const practice = [
  'The round on this page is free practice, not a hiring exam. You copy a caller record, hold a short code, enter spoken details, and finish another record after one interruption. No account is required. The breakdown stays in this browser, and clearing site data can remove it.',
  'Use the result to choose the next drill, not to guess whether an agency will move you forward. This page has no passing line, because agencies set standards that are not published here.',
  'The four items below are original samples. They are not official questions. 911 dispatcher test questions elsewhere are often a fixed list you can memorize once. Each time you start the round below, the record is built again.',
]

const samples = [
  'Sample 1, data entry. Copy the name and the callback into the matching fields: Jordan Hale, 555-014-2281.',
  'Sample 2, memory. Look at the code R7M4Q2, look away, and type it from memory.',
  'Sample 3, rules on the screen. For this sample only, smoke routes to Fire. A caller reports smoke in a stairwell, so the practice choice is Fire.',
  'Sample 4, return after a pause. Enter a plate, answer a short choice, then finish that plate without changing characters.',
]

const prepareIntro = 'Treat preparation as short sessions you can repeat, not as one night of reading tips.'

const prepareSteps = [
  'Type for accuracy before you type for speed. Copy names, street lines, and phone numbers, and slow down if mistakes rise.',
  'Practice putting each detail in the correct field. Say a plate or an apartment number out loud, then type it into the matching box. The goal is a clean entry, not a paraphrase. Repeat that clean entry once more.',
  'Add a limit only after the calm version is clean. A 911 dispatcher practice exam is useful when it strings several skills into one sitting. Short blocks of dispatch test practice show which skill breaks first when the clock is visible.',
  'Review the miss, not only the total. Note a lost digit, a wrong field, or a dropped thread after an interruption. That note is the 911 dispatcher test prep that changes the next round.',
]

const faq = [
  {
    question: 'Is the 911 dispatcher assessment test hard?',
    answer: 'Difficulty depends on the modules your agency selects and on how steady you already are with exact typing, listening, and interruptions. Much of the material looks ordinary. The pressure usually comes from the pace and from small mistakes, such as one wrong digit. No guide can call every session easy or hard, because the configuration is not national.',
  },
  {
    question: 'How long is the 911 dispatcher assessment test?',
    answer: 'There is no single public duration. A short module list finishes sooner than a long one. Your invitation is the source for the appointment you will take. The free practice on this page takes about 6–8 minutes. That figure describes this warm-up only, not a hiring assessment.',
  },
  {
    question: 'Can I take the assessment test online for free?',
    answer: 'You can take the practice on this page online for free, with no sign-up. That practice is not the hiring assessment. The employer decides whether its own session is online, in a testing room, or both. A free round does not replace the appointment in your instructions.',
  },
  {
    question: 'What score do I need to pass?',
    answer: 'This site does not publish a passing score. There is no single national cutoff to quote, and some postings never state one. Agencies set their own standards. The number after this practice round only shows which skill to train next. It is not an official result.',
  },
  {
    question: 'How is the assessment test different from CritiCall?',
    answer: 'An assessment is the general skills step in hiring. CritiCall is a vendor product some agencies configure. If your instructions name that vendor, follow their module list. If they do not, do not assume which product you will see. This page is independent practice, not an official vendor site.',
  },
  {
    question: 'Is the test timed?',
    answer: 'Your hiring instructions say whether the session, or any item in it, is timed. This page cannot tell you the rule your agency uses. The practice interruption here uses a short countdown so you can answer and then return to the original record.',
  },
  {
    question: 'What happens if I don’t pass?',
    answer: 'Retest rules and waiting periods belong to the hiring agency. This site will not guess how many days you must wait or how many attempts you get. Read the notice you received, or ask the recruiting contact listed there. You can still practice the skill that felt least stable.',
  },
]

const closing = 'Start the free 911 dispatcher assessment test practice in the section above when you want a private baseline. It takes a few minutes, needs no account, and leaves the result in this browser. Then repeat the weakest skill until the same kind of detail stays accurate with one interruption in the way.'

const pageUrl = `${siteUrl}/911-dispatcher-assessment-test`

export default function DispatcherAssessmentTestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Hiring assessment guide', item: pageUrl },
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
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:items-start lg:py-20">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="font-medium text-blue-700 underline-offset-4 hover:underline">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li>Hiring assessment guide</li>
                </ol>
              </nav>
              <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[.18em] text-blue-700">Free dispatcher hiring guide</p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">911 Dispatcher Assessment Test: Free Practice Guide</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{lead}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#practice" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-6 text-sm font-semibold text-white transition hover:bg-blue-800">Start the free practice <ArrowRight className="size-4" /></a>
                <Link href="/train" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">Open focused skill drills</Link>
              </div>
              <p className="mt-5 max-w-2xl text-xs leading-relaxed text-slate-500">Independently created practice based on publicly described dispatcher skills. Not affiliated with or endorsed by CritiCall or Biddle Consulting Group.</p>
            </div>

            <aside className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[.16em] text-blue-300">What you can do here</p>
              <div className="mt-6 space-y-5">
                <AsidePoint icon={Clock3} title="About 6–8 minutes" body="A short practice round on this page, not a hiring appointment." />
                <AsidePoint icon={ShieldCheck} title="No account" body="Open the practice with no sign-up and no card." />
                <AsidePoint icon={CheckCircle2} title="Stays in this browser" body="The result is a practice estimate, not an official score." />
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-200 px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">What is the 911 dispatcher assessment test?</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              {whatIs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">What skills does it test?</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">{skillsIntro}</p>
            <div className="mt-8 space-y-6">
              {skills.map((skill) => (
                <section key={skill.title}>
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">{skill.body}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Assessment test vs. CritiCall: what&apos;s the difference?</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>{comparisonLead}</p>
              <p>
                If your packet names CritiCall, follow the module list in your own instructions. DispatchReady is not affiliated with or endorsed by CritiCall or Biddle Consulting Group. For a short original skills check aimed at that search, use the <Link href="/criticall-test" className="font-semibold text-blue-700 underline-offset-4 hover:underline">free CritiCall practice test</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Free 911 dispatcher assessment practice</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              {practice.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-7 text-slate-600">
              {samples.map((sample) => <li key={sample}>{sample}</li>)}
            </ol>
            <div id="practice" className="mt-10 scroll-mt-24">
              <PressureAssessment embedded />
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">How to prepare</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">{prepareIntro}</p>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-base leading-7 text-slate-600">
              {prepareSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
        </section>

        <section className="border-b border-slate-200 px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Behavioral and psychological assessment for dispatchers</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>A behavioral or psychological screen is a separate sitting from the typing, data-entry, and multitasking checks. Those skill tests count characters, fields, and whether you can return to a form after an interruption. A behavioral screen asks what you would do in a described workplace moment, and which response fits a rule the agency cares about. Agencies do not all use one. Some add it after the skills test. Some hire a different vendor for it. The invitation in your packet is the only list that applies to you.</p>
              <p>The items cluster into four jobs. Situational judgment gives you a short scene and four actions. A caller is shouting, a coworker skipped a required callback, or a supervisor tells you to leave a location blank to save time. You mark the most effective action and, on some forms, the least effective one. Stress decisions force a choice when two details arrive together and you cannot capture both at once. The keyed answer is the detail that locates the incident or names the hazard, not the detail that is merely interesting. Rule-following items print a rule on the screen, then describe a case that tempts you to ignore it. If the card says a dark traffic signal goes to the utility service, the answer follows the card even when the caller sounds frightened. Customer-service items ask whether you collect the location before you debate who is at fault, and whether you stay on the checklist while the caller is angry.</p>
              <p>Preparation is repetition against those four jobs, not a personality quiz you can cram the night before. Take eight original scenes. For each one, write the action that secures the location and the immediate hazard first, then write why the faster-looking option fails. Reject any choice that argues with the caller, skips a required field, or invents a unit assignment the card did not give you. Eight reviewed items show the pattern. Forty unread tips do not. A clean character string still belongs on the <Link href="/criticall-test" className="font-semibold text-blue-700 underline-offset-4 hover:underline">CritiCall practice test</Link> and the <Link href="/dispatcher-typing-test" className="font-semibold text-blue-700 underline-offset-4 hover:underline">dispatcher typing test</Link>. An interruption still belongs on the <Link href="/criticall-multitasking-test" className="font-semibold text-blue-700 underline-offset-4 hover:underline">CritiCall multitasking practice</Link>. Judgment items do not raise your words per minute, and a high words-per-minute number does not answer them.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-7 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6 shadow-sm sm:px-8">
              {faq.map((item) => (
                <section key={item.question} className="py-6">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 px-4 py-14 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-3xl rounded-xl bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-base leading-7 text-slate-200">{closing}</p>
            <a href="#practice" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-slate-950">Start the free practice <ArrowRight className="size-4" /></a>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">Related free practice</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              If your hiring instructions name that vendor, continue with the <Link href="/criticall-test" className="font-semibold text-blue-700 underline-offset-4 hover:underline">CritiCall practice test</Link>. It is a separate check with its own skill breakdown. Return to the practice round on this page when you want to measure one interruption.
            </p>
          </div>
        </section>
      </article>
    </main>
  )
}

function AsidePoint({ icon: Icon, title, body }: { icon: typeof Clock3; title: string; body: string }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-600/20 text-blue-300"><Icon className="size-5" /></span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{body}</p>
      </div>
    </div>
  )
}
