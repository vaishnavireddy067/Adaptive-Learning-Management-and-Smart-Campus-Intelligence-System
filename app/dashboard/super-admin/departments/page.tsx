'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES, DEPARTMENTS } from '@/utils/constants';
import { BookOpen, Users, GraduationCap, ChevronRight, Plus, Search, MoreVertical, Building2, UserCheck, Mail, Phone, Award, School } from 'lucide-react';

// Mock Data for Faculty and Students
const MOCK_DATA: any = {
    'Computer Science': {
        faculty: [
            { name: 'Dr. Alan Turing', role: 'Head of Dept', email: 'alan@smartcampus.edu', expert: 'Algorithms' },
            { name: 'Dr. Grace Hopper', role: 'Professor', email: 'grace@smartcampus.edu', expert: 'Compilers' },
        ],
        students: [
            { name: 'John Doe', roll: 'CS101', cgpa: '9.2', attendance: '95%' },
            { name: 'Jane Smith', roll: 'CS102', cgpa: '8.8', attendance: '92%' },
        ]
    },
    'Electrical & Computer Engineering': {
        faculty: [
            { name: 'Dr. Nikola Tesla', role: 'Professor', email: 'tesla@smartcampus.edu', expert: 'Circuit Theory' },
        ],
        students: [
            { name: 'Bob Brown', roll: 'EC201', cgpa: '8.5', attendance: '88%' },
        ]
    },
    // Adding fallbacks for others
    'default': {
        faculty: [{ name: 'Staff Member', role: 'Assistant Professor', email: 'staff@smartcampus.edu', expert: 'General' }],
        students: [{ name: 'Student Name', roll: 'ST001', cgpa: '8.0', attendance: '90%' }]
    }
};

export default function DepartmentsPage() {
    const [selectedDept, setSelectedDept] = useState<string | null>(null);
    const [viewType, setViewType] = useState<'faculty' | 'student' | null>(null);

    const handleDeptClick = (dept: string) => {
        if (selectedDept === dept) {
            setSelectedDept(null);
            setViewType(null);
        } else {
            setSelectedDept(dept);
            setViewType(null);
        }
    };

    const activeData = MOCK_DATA[selectedDept || ''] || MOCK_DATA['default'];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Building2 className="text-indigo-600" />
                            Academic Hierarchy
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium italic">Click a department to manage people and performance.</p>
                    </div>
                    <button 
                        onClick={() => alert('New Department setup wizard launched.')}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 text-sm"
                    >
                        <Plus size={20} /> Add New Dept
                    </button>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Department List */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search departments..." 
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                            />
                        </div>
                        
                        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
                            {DEPARTMENTS.map((dept, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleDeptClick(dept)}
                                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 ${selectedDept === dept ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl translate-x-1' : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50'}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-xl ${selectedDept === dept ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                                            <BookOpen size={20} />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${selectedDept === dept ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                                            {['Computer Science', 'Electrical & Computer Engineering'].includes(dept) ? 'Block B' : 'Block C'}
                                        </span>
                                    </div>
                                    <h4 className="font-black text-sm mb-1 leading-tight">{dept}</h4>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedDept === dept ? 'text-indigo-100' : 'text-slate-400'}`}>
                                        12 Faculty • 120 Students
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Data View */}
                    <div className="lg:col-span-2">
                        {selectedDept ? (
                            <div className="space-y-6">
                                {/* Department Controls */}
                                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-black text-slate-900">{selectedDept}</h2>
                                        <p className="text-slate-400 text-sm font-medium mt-1">Management Portal Dashboard</p>
                                    </div>
                                    <div className="flex gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                        <button 
                                            onClick={() => setViewType('faculty')}
                                            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${viewType === 'faculty' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white'}`}
                                        >
                                            <Users size={16} /> Faculty Data
                                        </button>
                                        <button 
                                            onClick={() => setViewType('student')}
                                            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${viewType === 'student' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white'}`}
                                        >
                                            <GraduationCap size={16} /> Student Data
                                        </button>
                                    </div>
                                </div>

                                {/* Content Display */}
                                <div className="min-h-[400px]">
                                    {!viewType ? (
                                        <div className="flex flex-col items-center justify-center h-[400px] border-4 border-dashed border-slate-200 rounded-[3rem] text-slate-300">
                                            <School size={64} strokeWidth={1} className="mb-4" />
                                            <p className="font-bold text-lg">Select a category above</p>
                                            <p className="text-sm font-medium">To view faculty or student rosters for {selectedDept}</p>
                                        </div>
                                    ) : viewType === 'faculty' ? (
                                        <div className="grid gap-4">
                                            {activeData.faculty.map((f: any, i: number) => (
                                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between group hover:shadow-xl hover:border-indigo-500 transition-all">
                                                    <div className="flex gap-6 items-center">
                                                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl">
                                                            {f.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-black text-slate-900">{f.name}</h4>
                                                            <p className="text-xs font-bold text-indigo-500 mb-2 uppercase tracking-widest">{f.role}</p>
                                                            <div className="flex gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                                <span className="flex items-center gap-1"><Mail size={12} className="text-slate-300"/> {f.email}</span>
                                                                <span className="flex items-center gap-1"><Award size={12} className="text-slate-300"/> Expert: {f.expert}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
                                                        <MoreVertical size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-slate-50 border-b border-slate-100">
                                                    <tr>
                                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name</th>
                                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Roll No</th>
                                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">CGPA</th>
                                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance</th>
                                                        <th className="p-6"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {activeData.students.map((s: any, i: number) => (
                                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-6">
                                                                <p className="font-black text-slate-900">{s.name}</p>
                                                            </td>
                                                            <td className="p-6">
                                                                <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">{s.roll}</span>
                                                            </td>
                                                            <td className="p-6">
                                                                <p className="font-black text-indigo-600">{s.cgpa}</p>
                                                            </td>
                                                            <td className="p-6">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                        <div className="h-full bg-emerald-500" style={{ width: s.attendance }}></div>
                                                                    </div>
                                                                    <span className="text-xs font-bold text-slate-500">{s.attendance}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-6 text-right">
                                                                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><ChevronRight size={20}/></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] text-slate-300 p-12 text-center">
                                <Building2 size={80} strokeWidth={1} className="mb-6 animate-pulse" />
                                <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Select Department</h3>
                                <p className="text-slate-400 max-w-xs mt-4 font-medium italic">"Every great institution is built on organized departments. Select one from the left to explore its heartbeat."</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
