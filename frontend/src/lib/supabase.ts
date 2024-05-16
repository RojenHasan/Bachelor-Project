import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndngjaaaerzazmukqwxe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmdqYWFhZXJ6YXptdWtxd3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4ODYxODYsImV4cCI6MjAzMTQ2MjE4Nn0.Z_Zyx6MxiMR6-BrOzGbzHLPoW67CeT7wnDoRXkmqXhs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
