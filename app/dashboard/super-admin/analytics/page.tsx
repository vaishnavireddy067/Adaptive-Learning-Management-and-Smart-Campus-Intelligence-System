'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, AlertCircle, BarChart3, PieChart, Info, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';

const RISK_STUDENTS = [
    { id: 'ST001', name: 'John Doe', attendance: '65%', score: '42%', risk: 'High', reason: 'Consecutive Absence' },
    { id: 'ST042', name: 'Sarah Lee', attendance: '72%', score: '38%', risk: 'High', reason: 'Failing 3 Core Subjects' },
    { id: 'ST108', name: 'Mike Ross', attendance: '88%', score: '45%', risk: 'Medium', reason: 'Downward Grade Trend' },
];

export default function PredictiveAnalyticsPage() {
    const [filterType, setFilterType] = useState<'All' | 'High' | 'Medium'>('All');

    const filteredStudents = filterType === 'All' ? RISK_STUDENTS : RISK_STUDENTS.filter(s => s.risk === filterType);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <TrendingUp className="text-indigo-600" />
                            Predictive Analytics Dashboard
                        </h1>
                        <p className="text-slate-500 mt-2">AI-driven insights to monitor campus performance and student success.</p>
                    </div>
                    <button 
                        onClick={() => alert('Generating full campus performance report...')}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-100 transition-all"
                    >
                        <Download size={18} />
                        Export AI Report
                    </button>
                </header>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Campus Retention', value: '94.2%', trend: '+1.2%', up: true, icon: Users, color: 'indigo' },
                        { label: 'Avg. Graduation Rate', value: '88.5%', trend: '+0.5%', up: true, icon: BarChart3, color: 'emerald' },
                        { label: 'Students at Risk', value: '42', trend: '-8.0%', up: false, icon: AlertCircle, color: 'rose' },
                        { label: 'Faculty Satisfaction', value: '4.8/5', trend: '+0.2', up: true, icon: PieChart, color: 'amber' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-0.5 text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Early Intervention Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Early Intervention Required</h2>
                                <p className="text-slate-500 text-xs mt-1">AI flagged students based on attendance and performance patterns.</p>
                            </div>
                            <div className="flex gap-2">
                                {(['All', 'High', 'Medium'] as const).map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => setFilterType(t)}
                                        className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${filterType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4 text-center">Attendance</th>
                                        <th className="px-6 py-4 text-center">Avg. Score</th>
                                        <th className="px-6 py-4">Risk Status</th>
                                        <th className="px-6 py-4">Primary Reason</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredStudents.map(student => (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-slate-900">{student.name}</td>
                                            <td className="px-6 py-4 text-center text-slate-600">{student.attendance}</td>
                                            <td className="px-6 py-4 text-center text-slate-600">{student.score}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${student.risk === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                                    {student.risk} Risk
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{student.reason}</td>
                                            <td className="px-6 py-4">
                                                <button 
                                                    onClick={() => alert(`Contacting ${student.name}'s counselor & parents with AI-generated summary.`)}
                                                    className="text-indigo-600 font-bold hover:underline"
                                                >
                                                    Intervene
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* AI Insights Sidebar */}
                    <div className="space-y-6">
                        <section className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg border border-indigo-500">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Info size={20} />
                                AI Strategic Insight
                            </h3>
                            <div className="space-y-4 text-sm text-indigo-100 leading-relaxed">
                                <p>
                                    <strong className="text-white underline decoration-indigo-400">Trend Detected:</strong> Students in CS Batch A are showing a 15% decline in participation between 2 PM and 4 PM.
                                </p>
                                <p>
                                    <strong className="text-white underline decoration-indigo-400">Recommendation:</strong> Shift programming labs to morning sessions for improved retention.
                                </p>
                            </div>
                            <button 
                                onClick={() => alert('Proposal drafted. Send to Dean for approval?')}
                                className="w-full mt-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                            >
                                Apply Strategic Shift
                            </button>
                        </section>

                        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Search size={20} className="text-slate-400" />
                                Smart Look-up
                            </h3>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Search student or faculty..." 
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                                />
                                <div className="flex gap-2">
                                    <button onClick={() => alert('Filter applied.')} className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                                        <Filter size={14} /> Filter
                                    </button>
                                    <button onClick={() => alert('Advanced AI analytics search launched.')} className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                                        AI Advanced
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
