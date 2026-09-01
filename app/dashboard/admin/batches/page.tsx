

'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { Button } from '../../../../components/ui/Button';
import { Modal } from '../../../../components/ui/Modal';
import { Input } from '../../../../components/ui/Input';
import { STUDENT_LIST } from '../../../../mock-data/students';
import { Users, GraduationCap, ArrowRight, Plus, Layers } from 'lucide-react';

interface Section {
    id: string;
    name: string;
    year: string;
    maxCapacity: number;
}

const INITIAL_SECTIONS: Section[] = [
    { id: 's1', name: 'Section A', year: '1st Year', maxCapacity: 60 },
    { id: 's2', name: 'Section B', year: '1st Year', maxCapacity: 60 },
    { id: 's3', name: 'Section A', year: '2nd Year', maxCapacity: 65 },
    { id: 's4', name: 'Section A', year: '3rd Year', maxCapacity: 50 },
    { id: 's5', name: 'Section A', year: '4th Year', maxCapacity: 40 },
];

export default function BatchesPage() {
    const role = 'admin';
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

    const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>('');

    const [formData, setFormData] = useState({
        name: '',
        maxCapacity: 60
    });

    const handleOpenAddSection = (year: string) => {
        setSelectedYear(year);
        setFormData({ name: '', maxCapacity: 60 });
        setIsModalOpen(true);
    };

    const handleAddSection = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        const newSection: Section = {
            id: `sec${Date.now()}`,
            name: formData.name,
            year: selectedYear,
            maxCapacity: Number(formData.maxCapacity)
        };

        setSections([...sections, newSection]);
        setIsModalOpen(false);
    };

    // Calculate stats per year
    const batchStats = years.map(year => {
        const studentsInYear = STUDENT_LIST.filter(s => s.year === year);
        const yearSections = sections.filter(s => s.year === year);

        return {
            name: year,
            studentCount: studentsInYear.length,
            avgCGPA: studentsInYear.length > 0
                ? (studentsInYear.reduce((sum, s) => sum + s.cgpa, 0) / studentsInYear.length).toFixed(2)
                : '0.00',
            activeStudents: studentsInYear.filter(s => s.status === 'Active').length,
            sections: yearSections
        };
    });

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Student Batches"
                    subtitle="Overview of all student batches and academic years"
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {batchStats.map((batch) => (
                        <div key={batch.name} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{batch.name}</h3>
                                            <p className="text-sm text-gray-500">Computer Science</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-gray-400">View Full List <ArrowRight size={16} className="ml-1" /></Button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-2">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Students</p>
                                        <p className="font-bold text-gray-900 text-lg">{batch.studentCount}</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Avg CGPA</p>
                                        <p className="font-bold text-gray-900 text-lg">{batch.avgCGPA}</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Active</p>
                                        <p className="font-bold text-emerald-600 text-lg">{batch.activeStudents}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 flex-1">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Layers size={14} /> Sections
                                    </h4>
                                    <Button size="sm" variant="outline" onClick={() => handleOpenAddSection(batch.name)}>
                                        <Plus size={14} className="mr-1" /> Add Section
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {batch.sections.length > 0 ? (
                                        batch.sections.map(section => (
                                            <div key={section.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                        {section.name.split(' ')[1]}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{section.name}</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Max: <span className="font-semibold text-gray-700">{section.maxCapacity}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-gray-400 text-sm italic">
                                            No sections created yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`Add New Section - ${selectedYear}`}
                >
                    <form onSubmit={handleAddSection} className="space-y-4">
                        <Input
                            label="Section Name"
                            name="name"
                            placeholder="e.g. Section C"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Max Capacity"
                            name="maxCapacity"
                            type="number"
                            value={formData.maxCapacity}
                            onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                            required
                        />

                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit">Create Section</Button>
                        </div>
                    </form>
                </Modal>

            </main>
        </div>
    );
}
