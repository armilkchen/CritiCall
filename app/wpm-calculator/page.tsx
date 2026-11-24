import { WpmCalculator, WpmTypingTestLink } from '@/components/practice/wpm-calculator'
import { createSeoMetadata, safeJsonLd } from '@/lib/seo'

export const metadata = createSeoMetadata({
  title: 'WPM Calculator (Words Per Minute) — Gross, Net, CPM & KPH',
  description: 'Free WPM calculator: enter your character count and time to get gross and net words per minute, accuracy, CPM and keystrokes per hour.',
  path: '/wpm-calculator',
})

const faq = [
  {
    question: 'How do you calculate WPM?',
    answer: 'Divide the number of characters typed by five, then divide by the number of minutes. If you typed 450 characters in 90 seconds, you typed 90 standard words in 1.5 minutes, for 60 gross WPM. Include the full elapsed time from the start of the timed run to the end. To get net WPM on this calculator, multiply gross WPM by your accuracy as a decimal.',
  },
  {
    question: 'What is a good typing speed?',
    answer: 'A useful target depends on what you type and how much accuracy the task requires. If you are preparing for a hiring test or class, check the published requirement and the scoring method. If you are practicing on your own, record several runs of equal length with similar material. Compare both speed and accuracy across those runs. Consistent results on unfamiliar text tell you more than a single high score on a passage you have memorized.',
  },
  {
    question: 'What is 40 WPM in CPM?',
    answer: 'At five characters per standard word, 40 gross WPM equals 200 characters per minute. At the same pace, that is an equivalent rate of 12,000 keystrokes per hour, assuming one keystroke per character. If the 40 WPM figure is already adjusted for accuracy, multiplying it by five gives the equivalent net character rate. Use gross WPM when converting the full amount typed.',
  },
  {
    question: 'Is net WPM or gross WPM used by employers?',
    answer: 'Check the job posting and the test instructions. Some assessments report an adjusted speed, and others show a speed score with a separate accuracy requirement. The word “net” can also refer to different penalties, such as subtracting errors per minute. If you need to share a practice score, include the duration, accuracy, and the scoring method. Compare it with the employer’s requirements only when you know the two methods are comparable.',
  },
  {
    question: 'How is accuracy calculated?',
    answer: 'Subtract the incorrect count from the total typed, divide by the total, then multiply by 100. With 300 characters typed and 15 incorrect characters, 285 divided by 300 gives 95% accuracy. Enter errors in the same unit as your total. If a typing platform counts corrected mistakes, missed characters, or skipped words, use its own accuracy score when comparing results from that platform.',
  },
  {
    question: 'Does punctuation count in WPM?',
    answer: 'Yes. In character mode, count punctuation and spaces alongside letters and digits. A comma or space contributes one character to the gross count and can affect accuracy if it was typed incorrectly. In word mode, you enter the number of words directly, and the calculator estimates character-based rates using five characters per word. Use character mode when the exact length of the text matters.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function WpmCalculatorPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }} />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">WPM Calculator</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">Enter how much you typed, how long it took, and how many items were incorrect. See your gross and net typing speed, accuracy, and hourly rate.</p>
      <div className="mt-6"><WpmCalculator /></div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">Need a timed run to measure? <WpmTypingTestLink />.</p>

      <div className="mt-12 max-w-[70ch] space-y-10 text-base leading-7 text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">How to calculate words per minute</h2>
          <p>For a character-based score, count everything typed, including spaces and punctuation. Five characters count as one standard word. Divide the character count by five, then divide by the elapsed time in minutes. A run of 90 seconds lasts 1.5 minutes.</p>
          <p>If you only know the number of words you typed, choose Words. Gross WPM then uses your actual word count divided by elapsed minutes. Character and keystroke rates in that mode assume five characters per word, so they are estimates.</p>
          <p>If you timed yourself outside a typing test, use the character count of the text you actually entered. Stop counting at the last character you reached when the timer ended. Compare your entry with the matching part of the original passage to find errors. An error that you corrected before time ran out can still cost time, even though it no longer appears in your final text.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Words per minute calculator: how to read your results</h2>
          <p>Gross WPM measures all typed output. Accuracy measures the share of typed characters or words you entered correctly. This calculator multiplies gross WPM by that correct share to get net WPM. Count incorrect characters in character mode and incorrect words in word mode.</p>
          <p>For example, typing 300 characters in one minute with 15 incorrect characters gives you 60 gross WPM and 95% accuracy. Your net speed is 57 WPM. Test providers may use a different adjustment, so check the scoring rules before comparing results from two tests.</p>
          <p>Use the three numbers together. Suppose you start at 60 gross WPM with 95% accuracy, then speed up to 65 gross WPM at 85% accuracy. Your second run yields 55.3 net WPM when rounded to one decimal place. You typed more, but you finished with fewer correct characters per minute. If the exercise rewards accuracy, try a pace you can sustain without rushing.</p>
          <p>For a practice log, save the test length and the kind of text you typed alongside the score. A one-minute passage of familiar words and a longer passage with names and numbers pose different tasks. Repeat the same test format when checking whether a change in technique helped.</p>
          <p>If you are deciding what to practice next, look at the mistakes themselves. Reversed digits can point to a different practice need than omitted punctuation or repeated words. Pick one pattern and repeat a short run with new text that contains the same kind of detail. Compare the error count as well as the WPM to see whether the extra practice helped.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">WPM vs CPM vs KPH: which one should you compare?</h2>
          <p>For standard five-character words, multiply gross WPM by five for characters per minute (CPM). Multiply CPM by 60 for keystrokes per hour (KPH), using one keystroke per typed character. In the example above, 60 gross WPM equals 300 CPM or 18,000 KPH.</p>
          <p>WPM is handy when the score report uses words per minute. CPM is useful when your exercise counts individual characters, such as a short transcription test. KPH expresses the same pace on an hourly scale and can help you interpret a data entry score reported in that unit. For example, 9,000 KPH corresponds to 150 CPM, or 30 gross WPM under the five-character convention.</p>
          <p>Match the unit and scoring rules on the report before comparing numbers. The calculator projects your short-run pace to an hour. It cannot tell how many keystrokes you would sustain for a full hour or count editing keys and shortcuts from the final text alone.</p>
          <p>When a worksheet asks for the number of entries completed per hour, keep that figure separate from KPH. Two forms may take the same number of keystrokes but involve different amounts of reading, checking, or moving between fields.</p>
        </section>

        <section className="space-y-4" aria-labelledby="wpm-faq">
          <h2 id="wpm-faq" className="text-2xl font-semibold tracking-tight text-foreground">WPM calculator FAQ</h2>
          <div className="divide-y divide-border border-y border-border">
            {faq.map(({ question, answer }) => (
              <div key={question} className="space-y-2 py-4">
                <h3 className="font-semibold text-foreground">{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">How many WPM does a 911 dispatcher need?</h2>
          <p>Check the job posting or test invitation for the speed requirement and scoring method your hiring agency uses. If you are preparing for a dispatcher test, measure how accurately you type addresses, callback numbers, and plates alongside your speed. <WpmTypingTestLink /> to practice those details under a timer.</p>
        </section>
      </div>
    </main>
  )
}
