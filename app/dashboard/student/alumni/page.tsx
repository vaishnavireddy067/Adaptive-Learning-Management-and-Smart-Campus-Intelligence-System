'use client';

import React from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { Users, Briefcase, GraduationCap, Mail, ExternalLink, Search } from 'lucide-react';
import { ROLES } from '@/utils/constants';

const ALUMNI_DATA = [
    { name: 'Sarah Wilson', class: '2021', company: 'Google', role: 'Software Engineer', skills: ['Cloud', 'Go', 'Kubernetes'], email: 'sarah.w@alumni.edu' },
    { name: 'Alex Rivera', class: '2020', company: 'Tesla', role: 'Data Scientist', skills: ['Python', 'AI', 'ML'], email: 'alex.r@alumni.edu' },
    { name: 'James Chen', class: '2022', company: 'Microsoft', role: 'UX Designer', skills: ['Figma', 'React', 'Animation'], email: 'james.c@alumni.edu' },
];

const JOB_POSTS = [
    { title: 'Frontend Intern', company: 'Vercel', location: 'Remote', type: 'Internship', matching: '95% Skill Match' },
    { title: 'Junior Dev', company: 'Stripe', location: 'Dublin', type: 'Full-time', matching: '88% Skill Match' },
];

export default function AlumniPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <GraduationCap className="text-indigo-600" />
                        Alumni & Career Bridge
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Connect with graduates and explore career opportunities tailored to your skill progress.</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Alumni Directory */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm shadow-slate-100">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Users size={24} className="text-indigo-600" />
                                        Featured Alumni Mentors
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1">Directly message graduates from top tech firms.</p>
                                </div>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="Search by name or skill..." className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ALUMNI_DATA.map((alumni, i) => (
                                    <div key={i} className="flex flex-col p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Mail className="text-indigo-200" size={40} />
                                        </div>
                                        <div className="flex gap-4 items-start mb-4">
                                            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-100">
                                                {alumni.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg">{alumni.name}</h4>
                                                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Class of {alumni.class}</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-slate-600 font-medium mb-4">
                                            {alumni.role} at <span className="text-slate-900 font-black">{alumni.company}</span>
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {alumni.skills.map(skill => (
                                                <span key={skill} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 shadow-sm">{skill}</span>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={() => alert(`Sent mentorship request to ${alumni.name}. They typically respond within 48 hours.`)}
                                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Mail size={14} /> Request Mentorship
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Career Matcher */}
                    <div className="space-y-6">
                        <section className="bg-slate-950 p-8 rounded-3xl shadow-2xl text-white border-t-4 border-t-emerald-500">
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                                <Briefcase size={22} className="text-emerald-400" />
                                AI Career Matcher
                            </h3>
                            <p className="text-xs text-slate-500 mb-8 font-bold uppercase tracking-widest">Skill Performance Match</p>
                            
                            <div className="space-y-6">
                                {JOB_POSTS.map((job, i) => (
                                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">{job.title}</h4>
                                                <p className="text-xs text-slate-500 font-medium mt-1">{job.company} • {job.location}</p>
                                            </div>
                                            <div className="px-2 py-1 bg-emerald-500/10 rounded-lg">
                                                <span className="text-[10px] text-emerald-400 font-black tracking-tighter">{job.matching}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => alert(`Application submitted for ${job.title} at ${job.company}!`)}
                                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                                        >
                                            Apply with AI Profile <ExternalLink size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-3xl shadow-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Resume Builder</h3>
                                    <p className="text-[10px] text-indigo-100 font-medium mt-0.5 opacity-70">LMS Sync Enabled</p>
                                </div>
                            </div>
                            <p className="text-xs text-indigo-100 leading-relaxed mb-8 opacity-80">
                                Instantly sync your quiz scores, project completions, and skill badges into a professional PDF resume.
                            </p>
                            <button 
                                onClick={() => alert('AI is assembling your data... Your personalized resume will download in a moment.')}
                                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-3 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all"
                            >
                                Generate AI Resume
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
