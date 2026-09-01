'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES, CAMPUS_STRUCTURE, DEPARTMENTS, ROOM_LOGIC } from '@/utils/constants';
import { Building2, Zap, Droplets, ShieldCheck, Activity, ArrowLeft, Thermometer, Wifi, UserCheck, Search, Filter, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BlockDetailsPage() {
    const params = useParams();
    const blockId = params.blockId as string;
    const block = CAMPUS_STRUCTURE[blockId as keyof typeof CAMPUS_STRUCTURE];

    if (!block) {
        return (
            <div className="flex min-h-screen bg-slate-50 items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-300 mb-4">BLOCK NOT FOUND</h1>
                    <Link href="/dashboard/super-admin/infrastructure" className="text-indigo-600 font-bold hover:underline flex items-center gap-2 justify-center">
                        <ArrowLeft size={18} /> Back to Infrastructure
                    </Link>
                </div>
            </div>
        );
    }

    const floors = Array.from({ length: ROOM_LOGIC.FLOORS }, (_, i) => ({
        id: i,
        name: i === 0 ? "Ground Floor" : `${i}${i === 1 ? 'st' : i === 2 ? 'nd' : 'rd'} Floor`,
        rooms: Array.from({ length: ROOM_LOGIC.ROOMS_PER_FLOOR }, (_, j) => ROOM_LOGIC.GET_ROOM_NAME(i, j))
    }));


    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role={ROLES.SUPER_ADMIN} />
            
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <Link href="/dashboard/super-admin/infrastructure" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4 transition-colors">
                        <ArrowLeft size={14} /> Back to Overview
                    </Link>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <Building2 className="text-indigo-600" />
                                {block.name} Detailed Node Map
                            </h1>
                            <p className="text-slate-500 mt-2 font-medium italic">{block.purpose} • Deep Infrastructure Insights</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                                <Search size={20} />
                            </button>
                            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                     {[
                        { label: 'Total IoT Nodes', value: '42', icon: Wifi, color: 'indigo' },
                        { label: 'Avg. Temp', value: '23°C', icon: Thermometer, color: 'amber' },
                        { label: 'Active Devices', value: '128', icon: Activity, color: 'emerald' },
                        { label: 'Security Breaches', value: '00', icon: ShieldCheck, color: 'rose' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm group">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mb-12">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Floor & Room Status</h3>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Synchronized (Live)</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {floors.map((floor) => (
                            <div key={floor.id} className="p-8 group bg-white hover:bg-slate-50/30 transition-all">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-[2rem] bg-indigo-900 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-indigo-100">
                                            {floor.id}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900">{floor.name} Overview</h4>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Operational • {floor.rooms.length} Active Nodes</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-10">
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Avg Power</p>
                                            <p className="text-sm font-black text-slate-900">12.4 kW</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Humidity</p>
                                            <p className="text-sm font-black text-slate-900">42%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                                    {floor.rooms.map((roomNum, idx) => (
                                        <div key={roomNum} className="group/room relative">
                                            <div className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${idx % 3 === 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-400 hover:text-indigo-600'}`}>
                                                <span className="text-[10px] font-black">{roomNum}</span>
                                                <Activity size={10} className="mt-1 opacity-40" />
                                            </div>
                                            {/* Room Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 p-4 bg-slate-900 text-white rounded-2xl opacity-0 invisible group-hover/room:opacity-100 group-hover/room:visible transition-all z-50 shadow-2xl">
                                                <p className="text-[10px] font-black text-white/40 uppercase mb-2">Room Details</p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center text-[10px]">
                                                        <span>Status</span>
                                                        <span className="text-emerald-400">Online</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px]">
                                                        <span>Occupancy</span>
                                                        <span>{Math.floor(Math.random() * 60)}/60</span>
                                                    </div>
                                                </div>
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                
                {Object.keys(block.departments).length > 0 && (
                    <div className="bg-indigo-900 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full -mr-48 -mt-48" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <Zap className="text-indigo-400" />
                                Departmental Power Allocations
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {block.departments.map((dept: any) => (
                                    <div key={dept} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                                        <h4 className="font-bold text-sm mb-4">{dept}</h4>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">
                                            <span>Current Draw</span>
                                            <span>4.2 kW</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full">
                                            <div className="h-full bg-indigo-500" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
