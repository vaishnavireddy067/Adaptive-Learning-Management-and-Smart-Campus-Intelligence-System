'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Role, NAV_LINKS, LMS_NAV_LINKS, ERP_NAV_LINKS, ROLES } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import {
    LayoutDashboard, Users, BookOpen, Calendar, LogOut, FileText,
    Award, Brain, Bell, MessageSquare, GraduationCap, CreditCard, Library, Video,
    UserCircle, BarChart2, ShieldCheck, Activity, Building2, Settings,
    BookMarked, ClipboardList, Clock, Layers, Shield, Zap, BarChart3,
    Globe, ChevronRight, Home, Star, Target, Map
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

interface SidebarProps {
    role?: Role;
    systemType?: 'smart-campus' | 'lms' | 'student-erp';
}

// ─────────────────────────────────────────────
// Shared icon resolver
// ─────────────────────────────────────────────
function getIcon(label: string) {
    const l = label.toLowerCase();
    if (l.includes('dashboard') || l.includes('overview') || l.includes('hub')) return LayoutDashboard;
    if (l.includes('platform') || l.includes('home')) return Home;
    if (l.includes('schedule') || l.includes('timetable')) return Calendar;
    if (l.includes('exam') || l.includes('score') || l.includes('result') || l.includes('marks')) return Award;
    if (l.includes('attendance')) return BarChart2;
    if (l.includes('analytics') || l.includes('deep')) return BarChart3;
    if (l.includes('message') || l.includes('chat')) return MessageSquare;
    if (l.includes('live cl')) return Video;
    if (l.includes('library')) return Library;
    if (l.includes('course') || l.includes('catalog')) return BookOpen;
    if (l.includes('fee') || l.includes('financial') || l.includes('payment')) return CreditCard;
    if (l.includes('profile')) return UserCircle;
    if (l.includes('settings') || l.includes('config')) return Settings;
    if (l.includes('user') || l.includes('student') || l.includes('directory')) return Users;
    if (l.includes('faculty') || l.includes('training')) return Users;
    if (l.includes('department') || l.includes('institutional')) return Building2;
    if (l.includes('circular') || l.includes('archive') || l.includes('announcement')) return Bell;
    if (l.includes('infra') || l.includes('room') || l.includes('asset')) return Layers;
    if (l.includes('performance') || l.includes('report')) return Activity;
    if (l.includes('role') || l.includes('access') || l.includes('control')) return Shield;
    if (l.includes('calendar') || l.includes('academic')) return Calendar;
    if (l.includes('ai') || l.includes('generator') || l.includes('smart')) return Zap;
    if (l.includes('note')) return BookMarked;
    if (l.includes('roadmap') || l.includes('path')) return Map;
    if (l.includes('test') || l.includes('quiz')) return ClipboardList;
    if (l.includes('forum') || l.includes('peer')) return MessageSquare;
    if (l.includes('alumni') || l.includes('career')) return Star;
    if (l.includes('notification') || l.includes('global')) return Bell;
    if (l.includes('batch') || l.includes('segment')) return Layers;
    if (l.includes('event')) return Clock;
    if (l.includes('workload')) return Target;
    if (l.includes('grade') || l.includes('grade center')) return Award;
    if (l.includes('skill')) return Star;
    return GraduationCap;
}

// ─────────────────────────────────────────────
// SIDEBAR 1 — Smart Campus (Indigo / Slate Dark)
// ─────────────────────────────────────────────
function SmartCampusSidebarInner({ role }: { role: Role }) {
    const pathname = usePathname();
    const links = (NAV_LINKS[role as keyof typeof NAV_LINKS] || []) as { label: string; href: string }[];

    const roleLabel = role === ROLES.SUPER_ADMIN ? 'Super Admin'
        : role === ROLES.ADMIN ? 'Admin (HOD)'
        : role === ROLES.FACULTY ? 'Faculty'
        : 'Student';

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl overflow-hidden bg-[#0f172a] text-white border-r border-white/5">
            {/* Brand Header */}
            <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-900/50">
                        <Building2 size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-black tracking-tight text-white leading-none">Smart Campus</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-400 mt-0.5">AVNIET</p>
                    </div>
                </div>
                {/* Role Badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-300">{roleLabel}</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
                <p className="px-3 pt-2 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">Navigation</p>
                {links.map((link) => {
                    const Icon = getIcon(link.label);
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-150 group",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon size={15} className={cn("shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400")} />
                            <span className="truncate">{link.label}</span>
                            {isActive && <ChevronRight size={12} className="ml-auto shrink-0 opacity-70" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/5 space-y-1">
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                    <UserCircle size={15} className="text-slate-500" /> Profile Settings
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/portals' })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                    <LogOut size={15} /> Log Out
                </button>
            </div>
        </aside>
    );
}

// ─────────────────────────────────────────────
// SIDEBAR 2 — LMS (Emerald / Forest Green)
// ─────────────────────────────────────────────
function LmsSidebarInner({ role }: { role: Role }) {
    const pathname = usePathname();
    const links = (LMS_NAV_LINKS[role as keyof typeof LMS_NAV_LINKS] || []) as { label: string; href: string }[];

    const roleLabel = role === ROLES.SUPER_ADMIN ? 'Super Admin'
        : role === ROLES.ADMIN ? 'Admin'
        : role === ROLES.FACULTY ? 'Educator'
        : 'Learner';

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl overflow-hidden bg-[#052e16] text-white border-r border-emerald-900/60">
            {/* Brand Header */}
            <div className="px-6 py-6 border-b border-emerald-900/60">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/60">
                        <BookOpen size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-black tracking-tight text-white leading-none">LMS Learning</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 mt-0.5">AVNIET</p>
                    </div>
                </div>
                {/* Role Badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-300">{roleLabel}</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
                <p className="px-3 pt-2 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-900">Learning Modules</p>
                {links.map((link) => {
                    const Icon = getIcon(link.label);
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={`${link.href}?system=lms`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-150 group",
                                isActive
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                                    : "text-emerald-100/60 hover:bg-emerald-900/60 hover:text-white"
                            )}
                        >
                            <Icon size={15} className={cn("shrink-0", isActive ? "text-white" : "text-emerald-700 group-hover:text-emerald-400")} />
                            <span className="truncate">{link.label}</span>
                            {isActive && <ChevronRight size={12} className="ml-auto shrink-0 opacity-70" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-emerald-900/60 space-y-1">
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-emerald-100/60 hover:bg-emerald-900/60 hover:text-white transition-all">
                    <UserCircle size={15} className="text-emerald-700" /> Profile Settings
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/portals' })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                    <LogOut size={15} /> Log Out
                </button>
            </div>
        </aside>
    );
}

// ─────────────────────────────────────────────
// SIDEBAR 3 — Student ERP (Rose / Dark Maroon)
// ─────────────────────────────────────────────
function ErpSidebarInner({ role }: { role: Role }) {
    const pathname = usePathname();
    const links = (ERP_NAV_LINKS[role as keyof typeof ERP_NAV_LINKS] || []) as { label: string; href: string }[];

    const roleLabel = role === ROLES.SUPER_ADMIN ? 'Super Admin'
        : role === ROLES.ADMIN ? 'Admin'
        : 'Student';

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl overflow-hidden bg-[#1c0a0a] text-white border-r border-rose-950/60">
            {/* Brand Header */}
            <div className="px-6 py-6 border-b border-rose-950/60">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/60">
                        <GraduationCap size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-black tracking-tight text-white leading-none">Student ERP</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-rose-400 mt-0.5">AVNIET</p>
                    </div>
                </div>
                {/* Role Badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-rose-600/20 border border-rose-600/30 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-300">{roleLabel}</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
                <p className="px-3 pt-2 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-rose-950">My Portal</p>
                {links.map((link) => {
                    const Icon = getIcon(link.label);
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={`${link.href}?system=student-erp`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-150 group",
                                isActive
                                    ? "bg-rose-600 text-white shadow-lg shadow-rose-900/50"
                                    : "text-rose-100/60 hover:bg-rose-950/60 hover:text-white"
                            )}
                        >
                            <Icon size={15} className={cn("shrink-0", isActive ? "text-white" : "text-rose-900 group-hover:text-rose-400")} />
                            <span className="truncate">{link.label}</span>
                            {isActive && <ChevronRight size={12} className="ml-auto shrink-0 opacity-70" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-rose-950/60 space-y-1">
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-rose-100/60 hover:bg-rose-950/60 hover:text-white transition-all">
                    <UserCircle size={15} className="text-rose-900" /> Profile Settings
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/portals' })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                    <LogOut size={15} /> Log Out
                </button>
            </div>
        </aside>
    );
}

// ─────────────────────────────────────────────
// Smart wrapper — reads session + URL to pick sidebar
// ─────────────────────────────────────────────
function SidebarInner({ role: propRole, systemType: propSystemType }: SidebarProps) {
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const role = ((session?.user as any)?.role || propRole || 'student') as Role;
    const querySystem = searchParams.get('system');
    const systemType = propSystemType || (querySystem === 'lms' ? 'lms' : querySystem === 'student-erp' ? 'student-erp' : 'smart-campus');

    if (systemType === 'lms') return <LmsSidebarInner role={role} />;
    if (systemType === 'student-erp') return <ErpSidebarInner role={role} />;
    return <SmartCampusSidebarInner role={role} />;
}

// ─────────────────────────────────────────────
// Suspense wrappers (public exports)
// ─────────────────────────────────────────────
const FallbackAside = ({ color }: { color: string }) => (
    <aside className={`w-64 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl overflow-hidden ${color}`}>
        <div className="p-6 border-b border-white/10 text-xs font-semibold text-slate-400 animate-pulse">Loading menu…</div>
    </aside>
);

export const SmartCampusSidebar: React.FC<{ role?: Role }> = ({ role = 'student' }) => (
    <Suspense fallback={<FallbackAside color="bg-[#0f172a]" />}>
        <SmartCampusSidebarInner role={role} />
    </Suspense>
);

export const LmsSidebar: React.FC<{ role?: Role }> = ({ role = 'student' }) => (
    <Suspense fallback={<FallbackAside color="bg-[#052e16]" />}>
        <LmsSidebarInner role={role} />
    </Suspense>
);

export const ErpSidebar: React.FC<{ role?: Role }> = ({ role = 'student' }) => (
    <Suspense fallback={<FallbackAside color="bg-[#1c0a0a]" />}>
        <ErpSidebarInner role={role} />
    </Suspense>
);

// Default Sidebar — auto-picks based on system param (backward compatible)
export const Sidebar: React.FC<SidebarProps> = (props) => (
    <Suspense fallback={<FallbackAside color="bg-[#0f172a]" />}>
        <SidebarInner {...props} />
    </Suspense>
);
