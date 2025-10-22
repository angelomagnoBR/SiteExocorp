import { createClient } from '@supabase/supabase-js';

// Valores codificados diretamente - MÁ PRÁTICA!
const supabaseUrl = "https://wfxrrywakpimcvjhdvdi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeHJyeXdha3BpbWN2amhkdmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODQ5NTAsImV4cCI6MjA3NjY2MDk1MH0.o32GXOgZGzXeyNdWq4GaNNQ6uys0Ta-VGaOONTHXJng";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
