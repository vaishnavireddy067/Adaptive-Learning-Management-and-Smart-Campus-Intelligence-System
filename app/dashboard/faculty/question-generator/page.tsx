'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Brain, Loader2, Copy, Download, RefreshCw, Sparkles, ChevronDown } from 'lucide-react';

const SUBJECTS = ['Python Programming', 'Data Structures', 'Operating Systems', 'Database Management', 'Computer Networks', 'Machine Learning'];
const DIFFICULTY = ['Easy', 'Medium', 'Hard', 'Mixed'];
const TYPES = ['MCQ', 'Short Answer', 'True/False', 'Fill in the Blank', 'Mixed'];

const SAMPLE_QUESTIONS = [
    { q: 'Which data structure uses LIFO order?', a: 'Stack', type: 'MCQ', opt: ['Queue', 'Stack', 'Tree', 'Heap'] },
    { q: 'What is the time complexity of Binary Search?', a: 'O(log n)', type: 'MCQ', opt: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'] },
    { q: 'A linked list stores elements in contiguous memory.', a: 'False', type: 'True/False' },
    { q: 'The process of converting a high-level language to machine code is called _______.', a: 'Compilation', type: 'Fill in the Blank' },
    { q: 'Explain the difference between a process and a thread.', a: '...', type: 'Short Answer' },
];

export default function QuestionGeneratorPage() {
    const [subject, setSubject] = useState(SUBJECTS[0]);
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [difficulty, setDifficulty] = useState('Medium');
    const [type, setType] = useState('MCQ');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<typeof SAMPLE_QUESTIONS>([]);
    const [generated, setGenerated] = useState(false);

    const generate = async () => {
        setLoading(true);
        setGenerated(false);
        await new Promise(r => setTimeout(r, 2000));
        setQuestions(SAMPLE_QUESTIONS.slice(0, count > 5 ? 5 : count));
        setLoading(false);
        setGenerated(true);
    };

    const copyAll = () => {
        const text = questions.map((q, i) => `Q${i + 1}. ${q.q}\nAnswer: ${q.a}`).join('\n\n');
        navigator.clipboard.writeText(text);
        alert('Questions copied to clipboard!');
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="AI Question Generator"
                    subtitle="Generate exam-ready questions using AI. Customize by topic, type, and difficulty."
                />

                <div className="grid lg:grid-cols-12 gap-8 mt-6">
                    {/* Config Panel */}
                    <div className="lg:col-span-4 space-y-5">
                        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                            <h3 className="font-black flex items-center gap-2 mb-6 text-lg relative z-10">
                                <Sparkles className="text-indigo-400" size={20} /> Configure AI
                            </h3>

                            <div className="space-y-4 relative z-10">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Subject</label>
                                    <select value={subject} onChange={e => setSubject(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                                        {SUBJECTS.map(s => <option key={s} className="bg-slate-800">{s}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Specific Topic</label>
                                    <input value={topic} onChange={e => setTopic(e.target.value)}
                                        placeholder="e.g. Binary Trees, TCP/IP..."
                                        className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" />
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Question Type</label>
                                    <select value={type} onChange={e => setType(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                                        {TYPES.map(t => <option key={t} className="bg-slate-800">{t}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Difficulty</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {DIFFICULTY.map(d => (
                                            <button key={d} onClick={() => setDifficulty(d)}
                                                className={`py-2 rounded-xl text-xs font-bold border transition-all ${difficulty === d ? 'bg-indigo-600 text-white border-indigo-600' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Number of Questions: {count}</label>
                                    <input type="range" min={1} max={20} value={count} onChange={e => setCount(Number(e.target.value))}
                                        className="w-full accent-indigo-500" />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1"><span>1</span><span>20</span></div>
                                </div>

                                <Button onClick={generate} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
                                    {loading ? <><Loader2 size={16} className="mr-2 animate-spin" /> Generating...</> : <><Brain size={16} className="mr-2" /> Generate Questions</>}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Questions Output */}
                    <div className="lg:col-span-8">
                        {loading ? (
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center">
                                <Loader2 size={40} className="text-indigo-400 animate-spin mb-4" />
                                <p className="font-black text-slate-700">AI is crafting questions...</p>
                                <p className="text-sm text-slate-400 mt-2">Analyzing {subject} curriculum...</p>
                            </div>
                        ) : generated && questions.length > 0 ? (
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                                    <p className="font-black text-slate-800">{questions.length} Questions Generated — {difficulty} {type}</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={copyAll}><Copy size={14} className="mr-2" /> Copy All</Button>
                                        <Button variant="outline" onClick={() => alert('Downloading as PDF...')}><Download size={14} className="mr-2" /> PDF</Button>
                                        <Button onClick={generate}><RefreshCw size={14} className="mr-2" /> Regenerate</Button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-5">
                                    {questions.map((q, i) => (
                                        <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                            <div className="flex items-start gap-4">
                                                <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</span>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">{q.type}</span>
                                                    </div>
                                                    <p className="font-bold text-slate-800 mb-3">{q.q}</p>
                                                    {q.opt && (
                                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                                            {q.opt.map((o, j) => (
                                                                <div key={j} className={`text-xs px-3 py-2 rounded-xl border font-medium ${o === q.a ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-600'}`}>
                                                                    {String.fromCharCode(65 + j)}. {o}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <p className="text-xs text-emerald-600 font-bold">✓ Answer: {q.a}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-4">
                                    <Brain size={36} className="text-indigo-400" />
                                </div>
                                <h3 className="font-black text-slate-700 text-xl mb-2">Ready to Generate</h3>
                                <p className="text-slate-400 text-sm">Configure your settings on the left and click Generate Questions.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
