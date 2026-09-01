'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Users, BookOpen, Award, Download, BarChart2, PieChart, Calendar, Filter, ArrowUp, ArrowDown } from 'lucide-react';

const DEPT_DATA = [
    { dept: 'Computer Science', students: 240, avg: 8.2, attendance: 88, pass: 96 },
    { dept: 'Data Science', students: 180, avg: 7.9, attendance: 84, pass: 92 },
    { dept: 'AI & ML', students: 160, avg: 8.5, attendance: 91, pass: 97 },
    { dept: 'Cyber Security', students: 120, avg: 7.6, attendance: 82, pass: 89 },
    { dept: 'ECE', students: 200, avg: 7.3, attendance: 79, pass: 85 },
    { dept: 'Mechanical', students: 150, avg: 6.8, attendance: 75, pass: 80 },
];

const MONTHLY = [
    { month: 'Oct', attendance: 86, gpa: 7.8 },
    { month: 'Nov', attendance: 88, gpa: 7.9 },
    { month: 'Dec', attendance: 84, gpa: 7.6 },
    { month: 'Jan', attendance: 89, gpa: 8.0 },
    { month: 'Feb', attendance: 91, gpa: 8.2 },
    { month: 'Mar', attendance: 87, gpa: 8.1 },
];

function MiniBar({ value, max = 100, color = 'indigo' }: { value: number; max?: number; color?: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-${color}-500`} style={{ width: `${(value / max) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-slate-600 w-10 text-right">{value}</span>
        </div>
    );
}

export default function ReportsAnalyticsPage() {
    const [period, setPeriod] = useState('This Semester');
    const [dept, setDept] = useState('All');

    const filtered = dept === 'All' ? DEPT_DATA : DEPT_DATA.filter(d => d.dept === dept);
    const totalStudents = DEPT_DATA.reduce((a, d) => a + d.students, 0);
    const avgAttendance = Math.round(DEPT_DATA.reduce((a, d) => a + d.attendance, 0) / DEPT_DATA.length);
    const avgGpa = (DEPT_DATA.reduce((a, d) => a + d.avg, 0) / DEPT_DATA.length).toFixed(1);
    const avgPass = Math.round(DEPT_DATA.reduce((a, d) => a + d.pass, 0) / DEPT_DATA.length);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Reports & Analytics"
                    subtitle="Department-wide performance metrics, trends, and insights."
                    action={
                        <div className="flex gap-3">
                            <select value={period} onChange={e => setPeriod(e.target.value)}
                                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none font-semibold text-slate-700">
                                {['This Semester', 'Last Semester', 'This Year'].map(p => <option key={p}>{p}</option>)}
                            </select>
                            <Button variant="outline" onClick={() => alert('Generating PDF report...')}><Download size={15} className="mr-2" /> Export</Button>
                        </div>
                    }
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-5 mt-6 mb-8">
                    {[
                        { label: 'Total Students', value: totalStudents, change: '+12', icon: Users, color: 'indigo', up: true },
                        { label: 'Avg Attendance', value: `${avgAttendance}%`, change: '+3%', icon: BarChart2, color: 'emerald', up: true },
                        { label: 'Average GPA', value: avgGpa, change: '+0.2', icon: Award, color: 'amber', up: true },
                        { label: 'Pass Rate', value: `${avgPass}%`, change: '-1%', icon: TrendingUp, color: 'rose', up: false },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-11 h-11 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center`}>
                                    <s.icon size={20} />
                                </div>
                                <span className={`text-[10px] font-black flex items-center gap-1 ${s.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {s.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />} {s.change}
                                </span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                            <p className="text-2xl font-black text-slate-900">{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Monthly Trend */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
                    <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp className="text-indigo-500" size={18} /> Monthly Trend
                    </h3>
                    <div className="flex items-end gap-4 h-32">
                        {MONTHLY.map((m, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex gap-1 items-end">
                                    <div className="flex-1 bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-600 cursor-pointer"
                                        style={{ height: `${m.attendance}px` }} title={`Attendance: ${m.attendance}%`} />
                                    <div className="flex-1 bg-amber-400 rounded-t-lg transition-all hover:bg-amber-500 cursor-pointer"
                                        style={{ height: `${m.gpa * 10}px` }} title={`GPA: ${m.gpa}`} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">{m.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-6 mt-4">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-indigo-500" /><span className="text-xs text-slate-500">Attendance %</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-amber-400" /><span className="text-xs text-slate-500">GPA × 10</span></div>
                    </div>
                </div>

                {/* Department Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-black text-slate-800">Department Breakdown</h3>
                        <select value={dept} onChange={e => setDept(e.target.value)}
                            className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none font-semibold text-slate-700">
                            <option>All</option>
                            {DEPT_DATA.map(d => <option key={d.dept}>{d.dept}</option>)}
                        </select>
                    </div>
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {['Department', 'Students', 'Attendance', 'Avg GPA', 'Pass Rate'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(d => (
                                <tr key={d.dept} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-4 font-bold text-sm text-slate-800">{d.dept}</td>
                                    <td className="px-5 py-4 text-sm text-slate-700">{d.students}</td>
                                    <td className="px-5 py-4 w-40"><MiniBar value={d.attendance} color={d.attendance > 85 ? 'emerald' : 'amber'} /></td>
                                    <td className="px-5 py-4">
                                        <span className={`text-sm font-black ${d.avg >= 8 ? 'text-emerald-600' : d.avg >= 7 ? 'text-amber-600' : 'text-rose-600'}`}>{d.avg}</span>
                                    </td>
                                    <td className="px-5 py-4 w-40"><MiniBar value={d.pass} color={d.pass > 90 ? 'emerald' : 'rose'} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
