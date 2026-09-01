'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES, CAMPUS_STRUCTURE } from '@/utils/constants';
import { Building2, Zap, Droplets, ShieldCheck, Activity, Map, ArrowUpRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminInfrastructurePage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Global Assets</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Building2 className="text-indigo-600" />
                            Campus Infrastructure
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Real-time monitoring of all blocks and critical utility systems.</p>
                    </div>
                    <div className="flex gap-4 text-sm font-bold">
                        <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Systems Healthy
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Blocks Overview matches Image 1 */}
                    {Object.entries(CAMPUS_STRUCTURE).filter(([key]) => ['BLOCK_A', 'BLOCK_B', 'BLOCK_C'].includes(key)).map(([key, block]) => (
                        <div key={key} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-8">
                                    <Building2 size={24} />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 mb-1">{block.name}</h3>
                                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-8">{block.purpose}</p>
                                
                                <div className="space-y-6 mb-10">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-400 uppercase tracking-widest">Power Load</span>
                                            <span className="text-slate-900">62%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '62%' }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-400 uppercase tracking-widest">Occupancy</span>
                                            <span className="text-slate-900">84%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '84%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <Link 
                                    href={`/dashboard/super-admin/infrastructure/${key}`}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    Analyze Block <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
