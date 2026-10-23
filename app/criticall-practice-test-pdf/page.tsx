import { PracticeArticle, practiceMetadata } from '@/components/practice/practice-article'
import { PdfLandingDownload } from '@/components/practice/landing-drills'
import { pdfPage } from '@/lib/practice-page-content'

export const metadata = practiceMetadata(pdfPage.path, pdfPage.title, pdfPage.description)

export default function CriticallPracticeTestPdfPage() {
  return (
    <PracticeArticle {...pdfPage} startHref="/downloads/criticall-practice-test.pdf" startLabel="Download PDF" startDownload>
      <PdfLandingDownload />
    </PracticeArticle>
  )
}
