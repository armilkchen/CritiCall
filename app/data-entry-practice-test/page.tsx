import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { EntryLandingDrill } from '@/components/practice/landing-drills'
import { entryPage } from '@/lib/practice-page-content'

export const metadata = practiceMetadata(entryPage.path, entryPage.title, entryPage.description)

export default function DataEntryPracticeTestPage() {
  return (
    <PracticeArticle {...entryPage} startHref="#practice" startLabel="Start the free drill">
      <EntryLandingDrill />
    </PracticeArticle>
  )
}
