import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wwimngjmnuuitowujnif.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_htgX411WISV2i6fzvRw9-w_V-q9Nn4H";

/** Public/anon Supabase client for reading workflow stats */
export function getPublicSupabaseClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
