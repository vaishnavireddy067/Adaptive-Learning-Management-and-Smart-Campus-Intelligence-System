'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROLES, Role, APP_NAME } from '../../utils/constants';
import { getDashboardRoute } from '../../utils/roleGuard';
import { Button } from '../../components/ui/Button';
import { GraduationCap, User, Lock, ArrowRight, Building2, BookOpen } from 'lucide-react';
import { signIn } from 'next-auth/react';

function LoginInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const system = searchParams.get('system');
    
    const [selectedRole, setSelectedRole] = useState<Role>(ROLES.STUDENT);
    const [email, setEmail] = useState('student@institution.edu');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // System themes matching Image 6
    const systemThemes = {
        'smart-campus': { color: 'bg-indigo-600', text: 'text-indigo-100', title: 'Smart Campus Login', icon: <Building2 size={40} /> },
        'lms': { color: 'bg-emerald-600', text: 'text-emerald-100', title: 'LMS Learning Login', icon: <BookOpen size={40} /> },
        'student-erp': { color: 'bg-rose-600', text: 'text-rose-100', title: 'Student ERP Login', icon: <GraduationCap size={40} /> },
        'default': { color: 'bg-indigo-600', text: 'text-indigo-100', title: APP_NAME, icon: <GraduationCap size={40} /> }
    };

    const theme = (system && systemThemes[system as keyof typeof systemThemes]) ? systemThemes[system as keyof typeof systemThemes] : systemThemes.default;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                setIsLoading(false);
            } else {
                const route = getDashboardRoute(selectedRole, system);
                router.push(system ? `${route}?system=${system}` : route);
            }
        } catch (err) {
            setError("Something went wrong");
            setIsLoading(false);
        }
    };

    const handleRoleChange = (role: Role) => {
        setSelectedRole(role);
        const emailMap: Record<string, string> = {
            [ROLES.SUPER_ADMIN]: 'superadmin@institution.edu',
            [ROLES.ADMIN]: 'admin@institution.edu',
            [ROLES.FACULTY]: 'faculty@institution.edu',
            [ROLES.STUDENT]: 'student@institution.edu'
        };
        setEmail(emailMap[role] || 'student@institution.edu');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-white">
                <div className={`${theme.color} p-10 text-center text-white transition-colors duration-500 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                    <div className="inline-flex items-center justify-center p-5 bg-white/10 rounded-[1.5rem] mb-6 backdrop-blur-md animate-in zoom-in duration-500 ring-4 ring-white/10">
                        {theme.icon}
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter leading-none">{theme.title}</h2>
                    <p className={`${theme.text} opacity-70 mt-3 uppercase text-[10px] font-black tracking-[0.25em]`}>Authorized Access Only</p>
                </div>

                <div className="p-10">
                    <form onSubmit={handleLogin} className="space-y-8">
                        {(!system || system === 'smart-campus') && (
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Access Role</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT].map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleRoleChange(role)}
                                            className={`px-3 py-4 text-[10px] font-black rounded-2xl border transition-all uppercase tracking-widest ${selectedRole === role
                                                    ? `${theme.color} border-transparent text-white shadow-xl scale-105 z-10`
                                                    : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                                                }`}
                                        >
                                            {role === ROLES.ADMIN ? 'Admin (HOD)' : role.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
                                <Lock size={15} /> {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identification</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">
                                    <User size={20} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="password" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Security Pin</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">
                                    <Lock size={20} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className={`w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] text-white shadow-2xl ${theme.color} hover:scale-[1.02] active:scale-[0.98] transition-all group`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying Node...' : (
                                <span className="flex items-center justify-center gap-3">
                                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                        {APP_NAME} Secure Access Node
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm font-semibold">Loading…</div>}>
            <LoginInner />
        </Suspense>
    );
}
