import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivymmfqgtgqcgfxblvnj.supabase.co'; // Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eW1tZnFndGdxY2dmeGJsdm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MTg0NTMsImV4cCI6MjA1NDM5NDQ1M30.HB4Ou50NRAcfZhC4zZmhDYVPbJCweyuTVhHcEzg9XYU'; // Supabase API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,  // ✅ 세션 유지 설정
    autoRefreshToken: true // ✅ 토큰 자동 갱신
  }
});