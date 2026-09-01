'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ATTENDANCE_OVERVIEW_DATA } from '../../mock-data/analytics';

export const AttendanceChart = () => {
    return (
        <div className="h-64 w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance Trends</h3>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={ATTENDANCE_OVERVIEW_DATA}>
                    <defs>
                        <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="attendance" stroke="#10B981" fillOpacity={1} fill="url(#colorAttendance)" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
