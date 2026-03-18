-- Phase 0 LLM-assisted intake table
create table if not exists phase0_intakes (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  contact_email text,
  conversation_history jsonb not null default '[]'::jsonb,
  apqc_map jsonb,
  gaps jsonb,
  proposal jsonb,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'reviewed', 'converted'))
);

-- Index for listing/filtering
create index if not exists idx_phase0_intakes_status on phase0_intakes(status);
create index if not exists idx_phase0_intakes_created on phase0_intakes(created_at desc);
