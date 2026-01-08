import { createClient } from '@supabase/supabase-js'

// Fallback to a valid placeholder URL to prevent build crashes if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Ensure we don't crash the build with an invalid URL
const validUrl = supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co'

// Export singleton instance (used by booking/page.tsx)
export const supabase = createClient(validUrl, supabaseAnonKey)

// Export helper function (used by admin/page.tsx)
// Returns the same safe instance
export function getSupabaseClient() {
  return supabase;
}
