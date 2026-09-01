'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';
import { UserCheck, QrCode, MapPin, Camera, CheckCircle2, AlertCircle, Clock, Calendar, BarChart2 } from 'lucide-react';

export default function StudentAttendancePage() {
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [checkInStep, setCheckInStep] = useState(0);

    const startCheckIn = () => {
        setIsCheckingIn(true);
        setCheckInStep(1);
        setTimeout(() => setCheckInStep(2), 1500); // Verify Location
        setTimeout(() => setCheckInStep(3), 3000); // Verify Identity
        setTimeout(() => {
            setIsCheckingIn(false);
            setCheckInStep(4);
            alert('Attendance Successfully Marked!\nSession: CS302 Digital Electronics\nLocation: Room 201, Block B');
        }, 4500);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <UserCheck className="text-emerald-600" />
                        Smart Attendance Check-in
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Auto-verify your presence using AI and Location Services.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Check-in Zone Card */}
                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Session Found</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">CS302: Digital Electronics</h2>
                                    <p className="text-slate-500 text-sm font-medium mt-1 flex items-center gap-1">
                                        <Clock size={14} className="text-indigo-400" /> 09:00 AM - 10:30 AM • <MapPin size={14} className="text-rose-400" /> Block B, Room 201
                                    </p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-2xl">
                                    <QrCode size={32} className="text-emerald-600" />
                                </div>
                            </div>

                            {!isCheckingIn && checkInStep !== 4 ? (
                                <button 
                                    onClick={startCheckIn}
                                    className="w-full py-16 border-2 border-dashed border-indigo-200 rounded-3xl group hover:border-indigo-500 hover:bg-indigo-50 transition-all flex flex-col items-center justify-center gap-4"
                                >
                                    <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                                        <Camera size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-indigo-900 text-lg uppercase tracking-tight">Tap to Check-in</p>
                                        <p className="text-indigo-600 text-xs font-bold mt-1 italic">Scan Face & Verify Geo-Location</p>
                                    </div>
                                </button>
                            ) : checkInStep === 4 ? (
                                <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <div>
                                        <p className="font-black text-emerald-900 text-lg uppercase tracking-tight">Successfully Marked!</p>
                                        <p className="text-emerald-600 text-xs font-bold mt-1">Attendance logged at 09:05 AM</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-16 space-y-8">
                                    <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all">
                                        <div className={`p-3 rounded-xl ${checkInStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300 animate-pulse'}`}>
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className={`font-bold ${checkInStep >= 2 ? 'text-slate-900' : 'text-slate-300'}`}>Geo-Fence Verification</p>
                                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Checking GPS Coordinates...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all">
                                        <div className={`p-3 rounded-xl ${checkInStep >= 3 ? 'bg-indigo-500 text-white' : 'bg-white text-slate-300 animate-pulse'}`}>
                                            <Camera size={24} />
                                        </div>
                                        <div>
                                            <p className={`font-bold ${checkInStep >= 3 ? 'text-slate-900' : 'text-slate-300'}`}>Biometric Identity Scan</p>
                                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Analyzing Face Landmarks...</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Recent History */}
                        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Weekly Presence Report</h3>
                                <button className="text-indigo-600 font-black text-[10px] uppercase hover:underline">Full Log</button>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {[
                                    { date: 'Oct 24, 2026', subject: 'Data Structures', status: 'Present', time: '09:05 AM' },
                                    { date: 'Oct 23, 2026', subject: 'Operating Systems', status: 'Absent', time: '-' },
                                    { date: 'Oct 22, 2026', subject: 'Web Architecture', status: 'Present', time: '11:02 AM' },
                                ].map((log, i) => (
                                    <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px]">
                                                {log.date.split(' ')[1].replace(',', '')}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{log.subject}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.time}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${log.status === 'Present' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                            {log.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
                            <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-indigo-300">
                                <BarChart2 size={18} /> Attendance Trend
                            </h3>
                            <div className="text-5xl font-black mb-1">88%</div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total Semester Presence</p>
                            <div className="mt-8 p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target</span>
                                    <span className="text-xs font-bold">75%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm italic">
                                <AlertCircle className="text-amber-500" size={18} /> AI Policy Alert
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                You have 3 more absences allowed before reaching the mandatory 75% threshold. Attendance below this will trigger an automated alert to your Guardian.
                            </p>
                            <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs border border-slate-200 hover:bg-slate-100 transition-all">
                                View Academic Policy
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
