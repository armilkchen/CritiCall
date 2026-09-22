import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'My Practice Progress | DispatchReady',
  description: 'View dispatcher practice results stored locally in this browser.',
  robots: { index: false, follow: true },
}

export default function ProgressLayout({ children }: { children: ReactNode }) {
  return children
}
