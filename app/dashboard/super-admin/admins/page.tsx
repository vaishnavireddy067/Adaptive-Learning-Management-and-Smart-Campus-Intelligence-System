'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../../components/layout/Sidebar';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { DataTable, Column } from '../../../../components/tables/DataTable';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Modal } from '../../../../components/ui/Modal';
import { MOCK_USERS, User } from '../../../../mock-data/users';
import { PlusCircle, ShieldCheck, Mail, Building2 } from 'lucide-react';

export default function AdminsPage() {
    const [admins, setAdmins] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                if (isMounted && Array.isArray(data)) {
                    const mapped: User[] = data.filter((u: any) => u.role === 'admin' || u.role === 'super-admin').map((u: any) => ({
                        id: u.id,
                        name: u.name || 'Admin',
                        email: u.email || '',
                        role: u.role || 'admin',
                        department: u.department || 'Administration',
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'Admin')}&background=random`
                    }));
                    setAdmins(mapped.length > 0 ? mapped : MOCK_USERS.filter(u => u.role === 'admin'));
                }
            })
            .catch(() => {
                if (isMounted) setAdmins(MOCK_USERS.filter(u => u.role === 'admin'));
            });
        return () => { isMounted = false; };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        try {
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    role: 'admin',
                    department: formData.department,
                })
            });
        } catch (e) {
            console.error(e);
        }

        if (editingId) {
            setAdmins(admins.map(a => a.id === editingId ? { ...a, ...formData } : a));
        } else {
            const newAdmin: User = {
                id: `u${Date.now()}`,
                name: formData.name,
                email: formData.email,
                role: 'admin',
                department: formData.department || 'Unassigned',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
            };
            setAdmins([newAdmin, ...admins]);
        }

        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', email: '', department: '' });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this administrator?')) {
            setAdmins(admins.filter(a => a.id !== id));
        }
    };

    const handleEdit = (admin: User) => {
        setEditingId(admin.id);
        setFormData({
            name: admin.name,
            email: admin.email,
            department: admin.department || ''
        });
        setIsModalOpen(true);
    };

    const columns: Column<User>[] = [
        {
            header: 'Admin Name',
            accessor: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
                        {item.avatar ? <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" /> : item.name[0]}
                    </div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                </div>
            )
        },
        {
            header: 'Email Address',
            accessor: (item) => (
                <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    {item.email}
                </div>
            )
        },
        {
            header: 'Assigned Department',
            accessor: (item) => (
                <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-gray-400" />
                    {item.department || 'Not Assigned'}
                </div>
            )
        },
        {
            header: 'Status',
            accessor: () => (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Active
                </span>
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
                    title="Administrators"
                    subtitle="Manage Department Heads and System Admins"
                    action={
                        <Button onClick={() => setIsModalOpen(true)}>
                            <PlusCircle size={20} className="mr-2" />
                            Add New Admin
                        </Button>
                    }
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {admins.length > 0 ? (
                        <DataTable columns={columns} data={admins} />
                    ) : (
                        <div className="p-12 text-center flex flex-col items-center text-gray-500">
                            <ShieldCheck size={48} className="text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No Administrators Found</h3>
                            <p className="max-w-sm mx-auto mt-2">Start by adding a new administrator to manage departments.</p>
                        </div>
                    )}
                </div>

                {/* Add Admin Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Register New Administrator"
                >
                    <form onSubmit={handleAddAdmin} className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700 mb-4">
                            New administrators will receive an email with login credentials.
                        </div>

                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="e.g. Dr. Robert Langdon"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="robert.l@college.edu"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <Input
                            label="Department (Optional)"
                            name="department"
                            placeholder="e.g. Symbolism & History"
                            value={formData.department}
                            onChange={handleInputChange}
                        />

                        <div className="pt-4 flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit">Create Account</Button>
                        </div>
                    </form>
                </Modal>

            </main>
        </div>
    );
}
