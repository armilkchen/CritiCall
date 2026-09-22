import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'

export const metadata: Metadata = { title: 'Contact | DispatchReady', description: 'Contact DispatchReady about product, privacy, or accessibility questions.', alternates: { canonical: '/contact' } }

export default function ContactPage() {
  const supportEmail = process.env.SUPPORT_EMAIL?.trim()
  const isConfigured = supportEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail)

  return <LegalPage eyebrow="Support" title="Contact DispatchReady" updated="August 22, 2026">
    <LegalSection title="Product and privacy questions">{isConfigured ? <p>For product, privacy, or accessibility questions, email <a className="font-medium text-blue-700 underline-offset-4 hover:underline" href={`mailto:${supportEmail}`}>{supportEmail}</a>. We aim to respond within three business days.</p> : <p>Support email is not configured for this deployment. Set the monitored <code>SUPPORT_EMAIL</code> environment variable before making the site public.</p>}</LegalSection>
    <LegalSection title="Before you share information"><p>Please do not send sensitive personal information, employment records, real emergency details, or test materials through any future support channel.</p></LegalSection>
    <LegalSection title="Official test questions"><p>Questions about a real hiring assessment, scheduling, accommodations, or results should go to the hiring agency or official testing provider named in your invitation.</p></LegalSection>
  </LegalPage>
}
