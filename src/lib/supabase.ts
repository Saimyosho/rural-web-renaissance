import { createClient } from '@supabase/supabase-js'

// These will be environment variables
// For now, using placeholder - you'll need to add your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our database tables
export type ContactSubmission = {
  id?: string
  created_at?: string
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  interested_in?: string
}
