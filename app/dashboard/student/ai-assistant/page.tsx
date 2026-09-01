'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Wand2, MessageSquare, BookOpen, Map, FileText, Target, Send, Loader2, Sparkles, User, Bot, Trash2 } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { cn } from '../../../../utils/helpers';

type AIFeature = 'doubt' | 'quiz' | 'recommendation' | 'roadmap' | 'notes' | 'rag';
type Message = { role: 'user' | 'assistant'; content: string; type?: AIFeature };

export default function AIAssistantPage() {
    const [activeFeature, setActiveFeature] = useState<AIFeature>('doubt');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const features = [
        { id: 'doubt', label: 'Ask Doubt', icon: MessageSquare, description: 'AI Tutor', color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'rag', label: 'Study Companion', icon: BookOpen, description: 'Notes-Based QA', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'quiz', label: 'Generate Quiz', icon: Target, description: 'Smart MCQ Gen', color: 'text-rose-500', bg: 'bg-rose-50' },
        { id: 'recommendation', label: 'Adaptive Study', icon: Sparkles, description: 'Performance Logic', color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'roadmap', label: 'Career Roadmap', icon: Map, description: 'Skill Path Gen', color: 'text-purple-500', bg: 'bg-purple-50' },
        { id: 'notes', label: 'Deep Notes', icon: FileText, description: 'Revision Master', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ] as const;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: 'user', content: input, type: activeFeature };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: input, 
                    type: activeFeature,
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                    context: {
                        cgpa: 3.8,
                        department: 'Computer Science',
                        year: '3rd Year',
                        lectureData: activeFeature === 'rag' ? "In yesterday's Discrete Mathematics lecture, we covered Graph Theory, specifically Dijkstra's algorithm for shortest paths and its O(V^2) complexity using adjacency matrices." : ""
                    }
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            setMessages(prev => [...prev, { role: 'assistant', content: data.result }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error: Failed to reach the Intelligence Core. Please check your connection.' }]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-64px)]">
                    <div className="flex justify-between items-end mb-6">
                        <PageHeader
                            title="Intelligence Core"
                            subtitle="Autonomous AI tutor specializing in academic performance and concept mastery."
                        />
                        <Button 
                            variant="ghost" 
                            onClick={clearChat}
                            className="text-slate-400 hover:text-rose-500 mb-2 gap-2"
                        >
                            <Trash2 size={16} /> Clear Session
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
                        {/* Intelligence Modes */}
                        <div className="lg:col-span-3 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Select Mode</h3>
                            {features.map((feature) => (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveFeature(feature.id)}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group relative",
                                        activeFeature === feature.id
                                            ? "bg-white border-indigo-200 shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-50 translate-x-2"
                                            : "bg-white/40 border-slate-100 hover:bg-white hover:border-slate-300"
                                    )}
                                >
                                    <div className={cn("p-2.5 rounded-xl transition-colors shrink-0", 
                                        activeFeature === feature.id ? "bg-indigo-600 text-white" : feature.bg + " " + feature.color)}>
                                        <feature.icon size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className={cn("font-bold text-sm truncate", activeFeature === feature.id ? "text-slate-900" : "text-slate-600")}>
                                            {feature.label}
                                        </h4>
                                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{feature.description}</p>
                                    </div>
                                    {activeFeature === feature.id && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Intelligence Hub */}
                        <div className="lg:col-span-9 flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-2xl shadow-indigo-100/20 overflow-hidden relative">
                            {/* Neural Background Decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] -z-10 -mr-32 -mt-32" />
                            
                            {/* Chat View */}
                            <div className="flex-1 p-8 overflow-y-auto space-y-8 custom-scrollbar">
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-20">
                                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[32px] rotate-12 flex items-center justify-center mb-8 shadow-2xl shadow-indigo-200">
                                            <Sparkles size={40} className="text-white animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">System Online</h3>
                                        <p className="text-slate-500 text-base leading-relaxed">
                                            I am synced with your 3rd Year Computer Science data. How shall we accelerate your learning session today?
                                        </p>
                                        <div className="mt-8 flex flex-wrap justify-center gap-2">
                                            {['Dijkstra Complexity', 'Explain BFS', 'Roadmap for AI'].map(tag => (
                                                <button 
                                                    key={tag}
                                                    onClick={() => setInput(tag)}
                                                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-white hover:shadow-md transition-all"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <div 
                                            key={idx} 
                                            className={cn(
                                                "flex gap-5 max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-500",
                                                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg font-bold text-xs uppercase",
                                                msg.role === 'user' ? "bg-white border border-slate-200 text-slate-400" : "bg-indigo-600 text-white shadow-indigo-200"
                                            )}>
                                                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                                            </div>
                                            <div className={cn(
                                                "p-6 rounded-[24px] text-sm leading-relaxed shadow-sm border",
                                                msg.role === 'user' 
                                                    ? "bg-slate-900 text-white border-slate-800 rounded-tr-none" 
                                                    : "bg-[#F8FAFC] text-slate-800 border-slate-100 rounded-tl-none font-medium"
                                            )}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))
                                )}
                                {loading && (
                                    <div className="flex gap-5 mr-auto max-w-[80%]">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg animate-pulse">
                                            <Bot size={18} />
                                        </div>
                                        <div className="bg-[#F8FAFC] p-4 px-6 rounded-[24px] rounded-tl-none border border-slate-100 flex items-center gap-3">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
                                            </div>
                                            <span className="text-xs font-bold text-indigo-700 tracking-wider">AI PROCESSING...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Neural Input Interface */}
                            <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                                <form onSubmit={handleSubmit} className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[28px] blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                                    <div className="relative flex gap-3">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder={
                                                activeFeature === 'doubt' ? "Ask the Intelligence Core..." :
                                                activeFeature === 'rag' ? "Query specific notes (e.g. Dijkstra's Algorithm)..." :
                                                activeFeature === 'quiz' ? "Topic for Intelligence Assessment..." :
                                                activeFeature === 'recommendation' ? "Ask for performance optimization..." :
                                                activeFeature === 'roadmap' ? "Vision for your future career..." :
                                                "Subject for Deep Matrix notes..."
                                            }
                                            className="flex-1 bg-white p-5 px-7 rounded-[24px] border border-slate-200 focus:outline-none focus:border-indigo-400 transition-all text-sm font-medium shadow-sm placeholder:text-slate-400"
                                        />
                                        <Button 
                                            type="submit" 
                                            disabled={loading || !input.trim()}
                                            className="bg-slate-900 hover:bg-black text-white rounded-[24px] px-8 shadow-xl transition-all active:scale-95 disabled:opacity-50 h-auto"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                        </Button>
                                    </div>
                                </form>
                                <p className="text-center mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    Adaptive Intelligence • Neural-Synched to {activeFeature.toUpperCase()} Mode
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
