'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES, DEPARTMENTS } from '@/utils/constants';
import { Users, Building2, BookOpen, GraduationCap, TrendingUp, AlertTriangle, ShieldCheck, Zap, ArrowUpRight, BarChart3, Activity, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboard() {
    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar role={ROLES.SUPER_ADMIN} systemType="smart-campus" />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Global Overview</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Institution Control Center</h1>
                        <p className="text-slate-500 mt-2 font-medium italic">"Real-time visibility across all campus operations and academic departments."</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/dashboard/super-admin/analytics" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 text-sm">
                            <BarChart3 size={18} /> Deep AI Analytics
                        </Link>
                    </div>
                </header>

                {/* Main Control Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                     {[
                        { label: 'Total Enrollment', value: '4,250', sub: '+12% growth', icon: GraduationCap, color: 'indigo' },
                        { label: 'Campus Energy', value: '72%', sub: 'Optimal Load', icon: Zap, color: 'amber' },
                        { label: 'Risk Students', value: '18', sub: 'Action Required', icon: AlertTriangle, color: 'rose' },
                        { label: 'Active Faculty', value: '142', sub: '98% Present', icon: Users, color: 'emerald' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                            <p className={`text-xs font-bold mt-1 ${stat.color === 'rose' ? 'text-rose-500' : 'text-slate-400'}`}>{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Platform Gateways - THE CONNECTION HUB */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="group">
                        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between h-48 relative overflow-hidden shadow-2xl shadow-indigo-900/20 border-4 border-indigo-500/20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 ring-4 ring-indigo-500/20">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight">Smart Campus</h3>
                                    <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">Current Active System</p>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Institutional Control</span>
                                </div>
                                <span className="p-2 bg-white/10 rounded-xl border border-white/20">
                                    <ShieldCheck size={16} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link href="/dashboard/student?system=lms" className="group">
                        <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between h-48 relative overflow-hidden shadow-2xl shadow-emerald-900/20 active:scale-[0.98] transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight">Learning Portal</h3>
                                    <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">Global Academy LMS</p>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 group-hover:translate-x-1 transition-transform">Access Portal <ChevronRight size={14} className="inline ml-1" /></span>
                                <span className="p-2 bg-white/5 rounded-xl border border-white/10 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <BookOpen size={16} />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/student-erp" className="group">
                        <div className="bg-rose-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between h-48 relative overflow-hidden shadow-2xl shadow-rose-900/20 active:scale-[0.98] transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/40 group-hover:scale-110 transition-transform">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight">Student ERP</h3>
                                    <p className="text-rose-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">Administrative Records</p>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 group-hover:translate-x-1 transition-transform">Run Records <ChevronRight size={14} className="inline ml-1" /></span>
                                <span className="p-2 bg-white/5 rounded-xl border border-white/10 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Activity size={16} />
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                             <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <Activity className="text-indigo-600" />
                                    Live Campus Pulse
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Real-time Updates</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { event: 'AI Timetable Regenerated', time: '10 mins ago', desc: 'New schedule published for CSE Semester 4.', status: 'success' },
                                    { event: 'Critical Power Variance', time: '1 hour ago', desc: 'Block B Laboratory current load exceeding 80%.', status: 'alert' },
                                    { event: 'Dept. Meeting Started', time: '2 hours ago', desc: 'HODs discussing Semester 2 result patterns.', status: 'info' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group relative">
                                        <div className="mt-1 w-2.5 h-2.5 rounded-full ring-4 ring-white shadow-sm border border-slate-200 bg-slate-200 flex-shrink-0" />
                                        <div className="flex-1 pb-6 border-b border-slate-50 last:border-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.event}</h4>
                                                <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                            </div>
                                            <p className="text-slate-500 text-xs mt-1 font-medium italic">"{item.desc}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/dashboard/super-admin/departments" className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white group hover:shadow-2xl transition-all shadow-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Building2 size={24} />
                                    </div>
                                    <ArrowUpRight className="text-slate-500 group-hover:text-white transition-colors" />
                                </div>
                                <h4 className="text-xl font-black">Manage Departments</h4>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Control budget and performance for all {DEPARTMENTS.length} academic units.</p>
                            </Link>

                            <Link href="/dashboard/super-admin/analytics" className="bg-white p-8 rounded-3xl border border-slate-200 group hover:border-indigo-500 transition-all shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Activity size={24} />
                                    </div>
                                    <ArrowUpRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <h4 className="text-xl font-black text-slate-900">Predictive Center</h4>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Early-warning systems for student retention and success.</p>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Control Panel */}
                    <div className="space-y-6">
                         <section className="bg-indigo-600 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
                             <h3 className="font-bold mb-6 flex items-center gap-2 text-indigo-100">
                                <ShieldCheck size={18} /> System Status
                            </h3>
                            <div className="space-y-4 mb-8">
                                {[
                                    { label: 'Database Sync', status: 'Healthy' },
                                    { label: 'AI Inference Node', status: 'High Load' },
                                    { label: 'LMS API Gateway', status: 'Healthy' },
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                                        <span className="text-xs font-bold text-indigo-100">{s.label}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${s.status === 'Healthy' ? 'bg-white/10 text-emerald-400' : 'bg-rose-500 text-white'}`}>
                                            {s.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all">
                                Run Diagnostics
                            </button>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm italic">
                                <TrendingUp className="text-emerald-500" size={18} /> Weekly KPI
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Retention</span>
                                        <span className="text-xs font-black text-slate-900">94.2%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty Research</span>
                                        <span className="text-xs font-black text-slate-900">68.5%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
