'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4 font-sans text-center">
      <div className="bg-indigo-600 p-4 rounded-2xl text-white mb-6 shadow-xl">
        <GraduationCap size={40} />
      </div>
      <h1 className="text-6xl font-black tracking-tight text-slate-900 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button className="px-8 h-12 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-200">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
