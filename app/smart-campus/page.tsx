import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { RoleCard } from '../../components/cards/RoleCard';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Shield, BookOpen, Users, GraduationCap, BarChart3, Lock } from 'lucide-react';
import { COLLEGE_NAME, COLLEGE_TAGLINE } from '../../utils/constants';

export default function SmartCampusHome() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 -z-10 opacity-30 transform translate-x-1/3 -translate-y-1/4">
          <div className="w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Next-Gen Campus Management
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {COLLEGE_NAME}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            {COLLEGE_TAGLINE}. Experience a seamless, digital-first approach to education management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            <Link href="/login?system=smart-campus">
              <Button size="lg" className="w-full sm:w-auto text-lg shadow-indigo-200 shadow-xl">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Role Previews */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tailored Experience for Everyone</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides dedicated dashboards for every stakeholder in the ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              title="Super Admin"
              description="Oversee the entire institution. Manage departments, global settings, and analytics."
              icon={Shield}
            />
            <RoleCard
              title="Admin (HOD)"
              description="Manage department resources, assign faculty, and oversee local operations."
              icon={Lock}
            />
            <RoleCard
              title="Faculty"
              description="Manage classes, mark attendance, and track student progress effortlessly."
              icon={BookOpen}
            />
            <RoleCard
              title="Student"
              description="Access timetables, check attendance records, and stay updated."
              icon={GraduationCap}
            />
          </div>
        </div>
      </section>

      {/* About & Features */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
                Streamline Operations with <br /><span className="text-indigo-600">Smart Automation</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Gone are the days of manual paperwork. Our system brings everything into a unified digital interface, ensuring data accuracy and real-time insights.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time Attendance Tracking",
                  "Dynamic Timetable Management",
                  "Insightful Analytics & Reporting",
                  "Seamless Role-Based Access Control"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-2xl rotate-3 opacity-10"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl text-white">
                <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400">dashboard.tsx</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-800 h-32 rounded-lg animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 h-24 rounded-lg animate-pulse"></div>
                    <div className="bg-gray-800 h-24 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-lg font-bold">{COLLEGE_NAME}</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {COLLEGE_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
