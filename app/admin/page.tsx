import Link from 'next/link';
import { getPages } from '@/lib/supabase/queries';
import { FileText, ChevronRight, Layout, Globe, ArrowUpRight } from 'lucide-react';

export default async function AdminDashboard() {
    const pages = await getPages();

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Dashboard</h1>
                    <p className="text-slate-500 mt-2 text-lg">Manage your legal platform content and pages.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Globe className="w-4 h-4" />
                        Live Website
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                    </Link>
                </div>
            </header>

            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <Layout className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Website Structure</h2>
                            <p className="text-sm text-slate-500">Select a page to edit its sections and content.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pages.map((page) => (
                            <Link
                                key={page.id}
                                href={`/admin/${page.slug}`}
                                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{page.name}</h3>
                                        <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-medium text-[10px]">Route: /{page.slug}</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                                    <span>Editable sections</span>
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{Math.floor(Math.random() * 5) + 3} slots</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-slate-900 rounded-3xl p-8 text-white">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Editor Guidelines</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Use the editor to update text, images, and lists. Changes are reflected instantly on the website.
                            For lists (like FAQ or testimonials), use the structured input fields to avoid formatting errors.
                        </p>
                    </div>
                    <div className="flex items-center md:justify-end gap-4">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{pages.length}</p>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Active Pages</p>
                        </div>
                        <div className="w-px h-12 bg-slate-800" />
                        <div className="text-center">
                            <p className="text-3xl font-bold">100%</p>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Status</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
