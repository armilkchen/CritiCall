import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { AudioLandingDrill } from '@/components/practice/landing-drills'
import { audioPage } from '@/lib/practice-page-content'

export const metadata = practiceMetadata(audioPage.path, audioPage.title, audioPage.description)

export default function AudioDataEntryPracticePage() {
  return (
    <PracticeArticle {...audioPage} startHref="#practice" startLabel="Start the free drill">
      <AudioLandingDrill />
    </PracticeArticle>
  )
}
