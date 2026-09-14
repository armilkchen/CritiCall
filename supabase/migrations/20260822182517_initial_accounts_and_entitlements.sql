create extension if not exists pgcrypto;

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier text not null check (tier in ('pro')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  stripe_checkout_session_id text unique,
  stripe_event_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, tier)
);

create table public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  baseline_score smallint not null check (baseline_score between 0 and 100),
  pressure_score smallint not null check (pressure_score between 0 and 100),
  pressure_drop smallint not null check (pressure_drop between 0 and 100),
  readiness smallint not null check (readiness between 0 and 100),
  risk text not null,
  decision_response_seconds numeric(6, 2),
  decision_timed_out boolean not null default false,
  completed_at timestamptz not null default now()
);

create table public.drill_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  drill text not null check (drill in ('entry', 'memory', 'audio', 'summary', 'pressure', 'simulation', 'exam')),
  score smallint not null check (score between 0 and 100),
  difficulty text check (difficulty in ('easy', 'normal', 'hard')),
  completed_at timestamptz not null default now()
);

create index entitlements_user_id_idx on public.entitlements (user_id);
create index assessment_results_user_completed_at_idx on public.assessment_results (user_id, completed_at desc);
create index drill_results_user_completed_at_idx on public.drill_results (user_id, completed_at desc);

alter table public.entitlements enable row level security;
alter table public.assessment_results enable row level security;
alter table public.drill_results enable row level security;

create policy "Users can view their own entitlements"
  on public.entitlements for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can view their own assessment results"
  on public.assessment_results for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own assessment results"
  on public.assessment_results for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can view their own drill results"
  on public.drill_results for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own drill results"
  on public.drill_results for insert to authenticated
  with check ((select auth.uid()) = user_id);
