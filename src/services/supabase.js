import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwsrmupkahsbsuuljhyx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3c3JtdXBrYWhzYnN1dWxqaHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMjg0ODUsImV4cCI6MjA2MzYwNDQ4NX0.S-3cRvdOVwCbBgD-csW5psYUGu-yGK6531qRCNOkV0M";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
