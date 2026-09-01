'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';

type ColorKey = 'emerald' | 'indigo' | 'amber' | 'rose' | 'blue' | 'purple';

type CourseRow = {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    icon: string;
    colorKey: ColorKey;
};

const THEME: Record<
    ColorKey,
    { header: string; bar: string; accent: string; btn: string; btnHover: string; shadow: string }
> = {
    emerald: {
        header: 'bg-emerald-600',
        bar: 'bg-emerald-600',
        accent: 'text-emerald-600',
        btn: 'bg-emerald-600',
        btnHover: 'hover:bg-emerald-700',
        shadow: 'shadow-emerald-100',
    },
    indigo: {
        header: 'bg-indigo-600',
        bar: 'bg-indigo-600',
        accent: 'text-indigo-600',
        btn: 'bg-indigo-600',
        btnHover: 'hover:bg-indigo-700',
        shadow: 'shadow-indigo-100',
    },
    amber: {
        header: 'bg-amber-500',
        bar: 'bg-amber-500',
        accent: 'text-amber-600',
        btn: 'bg-amber-500',
        btnHover: 'hover:bg-amber-600',
        shadow: 'shadow-amber-100',
    },
    rose: {
        header: 'bg-rose-600',
        bar: 'bg-rose-600',
        accent: 'text-rose-600',
        btn: 'bg-rose-600',
        btnHover: 'hover:bg-rose-700',
        shadow: 'shadow-rose-100',
    },
    blue: {
        header: 'bg-blue-600',
        bar: 'bg-blue-600',
        accent: 'text-blue-600',
        btn: 'bg-blue-600',
        btnHover: 'hover:bg-blue-700',
        shadow: 'shadow-blue-100',
    },
    purple: {
        header: 'bg-purple-600',
        bar: 'bg-purple-600',
        accent: 'text-purple-600',
        btn: 'bg-purple-600',
        btnHover: 'hover:bg-purple-700',
        shadow: 'shadow-purple-100',
    },
};

export default function CoursesPage() {
    const [courses, setCourses] = useState<CourseRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/courses', { credentials: 'include' });
                const data = await res.json();
                if (!cancelled && res.ok && Array.isArray(data)) {
                    setCourses(data as CourseRow[]);
                }
            } catch {
                /* keep empty */
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="My Learning Paths"
                    subtitle={
                        loading
                            ? 'Loading your enrolled courses…'
                            : courses.length === 0
                              ? 'Log in as student and run npm run db:seed to see enrolled demo courses from the database.'
                              : 'Access your enrolled subjects, video lectures, and syllabus.'
                    }
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {courses.map((course) => {
                        const t = THEME[course.colorKey] || THEME.indigo;
                        return (
                            <div
                                key={course.id}
                                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col"
                            >
                                <div className={`h-32 ${t.header} p-6 flex items-center justify-between relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
                                    <div className="text-4xl text-white drop-shadow-lg">{course.icon}</div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Instructor</span>
                                        <p className="text-white font-bold text-sm">{course.instructor}</p>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-black text-slate-800 mb-4">{course.title}</h3>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Progress</span>
                                            <span className={`text-xs font-black ${t.accent}`}>{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${t.bar} rounded-full`} style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => alert(`Launching ${course.title} session...`)}
                                        className={`w-full ${t.btn} ${t.btnHover} text-white font-black py-3 rounded-2xl shadow-lg ${t.shadow} transition-all hover:scale-[1.02] border-none`}
                                    >
                                        Resume Lesson
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
