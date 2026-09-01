'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { FileText, Download, FilePlus, Search, MoreVertical, X } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Modal } from '../../../../components/ui/Modal';
import { Input } from '../../../../components/ui/Input';

export default function NotesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', preview: '' });
    
    const [facultyMaterials] = useState([
        { title: "Python Basics Overview.pdf", subject: "Python Programming", faculty: "Prof. Suresh", size: "2.4 MB", type: "pdf", color: "rose" },
        { title: "Module 2 Algorithms.pptx", subject: "Data Structures", faculty: "Dr. Alan Turing", size: "5.1 MB", type: "ppt", color: "orange" },
        { title: "Regression Models Guide.docx", subject: "Machine Learning", faculty: "Prof. Ravi", size: "1.2 MB", type: "doc", color: "blue" },
    ]);

    const [personalNotes, setPersonalNotes] = useState([
        { title: "Exam Prep: Loops", preview: "Remember that a while loop requires a breaking condition or it will run forever...", date: "2 days ago", color: "bg-yellow-50" },
        { title: "DS Formulas", preview: "O(n log n) is typical for sorting algorithms like Merge Sort and Quick Sort...", date: "Last week", color: "bg-blue-50" },
        { title: "ML Project Ideas", preview: "1. Stock predictor using random forest. 2. Heart disease classification...", date: "Oct 12", color: "bg-emerald-50" },
        { title: "Pandas Cheat Sheet", preview: "df.head(), df.tail(), df.describe(), df.info(). Handling NA values...", date: "Oct 05", color: "bg-purple-50" },
    ]);

    const handleDownload = (title: string) => {
        alert(`Starting download for: ${title}`);
    };

    const handleAddNote = () => {
        if (!newNote.title || !newNote.preview) return;
        
        const note = {
            ...newNote,
            date: "Just now",
            color: "bg-indigo-50"
        };
        
        setPersonalNotes([note, ...personalNotes]);
        setNewNote({ title: '', preview: '' });
        setIsModalOpen(false);
    };

    const filteredMaterials = facultyMaterials.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredNotes = personalNotes.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <div className="flex justify-between items-center mb-6">
                    <PageHeader
                        title="Class Notes & Materials"
                        subtitle="Access faculty uploads, PDFs, and your personal study notes."
                    />
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search notes..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 min-w-[300px]"
                            />
                        </div>
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
                        >
                            <FilePlus size={18} className="mr-2"/> New Personal Note
                        </Button>
                    </div>
                </div>

                {/* Faculty Uploads Section */}
                <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">Recent Faculty Uploads</h3>
                {filteredMaterials.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredMaterials.map((material, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors group relative">
                                <button className="absolute right-4 top-4 text-slate-400 hover:text-slate-700">
                                    <MoreVertical size={18} />
                                </button>
                                <div className="flex flex-col h-full">
                                    <div className={`w-12 h-12 bg-${material.color}-50 text-${material.color}-600 rounded-xl flex items-center justify-center font-bold uppercase tracking-wider mb-4`}>
                                        {material.type}
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg leading-tight mb-2 pr-6 group-hover:text-emerald-700 transition-colors">{material.title}</h4>
                                    <p className="text-slate-500 text-sm mb-4 bg-slate-50 w-fit px-2 rounded font-medium">{material.subject}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
                                        <span>Added by {material.faculty}</span>
                                        <span>•</span>
                                        <span>{material.size}</span>
                                    </div>
                                    <Button 
                                        onClick={() => handleDownload(material.title)}
                                        className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white text-sm transition-all shadow-md group-hover:bg-emerald-600"
                                    >
                                       <Download size={14} className="mr-2"/> Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
                        <p className="text-slate-500">No materials found matching your search.</p>
                    </div>
                )}

                {/* Personal Notes Section */}
                <h3 className="text-xl font-bold text-slate-800 mb-4 mt-12 border-t border-slate-200 pt-8">My Personal Notes</h3>
                {filteredNotes.length > 0 ? (
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                        {filteredNotes.map((note, i) => (
                            <div 
                                key={i} 
                                onClick={() => alert(`Opening note: ${note.title}`)}
                                className={`${note.color} p-5 rounded-2xl border border-black/5 hover:shadow-md transition-shadow cursor-pointer min-h-[160px] flex flex-col relative`}
                            >
                                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                                    <FileText size={16} className="text-slate-500"/> {note.title}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{note.preview}</p>
                                <span className="text-xs font-semibold text-slate-400 mt-auto">{note.date}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
                        <p className="text-slate-500">No personal notes found.</p>
                    </div>
                )}

                {/* New Note Modal */}
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    title="Add New Personal Note"
                    footer={
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button className="bg-emerald-600 text-white" onClick={handleAddNote}>Save Note</Button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Note Title</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                                placeholder="e.g. Algorithms Revision"
                                value={newNote.title}
                                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                            <textarea 
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 min-h-[150px]"
                                placeholder="Type your note here..."
                                value={newNote.preview}
                                onChange={(e) => setNewNote({...newNote, preview: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                </Modal>
            </main>
        </div>
    );
}
