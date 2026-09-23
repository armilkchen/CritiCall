import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'

export const metadata: Metadata = { title: 'Refund Policy | DispatchReady', description: 'DispatchReady is currently a free public beta and does not process purchases.', alternates: { canonical: '/refunds' }, robots: { index: false, follow: true } }

export default function RefundsPage() {
  return <LegalPage eyebrow="Legal" title="Refund Policy" updated="August 22, 2026">
    <LegalSection title="Current MVP status"><p>DispatchReady does not currently process purchases or provide paid access. As a result, there are no charges or refunds under this MVP.</p></LegalSection>
    <LegalSection title="Before paid access launches"><p>Before checkout is enabled, we will publish the price, access period, cancellation process, and refund eligibility that apply to a purchase. Those terms will be shown before payment is submitted.</p></LegalSection>
    <LegalSection title="Need help?"><p>If you believe you were charged in error after paid access launches, contact support promptly using the method listed on the <a className="font-medium text-blue-700 underline-offset-4 hover:underline" href="/contact">Contact page</a>.</p></LegalSection>
  </LegalPage>
}
