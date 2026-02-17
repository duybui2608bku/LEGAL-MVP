'use client';

import { useState } from 'react';
import { SiteContent, updateContent } from '@/lib/supabase/queries';
import dynamic from 'next/dynamic';
const TipTapEditor = dynamic(() => import('@/app/_components/admin-tiptap-editor'), { ssr: false });
import JsonEditor from './json-editor';
import { Save, Image as ImageIcon, FileText, List, Type, CheckCircle2, RotateCcw, Search, ChevronRight } from 'lucide-react';

interface ContentEditorProps {
    initialContent: SiteContent[];
}

export default function ContentEditor({ initialContent }: ContentEditorProps) {
    const [content, setContent] = useState<SiteContent[]>(initialContent);
    const [saving, setSaving] = useState<string | null>(null);
    const [saved, setSaved] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [richTextPending, setRichTextPending] = useState<Record<string, string>>({});

    const handleUpdate = async (item: SiteContent, value: string | null, jsonValue: any | null = null) => {
        setSaving(item.id);
        try {
            await updateContent(item.id, value, jsonValue);
            setSaved(item.id);
            setTimeout(() => setSaved(null), 2000);

            setContent(prev => prev.map(c =>
                c.id === item.id ? { ...c, content_value: value, json_value: jsonValue } : c
            ));
        } catch (error) {
            console.error('Failed to update content:', error);
            alert('Lỗi khi lưu dữ liệu. Vui lòng thử lại.');
        } finally {
            setSaving(null);
        }
    };

    // Group content by section
    const sections = content.reduce((acc, item: SiteContent) => {
        if (!acc[item.section_key]) acc[item.section_key] = [];
        acc[item.section_key].push(item);
        return acc;
    }, {} as Record<string, SiteContent[]>);

    const sectionKeys = Object.keys(sections);
    if (!activeSection && sectionKeys.length > 0) {
        setActiveSection(sectionKeys[0]);
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-20">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-24 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Page Sections</p>
                    {sectionKeys.map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveSection(key)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeSection === key
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
                                }`}
                        >
                            <span className="capitalize">{key.replace(/[-_]/g, ' ')}</span>
                            {activeSection === key && <ChevronRight className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Editor Area */}
            <div className="flex-1 space-y-8 min-w-0">
                {activeSection && sections[activeSection] && (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="px-8 py-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">
                                    {activeSection.replace(/[-_]/g, ' ')}
                                </h2>
                                <p className="text-sm text-slate-500 mt-1 font-medium">Fine-tune the content for this part of your page.</p>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100/80">
                            {sections[activeSection].map((item: SiteContent) => (
                                <div key={item.id} className="p-8 group hover:bg-slate-50/30 transition-colors">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm ${item.content_type === 'image' ? 'bg-purple-100/50 text-purple-600' :
                                                    item.content_type === 'rich-text' ? 'bg-blue-100/50 text-blue-600' :
                                                        item.content_type === 'text' ? 'bg-emerald-100/50 text-emerald-600' :
                                                            'bg-amber-100/50 text-amber-600'
                                                }`}>
                                                {item.content_type === 'image' && <ImageIcon className="w-6 h-6" />}
                                                {item.content_type === 'rich-text' && <FileText className="w-6 h-6" />}
                                                {item.content_type === 'text' && <Type className="w-6 h-6" />}
                                                {item.content_type === 'json' && <List className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                    {item.content_key.replace(/[-_]/g, ' ')}
                                                </label>
                                                <p className="text-sm font-bold text-slate-700 mt-0.5 capitalize">{item.content_type} Content</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {saved === item.id && (
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-100 animate-in zoom-in-95 duration-300 shadow-sm">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                                                </span>
                                            )}
                                            {saving === item.id && (
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-100 animate-pulse shadow-sm">
                                                    <RotateCcw className="w-3.5 h-3.5 animate-spin" /> Updating...
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-0 sm:pl-16">
                                        {item.content_type === 'rich-text' ? (
                                            <div className="space-y-4">
                                                <TipTapEditor
                                                    content={item.content_value || ''}
                                                    onChange={(val) => {
                                                        setRichTextPending(prev => ({ ...prev, [item.id]: val }));
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const val = richTextPending[item.id] || item.content_value;
                                                        handleUpdate(item, val, null);
                                                    }}
                                                    className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-slate-300/50 hover:-translate-y-0.5"
                                                >
                                                    <Save className="w-4 h-4" /> Save Content
                                                </button>
                                            </div>
                                        ) : item.content_type === 'image' ? (
                                            <div className="flex flex-col md:flex-row gap-8">
                                                <div className="flex-1 space-y-4">
                                                    <div className="relative group/input">
                                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                                                        <input
                                                            type="text"
                                                            defaultValue={item.content_value || ''}
                                                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-sm"
                                                            placeholder="Enter image URL or path..."
                                                            onBlur={(e) => handleUpdate(item, e.target.value)}
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">Best results: 1200x800px or larger</p>
                                                </div>
                                                {item.content_value && (
                                                    <div className="w-full md:w-56 h-36 rounded-3xl overflow-hidden border-4 border-slate-50 bg-slate-100 shadow-md group-hover:border-blue-50 transition-all">
                                                        <img
                                                            src={item.content_value}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : item.content_type === 'json' ? (
                                            <JsonEditor
                                                value={item.json_value}
                                                onChange={(newValue) => handleUpdate(item, null, newValue)}
                                            />
                                        ) : (
                                            <textarea
                                                rows={5}
                                                defaultValue={item.content_value || ''}
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none shadow-sm leading-relaxed"
                                                placeholder="Enter text content..."
                                                onBlur={(e) => handleUpdate(item, e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
