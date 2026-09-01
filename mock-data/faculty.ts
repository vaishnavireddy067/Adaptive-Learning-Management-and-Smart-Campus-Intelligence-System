export interface FacultyMember {
    id: string;
    name: string;
    email: string;
    department: string;
    designation: string;
    joinDate: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    expertise?: string;
    block?: string;
}

export const FACULTY_LIST: FacultyMember[] = [
    // --- ADMIN BLOCK (A) ---
    { id: 'f11', name: 'Dr. K.V.S. Rao', email: 'kvsrao@admin.college.edu', department: 'Administration', designation: 'Principal & Director', joinDate: '2010-01-01', status: 'Active', expertise: 'Educational Governance', block: 'A' },
    { id: 'f12', name: 'Mr. Nagesh G.', email: 'nagesh.g@admin.college.edu', department: 'Administration', designation: 'Registrar', joinDate: '2012-05-15', status: 'Active', expertise: 'Academic Operations', block: 'A' },

    // --- CS SECTION (B) ---
    { id: 'f1',  name: 'Dr. Sarah Smith', email: 'sarah.smith@college.edu', department: 'Computer Science', designation: 'Professor & HOD', joinDate: '2015-08-12', status: 'Active', expertise: 'Data Structures, OS', block: 'B' },
    { id: 'f2',  name: 'Dr. Alan Turing', email: 'alan.turing@college.edu', department: 'Computer Science', designation: 'Professor', joinDate: '2018-01-10', status: 'Active', expertise: 'Algorithms, TOC', block: 'B' },
    { id: 'f3',  name: 'Ms. Emily White', email: 'emily.white@college.edu', department: 'Computer Science', designation: 'Assistant Professor', joinDate: '2020-06-15', status: 'Active', expertise: 'Web Dev, Cloud', block: 'B' },
    
    // --- ECE SECTION (B) ---
    { id: 'f4',  name: 'Dr. Priya Sharma', email: 'priya.sharma@college.edu', department: 'Electrical & Computer Engineering', designation: 'Professor & HOD', joinDate: '2016-03-01', status: 'Active', expertise: 'VLSI, Embedded', block: 'B' },
    { id: 'f13', name: 'Mr. Ramesh Babu', email: 'ramesh.b@college.edu', department: 'Electrical & Computer Engineering', designation: 'Lecturer', joinDate: '2021-08-20', status: 'Active', expertise: 'Microprocessors', block: 'B' },

    // --- CORE & TECH BLOCK (C) ---
    { id: 'f10', name: 'Dr. Ananya Singh', email: 'ananya.singh@college.edu', department: 'AI & DS', designation: 'Assistant Professor', joinDate: '2022-01-10', status: 'Active', expertise: 'Data Mining, Python', block: 'C' },
    { id: 'f5',  name: 'Prof. Ravi Verma', email: 'ravi.verma@college.edu', department: 'Data Science', designation: 'Professor & HOD', joinDate: '2017-07-20', status: 'Active', expertise: 'Big Data, Stats', block: 'C' },
    { id: 'f6',  name: 'Dr. Neha Kapoor', email: 'neha.kapoor@college.edu', department: 'AI & ML', designation: 'Associate Professor', joinDate: '2019-09-01', status: 'Active', expertise: 'Deep Learning, NLP', block: 'C' },
    { id: 'f7',  name: 'Mr. James Carter', email: 'james.carter@college.edu', department: 'Cyber Security', designation: 'Lecturer', joinDate: '2021-02-14', status: 'Active', expertise: 'Ethical Hacking', block: 'C' },
    { id: 'f8',  name: 'Dr. Mark Twain', email: 'mark.twain@college.edu', department: 'Civil', designation: 'Professor & HOD', joinDate: '2014-03-05', status: 'Active', expertise: 'Structural Eng.', block: 'C' },
    { id: 'f9',  name: 'Prof. John Doe', email: 'john.doe@college.edu', department: 'Mechanical', designation: 'Associate Professor', joinDate: '2016-11-20', status: 'On Leave', expertise: 'Thermodynamics', block: 'C' },

    // --- PLACEMENT & R&D (D) ---
    { id: 'f14', name: 'Mr. Satya Nadella', email: 'satya.n@corporate.edu', department: 'Placement Office', designation: 'Placement Director', joinDate: '2019-01-01', status: 'Active', expertise: 'Strategic Relations', block: 'D' },
    { id: 'f15', name: 'Dr. Sundar Pichai', email: 'sundar.p@research.edu', department: 'R&D Department', designation: 'Research Head', joinDate: '2020-02-02', status: 'Active', expertise: 'Quantum Computing', block: 'D' },
];
