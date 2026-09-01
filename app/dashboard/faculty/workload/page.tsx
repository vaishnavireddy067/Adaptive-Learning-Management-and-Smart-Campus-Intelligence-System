'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';
import { Brain, Clock, Users, BookOpen, TrendingUp, Sparkles, Calendar, ChevronRight } from 'lucide-react';

export default function FacultyWorkloadPage() {
    return (
        <div className="flex min-h-screen bg-emerald-50/20">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Efficiency Analytics</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Brain className="text-emerald-600" />
                            Workload & AI Insights
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Deep analysis of teaching hours, faculty engagement, and burnout risk.</p>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Stats */}
                    <div className="lg:col-span-8 space-y-8">
                        <section className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm relative overflow-hidden">
                            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                                <Clock className="text-indigo-500" size={20} />
                                Weekly Hour Analysis
                            </h3>
                            <div className="grid grid-cols-4 gap-6">
                                {[
                                    { label: 'Lecture Hours', value: '18h', color: 'indigo' },
                                    { label: 'Lab Sessions', value: '12h', color: 'emerald' },
                                    { label: 'Office Hours', value: '04h', color: 'amber' },
                                    { label: 'Research', value: '06h', color: 'rose' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center group">
                                        <div className={`w-16 h-16 mx-auto rounded-3xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <TrendingUp size={24} />
                                        </div>
                                        <p className="text-2xl font-black text-slate-900 leading-tight">{stat.value}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid md:grid-cols-2 gap-6">
                            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-indigo-500 transition-all">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Users size={18} className="text-indigo-400" /> Student Engagement
                                </h3>
                                <div className="text-4xl font-black text-slate-900 mb-2">94.2%</div>
                                <p className="text-xs text-slate-500 font-medium">Average participation rank across all of your active batches.</p>
                                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600">
                                    <Sparkles size={14} /> +3.2% from last month
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-emerald-500 transition-all">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <BookOpen size={18} className="text-emerald-400" /> Course Progress
                                </h3>
                                <div className="text-4xl font-black text-slate-900 mb-2">82%</div>
                                <p className="text-xs text-slate-500 font-medium">Syllabus completion rate. You are 2 classes ahead of schedule.</p>
                                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-600">
                                    <Calendar size={14} /> Next Milestone: Oct 28
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* AI Suggestions Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Sparkles size={20} className="text-indigo-300" />
                                AI Burnout Guard
                            </h3>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-6">
                                <p className="text-sm text-indigo-100 leading-relaxed italic">
                                    "Your current lecture density in Block B exceeds the recommended threshold. We suggest offloading Thursday's lab to a TA."
                                </p>
                            </div>
                            <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                                Accept Schedule Optimization
                            </button>
                        </section>

                        <section className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
                             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm italic">
                                <TrendingUp className="text-emerald-500" size={18} /> Performance Gains
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Time Saved using AI Attendance', value: '4.5h' },
                                    { label: 'Evaluation Speedup', value: '3x' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-sm font-black text-indigo-600">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
