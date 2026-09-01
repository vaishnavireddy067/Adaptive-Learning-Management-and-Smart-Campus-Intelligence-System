import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function GrievancesPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="admin" />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-[10px] font-black uppercase tracking-widest">Student Support Node</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Grievance Handling Center</h1>
                        <p className="text-slate-500 font-medium italic mt-2">"Monitor student and faculty concerns. Manage grievance resolution and level-1 escalation."</p>
                    </div>
                </header>

                <div className="grid gap-6">
                    {[
                        { title: 'Block B Power Fluctuation', category: 'Infrastructure', date: '4h ago', status: 'In Review' },
                        { title: 'LMS Accessibility Error', category: 'LMS System', date: '1d ago', status: 'Resolved' },
                        { title: 'Request for Extended Lab Hours', category: 'Academic', date: '2d ago', status: 'Pending' },
                    ].map((g, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-violet-400 transition-all">
                             <div className="flex-1">
                                <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">{g.category}</span>
                                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1">{g.title}</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">{g.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${g.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                    {g.status}
                                </span>
                                <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all">View Concern</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
