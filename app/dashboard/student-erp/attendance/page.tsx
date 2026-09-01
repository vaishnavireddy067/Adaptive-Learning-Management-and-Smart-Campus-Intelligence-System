'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area, CartesianGrid } from 'recharts';
import { PieChart, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, TrendingDown, Target } from 'lucide-react';

const data = [
  { subject: 'AI', name: 'Artificial Intelligence', attendance: 85, fill: '#6366f1', status: 'Good' },
  { subject: 'ML', name: 'Machine Learning', attendance: 75, fill: '#f43f5e', status: 'Warning' },
  { subject: 'DS', name: 'Data Science Foundations', attendance: 92, fill: '#10b981', status: 'Excellent' },
  { subject: 'BDA', name: 'Big Data Analytics', attendance: 68, fill: '#f59e0b', status: 'Critical' },
  { subject: 'PY', name: 'Python for DS', attendance: 88, fill: '#3b82f6', status: 'Good' },
];

const trendData = [
  { week: 'Week 1', attendance: 82 },
  { week: 'Week 2', attendance: 85 },
  { week: 'Week 3', attendance: 80 },
  { week: 'Week 4', attendance: 88 },
  { week: 'Week 5', attendance: 81 },
  { week: 'Week 6', attendance: 81.3 },
];

export default function StudentERPAttendance() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader 
        title="AI & DS Attendance Analytics"
        subtitle="Detailed breakdown of your academic participation across all AI & DS subjects."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column - Main Charts */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full"></div>
                <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Overall Score</h4>
                <div className="text-4xl font-black text-slate-800 tracking-tighter mb-1">81.3%</div>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <ArrowUpRight size={14} /> +2.4% <span className="text-slate-400 opacity-60 ml-1">since last week</span>
                </div>
                <div className="absolute top-8 right-8 text-emerald-100 group-hover:scale-110 transition-transform"><Activity size={24} /></div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full"></div>
                <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Total Classes</h4>
                <div className="text-4xl font-black text-slate-800 tracking-tighter mb-1">240</div>
                <p className="text-slate-400 text-xs mt-1 font-medium">195 attended | 45 missed</p>
                <div className="absolute top-8 right-8 text-rose-100 group-hover:scale-110 transition-transform"><Target size={24} /></div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full"></div>
                <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Safe Margin</h4>
                <div className="text-4xl font-black text-indigo-600 tracking-tighter mb-1">6.3%</div>
                <p className="text-slate-400 text-xs mt-1 font-medium">Above college minimum (75%)</p>
                <div className="absolute top-8 right-8 text-indigo-100 group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <PieChart className="text-indigo-600" size={24} /> Subject Breakdown
            </h3>
            <div className="h-80 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis 
                            dataKey="subject" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 'bold' }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            domain={[0, 100]}
                        />
                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                        />
                        <Bar dataKey="attendance" radius={[12, 12, 12, 12]} barSize={40}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                {data.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md hover:border-slate-100 transition-all border border-transparent">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shadow-lg text-sm" style={{ backgroundColor: item.fill }}>
                                {item.subject}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                                    item.status === 'Excellent' ? 'text-emerald-500' : 
                                    item.status === 'Good' ? 'text-indigo-500' : 
                                    item.status === 'Warning' ? 'text-amber-500' : 'text-rose-500'
                                }`}>{item.status}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-black text-slate-800 tracking-tighter">{item.attendance}%</div>
                            <p className="text-[10px] text-slate-400 font-medium">Goal: 85%</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right - Sidebar Activity */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-indigo-600" size={22} /> Weekly Trends
                </h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area 
                                type="monotone" 
                                dataKey="attendance" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorTrend)" 
                            />
                            <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 animate-pulse">
                        <Activity size={24} />
                    </div>
                    <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">AI Diagnosis</h4>
                    <p className="font-bold text-lg mb-4 text-white leading-snug pr-4">Critical Warning: Big Data Analytics attendance fell to 68%</p>
                    <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                        If you miss 2 more classes in BDA, you will be ineligible for the final semester exam. Apply for medical leave now.
                    </p>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl text-xs transition-colors shadow-lg shadow-indigo-900/40">
                        Apply Medical Leave
                    </button>
                    <button className="w-full py-3 text-slate-500 hover:text-white transition-colors text-xs font-bold mt-2">
                        Dismiss Alert
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
