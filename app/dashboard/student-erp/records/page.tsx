import React from 'react';

export default function RecordsPage() {
    return (
        <div className="p-8 flex items-center justify-center min-h-[80vh]">
            <div className="text-center p-12 bg-white rounded-[2rem] shadow-xl border border-slate-100 max-w-md">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl font-black">AI</div>
                <h1 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Campus Records & Transcripts</h1>
                <p className="text-slate-500 font-medium italic">"Initializing secure data connections. This high-capacity analytic node is being synchronized for your department."</p>
                <div className="mt-8 pt-8 border-t border-slate-50">
                    <div className="flex items-center justify-center gap-2">
                         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Syncing Infrastructure</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
