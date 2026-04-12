
-- Drop the overly permissive subscriber insert policy
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;

-- Create a tighter policy that still allows anonymous inserts but requires email
CREATE POLICY "Anyone can subscribe with email" ON public.subscribers
  FOR INSERT WITH CHECK (email IS NOT NULL AND email ~ '^[^@]+@[^@]+\.[^@]+$');
