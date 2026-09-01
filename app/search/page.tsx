'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Users, Calendar, FileText, MapPin, Bell, ArrowRight, X, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ALL_ITEMS = [
    { label: 'My Grades & Results', href: '/dashboard/student/grades', category: 'Student', icon: BookOpen, desc: 'View GPA, semester scores, grade report' },
    { label: 'Fee Payment', href: '/dashboard/student/fees', category: 'Student', icon: FileText, desc: 'Pay fees, view history and dues' },
    { label: 'Digital Library', href: '/dashboard/student/library', category: 'Student', icon: BookOpen, desc: 'Browse and borrow books, videos' },
    { label: 'Live Classes', href: '/dashboard/student/live-classes', category: 'Student', icon: Calendar, desc: 'Join live lectures and recordings' },
    { label: 'AI Assistant', href: '/dashboard/student/ai-assistant', category: 'Student', icon: Sparkles, desc: 'AI-powered learning companion' },
    { label: 'Roadmaps', href: '/dashboard/student/roadmaps', category: 'Student', icon: MapPin, desc: 'Personalized learning roadmaps' },
    { label: 'Forum', href: '/dashboard/student/forum', category: 'Student', icon: Users, desc: 'Peer-to-peer learning discussions' },
    { label: 'Smart Attendance', href: '/dashboard/student/attendance', category: 'Student', icon: Calendar, desc: 'Track your attendance records' },
    { label: 'Grade Management', href: '/dashboard/faculty/grades', category: 'Faculty', icon: FileText, desc: 'Manage and publish student grades' },
    { label: 'Course Materials', href: '/dashboard/faculty/courses', category: 'Faculty', icon: BookOpen, desc: 'Upload and manage course content' },
    { label: 'Question Generator', href: '/dashboard/faculty/question-generator', category: 'Faculty', icon: Sparkles, desc: 'AI-powered exam question generator' },
    { label: 'Student Performance', href: '/dashboard/faculty/student-performance', category: 'Faculty', icon: Users, desc: 'Monitor student risk and analytics' },
    { label: 'Reports & Analytics', href: '/dashboard/admin/reports', category: 'Admin', icon: FileText, desc: 'Department performance reports' },
    { label: 'User Management', href: '/dashboard/admin/users', category: 'Admin', icon: Users, desc: 'Manage all students and faculty' },
    { label: 'Fee Management', href: '/dashboard/admin/fees', category: 'Admin', icon: FileText, desc: 'Track and manage fee collections' },
    { label: 'Room Allocation', href: '/dashboard/admin/rooms', category: 'Admin', icon: MapPin, desc: 'Manage and allocate rooms' },
    { label: 'AI Timetable Generator', href: '/dashboard/admin/timetable', category: 'Admin', icon: Calendar, desc: 'Generate smart timetables' },
    { label: 'Profile & Settings', href: '/dashboard/profile', category: 'General', icon: Users, desc: 'Update your profile and preferences' },
    { label: 'Campus Notifications', href: '/dashboard/student/notifications', category: 'Student', icon: Bell, desc: 'View all announcements and alerts' },
    { label: 'Timetable', href: '/dashboard/student/timetable', category: 'Student', icon: Calendar, desc: 'Your weekly class schedule' },
];

const RECENT = ['Grade Management', 'Live Classes', 'Digital Library'];

const CATEGORY_COLOR: Record<string, string> = {
    Student: 'bg-indigo-50 text-indigo-600',
    Faculty: 'bg-emerald-50 text-emerald-600',
    Admin: 'bg-amber-50 text-amber-600',
    General: 'bg-slate-100 text-slate-600',
};

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(ALL_ITEMS.slice(0, 6));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    useEffect(() => {
        if (!query.trim()) { setResults(ALL_ITEMS.slice(0, 6)); return; }
        const q = query.toLowerCase();
        setResults(ALL_ITEMS.filter(item =>
            item.label.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        ));
    }, [query]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Full-width search header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Search size={22} className="text-indigo-500 shrink-0" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search pages, features, people..."
                            className="flex-1 text-xl font-medium text-slate-800 placeholder-slate-300 focus:outline-none bg-transparent"
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                                <X size={18} />
                            </button>
                        )}
                        <Link href="/dashboard/student" className="text-sm text-slate-400 hover:text-slate-600 font-medium ml-4">← Back</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Recent (shown when no query) */}
                {!query && (
                    <div className="mb-8">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Clock size={12} /> Recent
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            {RECENT.map(r => {
                                const item = ALL_ITEMS.find(i => i.label === r);
                                return item ? (
                                    <Link key={r} href={item.href}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                                        <Clock size={13} className="text-slate-400" /> {r}
                                    </Link>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Results */}
                <div>
                    {query && (
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </h2>
                    )}
                    {!query && (
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                            All Pages
                        </h2>
                    )}

                    <div className="space-y-2">
                        {results.length === 0 ? (
                            <div className="text-center py-16 text-slate-400">
                                <Search size={40} className="mx-auto mb-3 opacity-20" />
                                <p className="font-bold">No results found for "{query}"</p>
                                <p className="text-sm mt-1">Try different keywords</p>
                            </div>
                        ) : (
                            results.map((item, i) => (
                                <Link key={i} href={item.href}
                                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${CATEGORY_COLOR[item.category]}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.label}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${CATEGORY_COLOR[item.category]}`}>{item.category}</span>
                                        <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
