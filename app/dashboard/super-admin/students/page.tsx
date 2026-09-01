'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { DataTable, Column } from '../../../../components/tables/DataTable';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { Modal } from '../../../../components/ui/Modal';
import { STUDENT_LIST, Student } from '../../../../mock-data/students';
import { DEPARTMENTS } from '../../../../mock-data/departments';
import { Download, Search, PlusCircle } from 'lucide-react';

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/students')
            .then(res => res.json())
            .then(data => {
                if (isMounted && Array.isArray(data)) {
                    const mapped: Student[] = data.map((item: any) => ({
                        id: item.id,
                        name: item.name || 'Unnamed',
                        email: item.email || '',
                        rollNumber: item.rollNo || item.id.substring(0, 8),
                        department: item.department || 'Computer Science',
                        year: '3rd Year',
                        status: item.status === 'active' ? 'Active' : 'Active',
                        cgpa: 8.5
                    }));
                    setStudents(mapped.length > 0 ? mapped : STUDENT_LIST);
                }
            })
            .catch(() => {
                if (isMounted) setStudents(STUDENT_LIST);
            });
        return () => { isMounted = false; };
    }, []);

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.department.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rollNumber: '',
        department: '',
        year: '',
        cgpa: 0
    });

    const departmentOptions = DEPARTMENTS.map(d => ({ label: d.name, value: d.name }));
    const yearOptions = [
        { label: '1st Year', value: '1st Year' },
        { label: '2nd Year', value: '2nd Year' },
        { label: '3rd Year', value: '3rd Year' },
        { label: '4th Year', value: '4th Year' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.rollNumber) return;

        try {
            await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    rollNo: formData.rollNumber,
                    department: formData.department,
                })
            });
        } catch (e) {
            console.error(e);
        }

        if (editingId) {
            setStudents(students.map(s => s.id === editingId ? {
                ...s,
                ...formData,
                year: formData.year as Student['year'],
                cgpa: Number(formData.cgpa)
            } : s));
        } else {
            const newStudent: Student = {
                id: `s${Date.now()}`,
                name: formData.name,
                email: formData.email,
                rollNumber: formData.rollNumber,
                department: formData.department || 'Computer Science',
                year: (formData.year || '1st Year') as Student['year'],
                status: 'Active',
                cgpa: Number(formData.cgpa) || 8.0
            };
            setStudents([newStudent, ...students]);
        }

        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', email: '', rollNumber: '', department: '', year: '', cgpa: 0 });
    };

    const handleEdit = (student: Student) => {
        setEditingId(student.id);
        setFormData({
            name: student.name,
            email: student.email,
            rollNumber: student.rollNumber,
            department: student.department,
            year: student.year,
            cgpa: student.cgpa
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this student record?')) {
            setStudents(students.filter(s => s.id !== id));
        }
    }

    const columns: Column<Student>[] = [
        { header: 'Roll No', accessor: 'rollNumber', className: 'font-mono text-xs text-gray-500' },
        { header: 'Student Name', accessor: 'name', className: 'font-semibold' },
        { header: 'Department', accessor: 'department' },
        { header: 'Year', accessor: (item) => <Badge label={item.year} variant="neutral" /> },
        { header: 'CGPA', accessor: 'cgpa' },
        {
            header: 'Status',
            accessor: (item) => (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Suspended' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Action',
            accessor: (item) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(item.id)}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <PageHeader
                    title="Student Records"
                    subtitle="Manage student enrollment and database records"
                    action={
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-64"
                                />

                            </div>
                            <Button variant="outline">
                                <Download size={18} className="mr-2" /> CSV
                            </Button>
                            <Button onClick={() => setIsModalOpen(true)}>
                                <PlusCircle size={18} className="mr-2" /> Add Student
                            </Button>
                        </div>
                    }
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <DataTable columns={columns} data={filteredStudents} />
                </div>


                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingId ? "Edit Student Record" : "Enroll New Student"}
                >
                    <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="Michael Brown"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="student@college.edu"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Roll Number"
                                name="rollNumber"
                                placeholder="CS2023..."
                                value={formData.rollNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Department"
                                name="department"
                                options={departmentOptions}
                                value={formData.department}
                                onChange={handleInputChange}
                                required
                            />
                            <Select
                                label="Year"
                                name="year"
                                options={yearOptions}
                                value={formData.year}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Input
                            label="Current CGPA"
                            name="cgpa"
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={formData.cgpa}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit">{editingId ? 'Update Record' : 'Enroll Student'}</Button>
                        </div>
                    </form>
                </Modal>

            </main>
        </div>
    );
}

