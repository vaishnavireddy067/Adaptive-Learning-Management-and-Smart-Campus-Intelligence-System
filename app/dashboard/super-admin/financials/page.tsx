'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { Select } from '../../../../components/ui/Select';
import { 
    CreditCard, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    AlertCircle, 
    Search,
    Download,
    Filter,
    Activity,
    Users,
    TrendingDown,
    Building2,
    Calendar,
    ChevronRight,
    LucideIcon
} from 'lucide-react';

const FEE_DATA = {
    totalCollection: "₹4.2 Cr",
    pendingDues: "₹85.4 L",
    avgCollectionRate: "82.5%",
    trend: "+12.4%",
    departmentWise: [
        { name: 'Computer Science', collected: '₹1.2 Cr', pending: '₹12.4 L', status: 'Healthy', trend: '+5.2%', color: 'indigo' },
        { name: 'Data Science', collected: '₹84.2 L', pending: '₹24.8 L', status: 'Warning', trend: '-2.1%', color: 'emerald' },
        { name: 'Electronic Eng.', collected: '₹95.6 L', pending: '₹18.2 L', status: 'Healthy', trend: '+8.4%', color: 'amber' },
        { name: 'Cyber Security', collected: '₹45.6 L', pending: '₹30.0 L', status: 'At Risk', trend: '-6.5%', color: 'rose' },
    ],
    defaulters: [
        { id: 'ST201', name: 'John Doe', roll: 'CS-101', dept: 'Computer Science', due: '₹42,500', semester: 'Sem 4', status: 'Critical', daysOverdue: 12 },
        { id: 'ST284', name: 'Sara Miller', roll: 'DS-204', dept: 'Data Science', due: '₹38,200', semester: 'Sem 2', status: 'Pending', daysOverdue: 4 },
        { id: 'ST092', name: 'Mike Ross', roll: 'CS-092', dept: 'Computer Science', due: '₹12,400', semester: 'Sem 6', status: 'Pending', daysOverdue: 2 },
    ]
};

export default function FinancialAnalyticsPage() {
    const [selectedDept, setSelectedDept] = useState('All Departments');

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <CreditCard className="text-indigo-600" />
                            Financial Intelligence Portal
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Global fee collection analytics and department-wise financial health.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="bg-white border-slate-200">
                           <Download size={18} className="mr-2"/> Export Audit Report
                        </Button>
                        <Button className="bg-indigo-600 shadow-xl shadow-indigo-100">
                           <TrendingUp size={18} className="mr-2"/> AI Forecast
                        </Button>
                    </div>
                </header>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Collection', value: FEE_DATA.totalCollection, trend: '+5.2%', up: true, icon: TrendingUp, color: 'indigo' },
                        { label: 'Pending Dues', value: FEE_DATA.pendingDues, trend: '-2.4%', up: false, icon: AlertCircle, color: 'rose' },
                        { label: 'Collection Rate', value: FEE_DATA.avgCollectionRate, trend: '+1.8%', up: true, icon: Activity, color: 'emerald' },
                        { label: 'Defaulters', value: '42 Students', trend: '-4.2%', up: true, icon: Users, color: 'amber' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all">
                             <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform shadow-inner`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-0.5 text-xs font-black ${stat.up && stat.color !== 'rose' || !stat.up && stat.color === 'rose' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.trend}
                                </div>
                             </div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                             <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Defaulters Table */}
                    <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Critical Dues Tracking</h3>
                                <p className="text-xs text-slate-500 mt-1 font-medium italic italic">AI-flagged student accounts with systematic pending fees.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm">
                                    <Search size={18} />
                                </button>
                                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm">
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100 italic">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Identity</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Semester</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Pending Amount</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-8 py-6 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {FEE_DATA.defaulters.map((student) => (
                                        <tr key={student.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 leading-tight">{student.name}</p>
                                                        <p className="text-[10px] font-black text-indigo-400 mt-1 uppercase tracking-widest">ROLL: {student.roll}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center text-xs font-bold text-slate-600">
                                                {student.semester}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <p className="font-black text-rose-600">{student.due}</p>
                                                <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter italic italic tracking-tighter">{student.daysOverdue} Days Late</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                    student.status === 'Critical' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-amber-100 text-amber-600 border border-amber-200'
                                                }`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button onClick={() => alert(`Sending automated reminder email & SMS to ${student.name}.`)} className="p-2 text-slate-300 hover:text-indigo-600 transition-all">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Department Roster Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                             
                             <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <Building2 className="text-indigo-400" size={24} /> Hierarchy Insights
                             </h3>

                             <div className="space-y-6">
                                {FEE_DATA.departmentWise.map((dept, i) => (
                                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-sm leading-tight text-slate-200">{dept.name}</h4>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Academic Unit</p>
                                            </div>
                                            <Badge 
                                                label={dept.status} 
                                                variant={dept.status === 'Healthy' ? 'success' : dept.status === 'Warning' ? 'warning' : 'error'}
                                                className="text-[8px] py-0 px-2"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic italic italic">Collected</p>
                                                <p className="font-black text-xs text-white underline decoration-emerald-500 decoration-2 underline-offset-4">{dept.collected}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Pending</p>
                                                <p className="font-black text-xs text-rose-400 underline decoration-rose-500 decoration-2 underline-offset-4">{dept.pending}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm italic italic italic italic flex items-center gap-2">
                                <TrendingDown className="text-rose-500" size={18} /> Financial Risky Nodes
                            </h3>
                            <div className="space-y-6">
                                <p className="text-xs text-slate-500 leading-relaxed font-medium italic italic">"Students in Cyber Security show a 45% increase in fee defaults this quarter. System recommends launching a revised payment plan."</p>
                                <Button className="w-full bg-slate-900 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Deploy Revision Strategy</Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
