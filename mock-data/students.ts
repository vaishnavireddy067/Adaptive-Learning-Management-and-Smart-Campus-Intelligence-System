export interface Student {
    id: string;
    name: string;
    email: string;
    rollNumber: string;
    department: string;
    year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
    status: 'Active' | 'Suspended' | 'Alumni';
    cgpa: number;
    attendance?: number;
    block?: string;
    section?: string;
    phone?: string;
}

export const STUDENT_LIST: Student[] = [
    // --- TOP STUDENT / USER ---
    { id: 'S235U1', name: 'Anugu Vaishnavi', email: 'vaishnavi.a@avniet.edu', rollNumber: '235U1A7203', department: 'AI & DS', year: '3rd Year', status: 'Active', cgpa: 3.9, attendance: 98, block: 'C', section: 'A', phone: '+91 96520 00000' },

    // --- CS SECTION A ---
    { id: 's1',  name: 'Aarav Reddy', email: 'aarav.r@student.college.edu', rollNumber: 'CS2023001', department: 'Computer Science', year: '3rd Year', status: 'Active', cgpa: 3.8, attendance: 92, block: 'B', section: 'A' },
    { id: 's2',  name: 'Priya Nair', email: 'priya.n@student.college.edu', rollNumber: 'CS2023002', department: 'Computer Science', year: '3rd Year', status: 'Active', cgpa: 3.9, attendance: 96, block: 'B', section: 'A' },
    { id: 's3',  name: 'Rahul Kumar', email: 'rahul.k@student.college.edu', rollNumber: 'CS2023003', department: 'Computer Science', year: '2nd Year', status: 'Active', cgpa: 3.5, attendance: 88, block: 'B', section: 'B' },
    { id: 's4',  name: 'Sanjana Patel', email: 'sanjana.p@student.college.edu', rollNumber: 'ECE2023001', department: 'Electrical & Computer Engineering', year: '4th Year', status: 'Active', cgpa: 3.7, attendance: 90, block: 'B', section: 'A' },
    
    // --- DATA SCIENCE SECTION ---
    { id: 's5',  name: 'Vikram Iyer', email: 'vikram.i@student.college.edu', rollNumber: 'DS2023001', department: 'Data Science', year: '2nd Year', status: 'Active', cgpa: 3.6, attendance: 85, block: 'C', section: 'B' },
    { id: 's12', name: 'Ananya Joshi', email: 'ananya.j@student.college.edu', rollNumber: 'DS2023002', department: 'Data Science', year: '3rd Year', status: 'Active', cgpa: 3.8, attendance: 93, block: 'C', section: 'A' },

    // --- AI & DS SECTION ---
    { id: 's6',  name: 'Meera Krishnan', email: 'meera.k@student.college.edu', rollNumber: 'AIDS2023001', department: 'AI & DS', year: '1st Year', status: 'Active', cgpa: 3.4, attendance: 82, block: 'C', section: 'A' },
    { id: 's13', name: 'Siddharth Varma', email: 'sid.v@student.college.edu', rollNumber: 'AIDS2023002', department: 'AI & DS', year: '3rd Year', status: 'Active', cgpa: 3.5, attendance: 89, block: 'C', section: 'A' },

    // --- AI & ML SECTION ---
    { id: 's7',  name: 'Karthik Rao', email: 'karthik.r@student.college.edu', rollNumber: 'AIML2023001', department: 'AI & ML', year: '3rd Year', status: 'Active', cgpa: 3.9, attendance: 94, block: 'C', section: 'A' },
    { id: 's14', name: 'Ishita Roy', email: 'ishita.r@student.college.edu', rollNumber: 'AIML2023002', department: 'AI & ML', year: '4th Year', status: 'Active', cgpa: 3.7, attendance: 91, block: 'C', section: 'B' },

    // --- CYBER SECURITY SECTION ---
    { id: 's8',  name: 'Sneha Desai', email: 'sneha.d@student.college.edu', rollNumber: 'CY2023001', department: 'Cyber Security', year: '4th Year', status: 'Active', cgpa: 3.3, attendance: 78, block: 'C', section: 'A' },
    { id: 's15', name: 'Rohan Mehra', email: 'rohan.m@student.college.edu', rollNumber: 'CY2023002', department: 'Cyber Security', year: '2nd Year', status: 'Active', cgpa: 3.5, attendance: 84, block: 'C', section: 'B' },

    // --- CIVIL & MECHANICAL ---
    { id: 's9',  name: 'Arjun Sharma', email: 'arjun.s@student.college.edu', rollNumber: 'CV2023001', department: 'Civil', year: '2nd Year', status: 'Active', cgpa: 3.1, attendance: 75, block: 'C', section: 'A' },
    { id: 's16', name: 'Tanvi Shah', email: 'tanvi.s@student.college.edu', rollNumber: 'CV2023002', department: 'Civil', year: '4th Year', status: 'Active', cgpa: 3.4, attendance: 82, block: 'C', section: 'A' },
    { id: 's10', name: 'Divya Menon', email: 'divya.m@student.college.edu', rollNumber: 'ME2023001', department: 'Mechanical', year: '1st Year', status: 'Active', cgpa: 3.2, attendance: 80, block: 'C', section: 'A' },
    { id: 's17', name: 'Nikhil Kapoor', email: 'nikhil.k@student.college.edu', rollNumber: 'ME2023002', department: 'Mechanical', year: '3rd Year', status: 'Active', cgpa: 3.5, attendance: 86, block: 'C', section: 'B' },

    // --- MORE 3rd Year AI & DS (Peers) ---
    { id: 's18', name: 'Aditi Bansal', email: 'aditi.b@student.college.edu', rollNumber: '235U1A7201', department: 'AI & DS', year: '3rd Year', status: 'Active', cgpa: 3.7, attendance: 95, block: 'C', section: 'A' },
    { id: 's19', name: 'Varun Dhawan', email: 'varun.d@student.college.edu', rollNumber: '235U1A7202', department: 'AI & DS', year: '3rd Year', status: 'Active', cgpa: 3.6, attendance: 92, block: 'C', section: 'A' },
    { id: 's20', name: 'Kritika Sen', email: 'kritika.s@student.college.edu', rollNumber: '235U1A7204', department: 'AI & DS', year: '3rd Year', status: 'Active', cgpa: 3.8, attendance: 97, block: 'C', section: 'A' },
    { id: 's21', name: 'Manish Pandey', email: 'manish.p@student.college.edu', rollNumber: '235U1A7205', department: 'AI & DS', year: '3rd Year', status: 'Active', cgpa: 3.2, attendance: 88, block: 'C', section: 'A' },

    // --- RANDOMLY DISTRIBUTED STUDENTS ---
    { id: 's22', name: 'Zoya Khan', email: 'zoya.k@student.college.edu', rollNumber: 'CS2023101', department: 'Computer Science', year: '1st Year', status: 'Active', cgpa: 3.9, attendance: 99, block: 'B' },
    { id: 's23', name: 'Kabir Singh', email: 'kabir.s@student.college.edu', rollNumber: 'CV2023105', department: 'Civil', year: '3rd Year', status: 'Active', cgpa: 2.8, attendance: 70, block: 'C' },
    { id: 's24', name: 'Alok Nath', email: 'alok.n@student.college.edu', rollNumber: 'ME2023110', department: 'Mechanical', year: '2nd Year', status: 'Active', cgpa: 3.0, attendance: 78, block: 'C' },
    { id: 's25', name: 'Swati Reddy', email: 'swati.r@student.college.edu', rollNumber: 'DS2023201', department: 'Data Science', year: '1st Year', status: 'Active', cgpa: 3.8, attendance: 92, block: 'C' },
    { id: 's26', name: 'Rajesh Koothrappali', email: 'raj.k@student.college.edu', rollNumber: 'PH2023001', department: 'Computer Science', year: '4th Year', status: 'Active', cgpa: 4.0, attendance: 100, block: 'B' },
    
    // --- SUSPENDED & ALUMNI ---
    { id: 's11', name: 'Rohan Gupta', email: 'rohan.g@student.college.edu', rollNumber: 'CS2023004', department: 'Computer Science', year: '4th Year', status: 'Suspended', cgpa: 2.6, attendance: 58, block: 'B' },
    { id: 's27', name: 'Amitabh Bachchan', email: 'amitabh.b@alumni.college.edu', rollNumber: 'ALUM2020', department: 'Mechanical', year: '4th Year', status: 'Alumni', cgpa: 3.5, attendance: 0, block: 'C' },
    { id: 's28', name: 'Shah Rukh Khan', email: 'srk@alumni.college.edu', rollNumber: 'ALUM2019', department: 'Computer Science', year: '4th Year', status: 'Alumni', cgpa: 3.9, attendance: 0, block: 'B' },
];
