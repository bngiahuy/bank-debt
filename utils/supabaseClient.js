import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwwkmjizisokmoemspku.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: true,
  },
})
