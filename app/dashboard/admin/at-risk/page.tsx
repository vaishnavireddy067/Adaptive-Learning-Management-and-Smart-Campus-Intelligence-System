import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function AtRiskPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="admin" />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">Early Intervention Center</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">At-Risk Performance Monitoring</h1>
                        <p className="text-slate-500 font-medium italic mt-2">"Monitor students with high risk of non-retention or failing GPA."</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-6">
                    {[
                        { name: 'Michael Brown', subject: 'Advanced Mathematics', risk: '92%', status: 'Contacted', desc: 'S4 Computer Science' },
                        { name: 'Eve Gold', subject: 'Digital Logic', risk: '84%', status: 'Reviewing', desc: 'S4 Electronics Eng' },
                        { name: 'Sameer Kumar', subject: 'Python Basics', risk: '76%', status: 'Remedial Class', desc: 'S2 Data Science' },
                        { name: 'Aisha Khan', subject: 'Computer Architecture', risk: '72%', status: 'Sent Notice', desc: 'S4 Computer Science' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-red-400 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{s.name}</h3>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{s.desc}</p>
                                </div>
                                <span className="bg-red-50 text-red-600 text-sm font-black px-3 py-1 rounded-xl shadow-inner border border-red-100">{s.risk} Risk</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl mb-8 flex justify-between items-center group-hover:bg-slate-100 transition-colors">
                                <div>
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Critial Subject</p>
                                     <p className="text-xs font-bold text-slate-700">{s.subject}</p>
                                </div>
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-white border border-slate-100 px-3 py-1 rounded-xl shadow-sm">{s.status}</span>
                            </div>
                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all active:scale-[0.98]">
                                Launch Intervention Hub
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
