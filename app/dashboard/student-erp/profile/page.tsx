'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { User, Mail, Phone, Calendar, Heart, GraduationCap, MapPin, Hash, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function StudentERPProfile() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader 
        title="Student Profile"
        subtitle="Manage your personal and academic information for the current semester."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column - Detailed Info */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card: Personal Details */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <User className="text-indigo-600" size={24} /> Personal Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-6">
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <User size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Gender</p>
                           <p className="text-sm font-bold text-slate-800">FEMALE</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <Calendar size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Date of Birth</p>
                           <p className="text-sm font-bold text-slate-800">May 24, 2005</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <Phone size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Mobile</p>
                           <p className="text-sm font-bold text-slate-800">+91 96520 00000</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <Mail size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Email Address</p>
                           <p className="text-sm font-bold text-slate-800">vaishnavi.a@avniet.edu</p>
                       </div>
                   </div>
               </div>

               <div className="space-y-6">
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <User size={20} className="opacity-50" />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Father&apos;s Name</p>
                           <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter">AENUGU SAIDI REDDY</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <User size={20} className="opacity-50" />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Mother&apos;s Name</p>
                           <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter">SANTHOSHA</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <Phone size={20} className="opacity-50" />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Parent&apos;s Mobile</p>
                           <p className="text-sm font-bold text-slate-800">+91 96520 00000</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-indigo-50 group-hover/row:text-indigo-600 transition-colors">
                           <Heart size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Blood Group</p>
                           <p className="text-sm font-bold text-slate-800">B+</p>
                       </div>
                   </div>
               </div>
            </div>
          </div>

          {/* Card: Academic Details */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <GraduationCap className="text-emerald-600" size={24} /> Academic Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-6">
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-emerald-50 group-hover/row:text-emerald-600 transition-colors">
                           <Hash size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Roll Number</p>
                           <p className="text-sm font-bold text-slate-800 tracking-wider">235U1A7203</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-emerald-50 group-hover/row:text-emerald-600 transition-colors">
                           <Hash size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Admission Number</p>
                           <p className="text-sm font-bold text-slate-800 tracking-wider">47991</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-emerald-50 group-hover/row:text-emerald-600 transition-colors">
                           <Calendar size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Academic Batch</p>
                           <p className="text-sm font-bold text-slate-800">2023 - 2027</p>
                       </div>
                   </div>
               </div>

               <div className="space-y-6">
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-emerald-50 group-hover/row:text-emerald-600 transition-colors">
                           <BookOpen size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Department / Code</p>
                           <p className="text-sm font-bold text-slate-800 tracking-tight">AI & DS (Artificial Intelligence & Data Science)</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-emerald-50 group-hover/row:text-emerald-600 transition-colors">
                           <GraduationCap size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Degree & Semester</p>
                           <p className="text-sm font-bold text-slate-800">B TECH - Semester 06</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4 group/row">
                       <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-emerald-50 group-hover/row:text-emerald-600 transition-colors">
                           <MapPin size={20} />
                       </div>
                       <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Section</p>
                           <p className="text-sm font-bold text-slate-800">A</p>
                       </div>
                   </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Actions */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-900/40 to-black/60 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-32 h-40 bg-white/5 rounded-3xl border border-white/20 mb-6 flex items-center justify-center overflow-hidden">
                        <div className="text-slate-400">
                             <User size={64} className="opacity-40" />
                        </div>
                    </div>
                    <div className="text-center mb-10">
                        <h2 className="text-xl font-black tracking-widest uppercase mb-1">ANUGU VAISHNAVI</h2>
                        <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Roll: 235U1A7203</p>
                        <div className="flex items-center gap-2 justify-center">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            <span className="text-[10px] font-black tracking-[0.1em] text-slate-400 uppercase">Active Student</span>
                        </div>
                    </div>
                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black text-xs py-4 flex items-center justify-center gap-2 rounded-2xl">
                        Update Photo
                    </Button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors cursor-pointer">
                <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors text-slate-600 font-bold text-sm">
                        Request Certificate <ChevronRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors text-slate-600 font-bold text-sm">
                        Apply Bonafide <ChevronRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors text-slate-600 font-bold text-sm">
                        Study Loan NOC <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
