import React from 'react';
import { cn } from '../../utils/helpers';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({ columns, data, onRowClick }: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={cn(
                                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                    col.className
                                )}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => onRowClick && onRowClick(item)}
                            className={cn("transition-colors hover:bg-gray-50", onRowClick && "cursor-pointer")}
                        >
                            {columns.map((col, idx) => (
                                <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
