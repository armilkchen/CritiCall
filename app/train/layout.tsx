import type { ReactNode } from 'react'
import { createSeoMetadata } from '@/lib/seo'

export const metadata = createSeoMetadata({
  title: 'Free 911 Dispatcher Training Drills | DispatchReady',
  description: 'Practice dispatcher data entry, typing, memory, audio recall, call summaries, and multitasking with generated free drills.',
  path: '/train',
})

export default function TrainingLayout({ children }: { children: ReactNode }) {
  return children
}
