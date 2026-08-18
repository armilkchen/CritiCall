import {
  Keyboard,
  Headphones,
  Brain,
  GitBranch,
  Layers,
  Hash,
} from 'lucide-react'
import { SectionLabel } from './section-label'

const modules = [
  {
    icon: Keyboard,
    title: 'Typing & Data Entry',
    body: 'Structured entry of names, addresses, phone numbers, and plates — scored for speed and accuracy.',
  },
  {
    icon: Hash,
    title: 'Alphanumeric & Plate Practice',
    body: 'Program-generated VINs, plate numbers, and unit IDs. Unlimited variations, never a fixed question bank.',
  },
  {
    icon: Headphones,
    title: 'Audio Data Entry',
    body: 'Listen to a caller read structured details, then enter each field. Speed, corrections, and distractions scale with difficulty.',
  },
  {
    icon: Brain,
    title: 'Short-Term Memory',
    body: 'A code flashes, then disappears. Recall it accurately — then do it while something else is happening.',
  },
  {
    icon: GitBranch,
    title: 'Decision Making',
    body: 'Fire, EMS, or Police? Classify incidents fast using a reviewed rule set that rewards quick, correct routing.',
  },
  {
    icon: Layers,
    title: 'Multitasking & Interruption',
    body: 'The core of the product. Mid-task, an incident interrupts you — handle it, return, and hold your accuracy.',
    featured: true,
  },
]

export function Modules() {
  return (
    <section id="modules" className="scroll-mt-20 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <SectionLabel index="03" tag="Training modules" />
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Practice the skills dispatcher tests actually assess
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Every drill is generated on demand, so you get unlimited adaptive
            reps — not a static list of questions to memorize.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className={`group relative flex flex-col p-6 transition-colors ${
                mod.featured
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-secondary/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <mod.icon
                  className={`size-5 ${mod.featured ? 'text-primary-foreground' : 'text-primary'}`}
                  aria-hidden="true"
                />
                {mod.featured && (
                  <span className="rounded-sm border border-primary-foreground/30 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-primary-foreground/90">
                    Core
                  </span>
                )}
              </div>
              <h3
                className={`mt-4 text-base font-semibold ${mod.featured ? 'text-primary-foreground' : 'text-foreground'}`}
              >
                {mod.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  mod.featured
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                }`}
              >
                {mod.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
