'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { MessageSquare, ThumbsUp, MessageCircle, User, Bot, Tag, Filter } from 'lucide-react';
import { cn } from '../../../../utils/helpers';

const FORUM_POSTS = [
    { 
        id: 1, 
        author: 'Alice Green', 
        tag: 'Data Structures', 
        question: 'What is the best way to visualize a Red-Black Tree rotation?', 
        replies: 12, 
        upvotes: 24,
        time: '2 hours ago',
        aiSuggestion: 'AI Tip: Use the Visualgo tool or try drawing the parent-child relationships manually during rotation.'
    },
    { 
        id: 2, 
        author: 'Bob White', 
        tag: 'AI/ML', 
        question: 'Can someone explain the difference between L1 and L2 regularization simply?', 
        replies: 5, 
        upvotes: 18,
        time: '5 hours ago',
        aiSuggestion: 'AI Tip: L1 leads to sparsity (zero weights), L2 leads to small weights. Think of Lasso vs Ridge!'
    }
];

export default function ForumPage() {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader 
                    title="Learning Forum"
                    subtitle="Ask doubts, share notes, and engage with your peers and faculty."
                    action={<Button className="shadow-lg shadow-indigo-100">+ New Discussion</Button>}
                />

                <div className="grid lg:grid-cols-12 gap-8 mt-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-3 space-y-6">
                        <section className="bg-white p-6 rounded-2xl border border-slate-200">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Filter size={14} /> Browse Topics
                            </h3>
                            <div className="space-y-2">
                                {['All Topics', 'Data Structures', 'Web Development', 'AI/ML', 'Mathematics', 'Placement Prep'].map(topic => (
                                    <button 
                                        key={topic}
                                        className={cn(
                                            "w-full text-left p-3 rounded-xl text-sm font-bold transition-all",
                                            topic === 'All Topics' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-2">Smart Tagging</h3>
                            <p className="text-xs text-indigo-100 mb-4 opacity-80">Our AI automatically tags your posts and alerts relevant faculty members.</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-white/20 rounded-md text-[10px] font-bold">#Algorithm</span>
                                <span className="px-2 py-1 bg-white/20 rounded-md text-[10px] font-bold">#DBMS</span>
                                <span className="px-2 py-1 bg-white/20 rounded-md text-[10px] font-bold">#React</span>
                            </div>
                        </section>
                    </div>

                    {/* Posts List */}
                    <div className="lg:col-span-9 space-y-6">
                        {FORUM_POSTS.map((post) => (
                            <div key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all overflow-hidden group">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 leading-none">{post.author}</h4>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">
                                            <Tag size={12} /> {post.tag}
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-800 mb-6 group-hover:text-indigo-600 transition-colors cursor-pointer">{post.question}</h2>

                                    {/* AI Smart Insight */}
                                    <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl flex gap-3 mb-6">
                                        <div className="shrink-0 w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                                            <Bot size={18} />
                                        </div>
                                        <p className="text-xs text-amber-800 font-medium leading-relaxed italic">
                                            {post.aiSuggestion}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                            <ThumbsUp size={18} />
                                            <span className="text-sm font-bold">{post.upvotes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                            <MessageCircle size={18} />
                                            <span className="text-sm font-bold">{post.replies} Replies</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
