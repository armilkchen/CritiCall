import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { TypingLandingDrill } from '@/components/practice/landing-drills'
import { typingPage } from '@/lib/practice-page-content'

export const metadata = practiceMetadata(typingPage.path, typingPage.title, typingPage.description)

export default function DispatcherTypingTestPage() {
  return (
    <PracticeArticle {...typingPage} startHref="#practice" startLabel="Start the free drill">
      <TypingLandingDrill />
    </PracticeArticle>
  )
}
