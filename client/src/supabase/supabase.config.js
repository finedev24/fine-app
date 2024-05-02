import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://gpzjigzupyyyoekiwhsh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwemppZ3p1cHl5eW9la2l3aHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNzE5MjUsImV4cCI6MjAyOTg0NzkyNX0.QUQaTNqAefClI5EkunxC-INvd6etk2EAzTzkTU8mUgU"
);