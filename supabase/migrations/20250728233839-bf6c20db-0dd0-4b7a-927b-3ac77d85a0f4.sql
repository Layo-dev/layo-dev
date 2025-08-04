-- Add RLS policy to allow public to view contact messages (for admin purposes)
-- This allows anyone to read contact messages, which may be needed for admin functionality
CREATE POLICY "Allow public reads for contact messages" 
ON "contact messages" 
FOR SELECT 
USING (true);