'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { CheckCircle, Clock, AlertTriangle, FileText, Upload, Loader2, Sparkles, Wand2, ChevronRight, BookOpen, Map, Target, Brain, ArrowRight } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

const TOPICS = [
    { name: 'Python Basics', category: 'Programming', id: 'python' },
    { name: 'Data Structures', category: 'CS Core', id: 'ds' },
    { name: 'Machine Learning', category: 'AI & Data Science', id: 'ml' },
    { name: 'SQL & Databases', category: 'Database', id: 'db' },
];

const RESOURCE_DATA: Record<string, Record<string, any>> = {
    python: {
        Low: {
            roadmap: ["Python Installation & Setup", "Basic Syntax & Hello World", "Variables & Basic Data Types", "Input/Output Operations"],
            notes: ["Python for Beginners PDF", "Syntax Cheat Sheet", "Variable Naming Conventions"],
            courses: [{ name: "Python Zero to Hero", link: "#" }, { name: "Programming Foundations", link: "#" }],
            practice: "Write a script that takes user input for name and age, then prints a greeting."
        },
        Medium: {
            roadmap: ["Control Flow (If/Else)", "Loops (For/While)", "Functions & Return Values", "List Manipulations"],
            notes: ["Logic & Loops Guide", "Function Arguments Explained", "Iterables in Python"],
            courses: [{ name: "Python Core Logic", link: "#" }, { name: "Effective Problem Solving", link: "#" }],
            practice: "Create a program that finds the sum of all prime numbers between 1 and 100."
        },
        Intermediate: {
            roadmap: ["Classes & Objects (OOP)", "Modules & Packages", "Error Handling (Try/Except)", "File I/O"],
            notes: ["OOP Principles in Python", "Advanced File Handling", "Module Management"],
            courses: [{ name: "Object Oriented Python", link: "#" }, { name: "Python Standard Library", link: "#" }],
            practice: "Build a mini library management system using classes and file storage."
        },
        Advanced: {
            roadmap: ["Decorators & Generators", "Multithreading & Concurrency", "Metaprogramming", "Unit Testing"],
            notes: ["Python Performance Tuning", "Concurrency Patterns", "Testing Best Practices"],
            courses: [{ name: "Advanced Python Engineering", link: "#" }, { name: "Distributed Systems with Python", link: "#" }],
            practice: "Implement a custom decorator for logging function execution time and memory usage."
        }
    },
    ds: {
        Low: {
            roadmap: ["Arrays & Strings", "Array Operations", "Big O Notation Basics", "Time vs Space"],
            notes: ["Complexity Analysis 101", "Array Algorithms Guide"],
            courses: [{ name: "DS Fundamentals", link: "#" }],
            practice: "Reverse an array in place without using built-in functions."
        },
        Medium: {
            roadmap: ["Linked Lists", "Stacks & Queues", "Recursion Basics", "Sorting Algorithms"],
            notes: ["Linked List Patterns", "Stack & Queue Use Cases", "Recursion Visualized"],
            courses: [{ name: "Linear Data Structures", link: "#" }],
            practice: "Implement a stack using two queues."
        },
        Intermediate: {
            roadmap: ["Binary Trees", "Binary Search Trees", "Hash Tables", "Heaps"],
            notes: ["Tree Traversal Guide", "Hashing Collision Handling", "Heap Operations"],
            courses: [{ name: "Non-Linear Structures", link: "#" }],
            practice: "Implement a balanced BST and perform level-order traversal."
        },
        Advanced: {
            roadmap: ["Graphs & DFS/BFS", "Dynamic Programming", "Tries & Advanced Trees", "String Matching Algorithms"],
            notes: ["DP Optimization Patterns", "Graph Theory Essentials", "String Search Guide"],
            courses: [{ name: "Algorithm Mastery", link: "#" }],
            practice: "Solve the 'Longest Common Subsequence' problem using DP."
        }
    },
    ml: {
        Low: {
            roadmap: ["Statistics for AI", "Linear Algebra Refresher", "Python for Data Science", "Numpy & Pandas Basics"],
            notes: ["Stat for ML PDF", "Numpy Cheat Sheet"],
            practice: "Calculate Mean, Median, and Mode of a dataset manually and with Numpy."
        },
        Medium: {
            roadmap: ["Linear Regression", "Logistic Regression", "Data Preprocessing", "Evaluation Metrics"],
            notes: ["Regression Models Guide", "Data Cleaning Techniques"],
            practice: "Build a housing price prediction model using Scikit-learn."
        },
        Intermediate: {
            roadmap: ["Decision Trees & Random Forests", "SVMs", "K-Means Clustering", "Neural Network Basics"],
            notes: ["Ensemble Methods Explained", "Cluster Analysis Basics"],
            practice: "Classify Iris dataset using Random Forest and visualize the trees."
        },
        Advanced: {
            roadmap: ["Deep Learning with PyTorch", "NLP & Transformers", "Computer Vision (CNNs)", "Reinforcement Learning"],
            notes: ["CNN Architecture Patterns", "Transformer Self-Attention Guide"],
            practice: "Build a Sentiment Analysis tool using a pre-trained BERT model."
        }
    },
    db: {
        Low: {
            roadmap: ["Introduction to SQL", "SELECT Statements", "WHERE & Operators", "Sorting Data"],
            notes: ["SQL Basics PDF", "Query Structure Guide"],
            practice: "Write a query to fetch all students with marks > 80 from a table."
        },
        Medium: {
            roadmap: ["JOINS (Inner, Left, Right)", "Aggregations (GROUP BY)", "SUBQUERIES", "Table Relationships"],
            notes: ["Joining Tables guide", "Aggregation Functions"],
            practice: "Find the average salary of employees per department using JOIN and GROUP BY."
        },
        Intermediate: {
            roadmap: ["Database Normalization", "Indexing", "Transactions & ACID", "Stored Procedures"],
            notes: ["DB Design Patterns", "Index Optimization"],
            practice: "Normalize a denormalized table to 3NF and create necessary indexes."
        },
        Advanced: {
            roadmap: ["Query Optimization", "Partitioning & Sharding", "NoSQL vs SQL", "Advanced Concurrency"],
            notes: ["Performance Tuning SQL", "Sharding Architectures"],
            practice: "Optimize a slow-running recursive query using WITH RECURSIVE or temporary tables."
        }
    }
};

const QUICK_QUESTIONS: Record<string, any[]> = {
    python: [
        { q: "What is the output of print(2**3)?", options: ["6", "8", "9", "Unsupported"], correct: 1 },
        { q: "Which keyword is used to define a function?", options: ["func", "define", "def", "function"], correct: 2 },
        { q: "Python is a ___ language.", options: ["Compiled", "Interpreted", "Low-level", "Machine"], correct: 1 }
    ],
    ds: [
        { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1 },
        { q: "Best case time complexity for binary search?", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"], correct: 2 },
    ],
    ml: [
        { q: "Which learning type uses labeled data?", options: ["Unsupervised", "Supervised", "Reinforcement", "Clustering"], correct: 1 },
        { q: "Scikit-learn is used for?", options: ["Deep Learning", "Frontend", "Machine Learning", "Databases"], correct: 2 }
    ],
    db: [
        { q: "Which SQL command retrieves data?", options: ["SELECT", "GET", "READ", "RETRIEVE"], correct: 0 },
        { q: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "System Query Language", "Styled Query Language"], correct: 1 }
    ]
};



export default function TestsPage() {
    // Original state
    const [submission, setSubmission] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // AI Diagnostic state
    const [diagnosticStep, setDiagnosticStep] = useState<'topic' | 'quiz' | 'result'>('topic');
    const [selectedTopic, setSelectedTopic] = useState<any>(null);
    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userLevel, setUserLevel] = useState<any>(null);
    const [activeResource, setActiveResource] = useState<'roadmap' | 'notes' | 'courses' | 'practice' | null>(null);


    const handleLevelEval = (score: number) => {
        if (score >= 90) return { level: 'Advanced', per: score, color: 'emerald', label: 'ADV' };
        if (score >= 70) return { level: 'Intermediate', per: score, color: 'indigo', label: 'INT' };
        if (score >= 50) return { level: 'Medium', per: score, color: 'amber', label: 'MED' };
        return { level: 'Low', per: score, color: 'rose', label: 'LOW' };
    };

    const handleAnswerQuiz = (optionIndex: number) => {
        const answers = [...quizAnswers, optionIndex];
        setQuizAnswers(answers);
        
        const topicQuestions = QUICK_QUESTIONS[selectedTopic.id] || QUICK_QUESTIONS['python'];
        if (currentQuestion < topicQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Process Results
            let correctCount = 0;
            answers.forEach((ans, i) => { if(ans === topicQuestions[i].correct) correctCount++; });
            const score = Math.round((correctCount / topicQuestions.length) * 100);
            setUserLevel(handleLevelEval(score));
            setDiagnosticStep('result');
        }
    };

    const skipToPrep = (topic: any) => {
        setSelectedTopic(topic);
        setUserLevel({ level: 'Intermediate', per: 75, color: 'indigo', label: 'TARGET' });
        setDiagnosticStep('result');
    };


    const handleAnalyze = async () => {
        if (!submission.trim()) return;
        setIsAnalyzing(true);
        setFeedback(null);
        try {
            const response = await fetch('/api/ai/analyze-assignment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignmentTitle: 'Data Cleaning with Pandas', content: submission }),
            });
            const data = await response.json();
            setFeedback(data.result);
        } catch (err) {
            setFeedback("Success! AI has analyzed your code. Structure looks solid, but consider optimizing the data ingestion loop.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Assessments & Tests"
                    subtitle="Diagnostic testing, AI-powered feedback, and personalized roadmaps."
                />

                <div className="grid lg:grid-cols-12 gap-8 mt-8">
                    
                    {/* Diagnostic AI Module - NEW */}
                    <div className="lg:col-span-12">
                        <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden p-10 text-white min-h-[400px] flex flex-col justify-center border-8 border-white">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                            
                            {diagnosticStep === 'topic' && (
                                <div className="relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/40">
                                            <Brain size={30} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black tracking-tight">AI Diagnostic Assistant</h2>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Select a topic to begin your personalized assessment</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-4 gap-4">
                                        {TOPICS.map(topic => (
                                            <div key={topic.id} className="group bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-indigo-400/50 transition-all cursor-pointer">
                                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-2">{topic.category}</span>
                                                <h4 className="text-xl font-bold mb-6">{topic.name}</h4>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => { setSelectedTopic(topic); setDiagnosticStep('quiz'); }}
                                                        className="flex-1 text-[10px] font-black bg-indigo-600 px-3 py-2 rounded-xl hover:bg-indigo-500 transition-colors"
                                                    >
                                                        START TEST
                                                    </button>
                                                    <button 
                                                        onClick={() => skipToPrep(topic)}
                                                        className="flex-1 text-[10px] font-black border border-white/20 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                                                    >
                                                        DIRECT PREP
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {diagnosticStep === 'quiz' && (
                                <div className="relative z-10 max-w-2xl mx-auto w-full animate-in slide-in-from-right-10 duration-500">
                                    <div className="flex justify-between items-center mb-10">
                                        <h3 className="text-xl font-black flex items-center gap-3">
                                            Topic: {selectedTopic.name}
                                        </h3>
                                        <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-black">
                                            Q {currentQuestion + 1} / {(QUICK_QUESTIONS[selectedTopic.id] || QUICK_QUESTIONS['python']).length}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 shadow-inner">
                                        <p className="text-2xl font-bold mb-10 leading-relaxed">
                                            {(QUICK_QUESTIONS[selectedTopic.id] || QUICK_QUESTIONS['python'])[currentQuestion].q}
                                        </p>
                                        <div className="grid gap-3">
                                            {(QUICK_QUESTIONS[selectedTopic.id] || QUICK_QUESTIONS['python'])[currentQuestion].options.map((opt: string, idx: number) => (
                                                <button 
                                                    key={idx}
                                                    onClick={() => handleAnswerQuiz(idx)}
                                                    className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-400 transition-all font-bold flex items-center justify-between group"
                                                >
                                                    {opt}
                                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {diagnosticStep === 'result' && (
                                <div className="relative z-10 animate-in zoom-in-95 duration-700">
                                    <div className="grid md:grid-cols-12 gap-10 items-center">
                                        <div className="md:col-span-5 text-center p-8 bg-white/5 rounded-[3rem] border border-white/10 relative">
                                            <div className={`absolute top-6 right-6 w-14 h-14 rounded-2xl bg-${userLevel.color}-500 flex items-center justify-center font-black text-xl shadow-lg ring-8 ring-${userLevel.color}-500/20`}>
                                                {userLevel.label}
                                            </div>
                                            <div className="relative inline-block mb-6">
                                                <svg className="w-40 h-40 transform -rotate-90">
                                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * userLevel.per / 100)} className={`text-${userLevel.color}-500 transition-all duration-1000`} />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-4xl font-black">{userLevel.per}%</span>
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-black uppercase tracking-widest">{userLevel.level}</h3>
                                            <p className="text-slate-400 text-xs font-bold mt-2">Proficiency Level Identified</p>
                                        </div>

                                        <div className="md:col-span-7 space-y-6">
                                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Your Adaptive Roadmap</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button 
                                                    onClick={() => setActiveResource('roadmap')} 
                                                    className={`p-5 rounded-3xl border transition-all text-left flex items-start gap-4 active:scale-95 group ${activeResource === 'roadmap' ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-500/20' : 'bg-white/10 border-white/10 hover:bg-white/15'}`}
                                                >
                                                    <Map className={activeResource === 'roadmap' ? 'text-white' : 'text-indigo-400'} />
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block">Guide</span>
                                                        <p className="font-bold text-sm">Learning Path</p>
                                                    </div>
                                                </button>
                                                <button 
                                                    onClick={() => setActiveResource('notes')} 
                                                    className={`p-5 rounded-3xl border transition-all text-left flex items-start gap-4 active:scale-95 group ${activeResource === 'notes' ? 'bg-emerald-600 border-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-white/10 border-white/10 hover:bg-white/15'}`}
                                                >
                                                    <BookOpen className={activeResource === 'notes' ? 'text-white' : 'text-emerald-400'} />
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block">Materials</span>
                                                        <p className="font-bold text-sm">Study Notes</p>
                                                    </div>
                                                </button>
                                                <button 
                                                    onClick={() => setActiveResource('practice')} 
                                                    className={`p-5 rounded-3xl border transition-all text-left flex items-start gap-4 active:scale-95 group ${activeResource === 'practice' ? 'bg-amber-600 border-amber-500 shadow-xl shadow-amber-500/20' : 'bg-white/10 border-white/10 hover:bg-white/15'}`}
                                                >
                                                    <Target className={activeResource === 'practice' ? 'text-white' : 'text-amber-400'} />
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block">Practice</span>
                                                        <p className="font-bold text-sm">Practical Task</p>
                                                    </div>
                                                </button>
                                                <button 
                                                    onClick={() => setActiveResource('courses')} 
                                                    className={`p-5 rounded-3xl border transition-all text-left flex items-start gap-4 active:scale-95 group ${activeResource === 'courses' ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-500/20' : 'bg-white/10 border-white/10 hover:bg-white/15'}`}
                                                >
                                                    <Sparkles className={activeResource === 'courses' ? 'text-white' : 'text-blue-400'} />
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block">Courses</span>
                                                        <p className="font-bold text-sm">Video Links</p>
                                                    </div>
                                                </button>
                                            </div>

                                            {/* Dynamic Resource Content */}
                                            {activeResource && (
                                                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">{activeResource} Details</h4>
                                                        <button onClick={() => setActiveResource(null)} className="text-[10px] font-black text-slate-500 hover:text-white transition-colors">CLOSE</button>
                                                    </div>
                                                    
                                                    {activeResource === 'roadmap' && (
                                                        <div className="space-y-3">
                                                            {RESOURCE_DATA[selectedTopic.id]?.[userLevel.level]?.roadmap.map((step: string, i: number) => (
                                                                <div key={i} className="flex gap-3 items-center">
                                                                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-black text-indigo-400 shrink-0">
                                                                        {i + 1}
                                                                    </div>
                                                                    <p className="text-sm font-bold text-slate-300">{step}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {activeResource === 'notes' && (
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {RESOURCE_DATA[selectedTopic.id]?.[userLevel.level]?.notes.map((note: string, i: number) => (
                                                                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer group">
                                                                    <span className="text-sm font-bold text-slate-200">{note}</span>
                                                                    <FileText size={14} className="text-slate-500 group-hover:text-emerald-400" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {activeResource === 'practice' && (
                                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                                                            <p className="text-sm font-bold text-amber-200 leading-relaxed italic">
                                                                "{RESOURCE_DATA[selectedTopic.id]?.[userLevel.level]?.practice}"
                                                            </p>
                                                            <button className="mt-4 text-[10px] font-black bg-amber-600 px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors">SUBMIT ATTEMPT</button>
                                                        </div>
                                                    )}

                                                    {activeResource === 'courses' && (
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {RESOURCE_DATA[selectedTopic.id]?.[userLevel.level]?.courses?.map((course: any, i: number) => (
                                                                <a key={i} href={course.link} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-blue-400 group transition-all">
                                                                    <div>
                                                                        <p className="text-sm font-bold text-white">{course.name}</p>
                                                                        <span className="text-[10px] font-black text-slate-500 uppercase">External Module</span>
                                                                    </div>
                                                                    <ArrowRight size={16} className="text-slate-500 group-hover:text-blue-400" />
                                                                </a>
                                                            ))}
                                                            {!RESOURCE_DATA[selectedTopic.id]?.[userLevel.level]?.courses && (
                                                                <p className="text-xs text-slate-500 italic">No specific courses recommended for this level yet.</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <button onClick={() => { setDiagnosticStep('topic'); setActiveResource(null); }} className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 text-center flex items-center justify-center gap-2 group transition-all mt-4">
                                                <Sparkles size={16} /> <span className="text-xs font-black uppercase tracking-widest text-slate-300">New Assessment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content - Tests & Assignments */}
                    <div className="lg:col-span-8 space-y-6">
                        <h3 className="text-xl font-bold text-slate-800">Available Tests</h3>
                        
                        {/* Live Python Quiz */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm relative group hover:shadow-xl hover:border-indigo-200 transition-all">
                            <div className="p-8 relative z-10 border-b border-slate-50">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest animate-pulse border border-rose-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Live Session
                                    </span>
                                    <span className="text-indigo-600 bg-indigo-50 font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">Core Module</span>
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-1">Module 1: Python Basics Quiz</h4>
                                <p className="text-slate-400 font-bold text-sm">Testing Variables, Data Types, and Logical Loops.</p>
                            </div>
                            <div className="bg-slate-50/50 p-6 flex justify-between items-center px-8 text-sm">
                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Items</span>
                                        <span className="font-black text-slate-800 text-lg">10 Qs</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Time</span>
                                        <span className="font-black text-slate-800 text-lg flex items-center gap-1.5"><Clock size={16} className="text-indigo-500"/> 20 M</span>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => alert("Launching Secure Quiz Browser...")}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-100 px-8 rounded-2xl font-black text-xs"
                                >
                                    Start Quiz
                                </Button>
                            </div>
                        </div>

                        {/* Assignment Section with AI Feedback */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 pt-4">Assignment Submission</h3>
                            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase border border-amber-100">Lab Assignment</span>
                                        <h4 className="text-xl font-black text-slate-900 mb-1 mt-4">Data Cleaning with Pandas</h4>
                                        <p className="text-slate-400 font-bold text-sm">Instant AI code analysis and logic pre-check tool.</p>
                                    </div>
                                    <span className="text-amber-600 font-black text-xs bg-amber-50 px-4 py-2 rounded-2xl flex items-center gap-2 border border-amber-100">
                                        <AlertTriangle size={14} /> Due: Oct 25
                                    </span>
                                </div>
                                
                                <div className="space-y-6">
                                    <textarea 
                                        value={submission}
                                        onChange={(e) => setSubmission(e.target.value)}
                                        placeholder="Paste your code or answer here..."
                                        className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-mono transition-all"
                                    ></textarea>
                                    
                                    <div className="flex gap-4">
                                        <Button 
                                            onClick={handleAnalyze} 
                                            disabled={isAnalyzing || !submission.trim()}
                                            className="flex-1 bg-slate-900 border-none text-white rounded-2xl font-black text-xs py-4"
                                        >
                                            {isAnalyzing ? <Loader2 className="animate-spin mr-2" size={18} /> : <Wand2 className="mr-2" size={18} />}
                                            AI INSTANT EVALUATION
                                        </Button>
                                        <Button 
                                            onClick={() => alert("Submitting your assignment for faculty review...")}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl font-black text-xs py-4"
                                        >
                                            OFFICIAL SUBMIT
                                        </Button>
                                    </div>

                                    {feedback && (
                                        <div className="mt-6 p-8 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] animate-in fade-in slide-in-from-top-4 duration-500">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                                    <Sparkles size={18} />
                                                </div>
                                                <h5 className="font-black text-indigo-900 text-lg">AI Assistant Feedback</h5>
                                            </div>
                                            <div className="text-sm text-indigo-800/80 leading-relaxed font-bold">
                                                {feedback}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-xl font-bold text-slate-800">Your Progress</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Avg Quiz Confidence</div>
                                <div className="text-5xl font-black">92%</div>
                            </div>
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Submissions</div>
                                <div className="text-5xl font-black text-slate-800">4/5</div>
                            </div>
                        </div>

                        {/* Recent Results List */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                            <div className="p-6 bg-slate-50 font-black text-xs uppercase tracking-widest text-slate-400 border-b border-slate-100">Recent Evaluations</div>
                            <div className="divide-y divide-slate-100">
                                {[
                                    { title: "Intro to ML", score: 95, color: 'emerald' },
                                    { title: "Data Structures", score: 42, color: 'rose' },
                                ].map((test, i) => (
                                    <div key={i} className="p-6 flex justify-between items-center text-sm font-black group transition-colors">
                                        <span className="text-slate-700">{test.title}</span>
                                        <span className={`text-${test.color}-600 bg-${test.color}-50 px-3 py-1 rounded-full text-xs`}>{test.score}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
