-- Create a table for pages to organize content
CREATE TABLE IF NOT EXISTS site_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL, -- e.g., 'home', 'about', 'services'
    name TEXT NOT NULL,        -- Human readable name
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for page content items
CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES site_pages(id) ON DELETE CASCADE,
    section_key TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'rich-text', 'image', 'link', 'json')),
    content_value TEXT,
    json_value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_id, section_key, content_key)
);

-- Add pages with English names
INSERT INTO site_pages (slug, name) VALUES 
('home', 'Home'),
('about', 'About Us'),
('services', 'Services'),
('how-it-works', 'How It Works'),
('results', 'Results & Reviews'),
('contact', 'Contact'),
('privacy-policy', 'Privacy Policy'),
('terms-and-conditions', 'Terms & Conditions'),
('accessibility-statement', 'Accessibility Statement'),
('disclaimer', 'Disclaimer')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- Enable RLS
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Reading policies
CREATE POLICY "Allow public read access to pages" ON site_pages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to content" ON site_content FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Allow authenticated admins full access to pages" ON site_pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admins full access to content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Updated at functionality
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_pages_updated_at BEFORE UPDATE ON site_pages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
