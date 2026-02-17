import { getPageBySlug, getPageContent } from '@/lib/supabase/queries';
import { notFound } from 'next/navigation';
import ContentEditor from './_components/content-editor';
import Link from 'next/link';
import { ChevronLeft, FileEdit, ExternalLink } from 'lucide-react';

export default async function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let page;
    try {
        page = await getPageBySlug(slug);
        if (!page) notFound();
    } catch (e) {
        notFound();
    }

    const content = await getPageContent(page.id);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Dashboard
                </Link>
            </div>

            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                        <FileEdit className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{page.name}</h1>
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                                /{page.slug}
                            </span>
                        </div>
                        <p className="text-slate-500 mt-2 text-lg">Detailed content management for this page structure.</p>
                    </div>
                </div>

                <Link
                    href={`/${page.slug === 'home' ? '' : page.slug}`}
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group bg-blue-50/50 px-4 py-2 rounded-xl"
                >
                    Preview Live Page
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </header>

            <ContentEditor initialContent={content} />
        </div>
    );
}
