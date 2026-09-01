'use client';

import React from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { 
    Calendar, 
    ChevronLeft, 
    ChevronRight, 
    Plus, 
    Download, 
    Video, 
    AlertTriangle,
    Clock,
    User,
    MapPin,
    Target,
    Layers,
    BookOpen
} from 'lucide-react';

const EVENTS = [
    { title: 'Summer Exams: S4 CSE', type: 'Exam', date: '2026-04-12', time: '09:00 AM', venue: 'Block B, Hall 1', priority: 'Urgent', color: 'rose' },
    { title: 'Annual Cultural Fest', type: 'Event', date: '2026-04-20', time: '10:00 AM', venue: 'Main Auditorium', priority: 'Normal', color: 'indigo' },
    { title: 'Ugadi Festival Holiday', type: 'Holiday', date: '2026-03-30', time: 'Full Day', venue: 'Global Campus', priority: 'Global', color: 'emerald' },
    { title: 'International Tech Symposium', type: 'Symposium', date: '2026-05-02', time: '11:15 AM', venue: 'Main Stage', priority: 'High', color: 'amber' },
];

export default function AcademicCalendarPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 italic">
                            <Calendar className="text-indigo-600" />
                            Academic Calendar Control
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Global synchronization for exams, festivals, and campus-wide events.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="bg-white">
                           <Download size={18} className="mr-2"/> Export Calendar
                        </Button>
                        <Button className="bg-indigo-600 shadow-xl shadow-indigo-100">
                           <Plus size={18} className="mr-2"/> New Sync Node
                        </Button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Visual Calendar Panel */}
                    <div className="lg:col-span-8 space-y-8">
                        <section className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                             <div className="flex justify-between items-center mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100 italic">
                                <div className="flex gap-2 items-center">
                                    <h2 className="text-2xl font-black text-slate-900">April 2026</h2>
                                    <p className="text-[10px] font-black uppercase text-indigo-100 bg-indigo-600 px-2 py-0.5 rounded-lg tracking-widest shadow-lg shadow-indigo-100">SYNCCED</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"><ChevronLeft size={18}/></button>
                                    <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"><ChevronRight size={18}/></button>
                                </div>
                             </div>

                             <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden shadow-inner">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="bg-slate-50/50 p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 italic italic">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: 35 }).map((_, i) => {
                                    const dayNum = (i - 2 > 0 && i - 2 <= 30) ? i - 2 : null;
                                    const hasEvent = dayNum === 12 || dayNum === 20 || dayNum === 30;
                                    return (
                                        <div key={i} className="bg-white p-4 h-32 border-b border-r border-slate-50 transition-all hover:bg-slate-50 group relative">
                                            {dayNum && (
                                                <>
                                                    <span className={`text-xs font-black ${hasEvent ? 'text-indigo-600' : 'text-slate-400'}`}>{dayNum}</span>
                                                    {dayNum === 12 && (
                                                        <div className="mt-2 p-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[8px] font-black uppercase tracking-tighter leading-tight shadow-sm translate-y-1 group-hover:translate-y-0 transition-transform cursor-pointer">
                                                            <Layers size={10} className="mb-0.5" /> S4 CSE Exams
                                                        </div>
                                                    )}
                                                    {dayNum === 20 && (
                                                        <div className="mt-2 p-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl text-[8px] font-black uppercase tracking-tighter leading-tight shadow-sm translate-y-1 group-hover:translate-y-0 transition-transform cursor-pointer">
                                                            <Target size={10} className="mb-0.5" /> Cultural Fest
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                             </div>
                        </section>
                    </div>

                    {/* Timeline Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
                             
                             <h3 className="text-xl font-bold mb-8 flex items-center gap-3 uppercase tracking-tighter text-sm italic italic">
                                <BookOpen size={20} className="text-indigo-400" /> Upcoming Academic Nodes
                             </h3>

                             <div className="space-y-6">
                                {EVENTS.map((event, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center font-black transition-all group-hover:bg-indigo-600 group-hover:scale-110">
                                                <span className="text-[10px] uppercase text-white/50 group-hover:text-indigo-100">APR</span>
                                                <span className="text-sm leading-tight">{i + 12}</span>
                                            </div>
                                            {i !== EVENTS.length - 1 && <div className="w-px h-full bg-white/10 mt-2" />}
                                        </div>
                                        <div className="flex-1 pb-6 relative group-hover:translate-x-1 transition-transform">
                                            <Badge 
                                                label={event.type} 
                                                variant={event.color === 'rose' ? 'error' : event.color === 'emerald' ? 'success' : 'info'}
                                                className="text-[8px] py-0 px-2 mb-2"
                                            />
                                            <h4 className="font-bold text-sm leading-tight text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{event.title}</h4>
                                            <div className="mt-3 flex flex-col gap-1 text-[9px] text-white/40 font-bold uppercase tracking-widest italic italic">
                                                <span className="flex items-center gap-2"><Clock size={10} /> {event.time}</span>
                                                <span className="flex items-center gap-2"><MapPin size={10} /> {event.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 italic flex items-center gap-2 italic italic italic">
                                <AlertTriangle className="text-amber-500" size={18} /> Conflict Check
                             </h3>
                             <p className="text-xs text-slate-500 leading-relaxed font-medium italic italic">"No scheduling conflicts detected for the upcoming month. Standard system pulse at 100% efficiency."</p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
