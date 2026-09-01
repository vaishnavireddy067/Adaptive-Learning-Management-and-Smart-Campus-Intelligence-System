export interface TimeSlot {
    id: string;
    day: string;
    time: string;
    subject: string;
    faculty: string;
    room: string;
    status: 'Completed' | 'Ongoing' | 'Upcoming';
}

export const TIMETABLE_DATA: TimeSlot[] = [
    { id: 't1', day: 'Monday', time: '09:00 AM - 10:00 AM', subject: 'Data Structures', faculty: 'Ms. Emily White', room: 'CS-101', status: 'Completed' },
    { id: 't2', day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'Algorithms', faculty: 'Dr. Alan Turing', room: 'CS-102', status: 'Ongoing' },
    { id: 't3', day: 'Monday', time: '11:00 AM - 12:00 PM', subject: 'Database Systems', faculty: 'Prof. John Doe', room: 'CS-101', status: 'Upcoming' },
    { id: 't4', day: 'Tuesday', time: '09:00 AM - 10:00 AM', subject: 'Operating Systems', faculty: 'Ms. Emily White', room: 'CS-103', status: 'Upcoming' },
];
