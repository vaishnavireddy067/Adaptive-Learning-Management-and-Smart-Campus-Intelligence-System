import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function PlaceholderPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 flex items-center justify-center">
                <div className="text-center p-12 bg-white rounded-[2rem] shadow-xl border border-slate-100 max-w-md">
                    <div className="w-20 h-20 bg-slate-100 text-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl font-black">LOG</div>
                    <h1 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">System Logs Center</h1>
                    <p className="text-slate-500 font-medium italic">"Encrypted system activity logs for administrative tracking and security auditing."</p>
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <div className="flex items-center justify-center gap-2">
                             <div className="w-2 h-2 bg-slate-900 rounded-full animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Node Operational</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
