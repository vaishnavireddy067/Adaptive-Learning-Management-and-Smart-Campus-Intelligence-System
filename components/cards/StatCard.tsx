import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, trendUp }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
                    {trend && (
                        <p className={`text-sm mt-2 flex items-center ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                            {trendUp ? '↑' : '↓'} {trend}
                        </p>
                    )}
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
};
