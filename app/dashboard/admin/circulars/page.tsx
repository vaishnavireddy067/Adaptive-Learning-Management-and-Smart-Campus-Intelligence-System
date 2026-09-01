'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { PlusCircle, Bell } from 'lucide-react';

const INITIAL_CIRCULARS = [
    { id: 'c1', title: 'New Semester Schedule', date: '2026-05-15', content: 'The tentative timetable for the upcoming semester is ready for review.', category: 'Academic', status: 'Published' },
    { id: 'c2', title: 'Lab Maintenance Notice', date: '2026-05-20', content: 'Block B Room 204 will be closed for equipment calibration.', category: 'Notice', status: 'Published' },
    { id: 'c3', title: 'Faculty Meeting', date: '2026-05-22', content: 'HOD meeting to discuss internal assessment patterns.', category: 'Staff', status: 'Scheduled' },
];

export default function CircularsPage() {
    const [circulars, setCirculars] = useState(INITIAL_CIRCULARS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', category: 'Academic', content: '' });

    useEffect(() => {
        let isMounted = true;
        fetch('/api/circulars')
            .then(res => res.json())
            .then(data => {
                if (isMounted && Array.isArray(data) && data.length > 0) {
                    const mapped = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        date: item.date,
                        content: item.content,
                        category: item.category || 'General',
                        status: 'Published'
                    }));
                    setCirculars(mapped);
                }
            })
            .catch(() => {});
        return () => { isMounted = false; };
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;

        try {
            await fetch('/api/circulars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } catch (err) {
            console.error(err);
        }

        const newCircular = {
            id: `c${Date.now()}`,
            title: formData.title,
            category: formData.category,
            content: formData.content,
            date: new Date().toISOString().split('T')[0],
            status: 'Published'
        };
        setCirculars([newCircular, ...circulars]);
        setIsModalOpen(false);
        setFormData({ title: '', category: 'Academic', content: '' });
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">Global Communications</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Department Circulars</h1>
                        <p className="text-slate-500 font-medium italic mt-2">"Manage and broadcast internal departmental notices and official communication."</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <PlusCircle size={18} className="mr-2" /> Publish Circular
                    </Button>
                </header>

                <div className="grid gap-6">
                    {circulars.map((c) => (
                        <div key={c.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-amber-400 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{c.date}</span>
                                    <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md uppercase">{c.category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1">{c.title}</h3>
                                <p className="text-slate-500 text-sm italic font-medium">"{c.content}"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${c.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                    {c.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish New Department Circular">
                    <form onSubmit={handleCreate} className="space-y-4">
                        <Input
                            label="Notice Title"
                            placeholder="e.g. Mid-term Exam Guidelines"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <TextArea
                            label="Content / Announcement Details"
                            placeholder="Type circular announcement content..."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                        />
                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit">Broadcast Circular</Button>
                        </div>
                    </form>
                </Modal>
            </main>
        </div>
    );
}

