import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { MemoryLandingDrill } from '@/components/practice/landing-drills'
import { memoryPage } from '@/lib/practice-page-content'

export const metadata = practiceMetadata(memoryPage.path, memoryPage.title, memoryPage.description)

export default function MemoryRecallTestPage() {
  return (
    <PracticeArticle {...memoryPage} startHref="#practice" startLabel="Start the free drill">
      <MemoryLandingDrill />
    </PracticeArticle>
  )
}
