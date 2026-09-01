'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus, FileText, Calendar, Users, CheckCircle, Clock, AlertCircle, ChevronRight, Download, Eye, Edit3, Trash2 } from 'lucide-react';

const INITIAL_ASSIGNMENTS = [
    { 
        id: 'A001', 
        title: 'Project Proposal: NextJS Performance', 
        course: 'CS302: Advanced Web Tech', 
        dueDate: '2026-10-25', 
        submissions: 28, 
        totalStudents: 45, 
        status: 'active',
        description: 'Submit a 3-page proposal on optimizing NextJS core web vitals.'
    },
    { 
        id: 'A002', 
        title: 'Mid-term Quiz: Data Structures', 
        course: 'CS201: Data Structures', 
        dueDate: '2026-10-20', 
        submissions: 45, 
        totalStudents: 45, 
        status: 'grading',
        description: 'MCQ based quiz on trees and heaps.'
    },
    { 
        id: 'A003', 
        title: 'Implementation: Binary Search Tree', 
        course: 'CS201: Data Structures', 
        dueDate: '2026-10-15', 
        submissions: 42, 
        totalStudents: 45, 
        status: 'completed',
        description: 'Complete the BST implementation in C++ provided in the template.'
    },
];

export default function FacultyAssignmentsPage() {
    const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
    const [view, setView] = useState<'list' | 'create'>('list');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'grading': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'completed': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Assignments & Evaluations"
                    subtitle="Create, manage, and grade student submissions across all your courses."
                    action={
                        <Button onClick={() => setView(view === 'list' ? 'create' : 'list')}>
                            {view === 'list' ? <><Plus size={16} className="mr-2" /> Create New Assignment</> : 'Back to Assignments'}
                        </Button>
                    }
                />

                {view === 'list' ? (
                    <div className="space-y-6 mt-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Assignments</p>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-3xl font-black text-slate-900">08</h3>
                                    <span className="text-emerald-500 text-xs font-bold">+2 this week</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pending Grading</p>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-3xl font-black text-amber-600">124</h3>
                                    <span className="text-amber-500 text-xs font-bold">Priority needs</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Avg. Performance</p>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-3xl font-black text-indigo-600">84%</h3>
                                    <span className="text-indigo-500 text-xs font-bold">Stable trend</span>
                                </div>
                            </div>
                        </div>

                        {/* Assignments List */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Global Assignment Feed</h3>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600"><Download size={16}/></button>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {assignments.map((assignment) => (
                                    <div key={assignment.id} className="p-8 hover:bg-slate-50 transition-all group">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusColor(assignment.status)}`}>
                                                        {assignment.status}
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-400">{assignment.id} • {assignment.course}</span>
                                                </div>
                                                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                                    {assignment.title}
                                                </h4>
                                                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl line-clamp-1 italic">
                                                    "{assignment.description}"
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-8">
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Due Date</p>
                                                    <p className="text-sm font-black text-slate-900 flex items-center gap-2 justify-end">
                                                        <Calendar size={14} className="text-rose-500" /> {assignment.dueDate}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Submissions</p>
                                                    <div className="flex items-center gap-2 mt-1 justify-end">
                                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-emerald-500" style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}></div>
                                                        </div>
                                                        <span className="text-xs font-black text-slate-900">{assignment.submissions}/{assignment.totalStudents}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => alert(`Reviewing submissions for ${assignment.id}...`)}
                                                        className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                                                        <Edit3 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Create Form Placeholder */
                    <div className="mt-8 bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm max-w-3xl">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">New Academic Assignment</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Assignment Title</label>
                                <input type="text" placeholder="e.g. Memory Management Report" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Target Course</label>
                                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold">
                                        <option>CS302: Advanced Web Tech</option>
                                        <option>CS201: Data Structures</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Due Date</label>
                                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Instructions & Description</label>
                                <textarea rows={4} placeholder="Detail the assignment requirements here..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
                            </div>
                            <div className="pt-4 flex gap-4">
                                <Button size="lg" className="w-full" onClick={() => { alert('Assignment Created Successfully!'); setView('list'); }}>Publish Assignment</Button>
                                <Button size="lg" variant="ghost" className="w-full" onClick={() => setView('list')}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
