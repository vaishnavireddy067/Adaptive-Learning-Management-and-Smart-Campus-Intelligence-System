'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Play, Check, AlertCircle, RefreshCw, Wand2, Users, BookOpen, MapPin } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';

const MOCK_CONSTRAINTS = [
    { id: 1, type: 'Faculty', label: 'Dr. Smith: Max 3 classes/day', met: true },
    { id: 2, type: 'Room', label: 'Room 101: Occupied for Labs', met: true },
    { id: 3, type: 'Batch', label: 'CS Batch A: Priority morning slots', met: false },
];

const SCHEDULE = [
    { day: 'Monday', time: '09:00 AM - 10:30 AM', subject: 'Data Structures', room: '101', block: 'Block B', faculty: 'Dr. Smith', type: 'Lecture' },
    { day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Digital Electronics', room: '205', block: 'Block B', faculty: 'Prof. Ray', type: 'Lecture' },
    { day: 'Monday', time: '02:00 PM - 04:00 PM', subject: 'Material Science', room: '108', block: 'Block C', faculty: 'Dr. Kumar', type: 'Lab' },
];

export default function TimetableGeneratorPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationComplete, setGenerationComplete] = useState(false);
    const [activeTab, setActiveTab] = useState<'generate' | 'view'>('generate');

    const handleGenerate = () => {
        setIsGenerating(true);
        setGenerationComplete(false);
        setTimeout(() => {
            setIsGenerating(false);
            setGenerationComplete(true);
            alert('AI Timetable Generated Successfully!\nOptimized 42 slots with 98% constraint satisfaction.');
        }, 2000);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <Wand2 className="text-indigo-600" />
                        AI Timetable Generator
                    </h1>
                    <p className="text-slate-500 mt-2">Intelligent scheduling engine for faculty, rooms, and batches.</p>
                </header>

                <div className="flex gap-4 mb-6 ring-1 ring-slate-200 p-1 rounded-xl bg-white w-fit">
                    <button 
                        onClick={() => setActiveTab('generate')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'generate' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Generation Engine
                    </button>
                    <button 
                        onClick={() => setActiveTab('view')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'view' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Master Schedule
                    </button>
                </div>

                {activeTab === 'generate' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Control Panel */}
                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Play className="text-emerald-500" size={20} />
                                    Launch Scheduler
                                </h2>
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <label className="text-slate-500 block mb-1">Academic Year</label>
                                        <span className="font-bold">2026-27 (Fall)</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <label className="text-slate-500 block mb-1">Conflict Level</label>
                                        <span className="font-bold text-amber-600 italic">Moderate</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isGenerating ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.01] active:scale-95'}`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="animate-spin" size={20} />
                                            AI Engine Processing Constraints...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 size={20} />
                                            Generate Optimized Schedule
                                        </>
                                    )}
                                </button>
                            </section>

                            {/* Constraints Section */}
                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Active Constraints</h2>
                                    <button onClick={() => alert('Add New Constraint Interface Coming Soon!')} className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline">
                                        <Plus size={16} /> Add Constraint
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {MOCK_CONSTRAINTS.map(c => (
                                        <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${c.met ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                    {c.met ? <Check size={16} /> : <AlertCircle size={16} />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{c.label}</p>
                                                    <p className="text-xs text-slate-500">{c.type} Constraint</p>
                                                </div>
                                            </div>
                                            <button onClick={() => alert(`Reviewing ${c.label}`)} className="text-slate-400 hover:text-indigo-600 p-1">
                                                <AlertCircle size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Recent History / Status */}
                        <div className="space-y-6">
                            <section className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg shadow-indigo-200">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <BookOpen size={18} />
                                    Engine Stats
                                </h3>
                                <div className="space-y-4 text-indigo-100 text-sm">
                                    <div className="flex justify-between border-b border-indigo-800 pb-2">
                                        <span>Batches Covered</span>
                                        <span className="font-bold">12 / 12</span>
                                    </div>
                                    <div className="flex justify-between border-b border-indigo-800 pb-2">
                                        <span>Rooms Utilized</span>
                                        <span className="font-bold">85%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-indigo-800 pb-2">
                                        <span>Clash Resolution</span>
                                        <span className="font-bold text-emerald-400">100%</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-xs font-semibold transition-colors">
                                    Download Audit Report
                                </button>
                            </section>

                            {generationComplete && (
                                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                                    <p className="text-emerald-800 text-sm font-medium">Generation Successful!</p>
                                    <p className="text-emerald-600 text-xs mt-1">Found optimal solution in 45 iterations.</p>
                                    <button 
                                        onClick={() => setActiveTab('view')}
                                        className="mt-3 text-emerald-700 text-xs font-bold flex items-center gap-1 hover:underline"
                                    >
                                        View Results →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                        <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900">Interactive Master Schedule</h3>
                        <p className="text-slate-500 max-w-md mx-auto mt-2">The full grid view of all rooms and batches is being rendered based on the latest AI generation.</p>
                        <button onClick={() => alert('Full grid view loading...')} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100">
                            Open Visual Editor
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
