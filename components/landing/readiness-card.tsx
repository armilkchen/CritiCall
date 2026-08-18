import { TrendingDown } from 'lucide-react'

const skills = [
  { name: 'Typing', baseline: 91, pressure: 84 },
  { name: 'Memory', baseline: 82, pressure: 57 },
  { name: 'Audio Entry', baseline: 79, pressure: 61 },
  { name: 'Decision Making', baseline: 86, pressure: 81 },
  { name: 'Accuracy', baseline: 88, pressure: 64 },
]

export function ReadinessCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-primary/5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Practice Readiness Estimate
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            Your pressure profile
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-destructive">
          <TrendingDown className="size-4" aria-hidden="true" />
          <span className="font-mono text-sm font-semibold">-24%</span>
        </div>
      </div>

      <div className="mt-4 space-y-3.5">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Skill</span>
          <div className="flex items-center gap-4">
            <span className="w-14 text-right">Baseline</span>
            <span className="w-14 text-right text-foreground">Pressure</span>
          </div>
        </div>

        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {skill.name}
              </span>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="w-14 text-right text-muted-foreground">
                  {skill.baseline}%
                </span>
                <span className="w-14 text-right font-semibold text-foreground">
                  {skill.pressure}%
                </span>
              </div>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-border"
                style={{ width: `${skill.baseline}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${skill.pressure}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-3.5">
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">Biggest risk: Multitasking.</span>{' '}
          Your baseline skills are strong, but accuracy drops sharply when
          interruptions are introduced.
        </p>
      </div>
    </div>
  )
}
