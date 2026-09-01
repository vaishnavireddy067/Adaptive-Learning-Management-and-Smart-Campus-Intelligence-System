'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function StudentERPLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar systemType="student-erp" />
            <main className="flex-1 ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
