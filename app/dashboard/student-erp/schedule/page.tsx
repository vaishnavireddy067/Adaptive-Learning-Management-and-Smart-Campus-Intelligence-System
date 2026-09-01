'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Clock, MapPin, CheckCircle, XCircle, CalendarDays, ChevronRight } from 'lucide-react';

const dates = [
  { day: 'Mon', date: '16', active: false },
  { day: 'Tue', date: '17', active: false },
  { day: 'Wed', date: '18', active: false },
  { day: 'Thu', date: '19', active: false },
  { day: 'Fri', date: '20', active: true },
  { day: 'Sat', date: '21', active: false },
];

const schedule = [
  { id: 1, subject: 'Artificial Intelligence & Neural Networks', time: '09:00 AM - 10:30 AM', room: 'Block B - Room 304', status: 'present', type: 'Lecture', faculty: 'Dr. Satish Reddy' },
  { id: 2, subject: 'Machine Learning Lab', time: '10:45 AM - 12:15 PM', room: 'Block C - AI Lab 1', status: 'present', type: 'Lab', faculty: 'Prof. S. Santhosha' },
  { id: 3, subject: 'Mathematical Foundations for Data Science', time: '01:00 PM - 02:30 PM', room: 'Block B - Room 204', status: 'absent', type: 'Lecture', faculty: 'Dr. Rajesh P' },
  { id: 4, subject: 'Big Data Analytics', time: '02:45 PM - 04:15 PM', room: 'Block C - DS Lab 2', status: 'upcoming', type: 'Lecture', faculty: 'Dr. Anusha K' },
];

export default function StudentERPSchedule() {
  const [activeDate, setActiveDate] = useState('20');

  return (
    <div className="p-8 space-y-8">
      <PageHeader 
        title="AI & DS Weekly Schedule"
        subtitle="Manage your daily class lectures, labs and hall locations."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left - Schedule List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Horizontal Date Selector */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center mb-4">
            {dates.map((item) => (
              <button
                key={item.date}
                onClick={() => setActiveDate(item.date)}
                className={`flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all duration-300 ${
                  activeDate === item.date
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 -translate-y-2'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${activeDate === item.date ? 'text-indigo-200' : 'text-slate-300'}`}>{item.day}</span>
                <span className="text-xl font-black">{item.date}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {schedule.map((session) => (
              <div key={session.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between group hover:shadow-md transition-shadow relative overflow-hidden">
                 
                <div className="flex gap-6 items-center flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        session.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 
                        session.status === 'absent' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                        {session.status === 'present' ? <CheckCircle size={24} /> : 
                         session.status === 'absent' ? <XCircle size={24} /> : <Clock size={24} />}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black tracking-widest uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{session.type}</span>
                            <span className="text-[10px] font-black tracking-widest uppercase text-slate-300">ID: {session.id}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">{session.subject}</h4>
                        <p className="text-xs text-slate-400 font-medium">{session.faculty}</p>
                    </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                        <Clock size={16} className="text-indigo-500" />
                        {session.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <MapPin size={14} className="text-rose-400" />
                        {session.room}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Sidebar Activity */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <CalendarDays className="text-indigo-600" size={22} /> Daily Summary
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">2</div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Lectures Attended</p>
                            <p className="text-xs text-slate-400">Total 4 hours today</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black">1</div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Lecture Missed</p>
                            <p className="text-xs text-slate-400 text-rose-400 font-bold">Needs medical proof</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">1</div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Upcoming Class</p>
                            <p className="text-xs text-slate-400">Starts in 45 mins</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
                <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-4">Exam Alert</h4>
                <p className="font-bold text-lg mb-4">Mid-term exams start in 12 days</p>
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold bg-white/5 p-3 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    Download Hall Ticket <ChevronRight size={14} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
