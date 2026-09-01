'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { TextArea } from '../../../../components/ui/TextArea';
import { Select } from '../../../../components/ui/Select';
import { Badge } from '../../../../components/ui/Badge';
import { 
    FileText, 
    Send, 
    Users, 
    ShieldAlert, 
    History, 
    Search, 
    Trash2, 
    Calendar,
    ChevronRight,
    Paperclip,
    AlertCircle,
    Eye,
    Tag,
    Clock
} from 'lucide-react';
import { DEPARTMENTS } from '../../../../utils/constants';

const MOCK_CIRCULARS = [
    { id: '1', title: 'Summer Internship Guidelines', content: 'Detailed guidelines for the mandatory summer internship for 3rd year students have been attached.', target: 'Student', dept: 'All', priority: 'High', date: '2026-03-29 10:45 AM', views: 245, status: 'Published' },
    { id: '2', title: 'Revised Exam Pattern (NEP)', content: 'Faculty members are requested to review the revised exam pattern update under NEP 2020.', target: 'Faculty', dept: 'All', priority: 'Normal', date: '2026-03-28 04:10 PM', views: 120, status: 'Published' },
    { id: '3', title: 'Block B Power Maintenance', content: 'Scheduled power maintenance in Block B this weekend. Affects CSE and ECE labs.', target: 'Global', dept: 'CSE, ECE', priority: 'Urgent', date: '2026-03-27 11:30 AM', views: 890, status: 'Archived' },
];

export default function CircularsPage() {
    const [circulars, setCirculars] = useState(MOCK_CIRCULARS);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        target: 'Global',
        dept: 'All',
        priority: 'Normal'
    });

    const targetOptions = [
        { label: 'Global (Everyone)', value: 'Global' },
        { label: 'Students Only', value: 'Student' },
        { label: 'Faculty Only', value: 'Faculty' },
        { label: 'Admins Only', value: 'Admin' }
    ];

    const deptOptions = [
        { label: 'All Departments', value: 'All' },
        ...DEPARTMENTS.map(d => ({ label: d, value: d }))
    ];

    const priorityOptions = [
        { label: 'Normal', value: 'Normal' },
        { label: 'High', value: 'High' },
        { label: 'Urgent', value: 'Urgent' }
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
            views: 0,
            status: 'Published'
        };

        setCirculars([newMsg, ...circulars]);
        setFormData({ title: '', content: '', target: 'Global', dept: 'All', priority: 'Normal' });
        alert(`Official Circular issued effectively to ${formData.target} (${formData.dept})!`);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <PageHeader 
                    title="Official Circulars" 
                    subtitle="create and manage institutional notices & campus orders"
                />

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Composer */}
                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 blur-3xl rounded-full"></div>
                             
                             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="text-indigo-600" size={20} />
                                Compose Circular
                             </h3>

                             <form onSubmit={handlePublish} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <Select 
                                        label="Target Role"
                                        options={targetOptions}
                                        value={formData.target}
                                        onChange={(e) => setFormData({...formData, target: e.target.value})}
                                    />
                                    <Select 
                                        label="Priority"
                                        options={priorityOptions}
                                        value={formData.priority}
                                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                    />
                                </div>

                                <Select 
                                    label="Target Department"
                                    options={deptOptions}
                                    value={formData.dept}
                                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                                />

                                <Input 
                                    label="Circular Title"
                                    placeholder="e.g. Mandatory Lab Dress Code"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />

                                <TextArea 
                                    label="Official Content"
                                    placeholder="Write the official notice content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    required
                                />

                                <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer">
                                    <Paperclip size={20} className="mb-1" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Attach PDF Document</span>
                                </div>

                                <Button type="submit" className="w-full bg-slate-900 text-white py-6 text-lg rounded-2xl shadow-xl hover:bg-slate-800 transition-all font-black">
                                    Issue Official Circular
                                </Button>
                             </form>
                        </section>
                    </div>

                    {/* Circular History */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tighter text-sm italic">
                                <History size={18} className="text-slate-400" /> Issued Circular Logs
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Filter Logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none w-64"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100 italic">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Notice Detail</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Audience</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Reach</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {circulars.map((msg) => (
                                        <tr key={msg.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-6 max-w-[300px]">
                                                <div className="flex gap-4 items-start">
                                                    <div className={`mt-1 p-2 rounded-lg shrink-0 ${
                                                        msg.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' :
                                                        msg.priority === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                        <AlertCircle size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{msg.title}</h4>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                                            <Tag size={10}/> {msg.dept}
                                                            <Clock size={10} className="ml-2"/> {msg.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <Badge label={msg.target} variant="neutral" className="text-[9px] font-black uppercase tracking-widest px-2" />
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <div className="flex items-center gap-1 text-slate-900 font-black text-xs">
                                                        <Eye size={12} className="text-slate-400" /> {msg.views}
                                                    </div>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Read Receipts</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${
                                                    msg.status === 'Published' ? 'text-emerald-500 border-emerald-100 bg-emerald-50' : 'text-slate-400 border-slate-100 bg-slate-50'
                                                }`}>
                                                    {msg.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 text-slate-200 hover:text-indigo-600 transition-all"><ChevronRight size={20}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
