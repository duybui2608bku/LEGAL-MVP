'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    suggestedSize?: string;
}

export default function ImageUpload({ value, onChange, label, suggestedSize }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset error state if any
        setUploading(true);

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const data = await response.json();
            onChange(data.url);
            setPreview(data.url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Lỗi khi tải ảnh lên. Vui lòng thử lại.');
            setPreview(value || null); // Revert to old value
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
        setPreview(null);
    };

    return (
        <div className="space-y-4 w-full">
            {label && (
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">
                    {label}
                </label>
            )}

            <div className="flex flex-col md:flex-row gap-6">
                {/* Upload Zone */}
                <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className={`flex-1 min-h-[160px] relative border-2 border-dashed rounded-3xl transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center ${uploading
                        ? 'border-blue-200 bg-blue-50/30'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            <p className="text-sm font-bold text-blue-600">Đang tải lên...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">Click để chọn ảnh</p>
                                <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP tối đa 10MB</p>
                                {suggestedSize && (
                                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mt-2">Kích thước khuyên dùng: {suggestedSize}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Zone */}
                {preview && (
                    <div className="w-full md:w-64 h-40 relative group rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                        <img
                            src={preview}
                            alt="Preview"
                            className={`w-full h-full object-cover transition-all duration-500 ${uploading ? 'opacity-40 blur-sm' : 'opacity-100 blur-0'}`}
                        />
                        {!uploading && (
                            <button
                                onClick={handleRemove}
                                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </div>

            {/* Direct Link Input (Optional, for fallback) */}
            <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setPreview(e.target.value);
                    }}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-sm"
                    placeholder="Loặc nhập link ảnh trực tiếp..."
                />
            </div>
        </div>
    );
}
