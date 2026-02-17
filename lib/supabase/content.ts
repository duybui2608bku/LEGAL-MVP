import { createClient } from '@supabase/supabase-js';
import { SiteContent } from './queries';

export async function getDynamicContent(slug: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch page by slug
    const { data: page, error: pageError } = await supabase
        .from('site_pages')
        .select('id')
        .eq('slug', slug)
        .single();

    if (pageError || !page) {
        return null;
    }

    // Fetch all content for this page
    const { data: content, error: contentError } = await supabase
        .from('site_content')
        .select('section_key, content_key, content_type, content_value, json_value')
        .eq('page_id', page.id);

    if (contentError || !content) {
        return null;
    }

    // Structure content for easy consumption
    const structured: Record<string, any> = {};

    content.forEach(item => {
        if (!structured[item.section_key]) structured[item.section_key] = {};

        structured[item.section_key][item.content_key] =
            item.content_type === 'json' ? item.json_value : item.content_value;
    });

    return structured;
}
