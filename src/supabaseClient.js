import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rhmabkzenovzhkogdnai.supabase.co";    // حطي اللينك بتاعك
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJobWFia3plbm92emhrb2dkbmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjE2OTksImV4cCI6MjA3OTczNzY5OX0.blP8eWXoTXYPAx5yh-lLziDt7EMkK4qIHf5g0e8uGfE";       // المفتاح بتاعك

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
