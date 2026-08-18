interface SectionLabelProps {
  index: string
  tag: string
  align?: 'left' | 'center'
}

export function SectionLabel({ index, tag, align = 'left' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
    >
      <span className="font-mono text-xs font-medium tabular-nums text-primary">
        {index}
      </span>
      <span
        aria-hidden="true"
        className="h-px w-8 bg-gradient-to-r from-primary/60 to-transparent"
      />
      <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {tag}
      </span>
    </div>
  )
}
