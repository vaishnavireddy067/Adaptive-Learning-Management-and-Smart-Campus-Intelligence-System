export interface AttendanceRecord {
    studentId: string;
    studentName: string;
    status: 'Present' | 'Absent' | 'Late';
    date: string;
}

export const ATTENDANCE_DATA: AttendanceRecord[] = [
    { studentId: 's1', studentName: 'Michael Brown', status: 'Present', date: '2023-10-25' },
    { studentId: 's2', studentName: 'Alice Green', status: 'Present', date: '2023-10-25' },
    { studentId: 's3', studentName: 'Bob White', status: 'Absent', date: '2023-10-25' },
    { studentId: 's4', studentName: 'Charlie Black', status: 'Late', date: '2023-10-25' },
    { studentId: 's1', studentName: 'Michael Brown', status: 'Present', date: '2023-10-26' },
];
