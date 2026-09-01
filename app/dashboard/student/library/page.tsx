'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { BookOpen, Search, Download, Star, Clock, Filter, Eye, BookMarked, ChevronRight, FileText, Video, Headphones } from 'lucide-react';

const BOOKS = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', type: 'Book', available: true, copies: 3, rating: 4.8, cover: '📘', tag: 'Classic' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', type: 'Book', available: false, copies: 0, rating: 4.7, cover: '📗', tag: 'Popular' },
    { id: 3, title: 'Deep Learning', author: 'Ian Goodfellow', category: 'AI & ML', type: 'Book', available: true, copies: 2, rating: 4.6, cover: '📙', tag: 'Advanced' },
    { id: 4, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', category: 'Software Engineering', type: 'Book', available: true, copies: 1, rating: 4.9, cover: '📕', tag: 'Must Read' },
    { id: 5, title: 'Computer Networks — Tanenbaum', author: 'Andrew Tanenbaum', category: 'Computer Networks', type: 'Book', available: true, copies: 5, rating: 4.5, cover: '📘', tag: 'Textbook' },
    { id: 6, title: 'CS50 Harvard Lectures', author: 'Harvard University', category: 'Computer Science', type: 'Video', available: true, copies: 999, rating: 4.9, cover: '🎥', tag: 'Free' },
    { id: 7, title: 'MIT OpenCourseWare — DBMS', author: 'MIT', category: 'Database', type: 'Video', available: true, copies: 999, rating: 4.7, cover: '🎬', tag: 'Free' },
    { id: 8, title: 'Python for Data Science (Audio)', author: 'DataCamp', category: 'Data Science', type: 'Audiobook', available: true, copies: 999, rating: 4.4, cover: '🎧', tag: 'New' },
    { id: 9, title: 'Operating System Concepts', author: 'Silberschatz et al.', category: 'Operating Systems', type: 'Book', available: false, copies: 0, rating: 4.5, cover: '📓', tag: 'Textbook' },
    { id: 10, title: 'Cracking the Coding Interview', author: 'Gayle McDowell', category: 'Interview Prep', type: 'Book', available: true, copies: 4, rating: 4.8, cover: '📔', tag: 'Popular' },
];

const BORROWED = [
    { title: 'Introduction to Algorithms', dueDate: 'Apr 5, 2026', overdue: false },
    { title: 'The Pragmatic Programmer', dueDate: 'Mar 28, 2026', overdue: true },
];

const CATEGORIES = ['All', 'Computer Science', 'Software Engineering', 'AI & ML', 'Data Science', 'Computer Networks', 'Database', 'Operating Systems', 'Interview Prep'];
const TYPES = ['All', 'Book', 'Video', 'Audiobook'];
const TYPE_ICON: Record<string, any> = { Book: FileText, Video: Video, Audiobook: Headphones };
const TAG_COLOR: Record<string, string> = {
    Classic: 'bg-violet-100 text-violet-700', Popular: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-orange-100 text-orange-700', 'Must Read': 'bg-rose-100 text-rose-700',
    Textbook: 'bg-slate-100 text-slate-600', Free: 'bg-emerald-100 text-emerald-700',
    New: 'bg-amber-100 text-amber-700',
};

export default function LibraryPage() {
    const [viewing, setViewing] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [type, setType] = useState('All');
    const [bookmarked, setBookmarked] = useState<number[]>([]);

    const filtered = BOOKS.filter(b =>
        (category === 'All' || b.category === category) &&
        (type === 'All' || b.type === type) &&
        b.title.toLowerCase().includes(search.toLowerCase())
    );

    const toggleBookmark = (id: number) =>
        setBookmarked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Digital Library" subtitle="Browse, borrow, and access books, videos, and digital resources." />

                {/* Resource Viewer Modal */}
                {viewing && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-8xl">
                                {viewing.cover}
                            </div>
                            <div className="p-10 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${TAG_COLOR[viewing.tag]}`}>{viewing.tag}</span>
                                        <h3 className="text-2xl font-black text-slate-800 mt-2">{viewing.title}</h3>
                                        <p className="text-slate-400 font-bold">{viewing.author}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                        <Star size={14} className="text-amber-500" fill="currentColor" />
                                        <span className="text-sm font-black text-amber-600">{viewing.rating}</span>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Type</span>
                                        <span className="text-slate-700 font-black">{viewing.type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Availability</span>
                                        <span className="text-emerald-600 font-black">Ready to Access</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        This {viewing.type.toLowerCase()} is available for immediate {viewing.type === 'Book' ? 'borrowing' : 'viewing'}. 
                                        {viewing.type === 'Book' ? ' You will have 14 days to return this resource.' : ' You can watch/listen to this resource online.'}
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button className="flex-1 py-4 rounded-2xl" onClick={() => {
                                        alert(`Success! ${viewing.title} ${viewing.type === 'Book' ? 'borrowed' : 'opened'} successfully.`);
                                        setViewing(null);
                                    }}>
                                        Confirm {viewing.type === 'Book' ? 'Borrow' : 'Open'}
                                    </Button>
                                    <Button variant="outline" className="flex-1 py-4 rounded-2xl" onClick={() => setViewing(null)}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Borrowed Books Alert */}
                {BORROWED.some(b => b.overdue) && (
                    <div className="mt-4 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full"></div>
                        <Clock size={18} className="text-rose-500 shrink-0" />
                        <p className="text-sm text-rose-700 font-bold">
                            <strong>"{BORROWED.find(b => b.overdue)?.title}"</strong> is overdue! Please return by {BORROWED.find(b => b.overdue)?.dueDate}
                        </p>
                        <Button className="ml-auto text-xs bg-rose-600 hover:bg-rose-700 !py-1.5 z-10" onClick={() => alert('Opening book return portal...')}>Renew</Button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-4 mb-8">
                    {[
                        { label: 'Total Resources', value: BOOKS.length, icon: BookOpen, color: 'indigo' },
                        { label: 'Available', value: BOOKS.filter(b => b.available).length, icon: Eye, color: 'emerald' },
                        { label: 'Borrowed by Me', value: BORROWED.length, icon: BookMarked, color: 'amber' },
                        { label: 'Bookmarked', value: bookmarked.length, icon: Star, color: 'rose' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                            <div className={`w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0`}>
                                <s.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                                <p className={`text-xl font-black text-slate-800 mt-0.5`}>{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-6 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-1 min-w-52">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search books, authors..."
                            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400" />
                    </div>
                    <select value={category} onChange={e => setCategory(e.target.value)}
                        className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none font-semibold text-slate-700">
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <div className="flex gap-2">
                        {TYPES.map(t => (
                            <button key={t} onClick={() => setType(t)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${type === t ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-500 border-slate-200 hover:border-indigo-300'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Book Grid */}
                <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map(b => {
                        const TypeIcon = TYPE_ICON[b.type] || FileText;
                        const isBookmarked = bookmarked.includes(b.id);
                        return (
                            <div key={b.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all group">
                                {/* Cover */}
                                <div className="h-32 bg-gradient-to-br from-indigo-50 to-slate-100 flex items-center justify-center relative">
                                    <span className="text-5xl transition-transform group-hover:scale-110 duration-300">{b.cover}</span>
                                    <span className={`absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-full ${TAG_COLOR[b.tag] || 'bg-slate-100 text-slate-600'}`}>{b.tag}</span>
                                    <button onClick={() => toggleBookmark(b.id)}
                                        className={`absolute top-3 right-3 p-1.5 rounded-xl transition-colors ${isBookmarked ? 'bg-amber-100 text-amber-500 shadow-sm' : 'bg-white/80 text-slate-400 hover:text-amber-500'}`}>
                                        <Star size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                                    </button>
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center gap-1 mb-2">
                                        <TypeIcon size={12} className="text-indigo-400" />
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{b.type}</span>
                                    </div>
                                    <h4 className="font-black text-sm text-slate-800 leading-tight mb-1 line-clamp-1">{b.title}</h4>
                                    <p className="text-[10px] text-slate-400 mb-3">{b.author}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star size={11} className="text-amber-400" fill="currentColor" />
                                            <span className="text-xs font-bold text-slate-600">{b.rating}</span>
                                        </div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${b.available ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                            {b.available ? `${b.copies < 999 ? b.copies + ' copies' : 'Online'}` : 'Checked Out'}
                                        </span>
                                    </div>

                                    <Button
                                        disabled={!b.available}
                                        onClick={() => setViewing(b)}
                                        className={`w-full text-xs font-black py-2.5 rounded-xl ${!b.available ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        {b.type === 'Book' ? 'Borrow' : 'Open'} <ChevronRight size={13} className="ml-1" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
