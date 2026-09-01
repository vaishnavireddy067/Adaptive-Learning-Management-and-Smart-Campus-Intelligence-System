'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { 
    ShieldCheck, 
    Users, 
    Lock, 
    Eye, 
    Edit3, 
    Trash2, 
    Plus, 
    Info,
    ChevronRight,
    Settings,
    Activity,
    Check
} from 'lucide-react';

const MOCK_ROLES = [
    { 
        id: '1', 
        name: 'Super Admin', 
        users: 2, 
        permissions: ['all_access', 'system_config', 'user_management', 'financial_control'],
        status: 'Immutable'
    },
    { 
        id: '2', 
        name: 'Dept Admin (HOD)', 
        users: 12, 
        permissions: ['dept_read', 'dept_write', 'timetable_gen', 'staff_coord'],
        status: 'Active'
    },
    { 
        id: '3', 
        name: 'Faculty', 
        users: 145, 
        permissions: ['attendance_write', 'grades_write', 'content_read'],
        status: 'Active'
    },
    { 
        id: '4', 
        name: 'Student', 
        users: 4250, 
        permissions: ['content_read', 'exams_apply', 'fees_pay'],
        status: 'Active'
    }
];

const PERMISSIONS_LIST = [
    { key: 'all_access', label: 'Full System Access', category: 'Admin' },
    { key: 'user_management', label: 'Manage Users/Roles', category: 'Admin' },
    { key: 'financial_control', label: 'Financial Audit Access', category: 'Admin' },
    { key: 'dept_write', label: 'Write Dept Records', category: 'Dept' },
    { key: 'timetable_gen', label: 'Generate Timetables', category: 'Academic' },
    { key: 'grades_write', label: 'Modify Grades', category: 'Academic' },
];

export default function RolesPermissionsPage() {
    const [selectedRole, setSelectedRole] = useState(MOCK_ROLES[1]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="super-admin" />

            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-start mb-12 italic">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <ShieldCheck className="text-indigo-600" />
                            Security Framework & RBAC
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Define granular access nodes and role-based permissions across the institutional ecosystem.</p>
                    </div>
                    <Button className="bg-slate-900 shadow-xl rounded-2xl font-black text-xs uppercase tracking-widest px-8">
                       <Plus size={18} className="mr-2"/> Create Enterprise Role
                    </Button>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Roles List */}
                    <div className="lg:col-span-4 space-y-4">
                        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2 italic italic italic italic flex items-center gap-2 italic italic"><Users size={14}/> Institutional Roles</h3>
                        {MOCK_ROLES.map((role) => (
                            <div 
                                key={role.id} 
                                onClick={() => setSelectedRole(role)}
                                className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${selectedRole.id === role.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl translate-x-1' : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${selectedRole.id === role.id ? 'bg-white/10' : 'bg-slate-50 text-indigo-600'}`}>
                                        <Lock size={20} />
                                    </div>
                                    <Badge 
                                        label={role.status} 
                                        variant={role.status === 'Immutable' ? 'info' : 'success'}
                                        className={`text-[8px] font-black uppercase ${selectedRole.id === role.id ? 'bg-white/10 border-white/20 text-white' : ''}`}
                                    />
                                </div>
                                <h4 className="text-lg font-black leading-tight italic">{role.name}</h4>
                                <div className="mt-4 flex justify-between items-center italic">
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedRole.id === role.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                                        {role.users} Active Users
                                    </p>
                                    <ChevronRight size={18} className={selectedRole.id === role.id ? 'text-white' : 'text-slate-300'} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Permissions Config */}
                    <div className="lg:col-span-8">
                        <section className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="p-10 border-b border-slate-100 bg-slate-50/50 italic italic italic italic italic">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-black text-slate-900 italic italic">{selectedRole.name}</h2>
                                            <Badge label="Node Control" variant="neutral" className="bg-slate-900 text-white border-none py-0.5" />
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium italic italic">"Granular capability mapping for {selectedRole.name.toLowerCase()} agents."</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all"><Edit3 size={18}/></button>
                                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-600 transition-all"><Trash2 size={18}/></button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { label: 'Login Security', val: 'MFA Enabled', icon: ShieldCheck },
                                        { label: 'Role Level', val: 'Enterprise', icon: Activity },
                                        { label: 'Audit Log', val: 'Permanent', icon: Eye },
                                    ].map((m, i) => (
                                        <div key={i} className="flex gap-3 items-center">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><m.icon size={16}/></div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none italic">{m.label}</p>
                                                <p className="text-[10px] font-black text-slate-900 mt-1 italic tracking-tight">{m.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 space-y-8 flex-1">
                                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 italic flex items-center gap-2 italic italic italic italic">
                                    <Settings size={18} className="text-slate-400" /> Granular Permission Matrix
                                </h3>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    {PERMISSIONS_LIST.map((perm) => (
                                        <div key={perm.key} className="p-5 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:border-indigo-300 transition-all cursor-pointer">
                                            <div className="flex gap-4 items-center">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedRole.permissions.includes(perm.key) ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>
                                                    <Check size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic">{perm.label}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{perm.category} Protocol</p>
                                                </div>
                                            </div>
                                            <div className="w-10 h-6 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                                                <div className={`w-4 h-4 rounded-full transition-all ${selectedRole.permissions.includes(perm.key) ? 'bg-indigo-600 translate-x-4 shadow-sm' : 'bg-slate-300 translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center italic">
                                <div className="flex gap-2 items-center text-slate-400">
                                    <Info size={16}/>
                                    <span className="text-[10px] font-bold uppercase tracking-widest italic">System records all permission modifications.</span>
                                </div>
                                <Button className="bg-indigo-600 rounded-2xl px-10 font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100">Synchronize Security Nodes</Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
