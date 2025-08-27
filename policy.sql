EXISTS (
  SELECT 1 FROM extended_family
  WHERE extended_family.shoe_size = 10
  AND extended_family.fave_color = "red"
)

-- Policy for reps to only add their own deals
CREATE policy "Reps can only add their own deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.account_type = 'rep'
  )
  
);