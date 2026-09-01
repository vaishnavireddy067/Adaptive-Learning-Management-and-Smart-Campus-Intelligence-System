'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Upload, FileText, Video, Link2, Trash2, Eye, CheckCircle, Plus, BookOpen, FolderOpen } from 'lucide-react';

const INITIAL_MATERIALS = [
    { id: 1, title: 'Introduction to Python', type: 'PDF', course: 'CS101', size: '2.4 MB', date: 'Mar 20, 2026', status: 'Published' },
    { id: 2, title: 'Lecture 3 - Loops Recording', type: 'Video', course: 'CS101', size: '145 MB', date: 'Mar 22, 2026', status: 'Published' },
    { id: 3, title: 'Data Structures Slides', type: 'PDF', course: 'CS201', size: '4.1 MB', date: 'Mar 23, 2026', status: 'Draft' },
    { id: 4, title: 'Assignment 2 - Problem Set', type: 'PDF', course: 'CS201', size: '1.2 MB', date: 'Mar 24, 2026', status: 'Published' },
    { id: 5, title: 'YouTube: Sorting Algorithms', type: 'Link', course: 'CS201', size: '—', date: 'Mar 25, 2026', status: 'Published' },
];

const TYPE_ICON: Record<string, any> = { PDF: FileText, Video: Video, Link: Link2 };
const TYPE_COLOR: Record<string, string> = {
    PDF: 'bg-rose-50 text-rose-500',
    Video: 'bg-purple-50 text-purple-500',
    Link: 'bg-blue-50 text-blue-500',
};

export default function FacultyCoursesPage() {
    const [materials, setMaterials] = useState(INITIAL_MATERIALS);
    const [dragging, setDragging] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('CS101');
    const [activeTab, setActiveTab] = useState<'materials' | 'upload'>('materials');

    const courses = ['CS101', 'CS201'];
    const filtered = materials.filter(m => selectedCourse === 'All' || m.course === selectedCourse);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) simulateUpload(file.name, 'PDF', `${(file.size / 1024 / 1024).toFixed(1)} MB`);
    };

    const simulateUpload = (name: string, type: string, size: string) => {
        setUploaded(true);
        setTimeout(() => {
            setMaterials(prev => [{ id: Date.now(), title: name.replace(/\.[^.]+$/, ''), type, course: selectedCourse, size, date: 'Mar 26, 2026', status: 'Draft' }, ...prev]);
            setUploaded(false);
            setActiveTab('materials');
        }, 1500);
    };

    const deleteMaterial = (id: number) => setMaterials(prev => prev.filter(m => m.id !== id));
    const toggleStatus = (id: number) => setMaterials(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'Published' ? 'Draft' : 'Published' } : m));

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Course Materials" subtitle="Upload and manage lecture notes, videos, and resources." />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-5 mb-8 mt-4">
                    {[
                        { label: 'Total Materials', value: materials.length, icon: FolderOpen, color: 'indigo' },
                        { label: 'Published', value: materials.filter(m => m.status === 'Published').length, icon: CheckCircle, color: 'emerald' },
                        { label: 'Drafts', value: materials.filter(m => m.status === 'Draft').length, icon: FileText, color: 'amber' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center`}>
                                <s.icon size={22} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                                <p className="text-2xl font-black text-slate-800 mt-0.5">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Tab Header */}
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex gap-2">
                            {(['materials', 'upload'] as const).map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                                    {tab === 'upload' ? '+ Upload New' : 'All Materials'}
                                </button>
                            ))}
                        </div>
                        <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
                            className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 font-semibold text-slate-700">
                            {['All', ...courses].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>

                    {activeTab === 'upload' ? (
                        <div className="p-8 space-y-6">
                            {/* Drag & Drop Zone */}
                            <div
                                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${dragging ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                <input id="file-input" type="file" className="hidden"
                                    onChange={e => { const f = e.target.files?.[0]; if (f) simulateUpload(f.name, 'PDF', `${(f.size / 1024 / 1024).toFixed(1)} MB`); }} />
                                {uploaded ? (
                                    <><CheckCircle size={48} className="text-emerald-500 mb-4" /><p className="font-bold text-emerald-600">Uploading...</p></>
                                ) : (
                                    <>
                                        <Upload size={48} className="text-slate-300 mb-4" />
                                        <p className="font-black text-slate-700 text-lg">Drop files here or click to browse</p>
                                        <p className="text-sm text-slate-400 mt-2">Supports PDF, PPTX, DOCX, MP4, ZIP</p>
                                    </>
                                )}
                            </div>

                            {/* Link Upload */}
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                                        placeholder="Paste YouTube or external resource URL..."
                                        className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 text-sm" />
                                </div>
                                <Button onClick={() => { if (linkUrl) { simulateUpload('External Resource', 'Link', '—'); setLinkUrl(''); } }}>
                                    <Plus size={16} className="mr-2" /> Add Link
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {filtered.length === 0 ? (
                                <div className="py-16 text-center text-slate-400">
                                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                                    <p className="font-bold">No materials yet. Upload one!</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-50">
                                    {filtered.map(m => {
                                        const Icon = TYPE_ICON[m.type] || FileText;
                                        return (
                                            <div key={m.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors group">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${TYPE_COLOR[m.type] || 'bg-slate-100'}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm text-slate-800 truncate">{m.title}</p>
                                                    <p className="text-xs text-slate-400">{m.course} • {m.size} • {m.date}</p>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${m.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                                                    {m.status}
                                                </span>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => toggleStatus(m.id)} className="p-2 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors" title="Toggle Publish">
                                                        <Eye size={15} />
                                                    </button>
                                                    <button onClick={() => deleteMaterial(m.id)} className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
