import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bnkghjzfdnuqlqpbysvd.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJua2doanpmZG51cWxxcGJ5c3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDY4NTAsImV4cCI6MjA1Nzc4Mjg1MH0.-7V8RU67PGcrGLVusCDFewaX_RnmrjqCArvApomQ8qo'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
