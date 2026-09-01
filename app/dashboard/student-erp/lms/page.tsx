'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Sparkles, BookOpen, Clock, ChevronRight, PlayCircle, Star, Target, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const currentCourses = [
  { id: 1, name: 'Machine Learning Foundations', progress: 75, instructor: 'Dr. Ramesh Kumar', sessions: 24, nextTopic: 'Neural Networks 101' },
  { id: 2, name: 'Python for Data Science', progress: 95, instructor: 'Prof. Anitha Reddy', sessions: 18, nextTopic: 'Final Project', completed: true },
  { id: 3, name: 'Big Data Analytics', progress: 40, instructor: 'Dr. Suresh V', sessions: 12, nextTopic: 'Hadoop EcoSystem' },
];

const recommendations = [
  { 
    id: 1, 
    source: 'Python for Data Science', 
    reason: 'Excellence in Python (95%)', 
    tag: 'Adaptive Path', 
    course: 'Advanced Reinforcement Learning',
    difficulty: 'Advanced',
    estTime: '4 Weeks'
  },
  { 
    id: 2, 
    source: 'ML Foundations', 
    reason: 'High Interest in Neural Networks', 
    tag: 'Suggested', 
    course: 'Deep Learning with PyTorch',
    difficulty: 'Intermediate',
    estTime: '6 Weeks'
  }
];

export default function SmartLearningPage() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader 
        title="Smart Learning Hub"
        subtitle="Your personalized LMS with adaptive learning paths and AI course recommendations."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left - Active Courses */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
                <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
                    <BookOpen className="text-indigo-600" size={24} /> My Active Learning
                </h3>

                <div className="space-y-6">
                    {currentCourses.map((course) => (
                        <div key={course.id} className="bg-slate-50/50 p-6 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white transition-all group/item">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                                        course.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                                    }`}>
                                        <PlayCircle size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg mb-1">{course.name}</h4>
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <span>{course.sessions} Sessions</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                            <span>{course.instructor}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Next Topic</p>
                                    <p className="text-xs font-bold text-indigo-600 flex items-center justify-end gap-1">
                                        {course.nextTopic} <ChevronRight size={14} />
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Overall Progress</span>
                                    <span className="text-slate-800">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ${course.completed ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
           </div>
        </div>

        {/* Right - Adaptive Paths */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-6 opacity-20">AI.</h1>
                    <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                        <Sparkles className="text-indigo-400" size={22} /> Adaptive Path
                    </h3>
                    
                    <div className="space-y-6">
                        {recommendations.map((rec) => (
                            <div key={rec.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group/card relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30">
                                        {rec.tag}
                                    </span>
                                </div>
                                <h4 className="font-bold text-white mb-2 leading-tight">{rec.course}</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed max-w-[200px] mb-4">
                                     Since you excelled in <strong className="text-indigo-300">{rec.source}</strong>, we suggest this advanced track.
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {rec.estTime}</span>
                                    <span className="text-indigo-400">Start Project <ChevronRight size={12} /></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-[10px] text-slate-500 mt-8 font-medium leading-relaxed">
                         Our AI analyzes your quiz scores, session time, and lab performance to dynamically adjust your roadmap.
                    </p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Award className="text-indigo-600" size={22} /> Skill Proficiency
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Python</span>
                        <span className="font-black text-emerald-600 uppercase">Master</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Data Analytics</span>
                        <span className="font-black text-indigo-600 uppercase">Professional</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Big Data</span>
                        <span className="font-black text-amber-600 uppercase">Developing</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
