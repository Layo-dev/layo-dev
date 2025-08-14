-- Remove public read access from contact messages tables to protect customer data

-- Drop the existing public read policies
DROP POLICY IF EXISTS "Allow public reads for contact messages" ON public."contact messages";
DROP POLICY IF EXISTS "Allow public reads on contact_messages" ON public.contact_messages;

-- Keep the public insert policies so contact forms continue to work
-- (These already exist and allow users to submit contact forms)

-- Optional: Add admin-only read policies if you need admin access later
-- Uncomment these lines if you implement authentication and admin roles:
-- CREATE POLICY "Admin read access to contact messages" ON public."contact messages"
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
-- 
-- CREATE POLICY "Admin read access to contact_messages" ON public.contact_messages  
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');