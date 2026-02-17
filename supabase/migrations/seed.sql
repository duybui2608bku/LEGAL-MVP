-- Seed content for all pages (100% English)
DO $$
DECLARE
    home_id UUID;
    about_id UUID;
    services_id UUID;
    how_it_works_id UUID;
    results_id UUID;
    contact_id UUID;
    privacy_id UUID;
    terms_id UUID;
    access_id UUID;
    disc_id UUID;
BEGIN
    -- Get page IDs
    SELECT id INTO home_id FROM site_pages WHERE slug = 'home';
    SELECT id INTO about_id FROM site_pages WHERE slug = 'about';
    SELECT id INTO services_id FROM site_pages WHERE slug = 'services';
    SELECT id INTO how_it_works_id FROM site_pages WHERE slug = 'how-it-works';
    SELECT id INTO results_id FROM site_pages WHERE slug = 'results';
    SELECT id INTO contact_id FROM site_pages WHERE slug = 'contact';
    SELECT id INTO privacy_id FROM site_pages WHERE slug = 'privacy-policy';
    SELECT id INTO terms_id FROM site_pages WHERE slug = 'terms-and-conditions';
    SELECT id INTO access_id FROM site_pages WHERE slug = 'accessibility-statement';
    SELECT id INTO disc_id FROM site_pages WHERE slug = 'disclaimer';

    -- ==========================================
    -- HOME PAGE
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (home_id, 'hero', 'badge', 'text', 'Professional Disability Law Firm'),
    (home_id, 'hero', 'title', 'text', 'Legal help for disability claims'),
    (home_id, 'hero', 'description', 'rich-text', 'Professional representation for SSDI and SSI cases with trusted legal strategy, clear guidance, and client-focused support.'),
    (home_id, 'hero', 'image', 'image', '/images/legal-hero.jpg')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

    INSERT INTO site_content (page_id, section_key, content_key, content_type, json_value) VALUES
    (home_id, 'highlights', 'items', 'json', '[
        {"title": "25+ years of legal experience", "description": "Focused practice in disability law and Social Security benefits.", "icon": "BriefcaseBusiness"},
        {"title": "Proven approval results", "description": "Strong track record in SSDI / SSI claims and appeals.", "icon": "Trophy"},
        {"title": "Certified attorneys", "description": "Credentialed legal professionals with deep hearing-level expertise.", "icon": "Award"},
        {"title": "Compassionate representation", "description": "Clear communication and respectful support for clients and families.", "icon": "ShieldCheck"}
    ]'::jsonb),
    (home_id, 'stats', 'items', 'json', '[
        {"value": "3,200+", "label": "Cases handled"},
        {"value": "89%", "label": "Approval support rate"},
        {"value": "25+", "label": "Years of service"},
        {"value": "4.9 / 5", "label": "Client satisfaction"}
    ]'::jsonb),
    (home_id, 'reviews', 'items', 'json', '[
        {"name": "Michael R.", "quote": "Their team handled my appeal with precision and clear communication. I felt supported throughout the process."},
        {"name": "Angela T.", "quote": "They explained each legal step in plain language and helped my family stay organized and confident."},
        {"name": "David L.", "quote": "Professional, responsive, and thorough. Their preparation made a major difference at hearing stage."}
    ]'::jsonb),
    (home_id, 'faq', 'items', 'json', '[
        {"question": "When should I hire a disability attorney?", "answer": "We provide clear guidance based on your case details and procedural stage."},
        {"question": "What happens if my initial claim is denied?", "answer": "We provide clear guidance based on your case details and procedural stage."},
        {"question": "How long can the appeals process take?", "answer": "We provide clear guidance based on your case details and procedural stage."}
    ]'::jsonb)
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET json_value = EXCLUDED.json_value;

    -- ==========================================
    -- ABOUT PAGE
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (about_id, 'hero', 'badge', 'text', 'About Us'),
    (about_id, 'hero', 'title', 'text', 'Our Mission & Vision'),
    (about_id, 'hero', 'description', 'rich-text', 'We help clients secure the disability benefits they deserve through ethical advocacy, accurate legal guidance, and respectful communication.'),
    (about_id, 'hero', 'image', 'image', '/images/team-photo.jpg'),
    (about_id, 'mission', 'title', 'text', 'Our Mission'),
    (about_id, 'mission', 'description', 'text', 'Provide high-quality disability representation and legal support for applicants, families, and appeal cases.'),
    (about_id, 'vision', 'title', 'text', 'Our Vision'),
    (about_id, 'vision', 'description', 'text', 'Be the most trusted disability law partner through consistent results and client-first representation.')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

    INSERT INTO site_content (page_id, section_key, content_key, content_type, json_value) VALUES
    (about_id, 'team', 'members', 'json', '[
        {"name": "Rachel Morgan, Esq.", "role": "Founding Disability Attorney", "detail": "25+ years representing SSDI and SSI claimants."},
        {"name": "Daniel Carter, Esq.", "role": "Appeals & Hearings Attorney", "detail": "Specialized in denied claims and hearing preparation."},
        {"name": "Elena Brooks", "role": "Senior Case Specialist", "detail": "Coordinates records, deadlines, and client communication."}
    ]'::jsonb),
    (about_id, 'values', 'items', 'json', '[
        {"title": "Integrity", "icon": "ShieldCheck"},
        {"title": "Compassion", "icon": "HeartHandshake"},
        {"title": "Transparency", "icon": "BadgeCheck"},
        {"title": "Excellence", "icon": "Award"}
    ]'::jsonb),
    (about_id, 'approach', 'items', 'json', '[
        "Case-first strategy based on documentation quality.",
        "Proactive communication with clients and families.",
        "Hearing-ready preparation from the earliest stages."
    ]'::jsonb)
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET json_value = EXCLUDED.json_value;

    -- ==========================================
    -- SERVICES PAGE
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (services_id, 'hero', 'badge', 'text', 'Services'),
    (services_id, 'hero', 'title', 'text', 'Disability law services built for real outcomes'),
    (services_id, 'hero', 'image', 'image', '/images/services-grid.jpg'),
    (services_id, 'support', 'title', 'text', 'Other Support'),
    (services_id, 'support', 'description', 'text', 'We also support Medicare-related coordination and referral services when additional legal or administrative help is needed.')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

    INSERT INTO site_content (page_id, section_key, content_key, content_type, json_value) VALUES
    (services_id, 'services', 'list', 'json', '[
        {"title": "Disability Representation", "description": "Full legal representation for disability claims, evidence preparation, and case strategy.", "icon": "ShieldCheck"},
        {"title": "SSDI / SSI Help", "description": "Guidance through Social Security disability requirements, eligibility checks, and filings.", "icon": "FileText"},
        {"title": "Appeals Services", "description": "Representation for denied claims, reconsideration requests, and hearings before judges.", "icon": "Gavel"},
        {"title": "Document Preparation", "description": "Professional drafting and review of legal forms, statements, and supporting records.", "icon": "FolderOpenDot"}
    ]'::jsonb),
    (services_id, 'standards', 'items', 'json', '[
        "Clear communication of legal options at each phase.",
        "Accurate records and deadline-driven case management.",
        "Client updates with practical next actions."
    ]'::jsonb)
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET json_value = EXCLUDED.json_value;

    -- ==========================================
    -- HOW IT WORKS PAGE
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (how_it_works_id, 'hero', 'badge', 'text', 'How It Works'),
    (how_it_works_id, 'hero', 'title', 'text', 'A clear legal process from start to finish'),
    (how_it_works_id, 'hero', 'image', 'image', '/images/process-steps.jpg')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

    INSERT INTO site_content (page_id, section_key, content_key, content_type, json_value) VALUES
    (how_it_works_id, 'steps', 'items', 'json', '[
        {"title": "Initial Free Evaluation", "detail": "We review your situation and assess SSDI / SSI eligibility.", "icon": "ClipboardCheck"},
        {"title": "Application Support", "detail": "Our team prepares and submits complete case documents.", "icon": "FileText"},
        {"title": "Appeal & Hearing Process", "detail": "We provide legal representation for denied claims and hearings.", "icon": "Gavel"},
        {"title": "Case Management", "detail": "We track milestones and keep you informed at each stage.", "icon": "CheckCircle2"}
    ]'::jsonb),
    (how_it_works_id, 'prepare', 'items', 'json', '[
        {"title": "Medical Records", "icon": "FileText"},
        {"title": "Identification Documents", "icon": "IdCard"},
        {"title": "Employment History", "icon": "ClipboardCheck"}
    ]'::jsonb),
    (how_it_works_id, 'milestones', 'items', 'json', '[
        {"title": "Weeks 1-3", "detail": "Case intake and documentation review."},
        {"title": "Weeks 4-8", "detail": "Application preparation and submission."},
        {"title": "Appeal stage", "detail": "Representation for denied claims and hearings."}
    ]'::jsonb)
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET json_value = EXCLUDED.json_value;

    -- ==========================================
    -- RESULTS PAGE
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (results_id, 'hero', 'badge', 'text', 'Results'),
    (results_id, 'hero', 'title', 'text', 'Real success stories and case outcomes'),
    (results_id, 'hero', 'image', 'image', '/images/results-graph.jpg')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

    INSERT INTO site_content (page_id, section_key, content_key, content_type, json_value) VALUES
    (results_id, 'testimonials', 'items', 'json', '[
        {"name": "Client A", "quote": "After a prior denial, our appeal strategy secured approval with complete hearing preparation."},
        {"name": "Client B", "quote": "The legal team kept us informed and organized every document needed for a successful claim."},
        {"name": "Client C", "quote": "Their guidance gave us confidence and structure through a complex disability process."}
    ]'::jsonb),
    (results_id, 'outcomes', 'items', 'json', '[
        {"label": "Cases handled", "value": "3,200+"},
        {"label": "Approval support rate", "value": "89%"},
        {"label": "Years of service", "value": "25+"},
        {"label": "Client satisfaction", "value": "4.9 / 5"}
    ]'::jsonb),
    (results_id, 'highlights', 'items', 'json', '[
        {"title": "Denied claim approved", "detail": "Comprehensive appeal packet and hearing strategy."},
        {"title": "Faster case progress", "detail": "Early evidence organization and procedural tracking."},
        {"title": "Reduced client stress", "detail": "Consistent updates and clear communication."}
    ]'::jsonb)
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET json_value = EXCLUDED.json_value;

    -- ==========================================
    -- CONTACT PAGE
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (contact_id, 'hero', 'badge', 'text', 'Contact'),
    (contact_id, 'hero', 'title', 'text', 'Request your free case evaluation'),
    (contact_id, 'hero', 'image', 'image', '/images/contact-office.jpg'),
    (contact_id, 'info', 'description', 'text', 'Share your case details and our team will follow up with guidance on next steps for SSDI / SSI legal support.'),
    (contact_id, 'info', 'phone', 'text', '(800) 555-0199'),
    (contact_id, 'info', 'email', 'text', 'support@disabilitylawgroup.com')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

    INSERT INTO site_content (page_id, section_key, content_key, content_type, json_value) VALUES
    (contact_id, 'offices', 'list', 'json', '[
        "123 Main Street, Suite 400, New York, NY",
        "980 Market Avenue, Floor 8, Chicago, IL"
    ]'::jsonb),
    (contact_id, 'flow', 'steps', 'json', '[
        {"step": "Step 1", "detail": "We review your submission and available records."},
        {"step": "Step 2", "detail": "A legal specialist contacts you for next details."},
        {"step": "Step 3", "detail": "We outline a clear strategy and timeline."}
    ]'::jsonb)
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET json_value = EXCLUDED.json_value;

    -- ==========================================
    -- POLICIES
    -- ==========================================
    INSERT INTO site_content (page_id, section_key, content_key, content_type, content_value) VALUES
    (privacy_id, 'content', 'body', 'rich-text', 'We protect personal information submitted through our contact forms and communication channels. Information is used only for case evaluation, legal communication, and service coordination in accordance with applicable privacy standards.'),
    (terms_id, 'content', 'body', 'rich-text', 'This website content is provided for informational purposes and does not create an attorney-client relationship. Representation begins only after a signed engagement agreement. Terms may be updated as required by law and professional responsibility standards.'),
    (access_id, 'content', 'body', 'rich-text', 'We are committed to providing an accessible experience for all users, including keyboard navigation, readable contrast, and semantic structure. If you encounter barriers, please contact us so we can improve access and support.'),
    (disc_id, 'content', 'body', 'rich-text', 'Case outcomes depend on individual facts, evidence, and agency decisions. No result is guaranteed. Website materials are general information and should not be treated as individualized legal advice.')
    ON CONFLICT (page_id, section_key, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;

END $$;
