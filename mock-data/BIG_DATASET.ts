import { STUDENT_LIST, Student } from './students';
import { FACULTY_LIST, FacultyMember } from './faculty';
import { CAMPUS_STRUCTURE } from '../utils/constants';

interface InstitutionalDataset {
    institution: string;
    metrics: {
        totalStudents: number;
        activeStudents: number;
        totalFaculty: number;
        totalDepartments: number;
        avgAttendance: number;
        avgCgpa: number;
    };
    students: Student[];
    faculty: FacultyMember[];
    infrastructure: any;
}

export const INSTITUTIONAL_DATASET: InstitutionalDataset = {
    institution: 'AVNIET (Autonomous)',
    metrics: {
        totalStudents: STUDENT_LIST.length,
        activeStudents: STUDENT_LIST.filter(s => s.status === 'Active').length,
        totalFaculty: FACULTY_LIST.length,
        totalDepartments: 8,
        avgAttendance: Math.round(STUDENT_LIST.reduce((acc, s) => acc + (s.attendance || 0), 0) / STUDENT_LIST.length),
        avgCgpa: Number((STUDENT_LIST.reduce((acc, s) => acc + s.cgpa, 0) / STUDENT_LIST.length).toFixed(2)),
    },
    students: STUDENT_LIST,
    faculty: FACULTY_LIST,
    infrastructure: CAMPUS_STRUCTURE
};

console.log("Big Dataset Initialized: ", INSTITUTIONAL_DATASET.metrics);
