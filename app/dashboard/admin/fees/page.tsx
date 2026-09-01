'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { CreditCard, DollarSign, Search, CheckCircle, Clock, AlertCircle, Download, Send, Filter, ChevronRight } from 'lucide-react';

const FEES = [
    { id: 'FEE001', student: 'Aarav Sharma', rollNo: 'CS2301', semester: 'Sem 5', amount: 45000, paid: 45000, due: 0, dueDate: '—', status: 'Paid' },
    { id: 'FEE002', student: 'Priya Nair', rollNo: 'CS2302', semester: 'Sem 5', amount: 45000, paid: 22500, due: 22500, dueDate: 'Apr 5, 2026', status: 'Partial' },
    { id: 'FEE003', student: 'Rahul Verma', rollNo: 'CS2303', semester: 'Sem 5', amount: 45000, paid: 0, due: 45000, dueDate: 'Mar 31, 2026', status: 'Pending' },
    { id: 'FEE004', student: 'Sneha Patel', rollNo: 'DS2201', semester: 'Sem 3', amount: 42000, paid: 42000, due: 0, dueDate: '—', status: 'Paid' },
    { id: 'FEE005', student: 'Kiran Rao', rollNo: 'ECE2101', semester: 'Sem 1', amount: 38000, paid: 0, due: 38000, dueDate: 'Mar 28, 2026', status: 'Overdue' },
    { id: 'FEE006', student: 'Anjali Singh', rollNo: 'CS2304', semester: 'Sem 5', amount: 45000, paid: 45000, due: 0, dueDate: '—', status: 'Paid' },
    { id: 'FEE007', student: 'Dev Malhotra', rollNo: 'ML2402', semester: 'Sem 7', amount: 48000, paid: 16000, due: 32000, dueDate: 'Apr 10, 2026', status: 'Partial' },
    { id: 'FEE008', student: 'Tanya Gupta', rollNo: 'CS2305', semester: 'Sem 5', amount: 45000, paid: 45000, due: 0, dueDate: '—', status: 'Paid' },
];

const STATUS_STYLE: Record<string, string> = {
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Partial: 'bg-blue-50 text-blue-700 border-blue-200',
    Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
};
const STATUS_ICON: Record<string, any> = {
    Paid: CheckCircle,
    Pending: Clock,
    Partial: Clock,
    Overdue: AlertCircle,
};

export default function FeeManagementPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const statuses = ['All', 'Paid', 'Pending', 'Partial', 'Overdue'];
    const filtered = FEES.filter(f =>
        (filter === 'All' || f.status === filter) &&
        (f.student.toLowerCase().includes(search.toLowerCase()) || f.rollNo.toLowerCase().includes(search.toLowerCase()))
    );

    const totalCollected = FEES.reduce((a, f) => a + f.paid, 0);
    const totalDue = FEES.reduce((a, f) => a + f.due, 0);
    const overdueCount = FEES.filter(f => f.status === 'Overdue').length;
    const paidCount = FEES.filter(f => f.status === 'Paid').length;

    const fmt = (n: number) => `₹${(n / 1000).toFixed(1)}K`;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Fee Management"
                    subtitle="Track student fee collections, pending dues, and send reminders."
                    action={
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => alert('Sending reminder to all pending/overdue students...')}><Send size={15} className="mr-2" /> Send Reminders</Button>
                            <Button variant="outline" onClick={() => alert('Exporting fee report...')}><Download size={15} className="mr-2" /> Export</Button>
                        </div>
                    }
                />

                {/* KPI Row */}
                <div className="grid grid-cols-4 gap-5 mt-4 mb-8">
                    {[
                        { label: 'Total Collected', value: fmt(totalCollected), icon: CreditCard, color: 'emerald', sub: 'This semester' },
                        { label: 'Total Due', value: fmt(totalDue), icon: DollarSign, color: 'rose', sub: `${FEES.filter(f => f.due > 0).length} students` },
                        { label: 'Overdue', value: overdueCount, icon: AlertCircle, color: 'amber', sub: 'Requires action' },
                        { label: 'Fully Paid', value: paidCount, icon: CheckCircle, color: 'indigo', sub: `of ${FEES.length} students` },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <div className={`w-11 h-11 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center mb-4`}>
                                <s.icon size={20} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                            <p className={`text-2xl font-black text-${s.color}-600 mb-0.5`}>{s.value}</p>
                            <p className="text-[10px] text-slate-400">{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Collection Progress */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-slate-800">Collection Progress</h3>
                        <span className="text-sm font-black text-indigo-600">
                            {Math.round((totalCollected / (totalCollected + totalDue)) * 100)}% Collected
                        </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all"
                            style={{ width: `${Math.round((totalCollected / (totalCollected + totalDue)) * 100)}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>Collected: {fmt(totalCollected)}</span>
                        <span>Target: {fmt(totalCollected + totalDue)}</span>
                    </div>
                </div>

                {/* Fee Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            {statuses.map(s => (
                                <button key={s} onClick={() => setFilter(s)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === s ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-500 border-slate-200 hover:border-slate-400'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..."
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 w-52" />
                        </div>
                    </div>

                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {['Student', 'Semester', 'Total Fee', 'Paid', 'Due', 'Due Date', 'Status', 'Action'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(f => {
                                const Icon = STATUS_ICON[f.status];
                                return (
                                    <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-5 py-4">
                                            <p className="font-bold text-sm text-slate-800">{f.student}</p>
                                            <p className="text-[10px] text-slate-400">{f.rollNo}</p>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{f.semester}</td>
                                        <td className="px-5 py-4 text-sm font-bold text-slate-700">₹{f.amount.toLocaleString()}</td>
                                        <td className="px-5 py-4 text-sm font-bold text-emerald-600">₹{f.paid.toLocaleString()}</td>
                                        <td className="px-5 py-4 text-sm font-bold text-rose-600">{f.due > 0 ? `₹${f.due.toLocaleString()}` : '—'}</td>
                                        <td className="px-5 py-4 text-xs text-slate-500">{f.dueDate}</td>
                                        <td className="px-5 py-4">
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border flex items-center gap-1 w-fit ${STATUS_STYLE[f.status]}`}>
                                                <Icon size={10} /> {f.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            {f.status !== 'Paid' && (
                                                <button onClick={() => alert(`Sending fee reminder to ${f.student}...`)}
                                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Remind
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
