import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { MultitaskLandingDrill } from '@/components/practice/landing-drills'
import { multitaskPage } from '@/lib/practice-page-content'

export const metadata = practiceMetadata(multitaskPage.path, multitaskPage.title, multitaskPage.description)

export default function CriticallMultitaskingTestPage() {
  return (
    <PracticeArticle {...multitaskPage} startHref="#practice" startLabel="Start the free drill">
      <MultitaskLandingDrill />
    </PracticeArticle>
  )
}
