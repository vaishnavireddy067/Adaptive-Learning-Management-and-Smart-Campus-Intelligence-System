'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES, CAMPUS_BLOCKS } from '@/utils/constants';
import { Calendar, Clock, MapPin, Users, Download, Share2, Sparkles, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SCHEDULE = [
    { day: 'Monday', time: '09:00 AM - 10:30 AM', subject: 'Data Structures', room: '101', block: 'Block B', faculty: 'Dr. Smith', type: 'Lecture' },
    { day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Digital Systems', room: '205', block: 'Block B', faculty: 'Prof. Ray', type: 'Lecture' },
    { day: 'Monday', time: '02:00 PM - 04:00 PM', subject: 'Algorithms Lab', room: '401', block: 'Block B', faculty: 'Dr. Smith', type: 'Lab' },
    { day: 'Tuesday', time: '09:00 AM - 10:30 AM', subject: 'Cyber Security', room: '401', block: 'Block C', faculty: 'Dr. Alan', type: 'Lecture' },
];

export default function StudentTimetablePage() {
    const [activeDay, setActiveDay] = useState('Monday');

    const daySchedule = SCHEDULE.filter(s => s.day === activeDay);

    return (
        <div className="flex min-h-screen bg-indigo-50/20">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Personal Schedule</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Calendar className="text-indigo-600" />
                            Smart Timetable
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Your AI-optimized class schedule and room locations.</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => alert('Downloading your personalized timetable PDF...')}
                            className="flex items-center gap-2 py-2.5 px-6 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
                        >
                            <Download size={18} /> Export PDF
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        {/* Day Selector */}
                        <div className="flex justify-between items-center bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto gap-2">
                            {WEEKDAYS.map(day => (
                                <button 
                                    key={day}
                                    onClick={() => setActiveDay(day)}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeDay === day ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Schedule List */}
                        <div className="space-y-4">
                            {daySchedule.length > 0 ? daySchedule.map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/20 transition-all group flex items-start gap-8 relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-2 h-full ${item.type === 'Lab' ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                                    
                                    <div className="w-40 pt-1">
                                        <div className="flex items-center gap-2 text-indigo-600 font-black text-sm">
                                            <Clock size={16} />
                                            {item.time.split(' - ')[0]}
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 ml-6">{item.time.split(' - ')[1]}</p>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.subject}</h3>
                                                <div className="flex gap-4 mt-2">
                                                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                                                        <Users size={14} className="text-indigo-400" /> {item.faculty}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                                                        <Sparkles size={14} className="text-amber-400" /> {item.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 justify-end mb-1">
                                                    <MapPin size={16} className="text-rose-500" />
                                                    <span className="text-lg font-black text-slate-900">{item.room}</span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                                    {item.block}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => alert(`Opening resources for ${item.subject}...`)} className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-colors">Resources</button>
                                            <button onClick={() => alert(`Setting reminder for ${item.subject}...`)} className="px-4 py-1.5 bg-white border border-slate-200 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-colors">Remind Me</button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                    <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
                                    <p className="text-slate-400 font-bold">No classes scheduled for {activeDay}.</p>
                                    <button onClick={() => alert('Syncing with Central Academic Server...')} className="mt-4 text-indigo-600 font-black text-xs hover:underline flex items-center justify-center gap-2 mx-auto">
                                        <Share2 size={14} /> Sync Timetable
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl border border-indigo-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                            <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-indigo-300 underline underline-offset-8 decoration-indigo-500">
                                <Bell size={18} /> Quick Alerts
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => alert('No changes reported for today.')}>
                                    <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">Today</p>
                                    <p className="text-xs font-bold leading-relaxed">No schedule changes for CS Batch A today.</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => alert('Opening guest lecture details...')}>
                                    <p className="text-[10px] font-black uppercase text-amber-400 mb-1">Upcoming</p>
                                    <p className="text-xs font-bold leading-relaxed">Guest lecture by Google Engineers - Fri, Oct 24.</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Navigate</h3>
                                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Live Campus Map</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
                                Can't find Room {daySchedule[0]?.room || '101'}? Use the AR navigation to get step-by-step directions to {daySchedule[0]?.block || 'Block A'}.
                            </p>
                            <button 
                                onClick={() => alert('Initializing AR Indoor Navigation Engine...')}
                                className="w-full bg-slate-900 text-white hover:bg-slate-800 py-3 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 size={16} /> Open Smart Map
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
