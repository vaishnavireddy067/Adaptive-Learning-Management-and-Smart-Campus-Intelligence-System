'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Building2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function InfrastructurePage() {
    const blocks = [
        { name: 'Block A', sub: 'ADMINISTRATIVE BLOCK', power: 62, occupancy: 84 },
        { name: 'Block B', sub: 'ECE & CSE BLOCK', power: 62, occupancy: 84 },
        { name: 'Block C', sub: 'ENGINEERING & SCIENCES BLOCK', power: 62, occupancy: 84 },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-800">
            {/* Standard Sidebar - functionality preserved */}
            <Sidebar role="admin" systemType="smart-campus" />

            <main className="flex-1 ml-64 p-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header matches Image 3 */}
                    <header className="flex justify-between items-start mb-12">
                        <div>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Global Assets</span>
                            <h1 className="text-2xl font-bold flex items-center gap-3 mt-1">
                                <Building2 size={24} className="text-indigo-600" />
                                Campus Infrastructure
                            </h1>
                            <p className="text-sm text-slate-400 font-medium mt-1 italic">Real-time monitoring of all blocks and critical utility systems.</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1"></div>
                            Systems Healthy
                        </div>
                    </header>

                    {/* Blocks Grid matching Image 3 with cleaner cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blocks.map((block, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-white hover:border-slate-100 transition-all flex flex-col group">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-sm">
                                    <Building2 size={24} />
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{block.name}</h3>
                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-10 opacity-70 leading-none">{block.sub}</p>

                                    <div className="space-y-10">
                                        {/* Power Load Progress matches Image 3 */}
                                        <div className="group/progress">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Power Load</span>
                                                <span className="text-[11px] font-bold text-slate-900">{block.power}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${block.power}%` }}></div>
                                            </div>
                                        </div>

                                        {/* Occupancy Progress matches Image 3 */}
                                        <div className="group/progress">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Occupancy</span>
                                                <span className="text-[11px] font-bold text-slate-900">{block.occupancy}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${block.occupancy}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full bg-[#1a1f2e] hover:bg-slate-800 text-white h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest mt-4">
                                    ANALYZE BLOCK <ChevronRight size={14} className="ml-2" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
