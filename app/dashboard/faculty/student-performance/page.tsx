'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { TrendingUp, TrendingDown, Award, AlertTriangle, Search, ChevronRight, BarChart2, Target, BookOpen } from 'lucide-react';

const STUDENTS_PERF = [
    { id: 'S001', name: 'Aarav Sharma', attendance: 94, quiz: 88, assignment: 90, risk: 'Low', trend: 'up', gpa: 9.1 },
    { id: 'S002', name: 'Priya Nair', attendance: 78, quiz: 72, assignment: 68, risk: 'Medium', trend: 'down', gpa: 7.4 },
    { id: 'S003', name: 'Rahul Verma', attendance: 99, quiz: 96, assignment: 98, risk: 'Low', trend: 'up', gpa: 9.8 },
    { id: 'S004', name: 'Sneha Patel', attendance: 55, quiz: 42, assignment: 50, risk: 'High', trend: 'down', gpa: 5.2 },
    { id: 'S005', name: 'Kiran Rao', attendance: 82, quiz: 80, assignment: 85, risk: 'Low', trend: 'up', gpa: 8.2 },
    { id: 'S006', name: 'Anjali Singh', attendance: 88, quiz: 85, assignment: 87, risk: 'Low', trend: 'up', gpa: 8.7 },
    { id: 'S007', name: 'Dev Malhotra', attendance: 40, quiz: 35, assignment: 30, risk: 'Critical', trend: 'down', gpa: 3.2 },
    { id: 'S008', name: 'Tanya Gupta', attendance: 96, quiz: 92, assignment: 95, risk: 'Low', trend: 'up', gpa: 9.5 },
];

const RISK_STYLE: Record<string, string> = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Critical: 'bg-rose-50 text-rose-700 border-rose-200',
};

function ProgressBar({ value, color = 'indigo' }: { value: number; color?: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-${color}-500 transition-all`} style={{ width: `${value}%` }} />
            </div>
            <span className="text-xs font-bold text-slate-600 w-8 text-right">{value}%</span>
        </div>
    );
}

export default function StudentPerformancePage() {
    const [search, setSearch] = useState('');
    const [filterRisk, setFilterRisk] = useState('All');
    const [selected, setSelected] = useState<typeof STUDENTS_PERF[0] | null>(null);

    const risks = ['All', 'Low', 'Medium', 'High', 'Critical'];
    const filtered = STUDENTS_PERF.filter(s =>
        (filterRisk === 'All' || s.risk === filterRisk) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const atRisk = STUDENTS_PERF.filter(s => ['High', 'Critical'].includes(s.risk)).length;
    const avgGpa = (STUDENTS_PERF.reduce((a, s) => a + s.gpa, 0) / STUDENTS_PERF.length).toFixed(1);
    const topStudent = STUDENTS_PERF.reduce((a, b) => a.gpa > b.gpa ? a : b);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Student Performance" subtitle="Monitor academic performance, attendance trends, and risk levels." />

                <div className="grid grid-cols-4 gap-5 mt-4 mb-8">
                    {[
                        { label: 'Total Students', value: STUDENTS_PERF.length, icon: Target, color: 'indigo' },
                        { label: 'At Risk', value: atRisk, icon: AlertTriangle, color: 'rose' },
                        { label: 'Class Avg GPA', value: avgGpa, icon: BarChart2, color: 'emerald' },
                        { label: 'Top Student', value: topStudent.name.split(' ')[0], icon: Award, color: 'amber' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center shrink-0`}>
                                <s.icon size={22} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                                <p className="text-xl font-black text-slate-800 mt-0.5">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                    {/* Student List */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
                            <div className="flex gap-2 flex-wrap">
                                {risks.map(r => (
                                    <button key={r} onClick={() => setFilterRisk(r)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${filterRisk === r ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-500 border-slate-200 hover:border-slate-400'}`}>
                                        {r}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                                    className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 w-44" />
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {filtered.map(s => (
                                <div key={s.id} onClick={() => setSelected(s)}
                                    className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors hover:bg-slate-50 ${selected?.id === s.id ? 'bg-indigo-50' : ''}`}>
                                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">
                                        {s.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-slate-800">{s.name}</p>
                                        <p className="text-[10px] text-slate-400">GPA: {s.gpa} • {s.id}</p>
                                    </div>
                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${RISK_STYLE[s.risk]}`}>{s.risk}</span>
                                    {s.trend === 'up' ? <TrendingUp size={16} className="text-emerald-500" /> : <TrendingDown size={16} className="text-rose-500" />}
                                    <ChevronRight size={16} className="text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-5">
                        {selected ? (
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-8 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center">
                                        {selected.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 text-lg">{selected.name}</h3>
                                        <p className="text-xs text-slate-400">{selected.id}</p>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-2xl border ${RISK_STYLE[selected.risk]}`}>
                                    <p className="font-black text-xs uppercase tracking-widest mb-1">Risk Level</p>
                                    <p className="text-2xl font-black">{selected.risk}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between"><span>Attendance</span><span>{selected.attendance}%</span></p>
                                        <ProgressBar value={selected.attendance} color={selected.attendance > 75 ? 'emerald' : 'rose'} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between"><span>Quiz Scores</span><span>{selected.quiz}%</span></p>
                                        <ProgressBar value={selected.quiz} color="indigo" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between"><span>Assignment</span><span>{selected.assignment}%</span></p>
                                        <ProgressBar value={selected.assignment} color="amber" />
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-2xl p-4">
                                    <p className="text-xs text-slate-400 mb-1">Overall GPA</p>
                                    <p className="text-4xl font-black text-white">{selected.gpa} <span className="text-base text-slate-400 font-normal">/ 10</span></p>
                                </div>

                                <Button className="w-full" onClick={() => alert(`Sending intervention notice to ${selected.name}...`)}>
                                    Send Intervention Notice
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center h-64">
                                <BookOpen size={40} className="text-slate-200 mb-3" />
                                <p className="font-bold text-slate-400">Select a student to view detailed performance</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
