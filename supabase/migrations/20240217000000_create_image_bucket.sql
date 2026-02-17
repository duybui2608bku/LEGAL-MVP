-- Create a new bucket for images
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Set up RLS policies for the images bucket
-- Allow public access to read images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Allow public users (including anonymous) to upload images
create policy "Public users can upload images"
on storage.objects for insert
with check (
  bucket_id = 'images'
);

-- Allow public users to update images
create policy "Public users can update images"
on storage.objects for update
with check (
  bucket_id = 'images'
);

-- Allow public users to delete images
create policy "Public users can delete images"
on storage.objects for delete
using (
  bucket_id = 'images'
);
