// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

console.log('SUPA URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPA ANON:', Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
console.log('SUPA ROLE:', Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY));

console.log('SUPA URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('SUPA SERVICE ROLE:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)


export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// use this to write (service role bypasses RLS for inserts)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
