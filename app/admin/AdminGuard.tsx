'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [passKey, setPassKey] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        // Check if already authorized in current session
        const storedKey = sessionStorage.getItem('admin_passkey');
        if (storedKey === '8888') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passKey === '8888') {
            sessionStorage.setItem('admin_passkey', '8888');
            setIsAuthorized(true);
            setError(false);
        } else {
            setError(true);
            setPassKey('');
        }
    };

    if (isAuthorized === null) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
        </div>;
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-slate-200">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900">Admin Access</h1>
                            <p className="text-slate-500 mt-2">Enter the admin pass key to continue.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={passKey}
                                    onChange={(e) => setPassKey(e.target.value)}
                                    placeholder="Enter Pass Key"
                                    className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                                        } outline-none transition-all text-center text-xl tracking-[0.5em] font-mono`}
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-2 text-center font-medium">Incorrect pass key. Please try again.</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 group transition-all"
                            >
                                Verify Identity
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-xs font-medium uppercase tracking-wider">Secure Admin Portal</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
