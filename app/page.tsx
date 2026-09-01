'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { COLLEGE_NAME, COLLEGE_TAGLINE } from '../utils/constants';
import {
  GraduationCap, Shield, Lock, BookOpen, Building2,
  BarChart3, Users, Award, Zap, CheckCircle2, ArrowRight,
  Globe, Clock, Star
} from 'lucide-react';
import { RoleCard } from '../components/cards/RoleCard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-white">

      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white/90 backdrop-blur sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">{COLLEGE_NAME}</span>
        </div>
        <div className="flex items-center gap-8">
          {[
            { label: 'About', href: '#about' },
            { label: 'Features', href: '#features' },
            { label: 'Portals', href: '#portals' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <Link href="/portals">
            <Button className="rounded-xl px-8 bg-indigo-600 text-[11px] font-bold uppercase tracking-widest h-11">
              Login Portal
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1">

        {/* ── Hero Section ── */}
        <section className="relative pt-28 pb-32 px-10 text-center overflow-hidden">
          {/* Gradient bg blobs */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-indigo-100 via-purple-50 to-white rounded-full blur-3xl opacity-70" />
            <div className="absolute -top-20 right-0 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              • Next-Gen Campus Management
            </div>
            <h1 className="text-[84px] font-black tracking-tighter text-slate-900 mb-6 uppercase leading-[0.9] animate-in fade-in zoom-in-95 duration-1000">
              {COLLEGE_NAME}
            </h1>
            <p className="max-w-[720px] mx-auto text-xl text-slate-500 font-semibold mb-4 leading-relaxed animate-in fade-in duration-1000 delay-200">
              {COLLEGE_TAGLINE}
            </p>
            <p className="max-w-[600px] mx-auto text-base text-slate-400 mb-12 animate-in fade-in duration-1000 delay-300">
              Experience a seamless, digital-first approach to education management — from smart attendance to AI-powered learning.
            </p>
            <div className="flex items-center justify-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
              <Link href="/portals">
                <Button className="h-14 px-10 rounded-xl bg-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-200 hover:scale-105 transition-all">
                  Get Started →
                </Button>
              </Link>
              <a href="#about" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                Learn More <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="py-14 bg-indigo-600">
          <div className="max-w-6xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '5,000+', label: 'Students', icon: Users },
              { value: '200+', label: 'Faculty Members', icon: Award },
              { value: '8', label: 'Departments', icon: Building2 },
              { value: '98%', label: 'Satisfaction Rate', icon: Star },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <stat.icon size={24} className="opacity-70" />
                <span className="text-4xl font-black tracking-tighter">{stat.value}</span>
                <span className="text-indigo-200 text-[11px] font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── About Section ── */}
        <section id="about" className="py-28 px-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                About AVNIET
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-6 leading-tight">
                A Smarter Way to Manage Your Campus
              </h2>
              <p className="text-slate-500 text-base font-medium leading-relaxed mb-6">
                AVNIET's Smart College Management System is an integrated digital platform designed to streamline every aspect of institutional management — from admissions to academics, attendance, examinations, and beyond.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Built for faculty, students, and administrators, our system unifies Smart Campus, Learning Management (LMS), and Student ERP into one powerful, AI-enhanced ecosystem.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Real-time attendance tracking with analytics',
                  'AI-powered question generation & study tools',
                  'Integrated timetables & exam management',
                  'Secure role-based access for all stakeholders',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/portals" className="mt-10 inline-block">
                <Button className="h-12 px-8 rounded-xl bg-indigo-600 text-[11px] font-black uppercase tracking-[0.2em]">
                  Explore Portals →
                </Button>
              </Link>
            </div>

            {/* Right side visual cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BarChart3, label: 'Deep Analytics', desc: 'Real-time insights on student performance and campus operations', color: 'bg-indigo-50 text-indigo-600' },
                { icon: Zap, label: 'AI-Powered', desc: 'Smart generators for questions, timetables, and study plans', color: 'bg-purple-50 text-purple-600' },
                { icon: Globe, label: 'Fully Digital', desc: 'Cloud-first approach — access from anywhere, anytime', color: 'bg-emerald-50 text-emerald-600' },
                { icon: Clock, label: 'Real-Time', desc: 'Live attendance, notifications, and instant updates', color: 'bg-amber-50 text-amber-600' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{item.label}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features / Portals Section ── */}
        <section id="features" className="py-24 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                Platform Features
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">
                Everything You Need in One Place
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto font-medium">
                Three powerful systems — Smart Campus, LMS, and Student ERP — working together seamlessly.
              </p>
            </div>

            {/* System feature highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: Building2,
                  title: 'Smart Campus',
                  color: 'from-indigo-500 to-indigo-700',
                  bg: 'bg-indigo-50',
                  features: ['Department Management', 'Faculty Registry', 'Infrastructure Control', 'Global Announcements', 'Financial Tracking', 'Analytics Dashboard'],
                },
                {
                  icon: BookOpen,
                  title: 'Learning Management (LMS)',
                  color: 'from-emerald-500 to-emerald-700',
                  bg: 'bg-emerald-50',
                  features: ['Course Materials & Notes', 'AI Study Assistant', 'Live Classes', 'Tests & Quizzes', 'Learning Roadmaps', 'Peer Learning Forum'],
                },
                {
                  icon: GraduationCap,
                  title: 'Student ERP',
                  color: 'from-rose-500 to-rose-700',
                  bg: 'bg-rose-50',
                  features: ['Attendance Analytics', 'Grade Tracking', 'Fee Payments', 'Exam Records', 'Personal Schedule', 'Campus Notifications'],
                },
              ].map(sys => (
                <div key={sys.title} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`bg-gradient-to-br ${sys.color} p-8 text-white`}>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4">
                      <sys.icon size={24} />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">{sys.title}</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {sys.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <CheckCircle2 size={15} className="text-indigo-400 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Role Cards / Portals Section ── */}
        <section id="portals" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                Role-Based Access
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">
                Tailored Experience for Everyone
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto font-medium">
                Dedicated dashboards for every stakeholder in the ecosystem.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/login?system=smart-campus&role=super-admin" className="h-full">
                <RoleCard
                  title="Super Admin"
                  description="Oversee the entire institution. Manage departments, global settings, and deep analytics."
                  icon={Shield}
                />
              </Link>
              <Link href="/login?system=smart-campus&role=admin" className="h-full">
                <RoleCard
                  title="Admin (HOD)"
                  description="Manage department resources, assign faculty, and oversee local operations."
                  icon={Lock}
                />
              </Link>
              <Link href="/login?system=smart-campus&role=faculty" className="h-full">
                <RoleCard
                  title="Faculty"
                  description="Manage classes, mark attendance, generate AI questions, and track student progress."
                  icon={BookOpen}
                />
              </Link>
              <Link href="/login?system=smart-campus&role=student" className="h-full">
                <RoleCard
                  title="Student"
                  description="Access timetables, attendance records, courses, AI study tools, and stay updated."
                  icon={GraduationCap}
                />
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link href="/portals">
                <Button className="h-14 px-12 rounded-xl bg-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 hover:scale-105 transition-all">
                  Access Login Portals →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-24 px-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                Start Today
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-4">
                Ready to Transform Your Campus?
              </h2>
              <p className="text-indigo-200 mb-10 text-base font-medium max-w-lg mx-auto">
                Join thousands of students, faculty, and administrators already using AVNIET's Smart Campus Management System.
              </p>
              <Link href="/portals">
                <Button className="h-14 px-12 rounded-xl bg-white text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl">
                  Get Started Now →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                  <GraduationCap size={20} />
                </div>
                <span className="text-white font-bold">{COLLEGE_NAME}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{COLLEGE_TAGLINE}</p>
            </div>

            {/* Portals */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Portals</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Smart Campus', href: '/login?system=smart-campus' },
                  { label: 'Learning Management', href: '/login?system=lms' },
                  { label: 'Student ERP', href: '/login?system=student-erp' },
                  { label: 'All Portals', href: '/portals' },
                ].map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-indigo-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roles */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Login As</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Super Admin', href: '/login?system=smart-campus&role=super-admin' },
                  { label: 'Admin (HOD)', href: '/login?system=smart-campus&role=admin' },
                  { label: 'Faculty', href: '/login?system=smart-campus&role=faculty' },
                  { label: 'Student', href: '/login?system=smart-campus&role=student' },
                ].map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-indigo-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'Features', href: '#features' },
                  { label: 'Portals Overview', href: '#portals' },
                  { label: 'Login', href: '/portals' },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-indigo-400 transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">© 2026 {COLLEGE_NAME}. All rights reserved.</p>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Smart Campus Management System</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
