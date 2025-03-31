
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aoipcenqryfjkwnhzmkm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvaXBjZW5xcnlmamt3bmh6bWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0Mjc4MjEsImV4cCI6MjA1OTAwMzgyMX0.kmggJ5rpAAFCZ0gcGozBmoWw-NoBQzV0T-rEDBL_da8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
