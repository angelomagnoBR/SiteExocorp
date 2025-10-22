import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.https://wfxrrywakpimcvjhdvdi.supabase.co as string;
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeHJyeXdha3BpbWN2amhkdmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODQ5NTAsImV4cCI6MjA3NjY2MDk1MH0.o32GXOgZGzXeyNdWq4GaNNQ6uys0Ta-VGaOONTHXJng as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
