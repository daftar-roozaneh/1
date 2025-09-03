'use client';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function currentUserId(){
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}
