# Production integration setup

DispatchReady's paid MVP is a one-time purchase that grants 30 days of access.
The free diagnostic remains usable without an account. Do not enable the paid
checkout until every item below is configured in a test environment.

## 1. Supabase

Create a Supabase project, then add the project URL and Publishable Key from
the Connect dialog to the matching environment variables. Keep
`SUPABASE_SERVICE_ROLE_KEY` only on the server and out of `NEXT_PUBLIC_*`
variables.

Enable email authentication. The paid flow will require a signed-in user so
the Stripe webhook can grant the entitlement to a specific account. Use
Supabase's SSR cookie integration and validate identity on server routes with
`getClaims()`, rather than trusting a client session object.

## 2. Stripe

Create one USD, one-time Price for **$34.00** and use its `price_...` ID as
`STRIPE_PRESSURE_PREP_PRICE_ID`. This product is not a subscription.

Create a restricted API key and store it as `STRIPE_API_KEY`. Configure a
webhook endpoint for checkout completion and store its signing secret as
`STRIPE_WEBHOOK_SECRET`. The handler must verify the signature and treat the
Stripe event ID as idempotent before granting or extending access.

Configure the success and cancellation URLs from `NEXT_PUBLIC_APP_URL`. The
success page may display a confirmation but must never grant access by itself;
only the verified webhook may do that.

## 3. Support and policy copy

Set `SUPPORT_EMAIL` to a monitored production inbox before enabling checkout.
Update the contact and refund pages with the final access period, refund
eligibility, and cancellation instructions so they match the checkout copy.

## 4. Required pre-launch verification

Run the payment and entitlement section in
[`mvp_qa_checklist.md`](./mvp_qa_checklist.md) in Stripe test mode, including
duplicate and delayed webhook deliveries. Then repeat the core and mobile
checks on the deployed preview.
