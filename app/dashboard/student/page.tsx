'use client';

import React, { Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useSearchParams } from 'next/navigation';
import { 
    Clock, CheckCircle, Target, MapPin, 
    Sparkles, Award, AlertTriangle, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

function StudentDashboardInner() {
    const searchParams = useSearchParams();
    const system = searchParams.get('system') || 'smart-campus';
    const isLms = system === 'lms';

    const timelineEvents = [
        { time: '09:00 AM', label: isLms ? 'LMS Course: Python' : 'Class: Python Basics', room: isLms ? 'Online' : 'Block B, Room 204', status: 'completed' },
        { time: '11:00 AM', label: isLms ? 'AI Study Session' : 'LMS Assignment: Loops', room: 'Dashboard', status: 'ongoing' },
        { time: '02:00 PM', label: isLms ? 'Watch ML Video' : 'Meeting: Mech Project', room: isLms ? 'Online' : 'Block C, Room 301', status: 'upcoming' },
        { time: '04:30 PM', label: isLms ? 'Test Prep: AI' : 'Lab: AI Vision', room: isLms ? 'Online' : 'Block B, Room 405', status: 'upcoming' },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
            {/* Standard Sidebar - Adapts to system query param automatically */}
            <Sidebar role="student" />

            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {isLms ? 'Learning Ecosystem' : 'Student Assistant'}
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        {isLms ? 'Track your courses, assignments, and AI-led recommendations.' : 'Your personalized academic overview and daily timeline.'}
                    </p>
                </header>

                <div className="grid grid-cols-12 gap-8 mt-8">
                    {/* Left Column: Timeline (matching Image 2) */}
                    <div className="col-span-8 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-white p-8">
                             <div className="flex justify-between items-center mb-10">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Clock className="text-emerald-500" size={18} /> Today's Smart Timeline
                                </h3>
                                <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 tracking-widest">Oct 20, 2026</span>
                            </div>

                            <div className="relative pl-6">
                                {/* Timeline Line */}
                                <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-slate-100"></div>

                                <div className="space-y-12">
                                    {timelineEvents.map((event, i) => (
                                        <div key={i} className="flex gap-8 relative group">
                                            {/* Time Label */}
                                            <div className="w-16 pt-3 text-right">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{event.time}</span>
                                            </div>

                                            {/* Status Icon */}
                                            <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm transition-all group-hover:scale-110 ${
                                                event.status === 'completed' ? 'bg-emerald-500 text-white' : 
                                                event.status === 'ongoing' ? 'bg-indigo-600 text-white' : 
                                                'bg-white text-slate-300 border border-slate-100'
                                            }`}>
                                                {event.status === 'completed' ? <CheckCircle size={18} /> : 
                                                 event.status === 'ongoing' ? <Target size={18} /> : 
                                                 <Clock size={18} />}
                                            </div>

                                            {/* Event Card */}
                                            <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                                                event.status === 'ongoing' ? 'bg-indigo-50/50 border-indigo-100 shadow-sm' : 'bg-transparent border-transparent'
                                            }`}>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className={`font-bold text-base ${event.status === 'completed' ? 'text-slate-400' : 'text-slate-800'}`}>{event.label}</h4>
                                                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-medium">
                                                            <MapPin size={12} className="text-slate-300" /> {event.room}
                                                        </div>
                                                    </div>
                                                    {event.status === 'ongoing' && (
                                                        <span className="text-[9px] font-bold uppercase text-white bg-indigo-600 px-2 py-0.5 rounded-md tracking-widest animate-pulse">Now</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Performance Row matches Image 2 bottom */}
                        <div className="grid grid-cols-2 gap-8 mt-10">
                            <div className="bg-emerald-600 p-8 rounded-2xl text-white relative flex flex-col justify-between h-40">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-100 mb-1">Quiz Performance</p>
                                <h2 className="text-4xl font-bold tracking-tight mb-1">92.4%</h2>
                                <p className="text-[10px] font-medium text-emerald-50 opacity-60">Top 5% of your batch this week</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-white flex flex-col justify-between h-40">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Average Attendance</p>
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-1">88%</h2>
                                <p className="text-[10px] font-medium text-slate-400">Current semester progress</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column matches Image 2 sidebar */}
                    <div className="col-span-4 space-y-8">
                        <div className="bg-[#1a1f2e] p-8 rounded-[2rem] text-white relative shadow-2xl flex flex-col h-fit">
                             <h3 className="text-base font-bold mb-8 flex items-center gap-2">
                                <Sparkles size={18} className="text-indigo-400" /> AI Recommendation
                            </h3>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-8">
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    You have a free hour between 1:00 PM and 2:00 PM. Based on your low score in <strong className="text-white">Loops</strong>, we suggest:
                                </p>
                            </div>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/20 mt-auto">
                                Watch 15m Loop Tutorial
                            </Button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-white">
                            <h3 className="text-base font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Award className="text-rose-500" size={18} /> Key Deadlines
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Fee Payment', sub: 'Due in 5 days', color: 'rose', icon: AlertTriangle },
                                    { title: 'Internal Exam 2', sub: 'Starts Oct 25', color: 'amber', icon: Clock },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center group cursor-pointer">
                                        <div className={`w-10 h-10 bg-${item.color}-50 text-${item.color}-600 rounded-xl flex items-center justify-center shrink-0`}>
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-slate-800 text-[13px]">{item.title}</h5>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-70">{item.sub}</p>
                                        </div>
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

export default function StudentDashboardPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-400 text-sm">Loading…</div>}>
            <StudentDashboardInner />
        </Suspense>
    );
}
