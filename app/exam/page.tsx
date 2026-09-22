import { TrainingExperience } from '@/app/train/page'
import { createSeoMetadata } from '@/lib/seo'

export const metadata = createSeoMetadata({
  title: 'Free Timed 911 Dispatcher Practice Exam | DispatchReady',
  description: 'Complete a free 20-minute dispatcher practice exam combining data entry, memory, audio recall, call summaries, and interruptions.',
  path: '/exam',
})

export default function ExamPage() {
  return <TrainingExperience mode="exam" />
}
