-- Phase 0 consultation intake table
CREATE TABLE IF NOT EXISTS phase0_intakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text,
  contact_email text NOT NULL,
  conversation_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  apqc_map jsonb,
  gaps jsonb,
  proposal jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'converted'))
);

-- Indexes for listing/filtering
CREATE INDEX IF NOT EXISTS idx_phase0_intakes_status ON phase0_intakes(status);
CREATE INDEX IF NOT EXISTS idx_phase0_intakes_created ON phase0_intakes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_phase0_intakes_email ON phase0_intakes(contact_email);

-- Enable RLS
ALTER TABLE phase0_intakes ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (the API route uses service role key)
CREATE POLICY "Service role full access" ON phase0_intakes
  FOR ALL
  USING (true)
  WITH CHECK (true);
