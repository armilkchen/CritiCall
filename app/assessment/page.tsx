import { PressureAssessment } from '@/components/assessment/pressure-assessment'
import { createSeoMetadata } from '@/lib/seo'

export const metadata = createSeoMetadata({
  title: 'Free 911 Dispatcher Skills Assessment | DispatchReady',
  description: 'Take a free dispatcher practice assessment covering data entry, memory, audio recall, and accuracy under interruption.',
  path: '/assessment',
})

export default function AssessmentPage() {
  return <PressureAssessment />
}
