'use client';

import React, { Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import { Users, AlertCircle, Calendar, CheckCircle, TrendingDown, MapPin, Layout, Zap, ArrowRight, ShieldAlert, Wand2, MessageCircle, ClipboardList, UserX, IndianRupee, PieChart } from 'lucide-react';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

function AdminDashboardInner() {
    const searchParams = useSearchParams();
    const system = searchParams.get('system') || 'smart-campus';
    const isErp = system === 'student-erp';

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar role={ROLES.ADMIN} />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                isErp ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"
                            )}>
                                {isErp ? 'ERP Administrative Hub' : 'Department Control'}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {isErp ? 'Institutional Record Center' : 'Department Administration'}
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Head of Department (Computer Science)</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {isErp ? (
                        <>
                            {[
                                { label: 'Collection Node', value: '₹14.2L', icon: IndianRupee, color: 'rose' },
                                { label: 'Pending Dues', value: '42 Students', icon: AlertCircle, color: 'rose' },
                                { label: 'Batch Records', value: '8 Sub-nodes', icon: ClipboardList, color: 'emerald' },
                                { label: 'Audit status', value: '98% SYNC', icon: CheckCircle, color: 'indigo' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm shadow-slate-100">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 mb-6 shadow-inner`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {[
                                { label: 'Dept Faculty', value: '24', icon: Users, color: 'indigo' },
                                { label: 'Active Rooms', value: '12', icon: MapPin, color: 'emerald' },
                                { label: 'In-use Blocks', value: 'A, B, C', icon: Layout, color: 'amber' },
                                { label: 'Critical Energy', value: '2 Nodes', icon: Zap, color: 'rose' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm shadow-slate-100">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 mb-6 shadow-inner`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {isErp ? (
                             <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <PieChart className="text-rose-600" /> Dept. Attendance Trends
                                </h3>
                                <div className="mt-8 space-y-6">
                                    {['CSE A', 'CSE B', 'ECE A', 'ECE B'].map((batch, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <span className="text-[10px] font-black text-slate-400 uppercase w-12">{batch}</span>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-600 rounded-full" style={{ width: `${85 - i * 5}%` }}></div>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">{85 - i * 5}%</span>
                                        </div>
                                    ))}
                                </div>
                             </section>
                        ) : (
                            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full"></div>
                                <div className="flex justify-between items-center mb-8 relative z-10">
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Calendar className="text-indigo-400" /> AI Master Schedule
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Generated 2h ago</p>
                                    </div>
                                    <Link href="/dashboard/admin/timetable" className="text-xs font-black bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/10 rounded-xl transition-all flex items-center gap-2">
                                        Configure Engine <ArrowRight size={14} />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-5 gap-4 relative z-10">
                                    {['Section A (CSE)', 'Section B (CSE)', 'Section C (ECE)', 'Section D (ECE)', 'Lab G1 (CSE)'].map((section, i) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                                            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{section}</p>
                                            <p className="text-xs font-bold leading-tight">{section.includes('Lab') ? 'Digital Systems Lab' : 'Advanced DSA'}</p>
                                            <p className="text-[10px] text-indigo-400 mt-2 font-black">BLOCK B • RM {201 + i}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Timetable Control', href: '/dashboard/admin/timetable', sub: 'Schedules & Assign', icon: Calendar, color: 'indigo' },
                                { label: 'Exam & Hall', href: '/dashboard/admin/exams', sub: 'Invigilation & Seats', icon: ClipboardList, color: 'rose' },
                                { label: 'Dept. Circulars', href: '/dashboard/admin/circulars', sub: 'Internal Notices', icon: MessageCircle, color: 'amber' },
                                { label: 'Faculty Management', href: '/dashboard/admin/faculty', sub: 'Workload & Assign', icon: Users, color: 'emerald' },
                                { label: 'Student Records', href: '/dashboard/admin/users', sub: 'Update & Map', icon: Users, color: 'blue' },
                                { label: 'At-Risk Monitoring', href: '/dashboard/admin/at-risk', sub: 'Alerts & Tracking', icon: UserX, color: 'red' },
                                { label: 'Infrastructure', href: '/dashboard/admin/infrastructure', sub: 'Resource Optimize', icon: Zap, color: 'cyan' },
                                { label: 'Grievance Handling', href: '/dashboard/admin/grievances', sub: 'Level 1 Resolution', icon: MessageCircle, color: 'violet' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="bg-white p-6 rounded-3xl border border-slate-200 group hover:border-indigo-500 transition-all shadow-sm">
                                    <div className={`p-4 rounded-2xl bg-${item.color || 'indigo'}-50 text-${item.color || 'indigo'}-600 mb-6 group-hover:scale-110 transition-transform shadow-inner inline-block`}>
                                        <item.icon size={24} />
                                    </div>
                                    <h4 className="text-sm font-black text-slate-900 leading-tight">{item.label}</h4>
                                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest leading-tight">{item.sub}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-rose-50 border border-rose-100 p-8 rounded-3xl relative overflow-hidden group">
                            <h3 className="text-rose-600 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ShieldAlert size={16} /> {isErp ? 'Audit Alerts' : 'Critical Alerts'}
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: isErp ? 'Fee Discrepancy' : 'Attendance Drop', desc: isErp ? 'CSE Batch A records mismatch in payment logs.' : 'S4 Computer Science attendance fell below 60% today.', status: 'urgent' },
                                    { title: isErp ? 'Document Sync' : 'Room Override', desc: isErp ? 'Faculty pending upload for S2 internal marks.' : 'Faculty assigned Room 201 without system booking.', status: 'info' },
                                ].map((alert, i) => (
                                    <div key={i} className="p-4 bg-white/50 rounded-2xl border border-rose-100 hover:bg-white transition-colors cursor-pointer shadow-sm shadow-rose-200/20">
                                        <p className="text-rose-900 font-bold text-xs">{alert.title}</p>
                                        <p className="text-rose-600/70 text-[10px] font-medium mt-1 leading-relaxed">{alert.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm italic">
                                <TrendingDown className="text-rose-500" size={18} /> {isErp ? 'Arrears Overview' : 'Performance Risk'}
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Michael Brown', risk: isErp ? '₹4,500' : '92%' },
                                    { name: 'Eve Gold', risk: isErp ? '₹2,200' : '84%' },
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                                        <span className="text-xs font-bold text-slate-700">{s.name}</span>
                                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">{s.risk} {isErp ? 'Due' : 'Risk'}</span>
                                    </div>
                                ))}
                                <button className="w-full mt-4 text-xs font-black text-indigo-600 hover:underline">{isErp ? 'Full Finance Audit' : 'Full Assessment Log'}</button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

        </div>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50/50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>}>
            <AdminDashboardInner />
        </Suspense>
    );
}
