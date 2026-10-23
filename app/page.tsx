import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Modules } from '@/components/landing/modules'
import { PressureSection } from '@/components/landing/pressure-section'
import { Testimonials } from '@/components/landing/testimonials'
import { Pricing } from '@/components/landing/pricing'
import { Faq } from '@/components/landing/faq'
import { CtaFooter } from '@/components/landing/cta-footer'
import { createSeoMetadata } from '@/lib/seo'

export const metadata = createSeoMetadata({
  title: 'Free 911 Dispatcher Test Prep & CritiCall Practice',
  description: 'Free 911 dispatcher test prep: 20-minute timed practice exam plus six CritiCall-style drills. Instant readiness report. No sign-up.',
  path: '/',
})

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <HowItWorks />
        <Modules />
        <PressureSection />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaFooter />
      </main>
    </div>
  )
}
