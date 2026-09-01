'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { DataTable, Column } from '../../../../components/tables/DataTable';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { Input } from '../../../../components/ui/Input';
import { Select } from '../../../../components/ui/Select';
import { Modal } from '../../../../components/ui/Modal';
import { FACULTY_LIST, FacultyMember } from '../../../../mock-data/faculty';
import { DEPARTMENTS } from '../../../../mock-data/departments';
import { Download, Filter, Search, PlusCircle, X } from 'lucide-react';

export default function FacultyPage() {
    const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let isMounted = true;
        fetch('/api/faculty')
            .then(res => res.json())
            .then(data => {
                if (isMounted && Array.isArray(data)) {
                    const mapped: FacultyMember[] = data.map((item: any) => ({
                        id: item.id,
                        name: item.name || 'Faculty Member',
                        email: item.email || '',
                        department: item.department || 'Computer Science',
                        designation: item.designation || 'Professor',
                        joinDate: item.createdAt ? item.createdAt.split('T')[0] : '2024-01-15',
                        status: item.status === 'active' ? 'Active' : 'Active'
                    }));
                    setFacultyList(mapped.length > 0 ? mapped : FACULTY_LIST);
                }
            })
            .catch(() => {
                if (isMounted) setFacultyList(FACULTY_LIST);
            });
        return () => { isMounted = false; };
    }, []);

    // Modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        department: '',
        designation: ''
    });

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        department: '',
        designation: '',
        joinDate: ''
    });

    const [editingId, setEditingId] = useState<string | null>(null);

    // Derived Data
    const designations = useMemo(() => {
        const unique = new Set(FACULTY_LIST.map(f => f.designation));
        return Array.from(unique).map(d => ({ label: d, value: d }));
    }, []);

    const departmentOptions = DEPARTMENTS.map(d => ({ label: d.name, value: d.name }));

    const filteredData = facultyList.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept = filters.department ? item.department === filters.department : true;
        const matchesDesg = filters.designation ? item.designation === filters.designation : true;

        return matchesSearch && matchesDept && matchesDesg;
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddFaculty = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        try {
            await fetch('/api/faculty', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    department: formData.department,
                    designation: formData.designation,
                })
            });
        } catch (err) {
            console.error(err);
        }

        if (editingId) {
            setFacultyList(facultyList.map(f => f.id === editingId ? { ...f, ...formData, status: f.status } : f));
        } else {
            const newFaculty: FacultyMember = {
                id: formData.id || `f${Date.now()}`,
                name: formData.name,
                email: formData.email,
                department: formData.department || 'Computer Science',
                designation: formData.designation || 'Assistant Professor',
                joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
                status: 'Active'
            };
            setFacultyList([newFaculty, ...facultyList]);
        }

        setIsAddModalOpen(false);
        setEditingId(null);
        setFormData({ id: '', name: '', email: '', department: '', designation: '', joinDate: '' });
    };

    const handleEdit = (faculty: FacultyMember) => {
        setEditingId(faculty.id);
        setFormData({
            id: faculty.id,
            name: faculty.name,
            email: faculty.email,
            department: faculty.department,
            designation: faculty.designation,
            joinDate: faculty.joinDate
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this faculty member?')) {
            setFacultyList(facultyList.filter(f => f.id !== id));
        }
    };

    const clearFilters = () => {
        setFilters({ department: '', designation: '' });
        setIsFilterModalOpen(false);
    };

    const columns: Column<FacultyMember>[] = [
        { header: 'ID', accessor: 'id', className: 'w-16 text-gray-400' },
        { header: 'Name', accessor: 'name', className: 'font-semibold' },
        { header: 'Department', accessor: 'department' },
        { header: 'Designation', accessor: 'designation' },
        { header: 'Join Date', accessor: 'joinDate' },
        {
            header: 'Status',
            accessor: (item) => (
                <Badge
                    label={item.status}
                    variant={
                        item.status === 'Active' ? 'success' :
                            item.status === 'On Leave' ? 'warning' : 'neutral'
                    }
                />
            )
        },
        {
            header: 'Actions',
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
                    title="Faculty Directory"
                    subtitle="View and manage faculty members"
                    action={
                        <div className="flex gap-2 items-center">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search faculty..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-64 text-sm"
                                />
                            </div>

                            <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
                                <Filter size={18} className="mr-2" />
                                Filter
                                {(filters.department || filters.designation) && <span className="ml-1 w-2 h-2 bg-indigo-600 rounded-full inline-block"></span>}
                            </Button>

                            <Button variant="outline">
                                <Download size={18} className="mr-2" /> Export
                            </Button>

                            <Button onClick={() => setIsAddModalOpen(true)}>
                                <PlusCircle size={18} className="mr-2" /> Add Faculty
                            </Button>
                        </div>
                    }
                />

                {/* Filter Summary Row */}
                {(filters.department || filters.designation) && (
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-500">Active Filters:</span>
                        {filters.department && (
                            <Badge label={`Dept: ${filters.department}`} variant="info" className="flex items-center gap-1" />
                        )}
                        {filters.designation && (
                            <Badge label={`Role: ${filters.designation}`} variant="info" className="flex items-center gap-1" />
                        )}
                        <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium">Clear All</button>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <DataTable columns={columns} data={filteredData} />
                    {filteredData.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No faculty members found matching your criteria.
                        </div>
                    )}
                </div>

                {/* Add Faculty Modal */}
                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Add New Faculty Member"
                >
                    <form onSubmit={handleAddFaculty} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Faculty ID"
                                name="id"
                                placeholder="e.g. f9"
                                value={formData.id}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Join Date"
                                name="joinDate"
                                type="date"
                                value={formData.joinDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="Dr. John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="john.doe@college.edu"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
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
                                label="Designation"
                                name="designation"
                                options={designations}
                                value={formData.designation}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button type="submit">Add Member</Button>
                        </div>
                    </form>
                </Modal>

                {/* Filter Modal */}
                <Modal
                    isOpen={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    title="Filter Faculty"
                    footer={
                        <div className="flex w-full gap-2">
                            <Button variant="ghost" className="flex-1" onClick={clearFilters}>Reset</Button>
                            <Button className="flex-1" onClick={() => setIsFilterModalOpen(false)}>Apply Filters</Button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <Select
                            label="Department"
                            options={departmentOptions}
                            value={filters.department}
                            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                        />
                        <Select
                            label="Designation"
                            options={designations}
                            value={filters.designation}
                            onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
                        />
                    </div>
                </Modal>

            </main>
        </div>
    );
}
