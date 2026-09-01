'use client';

import React from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { 
    Download, 
    Database, 
    RefreshCcw, 
    ShieldCheck, 
    AlertCircle, 
    Server, 
    Cloud, 
    HardDrive,
    History,
    CheckCircle,
    Activity,
    Lock
} from 'lucide-react';

const BACKUP_HISTORY = [
    { id: '1', date: '2026-03-29 04:00 AM', type: 'Full System', size: '4.2 GB', status: 'Success', method: 'Cloud' },
    { id: '2', date: '2026-03-28 04:00 AM', type: 'Database Mirror', size: '1.8 GB', status: 'Success', method: 'Hybrid' },
    { id: '3', date: '2026-03-27 04:00 AM', type: 'Incremental Files', size: '850 MB', status: 'Success', method: 'Local' },
    { id: '4', date: '2026-03-26 04:00 AM', type: 'Full System', size: '4.1 GB', status: 'Incomplete', method: 'Cloud' },
];

export default function BackupManagementPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 italic">
                            <Database className="text-indigo-600" />
                            Data Fortress Management
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Critical system backups and institutional disaster recovery control.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-indigo-600 shadow-xl shadow-indigo-100 py-6 px-8 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all">
                           <RefreshCcw size={20} className="mr-2"/> Initiate Full Backup
                        </Button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Visual Status Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
                             
                             <div className="flex justify-between items-start mb-10">
                                <div className="p-4 bg-white/10 rounded-2xl">
                                    <ShieldCheck size={32} className="text-indigo-400" />
                                </div>
                                <Badge label="System Protected" variant="success" className="bg-emerald-500/20 text-emerald-300 border-none px-3 font-black text-[9px]" />
                             </div>

                             <h2 className="text-2xl font-black mb-2 italic">Institutional Integrity</h2>
                             <p className="text-sm text-slate-500 font-medium mb-10 italic">"Global data synchronicity is currently at 100% across all campus nodes."</p>

                             <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic flex items-center gap-2 italic flex items-center gap-2"><Lock size={12}/> DB Resilience</span>
                                    <span className="text-xs font-black">99.9%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '99%' }}></div>
                                </div>
                             </div>

                             <button onClick={() => alert('Launching Critical System Restore Wizard. Unauthorized access is recorded.')} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-900/40 hover:bg-rose-700 transition-all flex items-center justify-center gap-2 italic">
                                <AlertCircle size={16} /> Danger Zone: System Restore
                             </button>
                        </section>

                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 blur-2xl rounded-full translate-x-12 -translate-y-12"></div>
                             <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2 italic flex items-center gap-2"><Server size={14}/> Active Sync Nodes</h3>
                             <div className="space-y-4">
                                {[
                                    { name: 'Global Cloud Node', status: 'Healthy', icon: Cloud },
                                    { name: 'Institutional Local Node', status: 'Healthy', icon: HardDrive },
                                ].map((node, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-xl text-slate-400"><node.icon size={16}/></div>
                                            <span className="text-xs font-black text-slate-700 italic">{node.name}</span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" />
                                    </div>
                                ))}
                             </div>
                        </section>
                    </div>

                    {/* Log Panel */}
                    <div className="lg:col-span-8 flex flex-col">
                        <section className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                             <div className="flex justify-between items-center mb-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-100 italic italic">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <History size={20} className="text-slate-400" /> Automated Integrity Logs
                                    </h3>
                                    <p className="text-[10px] font-black uppercase text-slate-500 mt-1 tracking-widest italic">Daily snapshot audit cycle</p>
                                </div>
                                <Button variant="outline"><Download size={16} className="mr-2"/> Audit Report</Button>
                             </div>

                             <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100 italic">
                                        <tr>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Execution Timestamp</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Backup Definition</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center italic">Size Nodes</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic text-center">Protocol</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Integrity Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {BACKUP_HISTORY.map((log) => (
                                            <tr key={log.id} className="group hover:bg-slate-50 transition-colors">
                                                <td className="px-8 py-6">
                                                   <div className="flex items-center gap-3">
                                                       <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all"><Activity size={14}/></div>
                                                       <span className="text-xs font-black text-slate-900 italic tracking-tighter">{log.date}</span>
                                                   </div>
                                                </td>
                                                <td className="px-8 py-6 text-xs font-black text-slate-600 uppercase tracking-widest italic">{log.type}</td>
                                                <td className="px-8 py-6 text-center text-xs font-bold text-slate-500 italic">{log.size}</td>
                                                <td className="px-8 py-6 text-center italic">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.method}</span>
                                                </td>
                                                <td className="px-8 py-6 text-center italic">
                                                    <div className="flex items-center gap-2">
                                                        {log.status === 'Success' ? <CheckCircle size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-rose-500" />}
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'Success' ? 'text-emerald-500' : 'text-rose-500'}`}>{log.status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
