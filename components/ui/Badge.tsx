import React from 'react';
import { cn } from '../../utils/helpers';

interface BadgeProps {
    label: string;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', className }) => {
    const variants = {
        success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        warning: 'bg-amber-100 text-amber-800 border-amber-200',
        error: 'bg-red-100 text-red-800 border-red-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        neutral: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
        <span className={cn(
            'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
            variants[variant],
            className
        )}>
            {label}
        </span>
    );
};
