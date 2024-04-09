import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Supabase Key is undefined')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase 