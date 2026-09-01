'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, Clock, MapPin, Bell, CalendarDays, List, Filter, Sparkles, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function StudentEventsPage() {
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [filterSem, setFilterSem] = useState('All');
    const [events, setEvents] = useState<any[]>([]);
    const [exams, setExams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [evRes, exRes] = await Promise.all([fetch('/api/events'), fetch('/api/exams')]);
                const evData = await evRes.json();
                const exData = await exRes.json();
                setEvents(Array.isArray(evData) ? evData : []);
                setExams(Array.isArray(exData) ? exData : []);
            } catch (err) {}
            setLoading(false);
        };
        load();
    }, []);

    const upcomingEvents = events.filter(e => e.status === 'upcoming');
    const pastEvents = events.filter(e => e.status === 'past');
    const filteredExams = filterSem === 'All' ? exams : exams.filter(e => e.semester === filterSem);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Events & Exams" subtitle="Track your campus events, exam schedules, and personalized AI reminders." />

                {/* AI Insights Banner */}
                <div className="mt-6 mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg mb-1">AI Schedule Insights</h3>
                        <p className="text-indigo-100 text-sm max-w-2xl mb-3">Based on your academic profile, we recommend prioritizing the upcoming "TechCorp Placement Drive". Also, your Algorithms exam is precisely 30 days away. Time to start revising chapter 4!</p>
                        <Button className="bg-white text-indigo-600 hover:bg-slate-50 text-xs px-4 py-2 h-auto">Create Study Plan</Button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Main Content Area (Events) */}
                    <div className="flex-1 space-y-8">
                        {/* Header & Controls */}
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

                        {/* Upcoming Events */}
                        <div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Upcoming</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                                {event.type}
                                            </div>
                                            <button className="text-slate-300 hover:text-amber-500 transition-colors" title="Set Reminder">
                                                <Bell size={18} />
                                            </button>
                                        </div>
                                        <h4 className="font-black text-lg text-slate-800 mb-2 leading-tight">{event.title}</h4>
                                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{event.desc}</p>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <CalendarIcon size={14} className="text-slate-400" /> {event.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <Clock size={14} className="text-slate-400" /> {event.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <MapPin size={14} className="text-slate-400" /> {event.venue}
                                            </div>
                                        </div>

                                        {event.ai && (
                                            <div className="mt-4 p-3 bg-indigo-50/50 rounded-xl flex items-start gap-2 border border-indigo-100/50">
                                                <Sparkles size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                                                <p className="text-[10px] text-indigo-700 font-medium">{event.ai}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Past Events */}
                        <div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Past Events</h3>
                            <div className="space-y-3">
                                {pastEvents.map(event => (
                                    <div key={event.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{event.title}</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">{event.date} • {event.summary}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="text-xs py-1.5 h-auto">View Gallery</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar Area (Exams) */}
                    <div className="w-96 shrink-0">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                    <BookOpen size={20} className="text-indigo-600" /> Exam Schedule
                                </h2>
                                <select 
                                    value={filterSem}
                                    onChange={(e) => setFilterSem(e.target.value)}
                                    className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
                                    <option value="All">All Sems</option>
                                    <option value="Sem 5">Sem 5</option>
                                    <option value="Sem 6">Sem 6</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                {filteredExams.map(exam => (
                                    <div key={exam.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all relative overflow-hidden group">
                                        {/* Status Indicator Bar */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${exam.urgency === 'high' ? 'bg-rose-500' : exam.urgency === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                        
                                        <div className="flex justify-between items-start mb-2 pl-2">
                                            <div className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-md font-mono">
                                                {exam.code}
                                            </div>
                                            {exam.urgency === 'high' && <AlertTriangle size={14} className="text-rose-500 animate-pulse" />}
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-3 pl-2">{exam.subject}</h4>
                                        <div className="space-y-1.5 pl-2">
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                                <CalendarIcon size={12} className="text-slate-400" /> {exam.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                                <Clock size={12} className="text-slate-400" /> {exam.time}
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 text-[11px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                                            Set Revision Reminder
                                        </button>
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
