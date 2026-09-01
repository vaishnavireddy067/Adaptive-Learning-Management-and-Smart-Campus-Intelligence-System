import React from 'react';
import { cn } from '../../utils/helpers';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[100px] resize-y",
                        error ? "border-red-500 focus:ring-red-200" : "border-gray-300",
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
