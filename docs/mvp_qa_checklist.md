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

- [ ] Successful checkout grants access for the advertised period and shows a confirmation page.
- [ ] Cancelled or failed checkout does not grant access and gives the user a safe retry path.
- [ ] Refreshing the success page does not create duplicate purchases or duplicate access grants.
- [ ] Access remains available until the exact expiry timestamp, then locks paid-only content with a clear renewal path.
- [ ] Refund eligibility, cancellation, and support instructions match the published refund policy and checkout copy.
- [ ] Test-mode webhook signature verification, duplicate webhook delivery, and delayed webhook delivery are handled safely.
