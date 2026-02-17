import { createClient } from './client';

export type ContentType = 'text' | 'rich-text' | 'image' | 'link' | 'json';

export interface SitePage {
    id: string;
    slug: string;
    name: string;
    updated_at: string;
}

export interface SiteContent {
    id: string;
    page_id: string;
    section_key: string;
    content_key: string;
    content_type: ContentType;
    content_value: string | null;
    json_value: any | null;
    updated_at: string;
}

export async function getPages() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .order('name');

    if (error) throw error;
    return data as SitePage[];
}

export async function getPageBySlug(slug: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data as SitePage;
}

export async function getPageContent(pageId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page_id', pageId)
        .order('section_key');

    if (error) throw error;
    return data as SiteContent[];
}

export async function updateContent(id: string, value: string | null, jsonValue: any | null = null) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('site_content')
        .update({
            content_value: value,
            json_value: jsonValue,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) {
        console.error('Supabase update error:', error);
        throw error;
    }

    if (!data) {
        throw new Error(`Cập nhật thất bại: Không tìm thấy nội dung với ID ${id}. Có thể bạn chưa đăng nhập hoặc không có quyền chỉnh sửa.`);
    }

    return data;
}
