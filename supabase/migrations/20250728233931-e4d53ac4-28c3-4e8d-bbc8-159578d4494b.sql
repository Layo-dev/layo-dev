-- Enable RLS policies for contact_messages table to match contact messages table
CREATE POLICY "Allow public inserts on contact_messages" 
ON "contact_messages" 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public reads on contact_messages" 
ON "contact_messages" 
FOR SELECT 
USING (true);