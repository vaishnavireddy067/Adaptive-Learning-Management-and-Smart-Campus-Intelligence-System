'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Award, Save, ChevronDown, Search, CheckCircle, Edit3, Download, Filter } from 'lucide-react';

const STUDENTS = [
    { id: 'S001', name: 'Aarav Sharma', course: 'CS101', mid: 28, assignment: 18, lab: 24, total: 70, grade: 'A' },
    { id: 'S002', name: 'Priya Nair', course: 'CS101', mid: 22, assignment: 15, lab: 20, total: 57, grade: 'B' },
    { id: 'S003', name: 'Rahul Verma', course: 'CS101', mid: 30, assignment: 20, lab: 25, total: 75, grade: 'A+' },
    { id: 'S004', name: 'Sneha Patel', course: 'CS201', mid: 18, assignment: 12, lab: 16, total: 46, grade: 'C' },
    { id: 'S005', name: 'Kiran Rao', course: 'CS201', mid: 25, assignment: 17, lab: 22, total: 64, grade: 'B+' },
    { id: 'S006', name: 'Anjali Singh', course: 'CS101', mid: 27, assignment: 19, lab: 23, total: 69, grade: 'A' },
    { id: 'S007', name: 'Dev Malhotra', course: 'CS201', mid: 10, assignment: 8, lab: 12, total: 30, grade: 'D' },
    { id: 'S008', name: 'Tanya Gupta', course: 'CS101', mid: 29, assignment: 20, lab: 25, total: 74, grade: 'A+' },
];

const GRADE_COLORS: Record<string, string> = {
    'A+': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'A': 'bg-teal-100 text-teal-700 border-teal-200',
    'B+': 'bg-blue-100 text-blue-700 border-blue-200',
    'B': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'C': 'bg-amber-100 text-amber-700 border-amber-200',
    'D': 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function GradeManagementPage() {
    const [students, setStudents] = useState(STUDENTS);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [filterCourse, setFilterCourse] = useState('All');
    const [saved, setSaved] = useState(false);

    const courses = ['All', ...Array.from(new Set(STUDENTS.map(s => s.course)))];

    const filtered = students.filter(s =>
        (filterCourse === 'All' || s.course === filterCourse) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const updateMark = (id: string, field: 'mid' | 'assignment' | 'lab', val: number) => {
        setStudents(prev => prev.map(s => {
            if (s.id !== id) return s;
            const updated = { ...s, [field]: val };
            const total = updated.mid + updated.assignment + updated.lab;
            const grade = total >= 70 ? 'A+' : total >= 60 ? 'A' : total >= 55 ? 'B+' : total >= 45 ? 'B' : total >= 35 ? 'C' : 'D';
            return { ...updated, total, grade };
        }));
    };

    const handleSave = () => {
        setEditingId(null);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const avg = (field: 'mid' | 'assignment' | 'lab' | 'total') =>
        Math.round(students.reduce((acc, s) => acc + s[field], 0) / students.length);

    return (
        <div className="flex min-h-screen bg-slate-50 relative">
            <Sidebar />

            {/* Success Toast */}
            {saved && (
                <div className="fixed top-8 right-8 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 animate-in slide-in-from-top-10 duration-500 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <p className="font-black text-sm text-white">Grades Published!</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">LMS Sync • 2026-03-29 21:14</p>
                    </div>
                </div>
            )}

            <main className="flex-1 ml-64 p-8">

                <PageHeader
                    title="Grade Management"
                    subtitle="View, edit, and publish student grades for your courses."
                    action={
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => alert('Exporting grades as CSV...')}>
                                <Download size={16} className="mr-2" /> Export CSV
                            </Button>
                            <Button onClick={handleSave}>
                                {saved ? <><CheckCircle size={16} className="mr-2" /> Saved!</> : <><Save size={16} className="mr-2" /> Save Grades</>}
                            </Button>
                        </div>
                    }
                />

                {/* Stats */}
                <div className="grid grid-cols-4 gap-5 mb-8 mt-4">
                    {[
                        { label: 'Class Average', value: `${avg('total')} / 75`, color: 'indigo' },
                        { label: 'Avg Mid-Term', value: `${avg('mid')} / 30`, color: 'emerald' },
                        { label: 'Avg Assignment', value: `${avg('assignment')} / 20`, color: 'amber' },
                        { label: 'Avg Lab', value: `${avg('lab')} / 25`, color: 'rose' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.label}</p>
                            <p className={`text-2xl font-black text-${s.color}-600`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-3">
                            {courses.map(c => (
                                <button key={c} onClick={() => setFilterCourse(c)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filterCourse === c ? 'bg-indigo-600 text-white border-indigo-600' : 'text-slate-500 border-slate-200 hover:border-indigo-300'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search students..."
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 w-56" />
                        </div>
                    </div>

                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {['Student', 'Course', 'Mid-Term /30', 'Assignment /20', 'Lab /25', 'Total /75', 'Grade', 'Actions'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(s => (
                                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-5 py-4">
                                        <p className="font-bold text-sm text-slate-800">{s.name}</p>
                                        <p className="text-[10px] text-slate-400">{s.id}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{s.course}</span>
                                    </td>
                                    {(['mid', 'assignment', 'lab'] as const).map(field => (
                                        <td key={field} className="px-5 py-4">
                                            {editingId === s.id ? (
                                                <input type="number" value={s[field]}
                                                    onChange={e => updateMark(s.id, field, Number(e.target.value))}
                                                    className="w-16 px-2 py-1 border border-indigo-300 rounded-lg text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                                            ) : (
                                                <span className="text-sm font-bold text-slate-700">{s[field]}</span>
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-5 py-4">
                                        <span className="text-sm font-black text-slate-800">{s.total}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${GRADE_COLORS[s.grade] || 'bg-slate-100 text-slate-600'}`}>
                                            {s.grade}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => setEditingId(editingId === s.id ? null : s.id)}
                                            className="p-2 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors">
                                            <Edit3 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
