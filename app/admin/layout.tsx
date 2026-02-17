import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import AdminGuard from './AdminGuard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminGuard>
            <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
                <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <Link href="/admin" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
                                    LegalCMS <span className="text-blue-600">Admin</span>
                                </Link>
                            </div>

                            <div className="flex items-center gap-6">
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                                >
                                    View Website
                                </Link>
                                <div className="h-4 w-px bg-slate-200" />
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                        AD
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">Administrator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>
                    {children}
                </main>

                <footer className="border-t border-slate-200 bg-white py-10 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
                        <p className="text-sm text-slate-400">
                            &copy; {new Date().getFullYear()} Legal MVP CMS Dashboard.
                        </p>
                    </div>
                </footer>
            </div>
        </AdminGuard>
    );
}
