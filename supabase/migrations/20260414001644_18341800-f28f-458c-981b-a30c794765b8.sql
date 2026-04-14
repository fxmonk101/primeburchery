-- Drop the old authenticated-only insert policy
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;

-- Allow anyone to insert reviews (guest reviews with reviewer_name)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);
