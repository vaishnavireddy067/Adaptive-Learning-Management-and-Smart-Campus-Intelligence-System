'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, Clock, MapPin, CalendarDays, List, Filter, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

export default function FacultyEventsPage() {
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [events, setEvents] = useState<any[]>([]);
    const [exams, setExams] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const [evRes, exRes] = await Promise.all([fetch('/api/events'), fetch('/api/exams')]);
                const evData = await evRes.json();
                const exData = await exRes.json();
                setEvents(Array.isArray(evData) ? evData : []);
                setExams(Array.isArray(exData) ? exData : []);
            } catch (err) {}
        };
        load();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Events & Invigilation" subtitle="Manage your event participation and exam invigilation schedule." />

                <div className="flex gap-8 mt-6">
                    {/* Events */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-800">Campus Events</h2>
                            <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                                <button onClick={() => setView('list')} className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all ${view === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                                    <List size={14} /> List View
                                </button>
                                <button onClick={() => setView('calendar')} className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all ${view === 'calendar' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                                    <CalendarDays size={14} /> Calendar
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {events.map(event => (
                                <div key={event.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all flex justify-between items-center group">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                                {event.type}
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg text-slate-800 mb-1 leading-tight">{event.title}</h4>
                                        <p className="text-sm text-slate-500 mb-3">{event.desc}</p>
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                                            <span className="flex items-center gap-1.5"><CalendarIcon size={14} className="text-slate-400" /> {event.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {event.time}</span>
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {event.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Invigilation */}
                    <div className="w-96 shrink-0">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-6">
                                <BookOpen size={20} className="text-rose-600" /> Invigilation Duty
                            </h2>

                            <div className="space-y-4">
                                {exams.map(exam => (
                                    <div key={exam.id} className="p-4 rounded-2xl border border-rose-100 bg-rose-50/30 hover:bg-white hover:shadow-md transition-all relative overflow-hidden group">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
                                        <div className="flex justify-between items-start mb-2 pl-2">
                                            <div className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-md font-mono">
                                                {exam.code}
                                            </div>
                                            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">{exam.role}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-3 pl-2">{exam.subject}</h4>
                                        <div className="space-y-1.5 pl-2">
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                                <CalendarIcon size={12} className="text-slate-400" /> {exam.date} • {exam.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                                <MapPin size={12} className="text-slate-400" /> {exam.venue}
                                            </div>
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
