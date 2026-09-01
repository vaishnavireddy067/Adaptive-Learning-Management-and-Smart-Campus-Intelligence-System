export interface Department {
    id: string;
    name: string;
    head: string;
    facultyCount: number;
    studentCount: number;
    block: 'B' | 'C';
}

export const DEPARTMENTS: Department[] = [
    { id: 'd1', name: 'Computer Science',                  head: 'Dr. Sarah Smith',    facultyCount: 28, studentCount: 920, block: 'B' },
    { id: 'd2', name: 'Electrical & Computer Engineering', head: 'Dr. Alan Turing',    facultyCount: 24, studentCount: 780, block: 'B' },
    { id: 'd3', name: 'Data Science',                      head: 'Dr. Priya Sharma',   facultyCount: 18, studentCount: 640, block: 'C' },
    { id: 'd4', name: 'AI & DS',                           head: 'Dr. Ravi Verma',     facultyCount: 16, studentCount: 560, block: 'C' },
    { id: 'd5', name: 'AI & ML',                           head: 'Dr. Neha Kapoor',    facultyCount: 16, studentCount: 540, block: 'C' },
    { id: 'd6', name: 'Cyber Security',                    head: 'Prof. James Carter',  facultyCount: 14, studentCount: 480, block: 'C' },
    { id: 'd7', name: 'Civil',                             head: 'Dr. Mark Twain',     facultyCount: 20, studentCount: 620, block: 'C' },
    { id: 'd8', name: 'Mechanical',                        head: 'Prof. John Doe',     facultyCount: 22, studentCount: 680, block: 'C' },
];
