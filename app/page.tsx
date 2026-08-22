import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Modules } from '@/components/landing/modules'
import { PressureSection } from '@/components/landing/pressure-section'
import { Testimonials } from '@/components/landing/testimonials'
import { Pricing } from '@/components/landing/pricing'
import { Faq } from '@/components/landing/faq'
import { CtaFooter } from '@/components/landing/cta-footer'

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
