'use client';

import { useState } from 'react';
import { SiteContent, updateContent } from '@/lib/supabase/queries';
import TipTapEditor from '@/app/_components/admin-tiptap-editor';
import { Save, Image as ImageIcon, FileText, List, Type, CheckCircle2, RotateCcw } from 'lucide-react';

interface ContentEditorProps {
    initialContent: SiteContent[];
}

export default function ContentEditor({ initialContent }: ContentEditorProps) {
    const [content, setContent] = useState<SiteContent[]>(initialContent);
    const [saving, setSaving] = useState<string | null>(null);
    const [saved, setSaved] = useState<string | null>(null);

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
    const sections = content.reduce((acc, item) => {
        if (!acc[item.section_key]) acc[item.section_key] = [];
        acc[item.section_key].push(item);
        return acc;
    }, {} as Record<string, SiteContent[]>);

    return (
        <div className="space-y-12 pb-20">
            {Object.entries(sections).map(([sectionKey, items]) => (
                <section key={sectionKey} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
                            Section: {sectionKey.replace(/[-_]/g, ' ')}
                        </h2>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <div key={item.id} className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {item.content_type === 'image' && <ImageIcon className="w-4 h-4 text-purple-500" />}
                                        {item.content_type === 'rich-text' && <FileText className="w-4 h-4 text-blue-500" />}
                                        {item.content_type === 'text' && <Type className="w-4 h-4 text-emerald-500" />}
                                        {item.content_type === 'json' && <List className="w-4 h-4 text-amber-500" />}
                                        <label className="text-xs font-semibold text-slate-400 uppercase">
                                            {item.content_key.replace(/[-_]/g, ' ')}
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {saved === item.id && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                <CheckCircle2 className="w-3 h-3" /> Saved
                                            </span>
                                        )}
                                        {saving === item.id && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse uppercase tracking-tighter">
                                                <RotateCcw className="w-3 h-3 animate-spin" /> Saving...
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {item.content_type === 'rich-text' ? (
                                    <div className="space-y-3">
                                        <TipTapEditor
                                            content={item.content_value || ''}
                                            onChange={(val) => {
                                                // We don't save on every keystroke to avoid spamming
                                                // The user can have a "Save" button for this specific field
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                const editorElement = document.querySelector(`.ProseMirror`);
                                                if (editorElement) {
                                                    handleUpdate(item, editorElement.innerHTML, null);
                                                }
                                            }}
                                            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-slate-800 transition-colors"
                                        >
                                            <Save className="w-3.5 h-3.5" /> Save Changes
                                        </button>
                                    </div>
                                ) : item.content_type === 'image' ? (
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                defaultValue={item.content_value || ''}
                                                className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                placeholder="URL của hình ảnh..."
                                                onBlur={(e) => handleUpdate(item, e.target.value)}
                                            />
                                        </div>
                                        {item.content_value && (
                                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                                                <img
                                                    src={item.content_value}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : item.content_type === 'json' ? (
                                    <div className="space-y-3">
                                        <textarea
                                            rows={8}
                                            defaultValue={JSON.stringify(item.json_value, null, 2)}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            onBlur={(e) => {
                                                try {
                                                    const parsed = JSON.parse(e.target.value);
                                                    handleUpdate(item, null, parsed);
                                                } catch (err) {
                                                    alert('Invalid JSON format');
                                                }
                                            }}
                                        />
                                        <p className="text-[10px] text-slate-400">
                                            Tip: Chỉnh sửa dữ liệu danh sách như icons, tiêu đề nhỏ ở đây theo định dạng JSON.
                                        </p>
                                    </div>
                                ) : (
                                    <textarea
                                        rows={3}
                                        defaultValue={item.content_value || ''}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        onBlur={(e) => handleUpdate(item, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
