'use client';

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, X, ChevronDown } from 'lucide-react';

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // List of all icon names from lucide-react
    const iconNames = useMemo(() => {
        return Object.keys(LucideIcons).filter(
            (key) => typeof (LucideIcons as any)[key] === 'function' || typeof (LucideIcons as any)[key] === 'object'
        ).filter(key => key !== 'createLucideIcon' && key !== 'LucideProps');
    }, []);

    const filteredIcons = useMemo(() => {
        if (!searchTerm) return iconNames.slice(0, 100); // Limit initial view for performance
        return iconNames
            .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 100);
    }, [searchTerm, iconNames]);

    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all hover:border-slate-300 group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-md text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <SelectedIcon size={18} />
                    </div>
                    <span className="font-medium text-slate-700">{value || 'Select an icon...'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full min-w-[320px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200 origin-top">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search icons..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3 text-slate-500" />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {filteredIcons.map((name) => {
                            const Icon = (LucideIcons as any)[name];
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                        onChange(name);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all hover:scale-105 ${value === name
                                            ? 'bg-blue-50 border-blue-200 text-blue-600 ring-2 ring-blue-500/10'
                                            : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    title={name}
                                >
                                    <Icon size={20} />
                                    <span className="text-[8px] mt-1.5 font-bold truncate w-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        {name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div className="py-8 text-center text-slate-400">
                            <LucideIcons.SearchX className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-sm font-medium">No icons found</p>
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {iconNames.length} Icons available
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
