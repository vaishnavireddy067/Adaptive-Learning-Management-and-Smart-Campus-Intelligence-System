'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Award, Brain, Target, BookOpen, Map, Loader2, Send, CheckCircle, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { cn } from '../../../../utils/helpers';

type Step = 'select' | 'assess' | 'result';

export default function SkillAssessmentPage() {
    const [step, setStep] = useState<Step>('select');
    const [topic, setTopic] = useState('');
    const [session, setSession] = useState<{question: string, answer: string, difficulty: string}[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [evaluation, setEvaluation] = useState<any>(null);
    const [customTopic, setCustomTopic] = useState('');

    const startAssessment = async (selectedTopic: string) => {
        const finalTopic = selectedTopic || customTopic;
        if (!finalTopic) return;
        
        setError(null);
        setTopic(finalTopic);
        setLoading(true);
        setSession([]);
        try {
            const res = await fetch('/api/ai/skill-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'next_question', topic: finalTopic, history: [] }),
            });
            const data = await res.json();
            
            if (res.ok && (data.question || data.Question)) {
                setCurrentQuestion(data);
                setStep('assess');
            } else {
                setError(data.error || "AI is currently unavailable. Please check your API quota.");
            }
        } catch (error) {
            setError("Connection failed. Please check your internet.");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async (isSkip = false) => {
        if (!isSkip && !currentAnswer.trim()) return;
        
        setError(null);
        const finalAnswer = isSkip ? "Skipped (User did not answer)" : currentAnswer;
        const newSession = [...session, { ...currentQuestion, answer: finalAnswer }];
        setSession(newSession);
        setCurrentAnswer('');
        setLoading(true);
        
        try {
            const res = await fetch('/api/ai/skill-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'next_question', topic, history: newSession }),
            });
            const data = await res.json();
            if (res.ok && (data.question || data.Question)) {
                setCurrentQuestion(data);
            } else {
                setError(data.error || "Failed to load next question.");
            }
        } catch (error) {
            setError("Connection error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const submitAssessment = async () => {
        setLoading(true);
        const finalSession = [...session];
        if (currentAnswer.trim()) {
            finalSession.push({ ...currentQuestion, answer: currentAnswer });
        }

        try {
            const res = await fetch('/api/ai/skill-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'evaluate', topic, session: finalSession }),
            });
            const data = await res.json();
            setEvaluation(data);
            setStep('result');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="AI Interactive Skill Assessment"
                    subtitle="Our AI will keep asking questions until it fully understands your skill level."
                />

                <div className="mt-8 max-w-4xl mx-auto">
                    
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-12 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-0"></div>
                        {[
                            { id: 'select', label: 'Choose Topic', icon: Target },
                            { id: 'assess', label: 'Live Interview', icon: Brain },
                            { id: 'result', label: 'Detailed Report', icon: Award }
                        ].map((s, i) => (
                            <div key={s.id} className="relative z-10 flex flex-col items-center">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                    step === s.id ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-110" : 
                                    i < ['select', 'assess', 'result'].indexOf(step) ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-400"
                                )}>
                                    <s.icon size={20} />
                                </div>
                                <span className={cn("text-[10px] font-black uppercase tracking-widest mt-3 px-2 py-0.5 rounded", 
                                    step === s.id ? "text-emerald-600 bg-emerald-50" : "text-slate-400")}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Select Topic */}
                    {step === 'select' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                
                                <Sparkles className="mx-auto text-emerald-500 mb-6" size={40} />
                                <h3 className="text-3xl font-black text-slate-800 mb-2">Technical Interview Simulation</h3>
                                <p className="text-slate-500 mb-8 font-medium">Enter a topic, and our AI will challenge you with questions until your level is determined.</p>

                                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
                                    <div className="flex-1 relative">
                                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input 
                                            type="text" 
                                            value={customTopic}
                                            onChange={(e) => setCustomTopic(e.target.value)}
                                            placeholder="e.g. Data Analytics, Azure, ML..."
                                            className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-700 shadow-inner"
                                        />
                                    </div>
                                    <Button 
                                        onClick={() => startAssessment(customTopic)}
                                        disabled={loading || !customTopic.trim()}
                                        className="px-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black shadow-lg shadow-emerald-200 border-none h-auto py-5"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : 'Start Interview'}
                                    </Button>
                                </div>

                                {error && (
                                    <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm animate-in fade-in zoom-in-95 text-center">
                                        ⚠️ {error}
                                        <p className="text-[10px] mt-1 font-medium text-rose-400 uppercase tracking-widest">Verify Groq keys in .env.local</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Assessment Test (Infinite/Continuous Flow) */}
                    {step === 'assess' && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
                             <div className="bg-slate-900 p-8 text-white relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full"></div>
                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                                            <Sparkles className="text-emerald-400" /> Topic: {topic}
                                        </h3>
                                        <span className="bg-emerald-600 text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest">
                                            Difficulty: {currentQuestion?.difficulty || currentQuestion?.Difficulty || 'Analyzing...'}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-slate-400 text-xs font-bold uppercase block mb-1">Qns Answered</span>
                                        <span className="text-2xl font-black">{session.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 min-h-[160px] flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                                    {loading ? (
                                        <div className="flex flex-col items-center gap-2 text-emerald-600">
                                            <Loader2 className="animate-spin" size={24} />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 animate-pulse">AI is Thinking...</p>
                                        </div>
                                    ) : (error || !currentQuestion) ? (
                                        <div className="text-center space-y-4">
                                            <p className="text-rose-500 font-bold">{error || "Connection lost. AI needs a moment."}</p>
                                            <Button onClick={() => handleNext()} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs">Retry Now</Button>
                                        </div>
                                    ) : (
                                        <p className="font-bold text-slate-800 text-2xl leading-relaxed text-center max-w-2xl">
                                            {currentQuestion?.question || currentQuestion?.Question || currentQuestion?.text}
                                        </p>
                                    )}
                                </div>

                                {/* Dynamic Answer Input based on Type */}
                                {!loading && currentQuestion && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        {currentQuestion.type === 'mcq' && (
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {currentQuestion.options?.map((opt: string, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentAnswer(opt)}
                                                        className={cn(
                                                            "p-5 rounded-3xl border-2 text-left font-bold transition-all active:scale-95 flex items-center gap-4",
                                                            currentAnswer === opt 
                                                                ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200" 
                                                                : "bg-white border-slate-100 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/30"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs",
                                                            currentAnswer === opt ? "bg-white/20" : "bg-slate-100"
                                                        )}>
                                                            {String.fromCharCode(65 + idx)}
                                                        </div>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {currentQuestion.type === 'boolean' && (
                                            <div className="flex gap-4">
                                                {['True', 'False'].map((opt) => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setCurrentAnswer(opt)}
                                                        className={cn(
                                                            "flex-1 p-6 rounded-3xl border-2 font-black text-xl transition-all active:scale-95",
                                                            currentAnswer === opt 
                                                                ? "bg-slate-900 border-slate-900 text-white shadow-xl" 
                                                                : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                                                        )}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {currentQuestion.type === 'blank' && (
                                            <input 
                                                className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-xl font-black text-center shadow-inner"
                                                placeholder="Type your answer here..."
                                                value={currentAnswer}
                                                onChange={(e) => setCurrentAnswer(e.target.value)}
                                                autoFocus
                                            />
                                        )}

                                        {(currentQuestion.type === 'descriptive' || !currentQuestion.type) && (
                                            <textarea 
                                                className="w-full h-48 p-8 bg-slate-50 rounded-[40px] border-2 border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg font-medium shadow-inner resize-none"
                                                placeholder="Explain your approach or answer in detail..."
                                                value={currentAnswer}
                                                onChange={(e) => setCurrentAnswer(e.target.value)}
                                                autoFocus
                                            />
                                        )}
                                    </div>
                                )}

                                <div className="space-y-6 pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Button 
                                            onClick={() => handleNext(false)}
                                            disabled={loading || !currentAnswer.trim()}
                                            className={cn(
                                                "h-16 rounded-[24px] font-black text-lg transition-all active:scale-95 shadow-xl flex items-center gap-3",
                                                currentAnswer.trim() 
                                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200" 
                                                    : "bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed shadow-none"
                                            )}
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Submit Answer</>}
                                        </Button>

                                        <Button 
                                            onClick={() => handleNext(true)}
                                            disabled={loading}
                                            className="h-16 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[24px] font-black text-lg transition-all active:scale-95 border-2 border-slate-200 flex items-center gap-3"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : <><ArrowRight size={20} /> Skip Question</>}
                                        </Button>
                                    </div>

                                    <Button 
                                        onClick={submitAssessment}
                                        disabled={loading}
                                        className="h-16 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-[24px] font-black text-lg transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} className="text-emerald-400" /> End Interview & See Result</>}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Result & Roadmap (Remains similar but with Session Analysis) */}
                    {step === 'result' && evaluation && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
                            
                            {/* Skill Card */}
                            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full"></div>
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full"></div>
                                
                                <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                                    <div className="w-56 h-56 rounded-full border-8 border-emerald-500/20 flex flex-col items-center justify-center text-center relative p-6">
                                        <div className="absolute inset-0 border-8 border-emerald-500 rounded-full border-t-transparent animate-pulse"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Final Proficiency</span>
                                        <h2 className={cn(
                                            "font-black leading-none",
                                            evaluation.overall_level.length > 10 ? "text-2xl" : "text-4xl"
                                        )}>
                                            {evaluation.overall_level}
                                        </h2>
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <h3 className="text-4xl font-black">Performance Profile: {topic}</h3>
                                        <p className="text-slate-400 text-sm">AI analyzed {session.length + 1} answers to determine your proficiency.</p>
                                        
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { label: 'Foundational', score: evaluation.scores.basic, color: 'bg-blue-500' },
                                                { label: 'Technical', score: evaluation.scores.intermediate, color: 'bg-amber-500' },
                                                { label: 'Executive', score: evaluation.scores.advanced, color: 'bg-rose-500' },
                                            ].map((s) => (
                                                <div key={s.label} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
                                                    <div className="flex items-end gap-1 mt-1">
                                                        <span className="text-2xl font-black">{s.score}</span>
                                                        <span className="text-[10px] mb-1 font-bold text-slate-500">%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* AI Roadmap */}
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                        <Map className="text-purple-600" /> Improvement Roadmap
                                    </h3>
                                    <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                        {evaluation.roadmap.map((step: string, i: number) => (
                                            <div key={i} className="flex gap-4 items-start relative bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                                                <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 z-10 font-black text-[10px] text-slate-800">
                                                    {i + 1}
                                                </div>
                                                <p className="text-sm font-bold text-slate-700 leading-snug">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Smart Resources */}
                                <div className="space-y-8">
                                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                            <ExternalLink className="text-blue-600" size={20} /> Targeted Resources
                                        </h3>
                                        <div className="space-y-4">
                                            {evaluation.resources.map((res: any, i: number) => (
                                                <a 
                                                    key={i} 
                                                    href={res.link} 
                                                    target="_blank" 
                                                    className="flex justify-between items-center p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all group"
                                                >
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600">{res.name}</h4>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{res.type}</span>
                                                    </div>
                                                    <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-600 -rotate-45 group-hover:rotate-0 transition-transform" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={() => setStep('select')}
                                        className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 py-4 rounded-2xl font-black shadow-sm"
                                    >
                                        Start New Interview
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
