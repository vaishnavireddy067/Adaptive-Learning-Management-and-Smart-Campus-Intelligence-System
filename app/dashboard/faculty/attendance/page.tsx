'use client';

import React, { useState, useEffect } from 'react';
import { Camera, QrCode, MapPin, UserCheck, Search, Users, Check, X, RefreshCw, AlertCircle, Clock, BookOpen } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';

const STUDENTS = [
    { id: 'S001', name: 'Ayush Sharma', status: 'present', method: 'Face ID', time: '09:02 AM' },
    { id: 'S002', name: 'Tanvi Reddy', status: 'present', method: 'Geo-Fence', time: '08:58 AM' },
    { id: 'S003', name: 'Rohit Verma', status: 'absent', method: '-', time: '-' },
    { id: 'S004', name: 'Ananya Gupta', status: 'absent', method: '-', time: '-' },
];

export default function SmartAttendancePage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [selectedSession, setSelectedSession] = useState('CS302: Data Structures');

    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
    };

    useEffect(() => {
        if (isScanning && scanProgress < 100) {
            const timer = setTimeout(() => setScanProgress(p => p + 5), 100);
            return () => clearTimeout(timer);
        } else if (scanProgress === 100) {
            setIsScanning(false);
            alert('Digital Roll Call Complete!\n45 Present | 2 Absent | 3 Late');
        }
    }, [isScanning, scanProgress]);

    return (
        <div className="flex min-h-screen bg-emerald-50/30">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <UserCheck className="text-emerald-600" />
                        Smart Attendance Hub
                    </h1>
                    <p className="text-slate-500 mt-2">Automated roll call using Face Recognition, Geo-fencing, and QR Codes.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Attendance Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm border-b-4 border-b-emerald-500">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">CS302: Digital Electronics</h2>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium uppercase tracking-wider">
                                        <Clock size={12} /> Live Session • 09:00 AM - 10:00 AM • <MapPin size={12} className="text-rose-400" /> Block B, Room 205
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => alert('Generating secure session QR Code...')}
                                        className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-colors"
                                    >
                                        <QrCode size={20} />
                                    </button>
                                    <button 
                                        onClick={() => alert('Geo-fence established (30m radius). Students must be in Room 205, Block B.')}
                                        className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-colors"
                                    >
                                        <MapPin size={20} />
                                    </button>
                                </div>
                            </div>

                            {!isScanning ? (
                                <button 
                                    onClick={startScan}
                                    className="w-full py-20 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-3xl group hover:border-emerald-400 hover:bg-emerald-100/50 transition-all flex flex-col items-center justify-center gap-4"
                                >
                                    <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Camera size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-emerald-900">Launch AI Face Scan</p>
                                        <p className="text-emerald-600 text-sm mt-1 font-medium italic">Instant crowd recognition engine</p>
                                    </div>
                                </button>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center gap-6">
                                    <div className="relative w-48 h-48">
                                        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full" />
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle 
                                                cx="96" cy="96" r="92" 
                                                fill="transparent" 
                                                stroke="currentColor" 
                                                strokeWidth="8"
                                                strokeDasharray={578}
                                                strokeDashoffset={578 - (578 * scanProgress / 100)}
                                                className="text-emerald-500 transition-all duration-300"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
                                            <Camera className="text-emerald-500 mb-2" size={40} />
                                            <span className="text-2xl font-black text-emerald-900">{scanProgress}%</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium animate-bounce flex items-center gap-2">
                                        <RefreshCw className="animate-spin" size={16} /> Identifying Students...
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Recent Attendance Rolls */}
                        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-sm font-medium">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center text-sm">
                                <h3 className="font-bold text-slate-800">Current Roll Call (Live)</h3>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                        <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                                    </div>
                                    <button onClick={() => alert('Exporting as CSV/PDF...')} className="text-emerald-600 font-bold hover:underline">Export</button>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {STUDENTS.map(s => (
                                    <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${s.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                                                {s.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold">{s.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold tracking-widest">{s.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className={`text-xs font-bold ${s.status === 'present' ? 'text-emerald-600' : 'text-slate-300 font-medium'}`}>{s.status.toUpperCase()}</p>
                                                <p className="text-[10px] text-slate-400">{s.method && s.method !== '-' ? `via ${s.method}` : '-'}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => alert(`Marked ${s.name} as Present.`)} className={`p-1.5 rounded-lg border transition-all ${s.status === 'present' ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-300 hover:text-emerald-500'}`}>
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={() => alert(`Marked ${s.name} as Absent.`)} className={`p-1.5 rounded-lg border transition-all ${s.status === 'absent' ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-white border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-500'}`}>
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Stats & Tools */}
                    <div className="space-y-6">
                        <section className="bg-emerald-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-800">
                            <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-emerald-300 underline underline-offset-8 decoration-emerald-500">
                                <Users size={18} /> Engagement Stats
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Avg. Attendance', value: '92%', icon: UserCheck },
                                    { label: 'Geo-Fence Success', value: '98%', icon: MapPin },
                                    { label: 'Manual Overrides', value: '04', icon: RefreshCw },
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center group cursor-pointer" onClick={() => alert(`Detail view for ${stat.label}`)}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-800 text-emerald-400 rounded-xl group-hover:bg-emerald-700 transition-colors">
                                                <stat.icon size={16} />
                                            </div>
                                            <span className="text-xs font-medium text-emerald-100">{stat.label}</span>
                                        </div>
                                        <span className="text-lg font-black text-emerald-300">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertCircle size={18} className="text-amber-500" /> Faculty Insights
                            </h3>
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-4">
                                <p className="text-xs font-bold text-amber-900 leading-relaxed italic">
                                    "Student participation drops significantly after 45 mins of lecture. Scheduled a 5-min AI interactive quiz to boost engagement."
                                </p>
                            </div>
                            <button 
                                onClick={() => alert('Opening AI lesson planner...')}
                                className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
                            >
                                <BookOpen size={16} /> Improve Engagement
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
