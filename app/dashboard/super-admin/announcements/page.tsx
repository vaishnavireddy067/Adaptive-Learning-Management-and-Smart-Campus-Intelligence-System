'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { TextArea } from '../../../../components/ui/TextArea';
import { Select } from '../../../../components/ui/Select';
import { Badge } from '../../../../components/ui/Badge';
import { Megaphone, Send, Users, ShieldAlert, History, Filter, Search, Trash2, Calendar } from 'lucide-react';

const MOCK_ANNOUNCEMENTS = [
    { id: '1', title: 'Campus Holiday: Ugadi Festival', content: 'The campus will remain closed on March 30th for Ugadi. Classes will resume as per schedule from March 31st.', target: 'Global', date: '2026-03-29 09:00 AM', status: 'Active' },
    { id: '2', title: 'Internal Assessment Schedule', content: 'The timetable for the 2nd internal assessment has been published. Please check your respective portals.', target: 'Student', date: '2026-03-28 02:30 PM', status: 'Active' },
    { id: '3', title: 'Global Faculty Meeting', content: 'Requesting all department heads and senior faculty to attend the global strategies meeting in the main auditorium.', target: 'Faculty', date: '2026-03-27 11:15 AM', status: 'Expired' },
];

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        target: 'Global'
    });

    const targetOptions = [
        { label: 'Global (Everyone)', value: 'Global' },
        { label: 'Students Only', value: 'Student' },
        { label: 'Faculty Only', value: 'Faculty' },
        { label: 'Admins Only', value: 'Admin' }
    ];

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

        const newMsg = {
            id: Date.now().toString(),
            ...formData,
            date: formattedDate,
            status: 'Active'
        };

        setAnnouncements([newMsg, ...announcements]);
        setFormData({ title: '', content: '', target: 'Global' });
        alert(`Announcement published effectively to ${formData.target} channel!`);
    };

    const deleteAnnouncement = (id: string) => {
        if(confirm('Delete this announcement?')) {
            setAnnouncements(announcements.filter(a => a.id !== id));
        }
    };

    const filtered = announcements.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <PageHeader 
                    title="Global Announcements" 
                    subtitle="broadcast messages across the entire campus ecosystem"
                />

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Composer */}
                    <div className="lg:col-span-5 space-y-6">
                        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 blur-3xl rounded-full"></div>
                             
                             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Megaphone className="text-indigo-600" size={20} />
                                New Broadcast
                             </h3>

                             <form onSubmit={handlePublish} className="space-y-6 relative z-10">
                                <Select 
                                    label="Target Audience"
                                    options={targetOptions}
                                    value={formData.target}
                                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                                />

                                <Input 
                                    label="Subject Line"
                                    placeholder="e.g. Urgent: Power maintenance in Block B"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />

                                <TextArea 
                                    label="Detailed Message"
                                    placeholder="Write your announcement here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    required
                                />

                                <Button type="submit" className="w-full bg-indigo-600 py-6 text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all">
                                    <Send size={20} className="mr-2" /> Broadcast Message
                                </Button>

                                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest italic">
                                    "The message will be visible on dashboards for {formData.target.toLowerCase()}s immediately."
                                </p>
                             </form>
                        </section>
                    </div>

                    {/* Announcement Feed */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <History size={18} className="text-slate-400" /> Recent Broadcasts
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search History..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none w-48"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filtered.map((msg) => (
                                <div key={msg.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3 items-center">
                                            <div className={`p-2 rounded-xl ${
                                                msg.target === 'Global' ? 'bg-indigo-50 text-indigo-600' :
                                                msg.target === 'Student' ? 'bg-emerald-50 text-emerald-600' :
                                                msg.target === 'Faculty' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                            }`}>
                                                {msg.target === 'Faculty' ? <Users size={18} /> : 
                                                 msg.target === 'Student' ? <Users size={18} /> : <ShieldAlert size={18} />}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{msg.title}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-0.5">
                                                    <Badge label={msg.target} variant="neutral" className="text-[8px] py-0 px-1.5" />
                                                    <span className="flex items-center gap-1"><Calendar size={10}/> {msg.date}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteAnnouncement(msg.id)} className="p-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium italic mb-2">"{msg.content}"</p>
                                    <div className="flex justify-end">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${msg.status === 'Active' ? 'text-emerald-500' : 'text-slate-300'}`}>
                                            ● {msg.status}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {filtered.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 italic text-slate-400 text-sm">
                                    No announcements found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
