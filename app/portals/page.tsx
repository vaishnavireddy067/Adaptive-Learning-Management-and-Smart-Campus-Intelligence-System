'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Building2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { COLLEGE_NAME } from '@/utils/constants';

export default function PortalSelectorPage() {
    const portals = [
        {
            title: 'Smart Campus',
            desc: 'Access all college details, departments, administration, timetables, and overall campus management.',
            icon: Building2,
            btnText: 'Enter Campus System',
            color: 'bg-indigo-600 hover:bg-indigo-700',
            iconBg: 'bg-indigo-50 text-indigo-600',
            system: 'smart-campus'
        },
        {
            title: 'Learning Management (LMS)',
            desc: 'Access your courses, class notes, tests, scores, roadmaps, and educational resources.',
            icon: BookOpen,
            btnText: 'Go to LMS',
            color: 'bg-emerald-600 hover:bg-emerald-700',
            iconBg: 'bg-emerald-50 text-emerald-600',
            system: 'lms'
        },
        {
            title: 'Student Space (ERP)',
            desc: 'Your personal student dashboard. Check attendance, grades, fee payments, schedule, and profile.',
            icon: GraduationCap,
            btnText: 'Student Login',
            color: 'bg-rose-600 hover:bg-rose-700',
            iconBg: 'bg-rose-50 text-rose-600',
            system: 'student-erp'
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
            {/* Header matches Image 6 */}
            <nav className="flex items-center px-10 py-5 bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white">
                        <GraduationCap size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">{COLLEGE_NAME} Portal</span>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-10 mt-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Welcome to <span className="text-indigo-600">{COLLEGE_NAME}</span>
                    </h1>
                    <p className="text-base text-slate-500 font-medium">Please select the system you want to access</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                    {portals.map((portal, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-white hover:border-slate-100 transition-all text-center flex flex-col items-center group">
                            <div className={`w-12 h-12 ${portal.iconBg} rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform`}>
                                <portal.icon size={24} />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{portal.title}</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 h-20 overflow-hidden">
                                {portal.desc}
                            </p>

                            <Link href={`/login?system=${portal.system}`} className="w-full">
                                <Button className={`w-full h-12 rounded-xl font-bold text-[11px] uppercase tracking-widest text-white shadow-lg ${portal.color}`}>
                                    {portal.btnText}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            {/* Dark footer matches Image 6 */}
            <footer className="bg-[#0f172a] text-slate-500 py-6 px-10 border-t border-white/5 mt-auto">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">© 2026 {COLLEGE_NAME}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
