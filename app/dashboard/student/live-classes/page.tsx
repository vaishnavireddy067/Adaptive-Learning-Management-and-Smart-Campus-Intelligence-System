'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Video, PlayCircle, Users, Clock, Calendar, Mic, MicOff, Camera, CameraOff, MessageSquare, Hand, MonitorUp, PhoneOff, Wifi, Radio, Search, ChevronRight } from 'lucide-react';

const LIVE_CLASSES = [
    { id: 1, subject: 'Python Programming', topic: 'Functions & Decorators', faculty: 'Dr. Priya Chakraborty', time: '10:00 AM – 11:00 AM', status: 'Live', students: 48, section: 'CS-S4A' },
    { id: 2, subject: 'Data Structures', topic: 'Binary Search Trees', faculty: 'Prof. Manoj Nair', time: '11:30 AM – 12:30 PM', status: 'Upcoming', students: 0, section: 'CS-S4A' },
    { id: 3, subject: 'Operating Systems', topic: 'Process Scheduling Algorithms', faculty: 'Dr. Suresh Raju', time: '02:00 PM – 03:00 PM', status: 'Upcoming', students: 0, section: 'CS-S4A' },
    { id: 4, subject: 'Database Management', topic: 'SQL Joins & Indexing', faculty: 'Dr. Anjali Verma', time: '03:30 PM – 04:30 PM', status: 'Upcoming', students: 0, section: 'CS-S4A' },
];

const RECORDINGS = [
    { subject: 'Python Programming', topic: 'List Comprehensions', faculty: 'Dr. Priya Chakraborty', date: 'Mar 25, 2026', duration: '58 min', views: 32 },
    { subject: 'Data Structures', topic: 'AVL Trees', faculty: 'Prof. Manoj Nair', date: 'Mar 25, 2026', duration: '62 min', views: 28 },
    { subject: 'Operating Systems', topic: 'Deadlocks & Prevention', faculty: 'Dr. Suresh Raju', date: 'Mar 24, 2026', duration: '55 min', views: 41 },
    { subject: 'Database Management', topic: 'Normalization (1NF to BCNF)', faculty: 'Dr. Anjali Verma', date: 'Mar 24, 2026', duration: '67 min', views: 37 },
];

function RecordingView({ rec, onExit }: { rec: typeof RECORDINGS[0]; onExit: () => void }) {
    const transcript = [
        { time: '00:05', text: 'Welcome back everyone. Today we are going to dive deep into ' + rec.topic + '.' },
        { time: '02:15', text: 'The core concept here is understanding how the underlying architecture handles these specific calls.' },
        { time: '05:40', text: 'Notice how the performance fluctuates when we increase the load. This is a classic indicator of a bottleneck.' },
        { time: '12:20', text: 'Let’s look at a practical example. On your screen, you can see the code implementation.' },
        { time: '18:45', text: 'A common mistake students make is forgetting to handle the edge cases for the initial handshake.' },
        { time: '25:10', text: 'In the next section, we will discuss how to optimize this for enterprise-scale systems.' },
        { time: '35:00', text: 'If you have any questions about this specific module, please post them in the forum.' },
        { time: '42:30', text: 'Tomorrow, we will proceed with the advanced troubleshooting techniques.' },
    ];

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <div>
                    <h2 className="font-black text-slate-800 text-xl flex items-center gap-3">
                        <PlayCircle className="text-indigo-600" /> {rec.topic}
                    </h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">{rec.subject} • {rec.faculty} • {rec.date}</p>
                </div>
                <Button variant="outline" onClick={onExit} className="rounded-2xl px-6 font-black text-xs hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all">
                    Exit Player
                </Button>
            </div>

            {/* Content area */}
            <div className="flex-1 flex gap-0 overflow-hidden bg-slate-50">
                {/* Left: Video Player */}
                <div className="flex-1 flex flex-col p-10 space-y-6 overflow-y-auto">
                    <div className="aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-200/20 relative overflow-hidden group border-8 border-white">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform cursor-pointer">
                                <PlayCircle size={64} fill="currentColor" className="opacity-80" />
                            </div>
                        </div>
                        {/* Custom Controls UI (Mocked) */}
                        <div className="absolute bottom-6 inset-x-6 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 w-1/3 h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-black text-slate-800 text-2xl tracking-tight">Lecture Overview</h3>
                        <p className="text-slate-500 leading-relaxed text-sm max-w-3xl">
                            In this session, {rec.faculty} provides an in-depth exploration of {rec.topic}. 
                            Special focus is given to performance optimizations and real-world deployment strategies used in the field today.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Button className="px-6 rounded-2xl bg-slate-900 font-bold text-xs">Download Resources</Button>
                            <Button variant="outline" className="px-6 rounded-2xl font-bold text-xs">Share Session</Button>
                        </div>
                    </div>
                </div>

                {/* Right: Smart Transcript (Speech-to-Text) */}
                <div className="w-[420px] bg-white border-l border-slate-100 flex flex-col shadow-2xl relative">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-black text-slate-800 text-sm flex items-center justify-between">
                            AI Smart Transcript
                            <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">Speech-to-Text</span>
                        </h3>
                        <div className="mt-4 relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                placeholder="Search in transcript..." 
                                className="w-full bg-white border border-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-400 font-bold text-slate-600 transition-all"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                        {transcript.map((line, i) => (
                            <div key={i} className="group hover:bg-indigo-50/30 p-2 rounded-2xl transition-all cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                        {line.time}
                                    </span>
                                    <div className="h-[1px] flex-1 bg-slate-100 group-hover:bg-indigo-200 transition-colors"></div>
                                </div>
                                <p className="text-xs font-bold text-slate-600 leading-relaxed transition-colors group-hover:text-slate-800">
                                    {line.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
                        <Button className="w-full bg-indigo-600 text-white rounded-2xl font-black text-xs py-4 flex items-center justify-center gap-2 group shadow-lg shadow-indigo-100">
                            Download Transcript (PDF) <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ClassroomView({ cls, onExit }: { cls: typeof LIVE_CLASSES[0]; onExit: () => void }) {
    const [mic, setMic] = useState(false);
    const [cam, setCam] = useState(false);
    const [hand, setHand] = useState(false);

    return (
        <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div>
                    <p className="font-black text-white text-lg">{cls.subject}</p>
                    <p className="text-slate-400 text-sm">{cls.topic} • {cls.faculty}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-rose-600 text-white px-3 py-1 rounded-full">
                        <Radio size={12} className="animate-pulse" /> <span className="text-xs font-black">LIVE</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Wifi size={14} /> <span>{cls.students} students</span>
                    </div>
                </div>
            </div>

            {/* Main area */}
            <div className="flex-1 flex gap-4 p-6">
                {/* Video area */}
                <div className="flex-1 bg-slate-800 rounded-3xl flex flex-col items-center justify-center border border-slate-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900" />
                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-black mx-auto mb-4">
                            {cls.faculty[0]}
                        </div>
                        <p className="text-white font-black text-xl">{cls.faculty}</p>
                        <p className="text-slate-400 text-sm mt-1">Camera Off • Mic On</p>
                    </div>
                    {/* Screen share overlay */}
                    <div className="absolute bottom-4 right-4 bg-slate-900/80 rounded-xl px-3 py-2 text-xs text-slate-400 flex items-center gap-2">
                        <MonitorUp size={13} /> Screen Share Active
                    </div>
                </div>

                {/* Chat panel */}
                <div className="w-72 bg-slate-800 rounded-3xl border border-slate-700 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-700">
                        <p className="text-white font-bold text-sm flex items-center gap-2"><MessageSquare size={15} /> Class Chat</p>
                    </div>
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                        {[
                            { user: 'Aarav', msg: 'Can you explain closures again?', time: '10:12' },
                            { user: 'Priya', msg: 'Thank you! Very clear.', time: '10:14' },
                            { user: 'Rahul', msg: 'Is there an assignment for this?', time: '10:15' },
                            { user: 'Tanya', msg: '👍 Great explanation!', time: '10:17' },
                        ].map((c, i) => (
                            <div key={i} className="flex gap-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">{c.user[0]}</div>
                                <div>
                                    <p className="text-[10px] text-indigo-400 font-bold">{c.user} <span className="text-slate-500">{c.time}</span></p>
                                    <p className="text-slate-300 text-xs">{c.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-slate-700">
                        <input placeholder="Type a message..." className="w-full bg-slate-700 text-white text-sm px-3 py-2 rounded-xl focus:outline-none placeholder-slate-500" />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 py-5 border-t border-slate-800">
                <button onClick={() => setMic(!mic)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${mic ? 'bg-slate-700 text-white' : 'bg-slate-600 text-slate-400'}`}>
                    {mic ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
                <button onClick={() => setCam(!cam)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${cam ? 'bg-slate-700 text-white' : 'bg-slate-600 text-slate-400'}`}>
                    {cam ? <Camera size={20} /> : <CameraOff size={20} />}
                </button>
                <button onClick={() => setHand(!hand)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${hand ? 'bg-amber-500 text-white scale-110' : 'bg-slate-700 text-slate-400'}`}>
                    <Hand size={20} />
                </button>
                <button onClick={onExit} className="w-14 h-12 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center transition-colors">
                    <PhoneOff size={20} />
                </button>
            </div>
        </div>
    );
}

export default function LiveClassesPage() {
    const [joining, setJoining] = useState<typeof LIVE_CLASSES[0] | null>(null);
    const [playing, setPlaying] = useState<typeof RECORDINGS[0] | null>(null);

    if (joining) return <ClassroomView cls={joining} onExit={() => setJoining(null)} />;
    if (playing) return <RecordingView rec={playing} onExit={() => setPlaying(null)} />;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Live Classes" subtitle="Join live lectures, interact with faculty, and access recordings." />

                {/* Today's Classes */}
                <div className="mt-6 mb-8 space-y-4">
                    <h2 className="font-black text-slate-800 text-lg">Today's Schedule</h2>
                    {LIVE_CLASSES.map(cls => (
                        <div key={cls.id} className={`bg-white rounded-3xl border shadow-sm p-6 flex items-center gap-6 ${cls.status === 'Live' ? 'border-indigo-200 shadow-indigo-100' : 'border-slate-200'}`}>
                            {/* Time block */}
                            <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 font-black ${cls.status === 'Live' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <span className="text-lg leading-tight">{cls.time.split(' ')[0]}</span>
                                <span className="text-xs">{cls.time.split(' ')[1]}</span>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-black text-slate-800 text-lg">{cls.subject}</h3>
                                    {cls.status === 'Live' && (
                                        <span className="text-[10px] font-black bg-rose-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                                            <Radio size={9} /> LIVE
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500">{cls.topic}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                    <span><Clock size={12} className="inline mr-1" />{cls.time}</span>
                                    <span>{cls.faculty}</span>
                                    {cls.status === 'Live' && <span><Users size={12} className="inline mr-1 text-indigo-400" />{cls.students} joined</span>}
                                </div>
                            </div>

                            <Button
                                onClick={() => cls.status === 'Live' && setJoining(cls)}
                                disabled={cls.status !== 'Live'}
                                className={cls.status === 'Live' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200' : ''}
                                variant={cls.status !== 'Live' ? 'outline' : undefined}
                            >
                                {cls.status === 'Live' ? <><PlayCircle size={16} className="mr-2" /> Join Now</> : <><Calendar size={16} className="mr-2" /> Scheduled</>}
                            </Button>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="font-black text-slate-800 text-lg mb-4">Past Recordings</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {RECORDINGS.map((r, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex gap-4 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
                                onClick={() => setPlaying(r)}>
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                                    <PlayCircle size={24} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-black text-sm text-slate-800 truncate">{r.topic}</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">{r.subject} • {r.faculty}</p>
                                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                                        <span><Calendar size={10} className="inline mr-1" />{r.date}</span>
                                        <span><Clock size={10} className="inline mr-1" />{r.duration}</span>
                                        <span><Users size={10} className="inline mr-1" />{r.views} views</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
