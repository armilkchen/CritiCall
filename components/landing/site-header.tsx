import { Headphones } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Training modules', href: '/#modules' },
  { label: 'Readiness report', href: '/#report' },
  { label: 'Pricing', href: '/#pricing' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <Headphones className="size-4.5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            DispatchReady
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/progress" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">My progress</Link>
          <Link href="/assessment" className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/80">Start free test</Link>
        </div>
      </div>
    </header>
  )
}
