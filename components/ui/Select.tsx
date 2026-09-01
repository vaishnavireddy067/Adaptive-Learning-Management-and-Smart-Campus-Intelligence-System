import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white",
                        error ? "border-red-500 focus:ring-red-200" : "border-gray-300",
                        className
                    )}
                    {...props}
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';
