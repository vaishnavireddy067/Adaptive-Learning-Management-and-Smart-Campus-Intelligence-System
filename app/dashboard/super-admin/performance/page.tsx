'use client';

import React from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { 
    Award, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    Users, 
    CheckCircle, 
    AlertCircle,
    Activity,
    Target,
    BarChart3,
    Trophy,
    Medal,
    LucideIcon
} from 'lucide-react';

const PERFORMANCE_DATA = [
    { rank: 1, name: 'Computer Science', score: 94.8, attendance: 96.2, results: 92.5, status: 'Elite', trend: '+1.2%', color: 'indigo', icon: Trophy, studentsAtRisk: 4 },
    { rank: 2, name: 'Electrical Eng.', score: 88.5, attendance: 90.4, results: 86.2, status: 'Healthy', trend: '+0.8%', color: 'emerald', icon: Medal, studentsAtRisk: 8 },
    { rank: 3, name: 'Civil Eng.', score: 76.2, attendance: 78.5, results: 74.0, status: 'Warning', trend: '-2.4%', color: 'rose', icon: Medal, studentsAtRisk: 15 },
    { rank: 4, name: 'Mechanical Eng.', score: 82.4, attendance: 85.0, results: 79.8, status: 'Healthy', trend: '+0.5%', color: 'amber', icon: Medal, studentsAtRisk: 10 },
];

export default function PerformanceRankingPage() {
    const [activeFilter, setActiveFilter] = React.useState('Global Score');
    const [actionMessage, setActionMessage] = React.useState<string | null>(null);

    const triggerAction = (msg: string) => {
        setActionMessage(msg);
        setTimeout(() => setActionMessage(null), 3000);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 relative">
            <Sidebar role="super-admin" />

            {/* Global Action Toast */}
            {actionMessage && (
                <div className="fixed top-8 right-8 z-[100] bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl border border-white/10 animate-in slide-in-from-top-10 duration-500 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                        <Activity size={20} className="animate-pulse" />
                    </div>
                    <div>
                        <p className="font-black text-sm text-white tracking-tight">{actionMessage}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-0.5">System Sync • Complete</p>
                    </div>
                </div>
            )}

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-8 italic">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <BarChart3 className="text-indigo-600" />
                            Department Performance Ranking
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Global comparison and institutional ranking based on AI-audited performance metrics.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            onClick={() => triggerAction("AI Neural Comparison Initiated...")}
                            className="bg-indigo-600 shadow-xl shadow-indigo-100 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all text-white"
                        >
                           <TrendingUp size={18} className="mr-2"/> AI Competitive Audit
                        </Button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-1 gap-8">
                   <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/10 flex justify-between items-center italic">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Institutional Leaderboard</h3>
                                <p className="text-xs text-slate-500 mt-1 font-medium italic">Comparative analysis across attendance, academic results, and retention.</p>
                            </div>
                            <div className="flex gap-4 p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                                {(['Academic Results', 'Attendance %', 'Global Score'] as const).map(f => (
                                    <button 
                                        key={f} 
                                        onClick={() => setActiveFilter(f)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100 italic italic italic italic">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Rank Nodes</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic italic">Department Entity</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center italic italic">Global Index</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center italic italic">Attendance Sync</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center italic italic">Result Yield</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic italic">Integrity Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {PERFORMANCE_DATA.map((dept) => (
                                        <tr key={dept.rank} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-2xl font-black ${dept.rank === 1 ? 'text-amber-500' : 'text-slate-200'}`}>0{dept.rank}</span>
                                                    {dept.rank === 1 && <div className="p-2 bg-amber-50 text-amber-500 rounded-xl shadow-lg shadow-amber-100"><Trophy size={18}/></div>}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                               <div>
                                                   <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{dept.name}</h4>
                                                   <p className="text-[10px] font-black text-slate-400 uppercase mt-0.5 tracking-widest italic">{dept.studentsAtRisk} Students at potential risk</p>
                                               </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <p className="text-lg font-black text-slate-900 leading-tight italic">{dept.score}</p>
                                                <div className={`flex items-center justify-center gap-0.5 text-[10px] font-black ${dept.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {dept.trend.startsWith('+') ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                                                    {dept.trend}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex justify-center flex-col items-center">
                                                    <span className="text-xs font-black text-slate-600 mb-2 italic tracking-tighter">{dept.attendance}%</span>
                                                    <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full bg-${dept.color}-500 rounded-full`} style={{ width: `${dept.attendance}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center italic">
                                                <p className="font-black text-indigo-600 italic tracking-tighter">{dept.results}%</p>
                                            </td>
                                            <td className="px-8 py-6 italic">
                                                <Badge 
                                                    label={dept.status} 
                                                    variant={dept.status === 'Elite' ? 'success' : dept.status === 'Healthy' ? 'info' : 'warning'}
                                                    className="font-black text-[9px] uppercase tracking-widest px-3 border-none bg-opacity-20"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                   </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 mt-12">
                   <div className="lg:col-span-8 bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10 italic italic">
                            <div className="flex-1">
                                <h3 className="text-2xl font-black mb-4 flex items-center gap-3 italic italic itali"><Activity className="text-indigo-400" /> Strategic Intelligence Shift</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium italic italic italic">"Computer Science shows consistent growth (1.2%) while Civil Engineering is trending downward. System recommends reallocating 15% of the infrastructure budget to Civil modernizing labs to boost student interest."</p>
                            </div>
                            <Button 
                                onClick={() => triggerAction("Institutional Budget Reallocated (CS -> Civil)")}
                                className="bg-white text-slate-900 py-4 px-8 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-slate-50 transition-all shrink-0"
                            >
                                Apply Resource Pivot
                            </Button>

                        </div>
                   </div>
                   <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden italic italic">
                        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2 italic italic"><Target size={14}/> Top Performance Metric</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Global KPI', value: '4.2/5.0', icon: TrendingUp },
                                { label: 'Peer Ranking', value: 'Rank 12', sub: 'Regional Node', icon: Award },
                            ].map((stat, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><stat.icon size={18}/></div>
                                    <div>
                                        <p className="font-black text-slate-900 italic tracking-tighter leading-tight italic">{stat.value}</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic italic italic italic">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                   </div>
                </div>
            </main>
        </div>
    );
}
