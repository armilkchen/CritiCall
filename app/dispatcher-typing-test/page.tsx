import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { TypingLandingDrill } from '@/components/practice/landing-drills'
import { typingPage } from '@/lib/practice-page-content'
import Link from 'next/link'

export const metadata = practiceMetadata(typingPage.path, typingPage.title, typingPage.description)

export default function DispatcherTypingTestPage() {
  return (
    <PracticeArticle {...typingPage} startHref="#practice" startLabel="Start the free drill">
      <TypingLandingDrill />
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Have results from another typing run? Enter your count and time in the{' '}
        <Link href="/wpm-calculator" className="font-medium text-primary underline underline-offset-4">WPM calculator</Link>.
      </p>
    </PracticeArticle>
  )
}
