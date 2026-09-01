import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all scale-100 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
                {footer && (
                    <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
