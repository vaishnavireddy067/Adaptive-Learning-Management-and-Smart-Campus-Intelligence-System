import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface RoleCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    onClick?: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon: Icon, onClick }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
            {onClick && (
                <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent text-indigo-600 hover:text-indigo-700" onClick={onClick}>
                    Explore <ArrowRight size={16} />
                </Button>
            )}
        </div>
    );
};
