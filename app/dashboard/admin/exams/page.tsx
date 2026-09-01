import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function ExamsPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="admin" />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest">Invigilation Hub</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Exam & Hall Control</h1>
                        <p className="text-slate-500 font-medium italic mt-2">"Manage departmental invigilators, seating arrangements, and hall ticket generation."</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Hall Seats', value: '420', sub: 'Allocated' },
                        { title: 'Invigilators', value: '18', sub: 'On-duty' },
                        { title: 'Absentees', value: '4', sub: 'Flagged' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-100/20 text-center">
                            <h3 className="text-4xl font-black text-slate-900 mb-2">{s.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">{s.title}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2">{s.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 mb-6 italic underline decoration-rose-500 decoration-4 underline-offset-8">Live Seating Status</h3>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                        {Array.from({ length: 24 }).map((_, i) => (
                             <div key={i} className={`h-12 rounded-xl transition-all border ${i < 20 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'} flex items-center justify-center text-[10px] font-black`}>
                                S-{i+1}
                             </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
