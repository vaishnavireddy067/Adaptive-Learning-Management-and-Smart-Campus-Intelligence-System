'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES, CAMPUS_BLOCKS, DEPARTMENTS } from '@/utils/constants';
import { MapPin, Users, BookOpen, Clock, Plus, Search, Filter, Box } from 'lucide-react';

const ROOMS = [
    // Block B - ECE & CSE
    { id: '101', block: 'Block B', floor: 'Ground', type: 'CSE Lecture Hall', capacity: 60, dept: 'Computer Science', status: 'In Use' },
    { id: '201', block: 'Block B', floor: '1st', type: 'ECE Lab', capacity: 30, dept: 'Electrical & Computer Engineering', status: 'Free' },
    { id: '305', block: 'Block B', floor: '2nd', type: 'Research Room', capacity: 20, dept: 'Computer Science', status: 'In Use' },
    { id: '408', block: 'Block B', floor: '3rd', type: 'Seminar Hall', capacity: 120, dept: 'Computer Science', status: 'Free' },
    
    // Block C - Remaining Branches
    { id: '105', block: 'Block C', floor: 'Ground', type: 'Workshop', capacity: 45, dept: 'Mechanical', status: 'In Use' },
    { id: '202', block: 'Block C', floor: '1st', type: 'Data Science Lab', capacity: 30, dept: 'Data Science', status: 'Maintenance' },
    { id: '310', block: 'Block C', floor: '2nd', type: 'Studio', capacity: 25, dept: 'Civil', status: 'Free' },
    { id: '401', block: 'Block C', floor: '3rd', type: 'Cyber Lab', capacity: 40, dept: 'Cyber Security', status: 'In Use' },

    // Block A - Administrative
    { id: '101', block: 'Block A', floor: 'Ground', type: 'Reception/Admin', capacity: 20, dept: 'Administration', status: 'In Use' },
];

export default function RoomAllocationPage() {
    const [selectedBlock, setSelectedBlock] = useState<'All' | typeof CAMPUS_BLOCKS[number]>('All');

    const filteredRooms = selectedBlock === 'All' ? ROOMS : ROOMS.filter(r => r.block === selectedBlock);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <MapPin className="text-indigo-600" />
                            Room Allocation & Inventory
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Manage space utilization across Blocks A, B, and C.</p>
                    </div>
                    <button 
                        onClick={() => alert('New room configuration wizard launched.')}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                        <Plus size={20} /> Configure Room
                    </button>
                </header>

                <div className="flex gap-3 mb-8 ring-1 ring-slate-200 bg-white p-1.5 rounded-2xl w-fit shadow-sm">
                    {['All', ...CAMPUS_BLOCKS].map(block => (
                        <button 
                            key={block}
                            onClick={() => setSelectedBlock(block as any)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${selectedBlock === block ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {block}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {filteredRooms.map(room => (
                            <div key={`${room.block}-${room.id}`} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-300 transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${
                                        room.status === 'In Use' ? 'bg-indigo-50 text-indigo-600' : 
                                        room.status === 'Free' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                    }`}>
                                        <span className="text-[10px] uppercase leading-none mb-1 opacity-60">{room.block.split(' ')[1]}</span>
                                        <span className="text-xl leading-none">{room.id}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{room.type} • {room.floor} Floor</h4>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                <Users size={12} /> Capacity: {room.capacity}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                <BookOpen size={12} /> {room.dept}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                                            room.status === 'In Use' ? 'bg-indigo-100 text-indigo-600' : 
                                            room.status === 'Free' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                        }`}>
                                            {room.status}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => alert(`Opening allocation calendar for ${room.block} - ${room.id}`)}
                                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                    >
                                        <Clock size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Box className="text-indigo-400" size={20} /> Space Usage AI
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Peak Utilization</p>
                                    <p className="text-2xl font-black text-white">92% <span className="text-xs font-medium text-emerald-400">@ 10:30 AM</span></p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Underused Space</p>
                                    <p className="text-2xl font-black text-white">Block C <span className="text-xs font-medium text-rose-400">-15% variance</span></p>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg active:scale-95">
                                Re-optimize Allocations
                            </button>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm italic">
                                <Filter size={18} className="text-slate-400" /> Advanced Filter
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Department</label>
                                    <select className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none">
                                        <option>All Departments</option>
                                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Room Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Hall', 'Lab', 'Workshop'].map(t => (
                                            <button key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-indigo-50 hover:text-indigo-600">
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
