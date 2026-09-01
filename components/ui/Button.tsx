import React from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg',
        secondary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm',
        outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            className={cn(
                'rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
