'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

export default function AdminEventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [exams, setExams] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'events' | 'exams'>('events');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [eventsRes, examsRes] = await Promise.all([
                fetch('/api/events'),
                fetch('/api/exams')
            ]);
            const evData = await eventsRes.json();
            const exData = await examsRes.json();
            setEvents(Array.isArray(evData) ? evData : []);
            setExams(Array.isArray(exData) ? exData : []);
        } catch (err) {
            console.error('Failed to load data', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddEvent = async () => {
        const title = prompt('Enter Event Title:');
        if (!title) return;
        const type = prompt('Enter Event Type (e.g. Technology, Career):');
        const date = prompt('Enter Event Date (YYYY-MM-DD):');
        const time = prompt('Enter Time (e.g. 10:00 AM):');
        const venue = prompt('Enter Venue:');

        await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ title, date, time, venue, type })
        });
        fetchData();
    };

    const handleAddExam = async () => {
        const subject = prompt('Enter Exam Subject:');
        if (!subject) return;
        const code = prompt('Enter Subject Code (e.g. CS401):');
        const date = prompt('Enter Date (YYYY-MM-DD):');
        const time = prompt('Enter Time (e.g. 10:00 AM - 01:00 PM):');
        const semester = prompt('Enter Semester (e.g. Sem 5):');

        await fetch('/api/exams', {
            method: 'POST',
            body: JSON.stringify({ subject, code, date, time, semester })
        });
        fetchData();
    };

    const handleDelete = async (id: string, type: 'event' | 'exam') => {
        if (confirm('Are you sure you want to delete this record?')) {
            await fetch(`/api/${type}s/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader 
                    title="Events & Exam Management" 
                    subtitle="Create and manage academic schedules and campus events."
                    action={
                        <Button onClick={activeTab === 'events' ? handleAddEvent : handleAddExam} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                            <Plus size={16} className="mr-2" /> Add {activeTab === 'events' ? 'Event' : 'Exam'}
                        </Button>
                    }
                />

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setActiveTab('events')} 
                        className={`text-sm font-black uppercase tracking-widest px-6 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}>
                        Events
                    </button>
                    <button 
                        onClick={() => setActiveTab('exams')} 
                        className={`text-sm font-black uppercase tracking-widest px-6 py-2 rounded-full transition-all ${activeTab === 'exams' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}>
                        Exams
                    </button>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-10 text-center text-slate-400 font-bold">Loading Data...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date & Time</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{activeTab === 'events' ? 'Event Details' : 'Subject'}</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{activeTab === 'events' ? 'Venue' : 'Code & Sem'}</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {activeTab === 'events' ? events.map(event => (
                                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="font-bold text-slate-800 flex items-center gap-2"><Calendar size={14} className="text-slate-400" /> {event.date}</p>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2"><Clock size={14} className="text-slate-400" /> {event.time}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800 text-sm">{event.title}</p>
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600">{event.type}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-slate-600 flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {event.venue}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                                            <button className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(event.id, 'event')} className="p-2 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-xl transition-colors"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                )) : exams.map(exam => (
                                    <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="font-bold text-slate-800 flex items-center gap-2"><Calendar size={14} className="text-slate-400" /> {exam.date}</p>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2"><Clock size={14} className="text-slate-400" /> {exam.time}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800 text-sm">{exam.subject}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block mb-1">{exam.code}</p>
                                            <p className="text-xs text-slate-500">{exam.semester}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                                            <button className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(exam.id, 'exam')} className="p-2 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-xl transition-colors"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}
