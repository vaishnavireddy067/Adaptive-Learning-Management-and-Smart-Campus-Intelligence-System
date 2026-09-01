'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Users, Plus, Search, Edit3, Trash2, ShieldCheck, Mail, Phone, CheckCircle, X, Eye } from 'lucide-react';

const INITIAL_USERS = [
    { id: 'U001', name: 'Dr. Priya Chakraborty', email: 'priya.c@avniet.edu', phone: '9876543210', role: 'faculty', dept: 'Computer Science', status: 'Active', joined: 'Jan 2023' },
    { id: 'U002', name: 'Aarav Sharma', email: 'aarav.s@avniet.edu', phone: '9123456789', role: 'student', dept: 'Computer Science', status: 'Active', joined: 'Aug 2023' },
    { id: 'U003', name: 'Prof. Manoj Nair', email: 'manoj.n@avniet.edu', phone: '9988776655', role: 'faculty', dept: 'Data Science', status: 'Active', joined: 'Jun 2021' },
    { id: 'U004', name: 'Sneha Patel', email: 'sneha.p@avniet.edu', phone: '9012345678', role: 'student', dept: 'AI & ML', status: 'Inactive', joined: 'Aug 2022' },
    { id: 'U005', name: 'Dr. Suresh Raju', email: 'suresh.r@avniet.edu', phone: '9765432100', role: 'admin', dept: 'Administration', status: 'Active', joined: 'Mar 2020' },
    { id: 'U006', name: 'Kiran Rao', email: 'kiran.r@avniet.edu', phone: '9432176543', role: 'student', dept: 'ECE', status: 'Active', joined: 'Aug 2024' },
    { id: 'U007', name: 'Dr. Anjali Verma', email: 'anjali.v@avniet.edu', phone: '9871234560', role: 'faculty', dept: 'Mechanical', status: 'Active', joined: 'Jul 2022' },
];

const ROLE_STYLE: Record<string, string> = {
    student: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    faculty: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    admin: 'bg-amber-50 text-amber-700 border-amber-100',
};

export default function UserManagementPage() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [showAdd, setShowAdd] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', dept: '', phone: '' });

    const roles = ['All', 'student', 'faculty', 'admin'];
    const filtered = users.filter(u =>
        (filter === 'All' || u.role === filter) &&
        (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    );

    const toggleStatus = (id: string) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    const deleteUser = (id: string) => { if (confirm('Remove this user?')) setUsers(prev => prev.filter(u => u.id !== id)); };

    const addUser = () => {
        if (!newUser.name || !newUser.email) return;
        setUsers(prev => [{
            id: `U${String(prev.length + 1).padStart(3, '0')}`, ...newUser, status: 'Active', joined: 'Mar 2026'
        }, ...prev]);
        setNewUser({ name: '', email: '', role: 'student', dept: '', phone: '' });
        setShowAdd(false);
    };

    const counts = { all: users.length, student: users.filter(u => u.role === 'student').length, faculty: users.filter(u => u.role === 'faculty').length, admin: users.filter(u => u.role === 'admin').length };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="User Management"
                    subtitle="Add, manage, and monitor all campus users — students, faculty, and admins."
                    action={
                        <Button onClick={() => setShowAdd(true)}>
                            <Plus size={16} className="mr-2" /> Add User
                        </Button>
                    }
                />

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-4 mb-8">
                    {[
                        { label: 'Total Users', value: counts.all, color: 'slate' },
                        { label: 'Students', value: counts.student, color: 'indigo' },
                        { label: 'Faculty', value: counts.faculty, color: 'emerald' },
                        { label: 'Admins', value: counts.admin, color: 'amber' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.label}</p>
                            <p className={`text-3xl font-black text-${s.color}-600`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Add User Modal */}
                {showAdd && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-slate-800 text-lg">Add New User</h3>
                                <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X size={18} /></button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Full Name', key: 'name', placeholder: 'e.g. Dr. Priya Sharma' },
                                    { label: 'Email', key: 'email', placeholder: 'name@avniet.edu' },
                                    { label: 'Phone', key: 'phone', placeholder: '9876543210' },
                                    { label: 'Department', key: 'dept', placeholder: 'Computer Science' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">{f.label}</label>
                                        <input value={(newUser as any)[f.key]} onChange={e => setNewUser(p => ({ ...p, [f.key]: e.target.value }))}
                                            placeholder={f.placeholder}
                                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Role</label>
                                    <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                                        <option value="student">Student</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <Button variant="outline" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
                                <Button onClick={addUser} className="flex-1">Add User</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
                        <div className="flex gap-2">
                            {roles.map(r => (
                                <button key={r} onClick={() => setFilter(r)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize border transition-all ${filter === r ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-500 border-slate-200 hover:border-slate-400'}`}>
                                    {r}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 w-52" />
                        </div>
                    </div>

                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {['User', 'Contact', 'Role', 'Department', 'Status', 'Joined', 'Actions'].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center shrink-0">{u.name[0]}</div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-800">{u.name}</p>
                                                <p className="text-[10px] text-slate-400">{u.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-xs text-slate-600 flex items-center gap-1"><Mail size={11} className="text-slate-400" /> {u.email}</p>
                                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Phone size={11} /> {u.phone}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-black capitalize px-2.5 py-1 rounded-full border ${ROLE_STYLE[u.role]}`}>{u.role}</span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-600">{u.dept}</td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => toggleStatus(u.id)}
                                            className={`text-[10px] font-black px-2.5 py-1 rounded-full border transition-colors ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                                            {u.status}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4 text-xs text-slate-400">{u.joined}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"><Eye size={14} /></button>
                                            <button onClick={() => deleteUser(u.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
                        Showing {filtered.length} of {users.length} users
                    </div>
                </div>
            </main>
        </div>
    );
}
