'use client';

import React from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { 
    Settings, 
    Calendar, 
    Bell, 
    ShieldCheck, 
    Activity, 
    Save, 
    RefreshCcw, 
    Info,
    CheckCircle,
    ChevronRight,
    Search,
    Edit3,
    GraduationCap,
    Lock,
    Zap
} from 'lucide-react';

const CONFIG_SECTIONS = [
    { id: '1', name: 'Academic Framework', icon: GraduationCap, items: ['Grading System (CGPA)', 'Attendance Threshold (75%)', 'Semester Definition', 'Credit System Configuration'] },
    { id: '2', name: 'Communication Rules', icon: Bell, items: ['MFA Verification Protocol', 'Automated Push Notifications', 'Email Gateway Setup', 'SMS Notification Rules'] },
    { id: '3', name: 'Security & Access', icon: ShieldCheck, items: ['Data Encryption Level', 'RBAC Enforcement Node', 'API Gateway Controls', 'Audit Logging Policy'] },
    { id: '4', name: 'Campus Sync Node', icon: RefreshCcw, items: ['Real-time DB Replication', 'Multi-Campus Sync Frequency', 'Infrastructure IoT Polling', 'Cloud Backup Schedule'] }
];

export default function SystemConfigurationPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-12 italic italic">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 italic">
                            <Settings className="text-indigo-600" />
                            Global System Configuration
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Control the institutional core logic, security nodes, and global sync protocols.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-slate-900 shadow-xl rounded-2xl px-8 font-black text-xs uppercase tracking-widest">
                           <Save size={18} className="mr-2"/> Commit Institutional Config
                        </Button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Config Sections */}
                    <div className="lg:col-span-8 space-y-8">
                        {CONFIG_SECTIONS.map((section) => (
                            <section key={section.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>
                                 <div className="flex justify-between items-start mb-10 relative z-10 italic italic">
                                    <div className="flex gap-4 items-center">
                                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner"><section.icon size={26}/></div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 italic italic tracking-tight">{section.name}</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 italic">Institutional Protocol Section</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm border border-slate-100">
                                        <Edit3 size={18} /> Configure Node
                                    </button>
                                 </div>

                                 <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="p-6 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white hover:border-indigo-300 transition-all">
                                            <div className="flex gap-3 items-center">
                                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-500 shadow-sm"><CheckCircle size={16}/></div>
                                                <span className="text-xs font-bold text-slate-800 italic uppercase italic tracking-tighter">{item}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-slate-200 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                    ))}
                                 </div>
                            </section>
                        ))}
                    </div>

                    {/* Meta Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden italic italic">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                             
                             <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="p-4 bg-white/10 rounded-2xl">
                                    <Zap size={32} className="text-indigo-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">Core Pulse Active</span>
                                </div>
                             </div>

                             <h4 className="text-2xl font-black mb-4 italic italic">Global Core Identity</h4>
                             <p className="text-xs text-slate-500 leading-relaxed font-bold italic italic mb-10">"The institutional core logic is currently synchronized across all 24 regional nodes. Security verified at 100%."</p>

                             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl mb-8 group hover:bg-white/10 transition-all cursor-pointer">
                                <h5 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-3 italic">Last Global Commit</h5>
                                <div className="flex justify-between items-end italic">
                                    <div>
                                        <p className="font-black text-sm text-slate-200 italic tracking-tighter">System Patch v.4.0.2</p>
                                        <p className="text-[10px] text-slate-500 mt-1 italic tracking-widest italic">Executed 4h ago</p>
                                    </div>
                                    <Badge label="Verified" variant="success" className="bg-emerald-500/20 text-emerald-400 border-none" />
                                </div>
                             </div>

                             <button className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/40 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 italic">
                                <Activity size={16} /> Audit Configuration History
                             </button>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden italic">
                             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 italic flex items-center gap-2 italic">
                                <Info className="text-amber-500" size={18} /> Deployment Notice
                             </h3>
                             <p className="text-xs text-slate-500 leading-relaxed font-medium italic italic">"Changes to the **Grading System** or **Attendance Threshold** will trigger a global recalculation protocol. Access limited to Super Admin agents only."</p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
