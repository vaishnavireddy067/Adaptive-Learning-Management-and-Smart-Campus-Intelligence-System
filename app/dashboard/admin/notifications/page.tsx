'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ROLES } from '@/utils/constants';
import { Bell, Send, Users, AlertTriangle, Clock, Search, Filter, Mail, MessageSquare, ShieldAlert } from 'lucide-react';

export default function AdminNotificationsPage() {
    const [message, setMessage] = useState('');
    const [sendTo, setSendTo] = useState('All Students');

    const handleBroadcast = () => {
        if (!message) return alert('Please enter a message.');
        alert(`Broadcasting to ${sendTo}:\n\n"${message}"\n\nNotification queued for 4,200 recipients.`);
        setMessage('');
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">Communication Center</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Bell className="text-amber-500" />
                            Notifications Hub
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Send real-time broadcasts and emergency alerts across campus.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Composer */}
                    <div className="lg:col-span-8 space-y-6">
                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Send className="text-indigo-600" size={20} />
                                Broadcast Composer
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Target Audience</label>
                                        <select 
                                            value={sendTo}
                                            onChange={(e) => setSendTo(e.target.value)}
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        >
                                            <option>All Students</option>
                                            <option>All Faculty</option>
                                            <option>CSE Dept Only</option>
                                            <option>Block B Residents</option>
                                            <option>Alumni Network</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Priority Level</label>
                                        <div className="flex gap-2">
                                            {['Normal', 'Urgent', 'Emergency'].map(p => (
                                                <button key={p} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest border rounded-xl transition-all ${p === 'Emergency' ? 'border-rose-100 bg-rose-50 text-rose-600' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Your Message</label>
                                    <textarea 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type campus-wide announcement here..."
                                        className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                    />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><Mail size={18} /></button>
                                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><MessageSquare size={18} /></button>
                                    </div>
                                    <button 
                                        onClick={handleBroadcast}
                                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        Execute Broadcast <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Recent Success Transmissions</h3>
                            <div className="space-y-4">
                                {[
                                    { target: 'All Students', msg: 'Semester results are now live on the portal.', time: '2h ago', status: 'delivered' },
                                    { target: 'Faculty', msg: 'Emergency maintenance scheduled for Block B Server Room.', time: 'Yesterday', status: 'read' },
                                ].map((n, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                            <Bell size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h5 className="text-xs font-black text-slate-900 uppercase">To: {n.target}</h5>
                                                <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium mt-1 truncate max-w-md">{n.msg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Stats & Tools */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-rose-600 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <ShieldAlert size={20} className="text-rose-200" />
                                Emergency Control
                            </h3>
                            <p className="text-xs text-rose-100 font-medium leading-relaxed mb-8 italic">
                                Use with extreme caution. This will trigger sirens, lock digital gates, and push urgent SMS to all registered mobile numbers.
                            </p>
                            <button className="w-full py-4 bg-white text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-90 transition-all">
                                Protocol Zero Launch
                            </button>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm italic">
                                <Users className="text-indigo-500" size={18} /> Audience Reach
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Read Rate</span>
                                        <span className="text-xs font-black text-slate-900">72%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '72%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Success</span>
                                        <span className="text-xs font-black text-slate-900">99.8%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99%' }}></div>
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
