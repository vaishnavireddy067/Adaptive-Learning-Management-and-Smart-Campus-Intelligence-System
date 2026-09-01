'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Sparkles, Send, Bot, User, BookOpen, Lightbulb, Zap, HelpCircle, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const quickPrompts = [
  'Explain Convolutional Neural Networks for my AI midterm.',
  'How do I implement a Random Forest in the ML lab?',
  'Summarize the key notes from yesterday\'s Big Data lecture.',
  'Help me calculate my required internal marks for an A grade.'
];

const mockMessages = [
  { id: 1, role: 'buddy', content: 'Hi, Vaishnavi! I\'m your AI Study Buddy. I\'ve analyzed your AI & DS curriculum for Section A. What can I help you study today?' },
  { id: 2, role: 'user', content: 'What is the next topic in my AI class?' },
  { id: 3, role: 'buddy', content: 'According to your mid-term syllabus for Semester 06, your next topic is **"State Space Search and Optimization"**. I have your class notes and a sample lab exercise ready if you\'d like to start early!' },
];

export default function AIStudyBuddyPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), role: 'user', content: input }]);
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col p-8 space-y-8 bg-slate-50/20">
      <PageHeader 
        title="AI Study Buddy"
        subtitle="24/7 Contextual Chatbot trained on your specific AI & DS curriculum."
      />

      <div className="flex-1 grid lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Left - Chat Box */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-6 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                            msg.role === 'buddy' ? 'bg-indigo-600 text-white animate-bounce-subtle' : 'bg-slate-900 text-white'
                        }`}>
                            {msg.role === 'buddy' ? <Bot size={24} /> : <User size={24} />}
                        </div>
                        <div className={`p-6 rounded-3xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'buddy' 
                                ? 'bg-slate-50 text-slate-700 font-medium rounded-tl-none border border-slate-100' 
                                : 'bg-indigo-600 text-white font-bold rounded-tr-none'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_50px_-25px_rgba(0,0,0,0.05)] relative z-20">
                <div className="flex gap-4 p-2 bg-slate-50 rounded-3xl border border-slate-100 focus-within:border-indigo-500 focus-within:bg-white transition-all shadow-inner group">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about homework, lab modules, or attendance..."
                        className="flex-1 bg-transparent border-none focus:ring-0 px-6 font-bold text-slate-600 placeholder:text-slate-300"
                    />
                    <button 
                        onClick={handleSend}
                        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/30 transition-all active:scale-95"
                    >
                        <Send size={24} />
                    </button>
                </div>
            </div>
        </div>

        {/* Right - Context Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Zap className="text-amber-500" size={22} /> Quick Actions
                </h3>
                <div className="space-y-3">
                    {quickPrompts.map((prompt, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setInput(prompt)}
                            className="w-full text-left p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl text-xs font-bold text-slate-500 transition-all border border-transparent hover:border-indigo-100 group flex items-center justify-between"
                        >
                            <span className="max-w-[85%]">{prompt}</span>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden flex-1 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                <div className="relative z-10 h-full flex flex-col">
                    <div className="flex gap-4 items-center mb-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Lightbulb className="text-amber-400" size={24} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">AI Memory</h4>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                        I remember you have a lab session in **Block C (AI Lab 1)** at 10:45 AM. I have loaded the sample implementation of **Backpropagation** on your dashboard.
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                        <div className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Knowledge Base</span>
                            <span className="text-[10px] font-black uppercase text-emerald-400">Active</span>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Syllabus Mapping</span>
                            <span className="text-[10px] font-black uppercase text-indigo-400">Semester 06</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
