import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { heading: 'Practice tools', links: [{ label: 'Training mode', href: '/train' }, { label: 'Timed practice exam', href: '/exam' }, { label: 'Free diagnostic', href: '/assessment' }, { label: 'My progress', href: '/progress' }] },
  { heading: 'Product', links: [{ label: 'How it works', href: '/#how-it-works' }, { label: 'Training modules', href: '/#modules' }, { label: 'Readiness report', href: '/#report' }, { label: 'Free beta', href: '/#pricing' }] },
  { heading: 'Company', links: [{ label: 'Contact', href: '/contact' }, { label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'Refund policy', href: '/refunds' }] },
]

export function SiteFooter() {
  return <footer className="border-t border-border bg-card"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><Link href="/" className="flex items-center gap-2.5"><Image src="/images/dispatchready-logo.png" alt="" width={36} height={36} className="size-9" /><span className="text-base font-semibold tracking-tight text-foreground">DispatchReady</span></Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">Skills practice and pressure simulation for 911 dispatcher hiring test applicants.</p></div>{footerLinks.map((column) => <div key={column.heading}><h2 className="text-sm font-semibold text-foreground">{column.heading}</h2><ul className="mt-4 space-y-2.5">{column.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link></li>)}</ul></div>)}</div><div className="mt-10 border-t border-border pt-6"><p className="text-xs leading-relaxed text-muted-foreground">DispatchReady is not affiliated with CritiCall, Biddle Consulting Group, or any official testing organization. We do not provide official exam questions or scores. Hiring agencies may use different modules, configurations, and passing standards; all results are practice readiness estimates and do not guarantee any outcome.</p><p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} DispatchReady. All rights reserved.</p></div></div></footer>
}
