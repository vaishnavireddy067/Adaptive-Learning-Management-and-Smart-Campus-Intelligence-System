import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">{title}</h1>
                {subtitle && <p className="text-slate-500 mt-1 font-medium">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};
