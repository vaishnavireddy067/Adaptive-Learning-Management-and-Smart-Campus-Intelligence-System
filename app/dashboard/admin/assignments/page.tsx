'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Select } from '../../../../components/ui/Select';
import { FACULTY_LIST } from '../../../../mock-data/faculty';
import { DEPARTMENTS } from '../../../../mock-data/departments';
import { BookOpen, UserCheck, ArrowRight } from 'lucide-react';

const INITIAL_ASSIGNMENTS = [
    { id: 'a1', subject: 'Data Structures', class: 'CS - 2nd Year', facultyId: 'f1' },
    { id: 'a2', subject: 'Algorithms', class: 'CS - 2nd Year', facultyId: 'f2' },
    { id: 'a3', subject: 'Database Systems', class: 'CS - 3rd Year', facultyId: 'f3' },
    { id: 'a4', subject: 'Operating Systems', class: 'CS - 3rd Year', facultyId: 'f3' },
    { id: 'a5', subject: 'Computer Networks', class: 'CS - 3rd Year', facultyId: '' },
];

export default function FacultyAssignmentsPage() {
    const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/assignments')
            .then(res => res.json())
            .then(data => {
                if (isMounted && Array.isArray(data) && data.length > 0) {
                    const mapped = data.map((item: any) => ({
                        id: item.id,
                        subject: item.title,
                        class: item.department ? `${item.department} - Active` : 'CS - 3rd Year',
                        facultyId: item.faculty ? 'f1' : ''
                    }));
                    setAssignments(mapped);
                }
            })
            .catch(() => {});
        return () => { isMounted = false; };
    }, []);

    const facultyOptions = FACULTY_LIST.filter(f => f.department === 'Computer Science').map(f => ({ label: f.name, value: f.id }));

    // Also include an "Unassigned" option or handle empty string
    const assignmentOptions = [{ label: 'Select Faculty...', value: '' }, ...facultyOptions];

    const handleAssignmentChange = (assignmentId: string, newFacultyId: string) => {
        setAssignments(assignments.map(a =>
            a.id === assignmentId ? { ...a, facultyId: newFacultyId } : a
        ));
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Faculty Course Assignments"
                    subtitle="Assign faculty members to courses for the current semester"
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Course List (Computer Science)</h3>
                        <span className="text-sm text-gray-500">Semester: Fall 2023</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {assignments.map((item) => {
                            const assignedFaculty = FACULTY_LIST.find(f => f.id === item.facultyId);

                            return (
                                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                            <BookOpen size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{item.subject}</h4>
                                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                                <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.class}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right mr-4">
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Assigned Instructor</p>
                                            {assignedFaculty ? (
                                                <div className="flex items-center gap-2 justify-end">
                                                    <span className="font-bold text-gray-800">{assignedFaculty.name}</span>
                                                    <UserCheck size={16} className="text-emerald-500" />
                                                </div>
                                            ) : (
                                                <span className="text-sm text-red-400 italic font-medium flex items-center gap-1 justify-end">
                                                    Not Assigned
                                                </span>
                                            )}
                                        </div>

                                        <div className="w-64">
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                value={item.facultyId}
                                                onChange={(e) => handleAssignmentChange(item.id, e.target.value)}
                                            >
                                                {assignmentOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <Button className="flex items-center gap-2">
                            Publish Assignments <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>

            </main>
        </div>
    );
}
