'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, MapPin, BookOpen, Camera, Save, CheckCircle, Edit3, Lock, Bell, Shield, Globe } from 'lucide-react';

const STUDENT_PROFILE = {
    name: 'Anugu Vaishnavi',
    email: 'vaishnavi.a@avniet.edu',
    phone: '+91 96520 00000',
    id: '235U1A7203',
    roleLabel: 'Roll No',
    dept: 'AI & DS',
    extraLabel: 'Semester',
    extraVal: '6',
    section: 'A',
    dob: '2005-05-24',
    address: 'Hyderabad, Telangana',
    linkedin: 'linkedin.com/in/vaishnavi-anugu',
    github: 'github.com/vaishnavi-anugu',
    bio: 'AI & Data Science student | Tech Enthusiast | Aspiring Data Scientist',
};

const FACULTY_PROFILE = {
    name: 'Prof. Suresh Kumar',
    email: 'suresh.k@avniet.edu',
    phone: '+91 98480 12345',
    id: 'FAC-7392',
    roleLabel: 'Employee ID',
    dept: 'Computer Science',
    extraLabel: 'Research',
    extraVal: 'Cloud Computing',
    section: 'Senior Faculty',
    dob: '1985-12-10',
    address: 'Secunderabad, Telangana',
    linkedin: 'linkedin.com/in/prof-suresh',
    github: 'github.com/prof-suresh',
    bio: '15+ years of teaching experience. Passionate about AI ethics and distributed systems.',
};


const NOTIFICATIONS_PREFS = [
    { label: 'Class Announcements', key: 'class', enabled: true },
    { label: 'Assignment Deadlines', key: 'assignment', enabled: true },
    { label: 'Fee Reminders', key: 'fee', enabled: true },
    { label: 'Forum Replies', key: 'forum', enabled: false },
    { label: 'New AI Roadmaps', key: 'roadmap', enabled: true },
    { label: 'Exam Alerts', key: 'exam', enabled: true },
];

export default function ProfilePage() {
    const [role, setRole] = useState<'student' | 'faculty'>('student');
    const [profile, setProfile] = useState(STUDENT_PROFILE);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
    const [saved, setSaved] = useState(false);
    const [notifPrefs, setNotifPrefs] = useState(NOTIFICATIONS_PREFS);
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });

    const handleRoleSwitch = (r: 'student' | 'faculty') => {
        setRole(r);
        setProfile(r === 'student' ? STUDENT_PROFILE : FACULTY_PROFILE);
    };


    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const toggleNotif = (key: string) =>
        setNotifPrefs(prev => prev.map(n => n.key === key ? { ...n, enabled: !n.enabled } : n));

    const tabs = [
        { id: 'profile', label: 'Profile Info', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ] as const;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader title="Profile & Settings" subtitle="Manage your personal information, security, and notification preferences." />

                <div className="flex gap-8 mt-6">
                    {/* Left: Avatar card */}
                    <div className="w-64 shrink-0 space-y-4">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center">
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black">
                                    {profile.name[0]}
                                </div>
                                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center hover:border-indigo-400 transition-colors">
                                    <Camera size={14} className="text-slate-500" />
                                </button>
                            </div>
                             <h3 className="font-black text-slate-800 text-lg">{profile.name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{profile.roleLabel}: {profile.id}</p>
                            <p className="text-xs text-indigo-600 font-bold mt-1 italic">{profile.dept}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{profile.extraLabel}: {profile.extraVal} • {profile.section}</p>
                            
                            <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2 justify-center">
                                <button onClick={() => handleRoleSwitch('student')} className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${role === 'student' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>Student</button>
                                <button onClick={() => handleRoleSwitch('faculty')} className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${role === 'faculty' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>Faculty</button>
                            </div>

                        </div>

                        {/* Tab Nav */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 space-y-1">
                            {tabs.map(t => (
                                <button key={t.id} onClick={() => setActiveTab(t.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === t.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                                    <t.icon size={16} /> {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                        {activeTab === 'profile' && (
                            <div>
                                <h3 className="font-black text-slate-800 text-xl mb-6">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-5">
                                    {[
                                        { label: 'Full Name', key: 'name', icon: User },
                                        { label: 'Email Address', key: 'email', icon: Mail },
                                        { label: 'Phone Number', key: 'phone', icon: Phone },
                                        { label: 'Date of Birth', key: 'dob', icon: User, type: 'date' },
                                        { label: 'Address', key: 'address', icon: MapPin },
                                        { label: 'Department', key: 'dept', icon: BookOpen },
                                        { label: 'LinkedIn', key: 'linkedin', icon: Globe },
                                        { label: 'GitHub', key: 'github', icon: Globe },
                                    ].map(f => (
                                        <div key={f.key}>
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">{f.label}</label>
                                            <div className="relative">
                                                <f.icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type={f.type || 'text'}
                                                    value={(profile as any)[f.key]}
                                                    onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                                                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 text-slate-700" />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-span-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">Bio</label>
                                        <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 text-slate-700 resize-none" />
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <Button onClick={save} className="flex items-center gap-2">
                                        {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
                                    </Button>
                                    <Button variant="outline" onClick={() => setProfile(STUDENT_PROFILE)}>Reset</Button>

                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h3 className="font-black text-slate-800 text-xl mb-6">Change Password</h3>
                                <div className="max-w-md space-y-4">
                                    {[
                                        { label: 'Current Password', key: 'current' },
                                        { label: 'New Password', key: 'newPass' },
                                        { label: 'Confirm New Password', key: 'confirm' },
                                    ].map(f => (
                                        <div key={f.key}>
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">{f.label}</label>
                                            <div className="relative">
                                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type="password" value={(passwords as any)[f.key]}
                                                    onChange={e => setPasswords(p => ({ ...p, [f.key]: e.target.value }))}
                                                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400" />
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => { alert('Password changed successfully!'); setPasswords({ current: '', newPass: '', confirm: '' }); }}>
                                        <Shield size={16} className="mr-2" /> Update Password
                                    </Button>
                                </div>

                                <div className="mt-10 pt-8 border-t border-slate-100">
                                    <h4 className="font-black text-slate-800 mb-4">Active Sessions</h4>
                                    {[
                                        { device: 'Chrome on Windows', location: 'Hyderabad, IN', current: true, time: 'Now' },
                                        { device: 'Mobile App – Android', location: 'Hyderabad, IN', current: false, time: '2 hours ago' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-3">
                                            <div>
                                                <p className="font-bold text-sm text-slate-800">{s.device}</p>
                                                <p className="text-xs text-slate-400">{s.location} • {s.time}</p>
                                            </div>
                                            {s.current ? <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Current</span>
                                                : <button className="text-xs font-bold text-rose-500 hover:underline">Revoke</button>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h3 className="font-black text-slate-800 text-xl mb-6">Notification Preferences</h3>
                                <div className="space-y-3">
                                    {notifPrefs.map(n => (
                                        <div key={n.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Bell size={16} className={n.enabled ? 'text-indigo-500' : 'text-slate-300'} />
                                                <span className="font-bold text-sm text-slate-700">{n.label}</span>
                                            </div>
                                            <button onClick={() => toggleNotif(n.key)}
                                                className={`relative w-11 h-6 rounded-full transition-colors ${n.enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${n.enabled ? 'left-6' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={save} className="mt-6">
                                    {saved ? <><CheckCircle size={16} className="mr-2" /> Saved!</> : <><Save size={16} className="mr-2" /> Save Preferences</>}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
