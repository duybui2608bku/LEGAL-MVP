'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, AlertCircle } from 'lucide-react';

interface JsonEditorProps {
    value: any;
    onChange: (newValue: any) => void;
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
    const [items, setItems] = useState<any[]>([]);
    const [isObjectArray, setIsObjectArray] = useState(false);
    const [isStringArray, setIsStringArray] = useState(false);
    const [fields, setFields] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            if (Array.isArray(value)) {
                setItems(value);
                if (value.length > 0) {
                    if (typeof value[0] === 'object' && value[0] !== null) {
                        setIsObjectArray(true);
                        setIsStringArray(false);
                        setFields(Object.keys(value[0]));
                    } else if (typeof value[0] === 'string') {
                        setIsStringArray(true);
                        setIsObjectArray(false);
                    }
                } else {
                    // Empty array, assume strings or keep as is
                    setIsStringArray(true);
                }
            } else {
                setError('This editor only supports arrays of objects or strings.');
            }
        } catch (e) {
            setError('Invalid JSON format');
        }
    }, [value]);

    const handleUpdateItem = (index: number, field: string, newValue: any) => {
        const newItems = [...items];
        if (isObjectArray) {
            newItems[index] = { ...newItems[index], [field]: newValue };
        } else {
            newItems[index] = newValue;
        }
        setItems(newItems);
        onChange(newItems);
    };

    const addItem = () => {
        const newItem = isObjectArray
            ? fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
            : '';
        const newItems = [...items, newItem];
        setItems(newItems);
        onChange(newItems);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onChange(newItems);
    };

    if (error) {
        return (
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="group flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl transition-all hover:bg-white hover:shadow-md hover:border-blue-200"
                    >
                        <div className="mt-2 text-slate-300">
                            <GripVertical className="w-4 h-4 cursor-grab" />
                        </div>

                        <div className="flex-1 grid gap-4">
                            {isObjectArray ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {fields.map(field => (
                                        <div key={field} className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{field}</label>
                                            <textarea
                                                value={item[field] || ''}
                                                onChange={(e) => handleUpdateItem(index, field, e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all min-h-[40px] resize-y"
                                                rows={1}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    value={item || ''}
                                    onChange={(e) => handleUpdateItem(index, '', e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                />
                            )}
                        </div>

                        <button
                            onClick={() => removeItem(index)}
                            className="mt-6 p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                            title="Remove item"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all text-sm font-semibold"
            >
                <Plus className="w-4 h-4" />
                Add Item
            </button>
        </div>
    );
}
