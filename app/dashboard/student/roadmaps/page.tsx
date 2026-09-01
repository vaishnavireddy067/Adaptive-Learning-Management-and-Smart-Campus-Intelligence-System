'use client';

import React from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Map, MapPin, CheckCircle, Circle, ArrowDown, ExternalLink } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export default function RoadmapsPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Learning Roadmaps"
                    subtitle="Follow structured career paths aligned with industry standards."
                />

                <div className="grid lg:grid-cols-3 gap-8 mt-6">
                    
                    {/* Active Roadmap Path */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                        <Map size={32} />
                                    </div>
                                    <div>
                                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded tracking-widest uppercase">Active Path</span>
                                        <h3 className="text-2xl font-bold text-slate-800 mt-1">Data Science Career Track</h3>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-slate-800 block">45%</span>
                                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Completed</span>
                                </div>
                            </div>

                            {/* Roadmap Steps */}
                            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-purple-200 before:to-slate-200">
                                
                                {/* Step 1: Completed */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-[-36px] md:left-1/2 top-4">
                                        <CheckCircle size={14} />
                                    </div>
                                    
                                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-800">1. Python Fundamentals</div>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Done</span>
                                        </div>
                                        <p className="text-slate-500 text-sm mt-2">Syntax, Variables, Data Types, Loops, Functions, OOPs.</p>
                                    </div>
                                </div>

                                {/* Step 2: Completed */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-[-36px] md:left-1/2 top-4">
                                        <CheckCircle size={14} />
                                    </div>
                                    
                                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-800">2. Data Mathematics</div>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Done</span>
                                        </div>
                                        <p className="text-slate-500 text-sm mt-2">Linear Algebra, Calculus Basics, Descriptive & Inferential Statistics.</p>
                                    </div>
                                </div>

                                {/* Step 3: In Progress */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-purple-200 bg-purple-600 text-white shadow-lg shadow-purple-500/40 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-[-39px] md:left-1/2 top-4 z-10 animate-pulse">
                                        <ArrowDown size={14} className="animate-bounce mt-1"/>
                                    </div>
                                    
                                    <div className="bg-purple-50 border-2 border-purple-200 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] shadow-md relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 blur-2xl rounded-full"></div>
                                        <div className="flex items-center justify-between space-x-2 mb-1 relative z-10">
                                            <div className="font-bold text-purple-900 text-lg">3. Data Analysis</div>
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded animate-pulse">Current</span>
                                        </div>
                                        <p className="text-purple-700 text-sm mt-2 relative z-10">NumPy arrays, Pandas DataFrames, Data Cleaning, EDA.</p>
                                        <Button 
                                            onClick={() => alert("Resuming Data Analysis module...")}
                                            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md relative z-10"
                                        >
                                            Resume Module
                                        </Button>
                                    </div>
                                </div>

                                {/* Step 4: Locked */}
                                <div 
                                    onClick={() => alert("This milestone is locked. Complete 'Data Analysis' to unlock.")}
                                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                >
                                    
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-200 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-[-34px] md:left-1/2 top-4">
                                        <Circle size={10} className="text-slate-300"/>
                                    </div>
                                    
                                    <div className="bg-white border text-center border-slate-200 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] shadow-sm opacity-60 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-500">4. Machine Learning</div>
                                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Locked</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Step 5: Locked */}
                                <div 
                                    onClick={() => alert("This milestone is locked. Complete 'Machine Learning' to unlock.")}
                                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                >
                                    
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-200 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-[-34px] md:left-1/2 top-4">
                                        <MapPin size={10} className="text-slate-300"/>
                                    </div>
                                    
                                    <div className="bg-white border text-center border-slate-200 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] shadow-sm opacity-60 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-500">5. Deep Learning & Projects</div>
                                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Locked</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Resources & Available Paths Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Additional Resources */}
                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
                            <h3 className="text-lg font-bold text-white mb-4">External Resources</h3>
                            <div className="space-y-3">
                                <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening Kaggle..."); }} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 hover:text-white group">
                                    <span className="text-sm font-medium">Kaggle Datasets</span>
                                    <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening Towards Data Science..."); }} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 hover:text-white group">
                                    <span className="text-sm font-medium">Towards Data Science</span>
                                    <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening Coursera..."); }} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 hover:text-white group">
                                    <span className="text-sm font-medium">Coursera Stanford ML</span>
                                    <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                </a>
                            </div>
                        </div>

                        {/* Other Roadmaps */}
                         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Explore Other Paths</h3>
                            <div className="space-y-4">
                                <div 
                                    onClick={() => alert("Switching to Full Stack Web Dev path...")}
                                    className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700">Full Stack Web Dev</h4>
                                    <p className="text-xs text-slate-500 mt-1">MERN Stack, Next.js, Cloud Deployment.</p>
                                </div>
                                <div 
                                    onClick={() => alert("Switching to Cloud Computing path...")}
                                    className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:border-emerald-300 transition-colors cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700">Cloud Computing</h4>
                                    <p className="text-xs text-slate-500 mt-1">AWS Practioner, Docker, Kubernetes.</p>
                                </div>
                                <div 
                                    onClick={() => alert("Switching to Cybersecurity path...")}
                                    className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 hover:border-rose-300 transition-colors cursor-pointer group"
                                >
                                    <h4 className="font-bold text-slate-800 group-hover:text-rose-700">Cybersecurity</h4>
                                    <p className="text-xs text-slate-500 mt-1">Networks, Penetration Testing, SOC.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
