import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'

export const metadata: Metadata = { title: 'Contact | DispatchReady' }

export default function ContactPage() {
  return <LegalPage eyebrow="Support" title="Contact DispatchReady" updated="August 22, 2026">
    <LegalSection title="Product and privacy questions"><p>DispatchReady is still in MVP development. A production support email must be configured before public launch; the current demo site does not receive messages.</p></LegalSection>
    <LegalSection title="Before you share information"><p>Please do not send sensitive personal information, employment records, real emergency details, or test materials through any future support channel.</p></LegalSection>
    <LegalSection title="Official test questions"><p>Questions about a real hiring assessment, scheduling, accommodations, or results should go to the hiring agency or official testing provider named in your invitation.</p></LegalSection>
  </LegalPage>
}
