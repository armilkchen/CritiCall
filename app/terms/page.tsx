import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'

export const metadata: Metadata = { title: 'Terms of Use | DispatchReady' }

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms of Use" updated="August 22, 2026">
    <LegalSection title="Practice service"><p>DispatchReady provides practice exercises for skills that may be relevant to dispatcher hiring assessments. The service is educational practice, not emergency dispatch training, employment advice, or a hiring decision tool.</p></LegalSection>
    <LegalSection title="No affiliation or guarantee"><p>DispatchReady is not affiliated with CritiCall, Biddle Consulting Group, or any testing agency. We do not provide official exam questions, official scores, or a guarantee of employment, a passing result, or any other outcome.</p><p>Hiring agencies choose their own assessments, configurations, and standards. Any score shown here is only a practice readiness estimate.</p></LegalSection>
    <LegalSection title="Acceptable use"><p>Use the practice tools lawfully and only for personal preparation. Do not attempt to disrupt the service, copy or resell its content, or represent DispatchReady results as official assessment results.</p></LegalSection>
    <LegalSection title="Availability"><p>This MVP is provided as available and may change, pause, or be removed while we improve it. Browser-based features, including speech playback and local progress, can vary by device and browser.</p></LegalSection>
    <LegalSection title="Changes"><p>We may update these terms as the service changes. The date at the top of this page shows the latest revision.</p></LegalSection>
  </LegalPage>
}
