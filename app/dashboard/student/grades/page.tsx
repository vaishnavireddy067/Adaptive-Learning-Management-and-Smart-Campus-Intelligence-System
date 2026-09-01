'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Award, TrendingUp, TrendingDown, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const GRADE_DATA = [
    {
        semester: 'Semester 5 (Current)',
        gpa: 8.7,
        current: true,
        subjects: [
            { name: 'Python Programming', code: 'CS501', credits: 4, internal: 28, external: 62, total: 90, grade: 'O', points: 10 },
            { name: 'Data Structures', code: 'CS502', credits: 4, internal: 25, external: 58, total: 83, grade: 'A+', points: 9 },
            { name: 'Operating Systems', code: 'CS503', credits: 3, internal: 22, external: 54, total: 76, grade: 'A', points: 8 },
            { name: 'Database Management', code: 'CS504', credits: 4, internal: 26, external: 60, total: 86, grade: 'A+', points: 9 },
            { name: 'Computer Networks', code: 'CS505', credits: 3, internal: 20, external: 50, total: 70, grade: 'B+', points: 7 },
        ]
    },
    {
        semester: 'Semester 4',
        gpa: 8.2,
        current: false,
        subjects: [
            { name: 'Design & Analysis of Algorithms', code: 'CS401', credits: 4, internal: 24, external: 58, total: 82, grade: 'A+', points: 9 },
            { name: 'Software Engineering', code: 'CS402', credits: 3, internal: 22, external: 52, total: 74, grade: 'A', points: 8 },
            { name: 'Web Technologies', code: 'CS403', credits: 3, internal: 25, external: 56, total: 81, grade: 'A+', points: 9 },
            { name: 'Theory of Computation', code: 'CS404', credits: 4, internal: 18, external: 48, total: 66, grade: 'B', points: 6 },
            { name: 'Engineering Mathematics', code: 'CS405', credits: 3, internal: 20, external: 52, total: 72, grade: 'A', points: 8 },
        ]
    },
    {
        semester: 'Semester 3',
        gpa: 7.9,
        current: false,
        subjects: [
            { name: 'Object Oriented Programming', code: 'CS301', credits: 4, internal: 23, external: 55, total: 78, grade: 'A', points: 8 },
            { name: 'Computer Organization', code: 'CS302', credits: 3, internal: 20, external: 49, total: 69, grade: 'B+', points: 7 },
            { name: 'Digital Electronics', code: 'CS303', credits: 3, internal: 19, external: 47, total: 66, grade: 'B', points: 6 },
            { name: 'Mathematics III', code: 'CS304', credits: 4, internal: 24, external: 57, total: 81, grade: 'A+', points: 9 },
        ]
    },
];

const GRADE_COLOR: Record<string, string> = {
    O: 'bg-violet-100 text-violet-700 border-violet-200',
    'A+': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    A: 'bg-teal-100 text-teal-700 border-teal-200',
    'B+': 'bg-blue-100 text-blue-700 border-blue-200',
    B: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    C: 'bg-amber-100 text-amber-700 border-amber-200',
};

const CGPA = (GRADE_DATA.reduce((a, s) => a + s.gpa, 0) / GRADE_DATA.length).toFixed(2);

export default function StudentGradesPage() {
    const [expandedSem, setExpandedSem] = useState<number>(0);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="My Grades & Results"
                    subtitle="Semester-wise academic performance, GPA breakdown, and grade report."
                    action={
                        <Button variant="outline" onClick={() => alert('Downloading grade card as PDF...')}>
                            <Download size={15} className="mr-2" /> Download Grade Card
                        </Button>
                    }
                />

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-5 mt-4 mb-8">
                    {[
                        { label: 'Current GPA', value: GRADE_DATA[0].gpa.toFixed(1), sub: 'Semester 5', color: 'indigo' },
                        { label: 'CGPA', value: CGPA, sub: 'Overall', color: 'emerald' },
                        { label: 'Semesters', value: GRADE_DATA.length, sub: 'Completed', color: 'amber' },
                        { label: 'Total Credits', value: GRADE_DATA.flatMap(s => s.subjects).reduce((a, s) => a + s.credits, 0), sub: 'Earned', color: 'rose' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.label}</p>
                            <p className={`text-4xl font-black text-${s.color}-600`}>{s.value}</p>
                            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* GPA Trend Bar */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
                    <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2">
                        <TrendingUp className="text-indigo-500" size={18} /> GPA Trend
                    </h3>
                    <div className="flex items-end gap-6 h-20">
                        {[...GRADE_DATA].reverse().map((s, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs font-black text-indigo-600">{s.gpa}</span>
                                <div className="w-full bg-indigo-500 rounded-t-xl transition-all hover:bg-indigo-600"
                                    style={{ height: `${(s.gpa / 10) * 64}px` }} />
                                <span className="text-[10px] text-slate-400 font-bold text-center">{s.semester.replace('Semester ', 'Sem ')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Semester Accordions */}
                <div className="space-y-4">
                    {GRADE_DATA.map((sem, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <button
                                onClick={() => setExpandedSem(expandedSem === idx ? -1 : idx)}
                                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {sem.current && (
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white px-2.5 py-1 rounded-full animate-pulse">Current</span>
                                    )}
                                    <h3 className="font-black text-slate-800 text-lg">{sem.semester}</h3>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GPA</p>
                                        <p className="text-2xl font-black text-indigo-600">{sem.gpa}</p>
                                    </div>
                                    {expandedSem === idx ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                                </div>
                            </button>

                            {expandedSem === idx && (
                                <div className="border-t border-slate-100">
                                    <table className="w-full">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                {['Subject', 'Code', 'Credits', 'Internal', 'External', 'Total', 'Grade', 'Points'].map(h => (
                                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {sem.subjects.map((s, j) => (
                                                <tr key={j} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-5 py-3 font-bold text-sm text-slate-800">{s.name}</td>
                                                    <td className="px-5 py-3 text-xs text-slate-500 font-mono">{s.code}</td>
                                                    <td className="px-5 py-3 text-sm text-slate-600">{s.credits}</td>
                                                    <td className="px-5 py-3 text-sm text-slate-600">{s.internal}/30</td>
                                                    <td className="px-5 py-3 text-sm text-slate-600">{s.external}/70</td>
                                                    <td className="px-5 py-3 text-sm font-black text-slate-800">{s.total}/100</td>
                                                    <td className="px-5 py-3">
                                                        <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${GRADE_COLOR[s.grade] || 'bg-slate-100 text-slate-600'}`}>{s.grade}</span>
                                                    </td>
                                                    <td className="px-5 py-3 text-sm font-black text-indigo-600">{s.points}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
