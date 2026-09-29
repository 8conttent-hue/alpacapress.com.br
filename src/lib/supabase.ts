import { createClient } from '@supabase/supabase-js';

// Fixado no projeto 8links central (uorwocetqyjkpioimrjk).
// NAO usar import.meta.env aqui: env var incorreta no Cloudflare Pages
// sobrescrevia o projeto certo e quebrava a consulta por `domain`.
const SUPABASE_URL = 'https://uorwocetqyjkpioimrjk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcndvY2V0cXlqa3Bpb2ltcmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzIyMDAsImV4cCI6MjA3MzYwODIwMH0.j38OH0NtpaZbPvtSabtXKuVHxE_wIJLTkTp5YJkhads';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});