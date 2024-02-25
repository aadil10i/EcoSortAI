import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://toibvmnlpoyjnxxntxlo.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaWJ2bW5scG95am54eG50eGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MDU0MjAsImV4cCI6MjAyNDI4MTQyMH0.aSWc2cGQr5mduTovrLslVRRu0_rtc5ayOsg1cR3flBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
