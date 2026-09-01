'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/utils/helpers';
import { 
    Activity, CreditCard, Sparkles, Calendar, MessageSquare, 
    ArrowRight, Bell, UserCircle, Award, Ticket, Users, PieChart, IndianRupee
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function StudentERPDashboard() {
    return (
        <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
            {/* Standard Sidebar - Dark theme restored */}
            <Sidebar role="student" systemType="student-erp" />

            <main className="flex-1 ml-64 p-8">
                <header className="mb-12 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hi, Vaishnavi 👋</h1>
                        <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-80">Friday, Oct 20, 2026 | 24°C Sunny</p>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-8 space-y-10">
                        {/* Summary Grid matches Image 3 */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Attendance Card */}
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white hover:border-slate-100 transition-all flex flex-col justify-between h-64 relative group overflow-hidden">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-10 relative z-10 transition-transform group-hover:scale-105">
                                    <Activity size={24} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Overall Attendance</p>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter">81.3%</h2>
                                    <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest opacity-60">Current semester analytics</p>
                                </div>
                            </div>

                            {/* Fees Card */}
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white hover:border-slate-100 transition-all flex flex-col justify-between h-64 relative group overflow-hidden">
                                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-10 relative z-10 transition-transform group-hover:scale-105">
                                    <IndianRupee size={24} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Fees</p>
                                    <h2 className="text-5xl font-black text-rose-600 tracking-tighter">₹18,000</h2>
                                    <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest opacity-60">Due in 5 days</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Events Card */}
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white hover:border-slate-100 transition-all flex flex-col justify-between h-64 relative group overflow-hidden">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-10 relative z-10 transition-transform group-hover:scale-105">
                                    <Ticket size={24} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Campus Events</p>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter">03</h2>
                                    <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest opacity-60">New upcoming registrations</p>
                                </div>
                            </div>

                            {/* Clubs Card */}
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white hover:border-slate-100 transition-all flex flex-col justify-between h-64 relative group overflow-hidden">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-10 relative z-10 transition-transform group-hover:scale-105">
                                    <Users size={24} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Campus Clubs</p>
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">AI Club</h2>
                                    <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest opacity-60">Check club notifications</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Tools matches Image 3 */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white mt-10">
                            <h3 className="text-lg font-black text-slate-900 mb-10 flex items-center gap-3">
                                <Calendar size={20} className="text-indigo-600" /> Quick Tools
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { title: 'Academic Calendar', sub: 'View upcoming holidays', icon: Calendar },
                                    { title: 'Feedback Form', sub: 'Message administration', icon: MessageSquare },
                                ].map((tool, i) => (
                                    <div key={i} className="flex items-center gap-8 p-8 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-400 shadow-sm group-hover:scale-110 transition-transform shrink-0 border border-slate-100/50">
                                            <tool.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 text-sm tracking-tight">{tool.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{tool.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Insights Column matches Image 3 */}
                    <div className="col-span-4 space-y-10">
                        {/* ERP Insights Dark Card */}
                        <div className="bg-[#0f172a] p-10 rounded-[3rem] text-white relative shadow-2xl flex flex-col min-h-[400px] overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16" />
                            <h3 className="text-lg font-black mb-10 flex items-center gap-3 text-indigo-300 relative z-10">
                                <Sparkles size={20} /> ERP Insights
                            </h3>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-10 relative z-10">
                                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                                    Your <strong className="text-white font-black">AI & DS Section A</strong> internal exam timetable has been updated.
                                </p>
                            </div>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 h-14 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/20 mt-auto relative z-10 group">
                                View Updated Timetable
                            </Button>
                        </div>

                        {/* Live Status Summary matches Image 3 */}
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white">
                            <h3 className="text-lg font-black text-slate-900 mb-10">Live Status</h3>
                            <div className="space-y-8">
                                {[
                                    { label: 'Hall Ticket Status', value: 'GENERATED', color: 'emerald' },
                                    { label: 'No-Dues Status', value: 'PENDING', color: 'rose' },
                                    { label: 'Scholarship Status', value: 'N/A', color: 'slate' },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm",
                                            item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                                            item.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                                        )}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
