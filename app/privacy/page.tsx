import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'

export const metadata: Metadata = { title: 'Privacy Policy | DispatchReady' }

export default function PrivacyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" updated="August 22, 2026">
    <LegalSection title="What this policy covers"><p>This policy explains how DispatchReady handles information when you use our practice tools and website.</p></LegalSection>
    <LegalSection title="Information stored in this MVP"><p>Assessment results and drill history are stored only in your browser using local storage. We do not currently require an account or operate a user database for this MVP.</p><p>If you clear browser storage, use private browsing, or switch devices, this locally stored progress may be removed or unavailable.</p></LegalSection>
    <LegalSection title="Analytics"><p>When the site is deployed in production, it may use privacy-focused Vercel Analytics to understand aggregate site use, such as page visits and performance. We do not use this MVP to sell personal information or build advertising profiles.</p></LegalSection>
    <LegalSection title="Future services"><p>Before we introduce accounts, payments, support forms, or third-party training services, this policy will be updated to describe the additional information involved and the choices available to users.</p></LegalSection>
    <LegalSection title="Contact"><p>For privacy questions, use the contact method shown on our <a className="font-medium text-blue-700 underline-offset-4 hover:underline" href="/contact">Contact page</a>.</p></LegalSection>
  </LegalPage>
}
