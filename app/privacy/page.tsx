import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'

export const metadata: Metadata = { title: 'Privacy Policy | DispatchReady', description: 'Learn how DispatchReady handles locally stored practice progress and aggregate website analytics.', alternates: { canonical: '/privacy' }, robots: { index: false, follow: true } }

export default function PrivacyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" updated="November 26, 2026">
    <LegalSection title="What this policy covers"><p>This policy explains how DispatchReady handles information when you use our practice tools and website.</p></LegalSection>
    <LegalSection title="Information stored in this MVP"><p>Assessment results and drill history are stored only in your browser using local storage. We do not currently require an account or operate a user database for this MVP.</p><p>If you clear browser storage, use private browsing, or switch devices, this locally stored progress may be removed or unavailable.</p></LegalSection>
    <LegalSection title="Analytics"><p>We use Cloudflare analytics to count page visits, training events, and selections such as opening a recommended practice. When your browser provides a referrer, we record a broad source category such as search or social. We store a random identifier in your browser and replace it each UTC day to estimate how many browsers use the site each day. Analytics events do not include your answers, scores, caller details, account identifiers, or full referrer URLs.</p><p>We also use Microsoft Clarity to see how pages are used, including clicks, scrolling, and session replays. Clarity is a Microsoft service. Text typed into form fields is masked. Clarity does not receive an account identifier, because this site does not use accounts.</p></LegalSection>
    <LegalSection title="Future services"><p>Before we introduce accounts, payments, support forms, or third-party training services, this policy will be updated to describe the additional information involved and the choices available to users.</p></LegalSection>
    <LegalSection title="Contact"><p>For privacy questions, use the contact method shown on our <a className="font-medium text-blue-700 underline-offset-4 hover:underline" href="/contact">Contact page</a>.</p></LegalSection>
  </LegalPage>
}
