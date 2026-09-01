'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BookOpen, Award, CheckCircle2, ChevronDown, ChevronRight, FileText, Target, TrendingUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const semesters = [
  { id: '06', title: '6th Semester', status: 'Ongoing', sgpa: 'N/A', active: true, hue: 'indigo' },
  { id: '05', title: '5th Semester', status: 'Completed', sgpa: '8.45', active: false, hue: 'emerald' },
  { id: '04', title: '4th Semester', status: 'Completed', sgpa: '8.20', active: false, hue: 'emerald' },
  { id: '03', title: '3rd Semester', status: 'Completed', sgpa: '7.95', active: false, hue: 'emerald' },
  { id: '02', title: '2nd Semester', status: 'Completed', sgpa: '8.15', active: false, hue: 'emerald' },
  { id: '01', title: '1st Semester', status: 'Completed', sgpa: '8.00', active: false, hue: 'emerald' },
];

const assessments = [
  { course: 'Artificial Intelligence', internal1: 22, internal2: 24, assignment: 10, credits: 4 },
  { course: 'Machine Learning', internal1: 18, internal2: 20, assignment: 8, credits: 3 },
  { course: 'Data Science Foundations', internal1: 15, internal2: 19, assignment: 9, credits: 4 },
  { course: 'Big Data Analytics', internal1: 23, internal2: 21, assignment: 10, credits: 3 },
  { course: 'Python for Data Science', internal1: 24, internal2: 23, assignment: 10, credits: 3 },
  { course: 'AI & Neural Networks Lab', internal1: 14, internal2: 15, assignment: 10, credits: 1.5 },
  { course: 'Machine Learning Lab', internal1: 13, internal2: 14, assignment: 10, credits: 1.5 },
  { course: 'Data Analytics Tool Lab', internal1: 15, internal2: 15, assignment: 10, credits: 1.5 }
];

export default function StudentERPExams() {
  const [openSem, setOpenSem] = useState('06');

  return (
    <div className="p-8 space-y-8">
      <PageHeader 
        title="AI & DS Exams & Performance"
        subtitle="Track your semester-wise academic journey, CGPA progress, and internal scores."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column - Score Breakdown */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-4">
             {semesters.map((sem) => (
                <div key={sem.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden transition-all">
                    {/* Semester Header Row */}
                    <div 
                        onClick={() => setOpenSem(openSem === sem.id ? '' : sem.id)}
                        className={`p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${openSem === sem.id ? 'bg-slate-50/50 border-b border-slate-100' : ''}`}
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner ${
                                sem.active ? 'bg-indigo-600 text-white' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                                {sem.id}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight">{sem.title}</h3>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                        sem.active ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>{sem.status}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        SGPA: <strong className="text-slate-800">{sem.sgpa}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ChevronDown className={`text-slate-300 transition-transform duration-300 ${openSem === sem.id ? 'rotate-180 text-indigo-500' : ''}`} />
                    </div>

                    {/* Expandable Details Area */}
                    {openSem === sem.id && (
                        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                             {/* Major Links */}
                             <div className="grid md:grid-cols-2 gap-4">
                                <Button 
                                    onClick={() => alert("Opening Official Results Portal...")}
                                    className="bg-[#464573] hover:bg-slate-900 text-white p-8 rounded-[1.8rem] flex justify-between items-center group shadow-xl shadow-indigo-900/10"
                                >
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Results Link</span>
                                        <span className="text-lg font-bold">External Marks View</span>
                                    </div>
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </Button>
                                <Button 
                                    onClick={() => alert("Starting Grade Card Download (PDF)...")}
                                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-8 rounded-[1.8rem] flex justify-between items-center group shadow-sm"
                                >
                                    <div className="flex flex-col items-start gap-1 text-slate-400">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Document</span>
                                        <span className="text-lg font-bold text-slate-800">Grade Card Download</span>
                                    </div>
                                    <FileText className="group-hover:scale-110 transition-transform" />
                                </Button>
                             </div>

                             <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <TrendingUp size={14} className="text-emerald-500" /> Internal Performance
                                </h4>
                                <div className="space-y-3">
                                    {assessments.map((item, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between border border-slate-100 shadow-sm transition-all group hover:border-indigo-100">
                                            <div className="flex items-center gap-4 mb-3 md:mb-0">
                                                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                    <BookOpen size={18} />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-slate-800 text-xs min-w-[200px]">{item.course}</h5>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Credits: {item.credits}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-8 items-center bg-slate-50 px-6 py-2 rounded-xl group-hover:bg-white transition-colors">
                                                <div className="text-center group-hover:scale-110 transition-transform">
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">M1</p>
                                                    <p className="text-xs font-black text-slate-800 tracking-tighter">{item.internal1}/25</p>
                                                </div>
                                                <div className="text-center group-hover:scale-110 transition-transform">
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">M2</p>
                                                    <p className="text-xs font-black text-slate-800 tracking-tighter">{item.internal2}/25</p>
                                                </div>
                                                <div className="text-center group-hover:scale-110 transition-transform">
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Assig.</p>
                                                    <p className={`text-xs font-black tracking-tighter ${item.assignment >= 9 ? 'text-emerald-600' : 'text-slate-800'}`}>{item.assignment}/10</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>
                    )}
                </div>
             ))}
          </div>
        </div>

        {/* Right Column - Career/CGPA Insights */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform">
                        <Award size={32} />
                    </div>
                    <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Cumulative Score</h4>
                    <div className="flex items-baseline justify-center gap-1 mb-6">
                        <span className="text-6xl font-black text-slate-900 tracking-tighter">8.17</span>
                        <span className="text-lg font-bold text-slate-400">CGPA</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                        Top 15% Rank
                    </div>
                    <div className="space-y-3 pt-6 border-t border-slate-50">
                        <div className="flex justify-between items-center text-xs font-medium">
                            <span className="text-slate-400">Backlogs Count</span>
                            <span className="text-emerald-600 font-black">Zero</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-medium">
                            <span className="text-slate-400">Eligibility</span>
                            <span className="text-emerald-600 font-black">Ready for Placements</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 blur-3xl rounded-full"></div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Target size={20} className="text-emerald-400" /> AI Career Insights
                </h3>
                <div className="space-y-4">
                    <div 
                        onClick={() => alert("Showing Data Science performance analysis...")}
                        className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-pointer group/card"
                    >
                        <div className="flex gap-4 items-center mb-3">
                            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                <TrendingUp size={20} />
                            </div>
                            <h5 className="font-bold text-xs uppercase tracking-widest">DS Score Uplift</h5>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-snug">
                            Your performance in <strong>Data Science Foundations</strong> is consistently rising. You may qualify for <strong>Premium Placements</strong> in Google/Meta if this continues.
                        </p>
                    </div>
                    
                    <div 
                        onClick={() => alert("Loading Machine Learning study recommendations...")}
                        className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/[0.08] transition-colors cursor-pointer group/card"
                    >
                        <div className="flex gap-4 items-center mb-3">
                            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                <HelpCircle size={20} />
                            </div>
                            <h5 className="font-bold text-xs uppercase tracking-widest">Suggested Skill</h5>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-snug">
                            To reach an 8.5 CGPA, focus on your <strong>Machine Learning</strong> internals. AI predicts a gain of 26 points with better MID scores.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
