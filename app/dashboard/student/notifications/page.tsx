'use client';

import React, { useState } from 'react';
import { Bell, BellRing, Info, AlertCircle, Megaphone, Calendar, Clock, DollarSign, ArrowRight, CheckCircle2, Trash2, Filter } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';

const NOTIFICATIONS = [
    { 
        id: 1, 
        type: 'Emergency', 
        title: 'Campus Closure: Extreme Weather', 
        desc: 'Following the district advisory, the campus will remain closed tomorrow. All classes shifted to online mode.', 
        time: '10 mins ago',
        unread: true,
        icon: AlertCircle,
        color: 'rose'
    },
    { 
        id: 2, 
        type: 'Academic', 
        title: 'New Roadmap Generated', 
        desc: 'Based on your recent DS performance, AI has proposed a new Full-Stack path for you.', 
        time: '2 hours ago',
        unread: true,
        icon: Megaphone,
        color: 'indigo'
    },
    { 
        id: 3, 
        type: 'General', 
        title: 'Annual Tech Fest: Innovate 2026', 
        desc: 'Registrations are now open for the campus tech fest. $5000 prize pool!', 
        time: '5 hours ago',
        unread: false,
        icon: Calendar,
        color: 'emerald'
    },
    { 
        id: 4, 
        type: 'Finance', 
        title: 'Fee Payment Reminder', 
        desc: 'The deadline for Semester 4 fee payment is tomorrow. Avoid late fees.', 
        time: '1 day ago',
        unread: false,
        icon: DollarSign,
        color: 'amber'
    },
];

export default function StudentNotificationsPage() {
    const [filter, setFilter] = useState<'All' | 'Unread' | 'Emergency'>('All');
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
        alert('All messages marked as read.');
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Live Updates</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <BellRing className="text-indigo-600" />
                            Campus Notifications
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Real-time alerts, academic updates, and emergency broadcasts.</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={markAllRead}
                            className="flex items-center gap-2 py-2.5 px-6 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
                        >
                            <CheckCircle2 size={18} /> Mark All Read
                        </button>
                    </div>
                </header>

                <div className="flex gap-3 mb-8 ring-1 ring-slate-100 bg-white p-1.5 rounded-2xl w-fit shadow-sm">
                    {(['All', 'Unread', 'Emergency'] as const).map(t => (
                        <button 
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {t}
                        </button>
                    ))}
                    <div className="w-px bg-slate-100 mx-1 shadow-inner" />
                    <button onClick={() => alert('Search & Date filters coming soon!')} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Notifications List */}
                    <div className="lg:col-span-3 space-y-4">
                        {notifications
                            .filter(n => filter === 'All' || (filter === 'Unread' && n.unread) || (filter === 'Emergency' && n.type === 'Emergency'))
                            .map(item => (
                                <div 
                                    key={item.id} 
                                    className={`relative group bg-white p-6 rounded-3xl border transition-all hover:bg-slate-50/50 hover:shadow-xl hover:shadow-slate-100 ${item.unread ? 'border-indigo-100 bg-indigo-50/10' : 'border-slate-100'}`}
                                >
                                    {item.unread && <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse shadow-lg shadow-indigo-300" />}
                                    
                                    <div className="flex gap-6">
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center shadow-inner`}>
                                            <item.icon size={26} />
                                        </div>
                                        
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className={`text-[10px] uppercase font-black tracking-widest text-${item.color}-600 underline decoration-2 decoration-${item.color}-200 underline-offset-4`}>
                                                        {item.type} Notification
                                                    </span>
                                                    <h3 className="text-xl font-bold text-slate-900 mt-2 leading-tight">{item.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                    <Clock size={14} /> {item.time}
                                                </div>
                                            </div>
                                            <p className="text-slate-500 text-sm leading-relaxed overflow-hidden line-clamp-2 pr-12">
                                                {item.desc}
                                            </p>
                                            
                                            <div className="pt-4 flex items-center justify-between">
                                                <button 
                                                    onClick={() => alert(`Redirecting to detail view for: ${item.title}`)}
                                                    className={`flex items-center gap-2 text-sm font-bold py-2 px-4 rounded-xl transition-all ${item.color === 'rose' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white'}`}
                                                >
                                                    Take Action <ArrowRight size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteNotification(item.id)}
                                                    className="p-2 text-slate-100 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        
                        {notifications.length === 0 && (
                            <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                <Bell size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-400 font-bold">No active notifications. You're all caught up!</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Preferences & Summary */}
                    <div className="space-y-6 text-sm">
                        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Settings className="text-slate-400" size={18} /> Channel Settings
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Push Notifications', status: true },
                                    { label: 'Emergency SMS', status: true },
                                    { label: 'Weekly Summary', status: false },
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => alert(`Toggle for ${s.label}`)}>
                                        <span className="font-bold text-slate-600 text-xs tracking-tight">{s.label}</span>
                                        <div className={`w-10 h-5 rounded-full relative transition-all ${s.status ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all ${s.status ? 'right-0.5' : 'left-0.5'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-indigo-900 text-white p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-800">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-300">
                                <Megaphone size={18} /> AI Summary
                            </h3>
                            <p className="text-indigo-100 font-medium leading-relaxed italic">
                                "Quick recap: Tomorrow's campus closure is confirmed. No urgent finance or academic tasks are pending for you today."
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { Settings } from 'lucide-react';
