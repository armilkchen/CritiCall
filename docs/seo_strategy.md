# DispatchReady SEO growth strategy

Status: planning baseline  
Market assumption: English-speaking dispatcher applicants in the United States first, with Canada as a secondary market  
Planning date: September 18, 2026  
Review cadence: every 30 days during the public beta

## 1. Executive decision

DispatchReady should not become a generic exam-content site or publish many near-duplicate pages to capture keywords. Its SEO advantage should come from useful, repeatable training tools that static articles and fixed question banks cannot reproduce.

The positioning is:

> Free, independent skills practice for dispatcher applicants, with generated drills, immediate feedback, and a measurable view of what changes under pressure.

SEO supports this product loop:

1. A candidate searches for help with a specific test or weak skill.
2. A page explains the skill accurately and lets the candidate practice it immediately.
3. The result identifies the next useful drill or diagnostic.
4. The candidate returns to improve a saved local baseline.

The north-star SEO metric is **weekly organic visitors who start a training activity**, not rankings, page count, or raw traffic.

## 2. Evidence and constraints

### Official facts we can safely build around

CritiCall describes its product as a modular work-sample assessment. It says the software contains more than 20 tests and that each agency chooses the tests appropriate for its role. The official applicant FAQ also says there is no applicant-facing official practice version of CritiCall. Skills named by the publisher include multitasking, prioritization, map reading, memory, comprehension, probability, data entry, and decision-making.

The candidate preparation guide states that applicants may need to listen to spoken information, enter data into specific fields, make decisions using stated rules, and sometimes respond to an emergency message while completing another task. It also warns that requirements and instructions are specific to the administered test.

Implications for DispatchReady:

- Never claim to reproduce the official exam.
- Never publish a universal passing score, question count, duration, or typing minimum.
- Treat agency instructions as authoritative.
- Describe practice as training underlying skills, not revealing test content.
- Keep the non-affiliation statement prominent wherever CritiCall is named.

Primary sources:

- [CritiCall applicant FAQ](https://criticall911.com/company/news/criticall-dispatcher-applicant)
- [CritiCall public-safety dispatcher applicant page](https://criticall911.com/dispatcher-testing/applicants)
- [Candidate preparation guide hosted by the City of San Diego](https://www.sandiego.gov/sites/default/files/criticall-test-prep-guide.pdf)

### Search-result landscape

The current results for broad terms such as “CritiCall practice test” and “911 dispatcher practice test” are crowded with long sales pages, fixed question banks, and paid preparation products. JobTestPrep and PrepTerminal compete with extensive editorial content and paid courses. DispatchDrills is the closest product-shaped competitor because it exposes individual free training modules.

Observed competitor strengths:

- Long-form explanations targeting broad exam terms.
- Large fixed question counts and answer explanations.
- Strong trust signals, authorship, testimonials, and update dates.
- Separate pages for typing, data entry, and other modules.
- Clear free-to-paid conversion paths.

Observed gaps that DispatchReady can own:

- Repeatable generated practice instead of a one-time question preview.
- A diagnostic that compares baseline performance with interrupted performance.
- Immediate field-level feedback rather than only a final score.
- A coherent free path from diagnosis to focused practice to timed simulation.
- Transparent language about uncertainty, agency variation, and non-affiliation.

Reference competitors used for planning:

- [JobTestPrep CritiCall practice page](https://www.jobtestprep.com/free-criticall-practice-test)
- [PrepTerminal dispatcher test page](https://www.prepterminal.com/911-dispatcher-test)
- [DispatchDrills typing practice page](https://dispatchdrills.com/practice/typing)

No search-volume estimates are included in this plan. We should not invent demand figures without Search Console data or a reliable keyword dataset.

## 3. Target users and jobs to be done

### Persona A: the newly invited applicant

- Situation: received an assessment invitation and may not know the test provider.
- Main questions: What test am I taking? What skills are measured? How should I prepare this week?
- Best entry page: dispatcher-test guide.
- Best action: diagnostic assessment.

### Persona B: the CritiCall-aware applicant

- Situation: invitation explicitly names CritiCall.
- Main questions: What is it like? Is there a free practice test? Which abilities can be improved?
- Best entry page: independent CritiCall preparation guide.
- Best action: diagnostic, followed by relevant skills practice.

### Persona C: the skill-focused applicant

- Situation: already knows that typing, data entry, listening, memory, or multitasking is weak.
- Main questions: Can I practice this exact skill? How will I measure improvement?
- Best entry page: a dedicated interactive skill page.
- Best action: start a drill immediately.

### Persona D: the returning candidate

- Situation: has completed practice or previously taken a hiring test.
- Main questions: Am I improving? What should I train next? Can I handle the full timed sequence?
- Best entry page: progress, diagnostic, or practice exam.
- Best action: repeat the weakest module or take Exam Mode.

## 4. Search-intent and keyword clusters

Keywords below are hypotheses to validate with Search Console. Each cluster must map to one primary page to prevent cannibalization.

| Cluster | Search intent | Example queries | Primary destination | Product action |
| --- | --- | --- | --- | --- |
| Dispatcher test overview | Learn what test may be used | 911 dispatcher test, dispatcher exam, public safety dispatcher test | `/guides/911-dispatcher-test` | Start diagnostic |
| CritiCall preparation | Prepare for a named provider | CritiCall practice test, CritiCall test prep, how to prepare for CritiCall | `/guides/criticall-test-prep` | Start diagnostic |
| Full practice | Try a realistic sequence | 911 dispatcher practice test, dispatcher practice exam | `/exam` | Start timed exam |
| Typing | Measure speed and accuracy | 911 dispatcher typing test, dispatcher typing practice | `/practice/typing` | Start typing round |
| Data entry | Improve exact field entry | dispatcher data entry practice, CritiCall data entry practice | `/practice/data-entry` | Start entry round |
| Audio and listening | Capture spoken details | dispatcher audio test, 911 listening practice | `/practice/audio` | Start audio round |
| Memory | Improve short-term recall | dispatcher memory test practice, CritiCall memory practice | `/practice/memory` | Start memory round |
| Multitasking | Work through interruption | dispatcher multitasking test, CritiCall multitasking practice | `/practice/multitasking` | Start pressure round |
| Requirements | Resolve agency-specific uncertainty | dispatcher typing speed requirement, CritiCall passing score, test length | Sections within the two guides initially | Confirm with agency, then practice |

### Topics intentionally out of scope for the first 90 days

- Dispatcher salary, jobs, interview questions, or career advice.
- Agency-by-agency pages without verified, maintained source material.
- “Pass guarantee” content or universal score claims.
- Recalled, leaked, or user-submitted live exam questions.
- Large AI-generated glossary or city-page programs.

These topics may generate traffic but do not reinforce the current product and would dilute topical focus.

## 5. Information architecture

The site should have three clearly different page types.

### Product pages

- `/` — positioning, free diagnostic, and the full practice journey.
- `/assessment` — baseline-versus-pressure diagnostic.
- `/train` — training library and returning-user workspace.
- `/exam` — full timed mixed-skill practice.
- `/progress` — private local progress; `noindex`.

### Interactive skill pages

- `/practice` — directory explaining all available practice modules.
- `/practice/typing`
- `/practice/data-entry`
- `/practice/audio`
- `/practice/memory`
- `/practice/multitasking`

Each skill page is a real tool page, not an article that merely links to `/train`. It should contain:

- One short explanation of what the skill measures.
- The interactive drill above the fold or immediately after the introduction.
- The scoring method and limitations.
- Specific improvement advice based on the mechanics of that drill.
- Links to the two logically adjacent skills.
- A route into the diagnostic or timed exam.

### Evidence-based guides

- `/guides/911-dispatcher-test` — helps candidates identify what kind of assessment they may be taking and explains that there is no single national test.
- `/guides/criticall-test-prep` — explains the modular nature of CritiCall, what can be practiced ethically, and how to build a preparation path.

The two guides must have different jobs. The general guide answers “what assessment might I face?” The CritiCall guide answers “how should I prepare when my invitation names CritiCall?”

### Existing SEO drafts

The four locally implemented routes should be treated as unapproved drafts and should not define the final architecture:

- `/criticall-practice-test` — merge useful material into `/guides/criticall-test-prep`; do not publish this route unless it becomes a genuinely complete practice hub.
- `/911-dispatcher-typing-test` — move the useful tool and copy to `/practice/typing`.
- `/dispatcher-data-entry-practice` — move to `/practice/data-entry`.
- `/dispatcher-audio-test-practice` — move to `/practice/audio`.

If any draft URL has already been publicly indexed, use a permanent redirect to its final destination. If it has never been deployed, remove it before launch rather than creating an unnecessary redirect history.

## 6. Page ownership and anti-cannibalization rules

One intent gets one canonical owner.

- The homepage owns the brand and broad value proposition, not “CritiCall practice test.”
- `/guides/criticall-test-prep` owns informational CritiCall preparation queries.
- `/exam` owns full practice-exam intent.
- Each `/practice/*` page owns its corresponding skill intent.
- `/train` is the returning-user workspace and directory, not another landing page competing for every skill keyword.

Before publishing a page, compare its proposed title, H1, primary query, and call to action with every existing page. If two pages answer the same question with the same action, combine them.

## 7. Content and product quality standard

A page is publishable only when it passes all of these checks:

1. It serves a distinct search intent listed in the map.
2. It contains a working tool, original analysis, or sourced guidance unavailable on the other pages.
3. Its main action is available without account creation or payment during the free beta.
4. Claims about CritiCall or agency requirements are sourced or clearly qualified.
5. It has one H1, unique metadata, a self-referencing canonical, and useful internal links.
6. It includes the independent/non-official disclosure when a test provider is named.
7. It works at 320, 375, and 768 pixel widths and with keyboard navigation.
8. The page has a defined analytics event and success metric.

Do not use word count as a quality target. The interactive value should lead; supporting copy should exist only when it answers a real preparation question.

## 8. Internal-link and user journey

Primary journey:

`Guide or skill page → free diagnostic or focused drill → result feedback → adjacent drill → timed exam → local progress`

Linking rules:

- Every guide links to the diagnostic and the most relevant skill pages.
- Every skill page links to two adjacent skills and Exam Mode.
- Drill results recommend one next action based on the score or skill.
- The homepage links to `/practice`, both guides, the diagnostic, and Exam Mode.
- The footer links to the practice directory and two guides, not every future page.
- Legal pages remain accessible but do not occupy high-value navigation positions.

## 9. Measurement plan

### Search visibility

Use Google Search Console as the source of truth for:

- Indexed versus excluded priority URLs.
- Queries, impressions, clicks, and click-through rate by page.
- Device split and country split.
- Cannibalization: the same query repeatedly surfacing multiple DispatchReady URLs.

Use Bing Webmaster Tools as a secondary discovery and query source.

### Product funnel events

Add privacy-conscious events before evaluating SEO page performance:

- `seo_landing_view`
- `diagnostic_start`
- `drill_start` with skill and difficulty
- `drill_complete` with skill, but without entered personal-looking text
- `next_round_start`
- `exam_start`
- `exam_complete`
- `progress_view`

Never send caller-field inputs, typed passages, or locally stored result history as analytics properties.

### Working decision thresholds

These are internal operating rules, not industry benchmarks:

- Do not judge a page before it has at least 100 organic visits or 30 days of index time.
- If a page receives impressions but almost no clicks, revise the title and description before adding more content.
- If organic visitors arrive but fewer than 5% start the intended tool, investigate intent mismatch or poor placement.
- If at least 10% start the intended tool, optimize completion and second-round behavior before expanding the cluster.
- Expand a cluster only after its existing owner page shows growing impressions or meaningful training starts.

## 10. Ninety-day execution plan

### Phase 0: freeze and instrument — days 1–7

- Do not publish additional SEO routes.
- Decide whether the four current draft routes have been deployed or indexed.
- Add the funnel events listed above.
- Confirm Search Console and Bing Webmaster Tools receive the canonical sitemap.
- Finish core audio reliability and verify that a new round produces new data.
- Establish a weekly dashboard: organic impressions, clicks, training starts, completions, and returning users.

Exit criterion: the product can distinguish “organic visit” from “organic visitor who actually trained.”

### Phase 1: architecture and two strongest tools — days 8–30

- Create `/practice` as the training directory.
- Refactor typing into `/practice/typing` as a real tool page.
- Refactor data entry into `/practice/data-entry` as a real tool page.
- Keep `/train` as the full library/workspace.
- Add internal links from the homepage and drill results.
- Submit only the new canonical URLs for indexing.

Why these first: both skills already work without additional content production, have clear task intent, and can produce immediate measurable outcomes.

Exit criterion: both pages are indexed, generate impressions, and record tool starts.

### Phase 2: authoritative guides and audio — days 31–60

- Publish `/guides/911-dispatcher-test` using official and agency sources.
- Publish `/guides/criticall-test-prep` with strict non-affiliation and claim controls.
- Refactor the audio drill into `/practice/audio` only after the content generator supports enough script variation to avoid a one-template experience.
- Add a clear “what test does my invitation name?” decision path inside the general guide.

Exit criterion: informational visitors move into the diagnostic or a focused drill, and the audio page meets the same repeatability standard as data entry.

### Phase 3: query-led expansion — days 61–90

- Review Search Console query data by page and intent.
- Improve titles and introductions for pages with impressions but weak clicks.
- Improve tool placement for pages with visits but weak start rates.
- Publish `/practice/memory` or `/practice/multitasking` only if query data or product usage supports it.
- Add supporting guide sections based on actual queries instead of creating a new URL for every question.
- Begin outreach to relevant dispatcher-career resource lists only after the linked page is genuinely useful.

Exit criterion: the next content decision is justified by observed queries or training behavior, not intuition alone.

## 11. First-page briefs

### `/practice/typing`

- Primary intent: take a dispatcher-specific typing test now.
- Promise: a repeatable timed test reporting net WPM and accuracy.
- Unique value: dispatcher-oriented passages plus saved local history.
- Primary CTA: start typing test.
- Secondary CTA: data-entry practice.
- Important limitation: desktop/physical keyboard recommended; agency minimums vary.

### `/practice/data-entry`

- Primary intent: practice exact dispatcher data entry.
- Promise: generated names, addresses, callback numbers, and plates with field-level feedback.
- Unique value: fresh combinations and difficulty levels rather than a fixed worksheet.
- Primary CTA: start generated record.
- Secondary CTA: audio entry.
- Important limitation: original practice content, not an official module replica.

### `/guides/911-dispatcher-test`

- Primary intent: understand which test or skill set an applicant may face.
- Promise: a clear decision guide that distinguishes provider tests, agency-specific tests, and general skill areas.
- Unique value: sends the user to the correct free diagnostic or tool rather than immediately selling a generic course.
- Primary CTA: identify weak skill with diagnostic.
- Important limitation: the hiring agency is authoritative.

### `/guides/criticall-test-prep`

- Primary intent: prepare after CritiCall is explicitly named.
- Promise: explain the modular structure, ethical preparation boundaries, and an actionable practice sequence.
- Unique value: generated drills and baseline-versus-pressure measurement.
- Primary CTA: take diagnostic.
- Important limitation: independent, non-official, no official questions or score prediction.

## 12. Immediate next decision

Before any further SEO implementation, decide whether the four current draft routes have already reached production:

- If no: remove or refactor them directly into the planned architecture.
- If yes but not indexed: deploy redirects and update the sitemap in the same release.
- If indexed: preserve equity with permanent redirects, confirm canonical destinations, and monitor Search Console after migration.

After that decision, the first implementation sprint should contain only analytics instrumentation, `/practice`, `/practice/typing`, and `/practice/data-entry`.
