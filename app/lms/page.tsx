import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { COLLEGE_NAME } from '../../utils/constants';
import { BookOpen, GraduationCap, FileText, Target, Map, Award, ChevronRight } from 'lucide-react';

export default function LMSHome() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#f8fafc]">
      {/* Header matches Image 2 Nav */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-slate-100 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <BookOpen size={20} />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight uppercase tracking-[0.1em]">{COLLEGE_NAME} LMS</span>
        </Link>
        <div className="flex items-center gap-4">
            <Link href="/login?system=lms">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-2 text-[10px] font-bold uppercase tracking-widest h-10">Student Login</Button>
            </Link>
        </div>
      </nav>

      <main className="flex-1">
          {/* Hero Section matches Image 2 exactly */}
          <section className="relative pt-24 pb-16 text-center px-6">
              <div className="max-w-4xl mx-auto">
                  <h1 className="text-[56px] font-black tracking-tight text-slate-900 mb-6 leading-tight">
                    Your Learning <span className="text-emerald-600">Ecosystem</span>
                  </h1>
                  <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                    Access course materials, take practice tests, view your progress, and follow curated roadmaps to succeed.
                  </p>
              </div>
          </section>

          {/* Grid Features matches Image 2 */}
          <section className="py-12 px-10 mb-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Courses */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm transition-all group">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">My Courses</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">Access all your enrolled subjects, video lectures, and syllabus.</p>
                        <Link href="/login?system=lms">
                            <span className="text-emerald-600 text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                                View Courses <ChevronRight size={14} />
                            </span>
                        </Link>
                    </div>

                    {/* Notes */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm transition-all group">
                        <div className="w-12 h-12 bg-amber-50/50 text-amber-600 rounded-xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Class Notes</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">Download PDF notes, presentations, and resources provided by faculty.</p>
                        <Link href="/login?system=lms">
                            <span className="text-amber-600 text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                                Browse Notes <ChevronRight size={14} />
                            </span>
                        </Link>
                    </div>

                    {/* Tests & Score */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm transition-all group">
                        <div className="w-12 h-12 bg-blue-50/50 text-blue-600 rounded-xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform">
                            <Award size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Tests & Scores</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">Attempt mock tests, internal exams and track your performance.</p>
                        <Link href="/login?system=lms">
                            <span className="text-blue-600 text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                                View Scores <ChevronRight size={14} />
                            </span>
                        </Link>
                    </div>

                    {/* Roadmaps */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm transition-all group">
                        <div className="w-12 h-12 bg-purple-50/50 text-purple-600 rounded-xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform">
                            <Map size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Career Roadmaps</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">Step-by-step guides for Full Stack, Data Science, Core placements, etc.</p>
                        <Link href="/login?system=lms">
                            <span className="text-purple-600 text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                                Explore Roadmaps <ChevronRight size={14} />
                            </span>
                        </Link>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white p-10 rounded-[2rem] border border-rose-100 border transition-all group">
                        <div className="w-12 h-12 bg-rose-50/50 text-rose-600 rounded-xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight text-rose-500">Recommendations</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">AI-driven course and skill recommendations based on your test scores.</p>
                    </div>
                </div>
            </div>
          </section>
      </main>

      <footer className="bg-white py-12 px-10 border-t border-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto flex justify-center items-center opacity-40">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">© 2026 {COLLEGE_NAME} Learning Ecosystem</p>
        </div>
      </footer>
    </div>
  );
}
