import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndngjaaaerzazmukqwxe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmdqYWFhZXJ6YXptdWtxd3hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTg4NjE4NiwiZXhwIjoyMDMxNDYyMTg2fQ.V16C1_qlQzpM4o61Yq0k0o1NHEPVyNzre-NYB-0vRIM';

export const supabase = createClient(supabaseUrl, supabaseKey);
