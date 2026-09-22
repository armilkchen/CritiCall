# MVP release QA checklist

Run this checklist on a deployed preview before each public release. Record the device, browser, date, and outcome for any failure.

## Core paths

- [ ] Home page CTA opens `/assessment`.
- [ ] Public beta users can complete the assessment, every drill at every difficulty, the timed practice exam, and detailed local history without sign-up or payment.
- [ ] No paid plan, price, checkout button, or local Pro-preview control is visible in the public beta.
- [ ] A completed assessment saves one result and `/progress` displays it after a refresh.
- [ ] A completed drill saves one round and `/progress` displays it after a refresh.
- [ ] Reset demo data clears only local training history after confirmation.
- [ ] Retaking an assessment produces fresh structured records, a fresh memory code, and a fresh interruption scenario.

## `/criticall-test` acquisition page — first SEO tool page

- [ ] `/criticall-test` is the only canonical page targeting the CritiCall practice intent; no duplicate `/criticall-practice-test` or CritiCall guide page is published.
- [ ] The page title is `Free CritiCall Practice Test for 911 Dispatchers` and the page has one matching, visually dominant H1.
- [ ] The meta description accurately promises a free test, no sign-up, an instant score, and a recommended next skill; no `keywords` meta is present.
- [ ] The interactive diagnostic appears before the explanatory article content and works entirely on `dispatchready.org` without a third-party quiz iframe.
- [ ] A user can complete 10–12 original practice items without creating an account or paying.
- [ ] The result shows a total practice score plus useful skill-level feedback; it is never labelled an official score.
- [ ] Each weak-skill recommendation links to the corresponding existing training module rather than to a checkout page.
- [ ] Retaking or starting the next round generates fresh content while preserving stable difficulty and scoring rules.
- [ ] The page links to `/assessment`, `/train`, and `/exam`; at least one relevant public page links back to `/criticall-test`.
- [ ] `What Is the CritiCall Test?`, preparation guidance, and FAQ content are based on cited official public material and do not merely rewrite a competitor page.

## CritiCall content and trademark boundaries

- [ ] The page visibly states that DispatchReady is independently created and is not affiliated with or endorsed by CritiCall or Biddle Consulting Group.
- [ ] The copy explains that agencies select different tests from a larger configurable system; it does not present one fixed national exam structure.
- [ ] No copy claims that DispatchReady contains official questions, real questions, exact replicas, guaranteed passing, or a fixed set of 16 official categories.
- [ ] Every practice item is original and does not copy competitor questions, official questions, screenshots, answers, or protected interfaces.
- [ ] Any statement about test operation or measured skills can be traced to an official public source recorded in the project report.

## SEO discovery and measurement

- [ ] `/criticall-test` has a self-referencing canonical and appears once in `sitemap.xml` after publication.
- [ ] The sitemap continues to include every other useful, canonical, indexable product and policy page; `/progress` remains excluded and `noindex`.
- [ ] `robots.txt` allows crawling of the public page and references the production sitemap.
- [ ] Google Search Console URL Inspection can render the interactive page and its supporting copy.
- [ ] `diagnostic_start` and `diagnostic_complete` are recorded without answers, scores, caller details, or persistent user identifiers.
- [ ] The path from result to focused drill records `drill_start`, `drill_complete`, and `next_round_start` as appropriate.
- [ ] Record the first weekly baseline for landing visits, diagnostic starts, completions, recommended-drill starts, next rounds, impressions, and clicks.

## Scope guard for the free-first launch

- [ ] No Stripe checkout, paid wall, paid access period, subscription, or email-capture requirement is added to `/criticall-test`.
- [ ] `/data-entry-test`, `/pst-test`, `/ntn-practice-test`, answer pages, and bulk keyword pages remain unpublished during the first validation cycle.
- [ ] `/911-dispatcher-typing-test` remains unpublished until `/criticall-test` has real Search Console and completion-funnel data; when built, it must contain a working online speed-and-accuracy tool rather than placeholder copy.

## Mobile and keyboard

- [ ] Test at 320 px, 375 px, and 768 px widths: no horizontal scrolling, clipped text, or inaccessible controls.
- [ ] All form controls, event choices, and navigation buttons can be reached and activated by keyboard.
- [ ] Focus remains visible while tabbing through data-entry fields and event choices.

## Assessment timing and audio

- [ ] The pressure interruption appears after the intended delay.
- [ ] The 15-second response countdown decreases once per second.
- [ ] A correct response before time expires receives the decision point and records a response time.
- [ ] A wrong response receives no decision point and the original data-entry task can still be completed.
- [ ] A timeout receives no decision point and the original data-entry task can still be completed.
- [ ] Browser speech playback works and can be replayed.
- [ ] With browser speech disabled or unsupported, the user sees the fallback explanation and can reveal the visual transcript.

## Policy and public information

- [ ] `/privacy`, `/terms`, `/refunds`, and `/contact` load successfully from the footer.
- [ ] The non-affiliation statement is visible at the bottom of the home, assessment, training, progress, and policy pages.
- [ ] Set `SUPPORT_EMAIL` to the monitored `support@dispatchready.org` inbox in the deployment environment; `/contact` renders it as a working mail link.

## Payment and entitlement — required after Stripe is connected

This section is deferred and is not a blocker for the current free-first public launch.

- [ ] Successful checkout grants access for the advertised period and shows a confirmation page.
- [ ] Cancelled or failed checkout does not grant access and gives the user a safe retry path.
- [ ] Refreshing the success page does not create duplicate purchases or duplicate access grants.
- [ ] Access remains available until the exact expiry timestamp, then locks paid-only content with a clear renewal path.
- [ ] Refund eligibility, cancellation, and support instructions match the published refund policy and checkout copy.
- [ ] Test-mode webhook signature verification, duplicate webhook delivery, and delayed webhook delivery are handled safely.
