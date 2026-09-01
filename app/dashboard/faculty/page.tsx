'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { TIMETABLE_DATA } from '../../../mock-data/timetable';
import { ATTENDANCE_DATA } from '../../../mock-data/attendance';
import { Clock, MapPin, CheckSquare, MoreVertical, PlayCircle, CheckCircle, Upload, Brain } from 'lucide-react';

export default function FacultyDashboard() {
    const role = 'faculty';
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

    const handleMarkAttendance = (id: string) => {
        setSelectedClassId(id);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="faculty" />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="My Schedule"
                    subtitle="Manage your classes, attendance, and generate AI-powered assessment questions."
                    action={
                        <Button 
                            variant="ghost" 
                            className="bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                            onClick={async () => {
                                const topic = prompt("Enter the topic for the AI Question Generator:");
                                if (!topic) return;
                                alert("AI Intelligence Core: Generating structured questions from course context...");
                                const response = await fetch('/api/ai', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ 
                                        prompt: `Generate 5 high-quality MCQs for the topic: ${topic}. Format it for a paper.`, 
                                        type: 'quiz' 
                                    }),
                                });
                                const data = await response.json();
                                alert("AI Generated Quiz Questions:\n\n" + data.result);
                            }}
                        >
                            <Brain size={18} className="mr-2" /> AI Quiz Generator
                        </Button>
                    }
                />

                {/* Current / Today's Classes */}
                <div className="space-y-6">
                    {TIMETABLE_DATA.map((slot) => (
                        <div key={slot.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex gap-6 items-center">
                                <div className={`p-4 rounded-xl flex flex-col items-center justify-center w-20 h-20 ${slot.status === 'Ongoing' ? 'bg-indigo-100 text-indigo-700' :
                                        slot.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    <span className="font-bold text-xl">{slot.time.split(' ')[0]}</span>
                                    <span className="text-xs uppercase font-medium">{slot.time.split(' ')[1]}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{slot.subject}</h3>
                                        {slot.status === 'Ongoing' && <Badge label="Ongoing" variant="info" className="animate-pulse" />}
                                        {slot.status === 'Completed' && <Badge label="Completed" variant="success" />}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {slot.time}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {slot.room}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                <Button variant="outline" className="flex-1 md:flex-none" onClick={() => alert('Upload Notes Modal')}>
                                    <Upload size={18} className="mr-2" /> Upload Notes
                                </Button>
                                {slot.status === 'Ongoing' && (
                                    <Button onClick={() => handleMarkAttendance(slot.id)} className="flex-1 md:flex-none">
                                        <CheckSquare size={18} className="mr-2" /> Attendance
                                    </Button>
                                )}
                                {slot.status === 'Upcoming' && (
                                    <Button className="flex-1 md:flex-none">
                                        <PlayCircle size={18} className="mr-2" /> Start Class
                                    </Button>
                                )}
                                {slot.status === 'Completed' && (
                                    <Button variant="secondary" className="flex-1 md:flex-none" disabled>
                                        <CheckCircle size={18} className="mr-2" /> Submitted
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Workload Summary */}
                <div className="mt-12">
                    <h3 className="text-lg font-bold mb-4">Teaching Statistics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg">
                            <p className="text-indigo-200 text-sm">Total Classes This Week</p>
                            <p className="text-3xl font-bold mt-2">12</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm">Hours Taught</p>
                            <p className="text-3xl font-bold mt-2 text-gray-900">8.5 <span className="text-sm font-normal text-gray-400">/ 20</span></p>
                        </div>
                    </div>
                </div>
            </main>

            <AttendanceModal isOpen={!!selectedClassId} onClose={() => setSelectedClassId(null)} />
        </div>
    );
}

function AttendanceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [students, setStudents] = useState(ATTENDANCE_DATA);

    const toggleStatus = (index: number) => {
        // Mock toggle for UI only
        const newStudents = [...students];
        // ... logic simplified
        setStudents(newStudents);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Mark Attendance - CS101" footer={
            <Button onClick={onClose} className="w-full">Submit Attendance</Button>
        }>
            <div className="max-h-96 overflow-y-auto w-full">
                <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {students.map((s, i) => (
                            <tr key={i}>
                                <td className="px-4 py-3 text-sm text-gray-900">{s.studentName} <span className="text-xs text-gray-400 block">{s.studentId}</span></td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500">P</button>
                                        <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs hover:bg-red-100 hover:text-red-600 transition-colors">A</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
