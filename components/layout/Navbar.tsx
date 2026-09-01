import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { COLLEGE_NAME } from '../../utils/constants';
import { GraduationCap } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                    <GraduationCap size={24} />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">{COLLEGE_NAME}</span>
            </div>
            <div className="flex items-center gap-4">
                <Link href="#about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About</Link>
                <Link href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</Link>
                <Link href="/login">
                    <Button variant="primary" size="sm">Login Portal</Button>
                </Link>
            </div>
        </nav>
    );
};
