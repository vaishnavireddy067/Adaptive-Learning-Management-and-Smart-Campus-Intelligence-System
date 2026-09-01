'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Search, Send, Smile, Paperclip, MoreVertical, Phone, Video, Archive, Star, Circle, CheckCheck } from 'lucide-react';

const CONTACTS = [
    { id: 1, name: 'Dr. Priya Chakraborty', role: 'Faculty', avatar: '👩‍🏫', status: 'online', unread: 2, lastMsg: 'Your assignment has been reviewed.', time: '10:32 AM' },
    { id: 2, name: 'Rahul Verma', role: 'Student', avatar: '🧑‍💻', status: 'online', unread: 0, lastMsg: 'Can we discuss the DSA project?', time: '9:15 AM' },
    { id: 3, name: 'Prof. Manoj Nair', role: 'Faculty', avatar: '👨‍🏫', status: 'offline', unread: 0, lastMsg: 'Class postponed to 3 PM.', time: 'Yesterday' },
    { id: 4, name: 'Priya Nair', role: 'Student', avatar: '👩‍🎓', status: 'online', unread: 1, lastMsg: 'Hey! Are you joining the study group?', time: 'Yesterday' },
    { id: 5, name: 'Study Group – CS501', role: 'Group', avatar: '👥', status: 'group', unread: 5, lastMsg: 'Rahul: Check the shared notes link.', time: 'Tue' },
    { id: 6, name: 'Tanya Gupta', role: 'Student', avatar: '👩‍💻', status: 'offline', unread: 0, lastMsg: 'Thanks for the help!', time: 'Mon' },
];

const MESSAGES: Record<number, { from: 'me' | 'them'; text: string; time: string }[]> = {
    1: [
        { from: 'them', text: 'Hello Aarav! I\'ve reviewed your Python assignment.', time: '10:20 AM' },
        { from: 'them', text: 'Your code logic is correct but the naming conventions need improvement. Refer to PEP 8.', time: '10:21 AM' },
        { from: 'me', text: 'Thank you Ma\'am! I\'ll go through PEP 8 and resubmit.', time: '10:25 AM' },
        { from: 'them', text: 'Your assignment has been reviewed. Good effort!', time: '10:32 AM' },
    ],
    2: [
        { from: 'them', text: 'Hey! Can we discuss the DSA project?', time: '9:10 AM' },
        { from: 'me', text: 'Sure! Let\'s meet in the library at 2 PM.', time: '9:15 AM' },
    ],
    3: [
        { from: 'them', text: 'Class postponed to 3 PM. Please inform your section.', time: 'Yesterday' },
        { from: 'me', text: 'Okay sir, I\'ll let everyone know!', time: 'Yesterday' },
    ],
    4: [
        { from: 'them', text: 'Hey! Are you joining the study group today?', time: 'Yesterday' },
        { from: 'me', text: 'Yes, definitely! What time?', time: 'Yesterday' },
    ],
    5: [
        { from: 'them', text: 'Rahul: Check the shared notes link for OS chapter 4.', time: 'Tue' },
        { from: 'me', text: 'Got it! I\'ll review tonight.', time: 'Tue' },
        { from: 'them', text: 'Tanya: Don\'t forget the quiz tomorrow!', time: 'Tue' },
    ],
    6: [
        { from: 'them', text: 'Thanks for explaining the tree traversals!', time: 'Mon' },
        { from: 'me', text: 'No problem! Happy to help anytime 😊', time: 'Mon' },
    ],
};

const EMOJIS = ['😊', '👍', '🎉', '👏', '❤️', '🙏', '😄', '🤔', '📚', '✅'];

export default function ChatPage() {
    const [selected, setSelected] = useState<typeof CONTACTS[0] | null>(null);
    const [messages, setMessages] = useState(MESSAGES);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const filteredContacts = CONTACTS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selected, messages]);

    const sendMessage = () => {
        if (!input.trim() || !selected) return;
        setMessages(prev => ({
            ...prev,
            [selected.id]: [...(prev[selected.id] || []), { from: 'me', text: input.trim(), time: 'Just now' }]
        }));
        setInput('');
        setShowEmoji(false);
    };

    const currentMessages = selected ? (messages[selected.id] || []) : [];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 ml-64 flex h-screen overflow-hidden">

                {/* Contacts Sidebar */}
                <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="font-black text-slate-800 text-xl mb-4">Messages</h2>
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search conversations..."
                                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredContacts.map(c => (
                            <button key={c.id} onClick={() => setSelected(c)}
                                className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 ${selected?.id === c.id ? 'bg-indigo-50' : ''}`}>
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">{c.avatar}</div>
                                    {c.status === 'online' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
                                    {c.status === 'group' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-sm text-slate-800 truncate">{c.name}</p>
                                        <p className="text-[10px] text-slate-400 shrink-0 ml-2">{c.time}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-0.5">
                                        <p className="text-xs text-slate-400 truncate">{c.lastMsg}</p>
                                        {c.unread > 0 && (
                                            <span className="ml-2 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shrink-0">{c.unread}</span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                {selected ? (
                    <div className="flex-1 flex flex-col bg-slate-50">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">{selected.avatar}</div>
                                <div>
                                    <p className="font-black text-slate-800">{selected.name}</p>
                                    <p className="text-xs text-slate-400">{selected.role} • {selected.status === 'online' ? <span className="text-emerald-500">Online</span> : 'Offline'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><Phone size={18} /></button>
                                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><Video size={18} /></button>
                                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><MoreVertical size={18} /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {currentMessages.map((m, i) => (
                                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    {m.from === 'them' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm mr-2 shrink-0 mt-1">
                                            {selected.avatar}
                                        </div>
                                    )}
                                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${m.from === 'me' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'}`}>
                                        <p className="text-sm leading-relaxed">{m.text}</p>
                                        <div className={`flex items-center gap-1 mt-1 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                            <p className={`text-[10px] ${m.from === 'me' ? 'text-indigo-200' : 'text-slate-400'}`}>{m.time}</p>
                                            {m.from === 'me' && <CheckCheck size={12} className="text-indigo-200" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Emoji Picker */}
                        {showEmoji && (
                            <div className="bg-white border-t border-slate-200 px-6 py-3 flex gap-3">
                                {EMOJIS.map(e => (
                                    <button key={e} onClick={() => setInput(prev => prev + e)} className="text-2xl hover:scale-125 transition-transform">{e}</button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center gap-3">
                            <button onClick={() => setShowEmoji(!showEmoji)}
                                className={`p-2 rounded-xl transition-colors ${showEmoji ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-500'}`}>
                                <Smile size={20} />
                            </button>
                            <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                placeholder={`Message ${selected.name}...`}
                                className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 placeholder-slate-400"
                            />
                            <button onClick={sendMessage}
                                className={`p-2.5 rounded-xl transition-all ${input.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-50">
                        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-4">
                            <Send size={32} className="text-indigo-400" />
                        </div>
                        <h3 className="font-black text-slate-700 text-xl mb-2">Select a Conversation</h3>
                        <p className="text-slate-400 text-sm">Choose a contact from the left to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
