export const APP_NAME = 'Smart College MS';
export const COLLEGE_NAME = 'AVNIET';
export const COLLEGE_TAGLINE = 'Empowering Future Leaders through Innovation';

export const DEPARTMENTS = [
    'Computer Science',
    'Electrical & Computer Engineering',
    'Data Science',
    'AI & DS',
    'AI & ML',
    'Cyber Security',
    'Civil',
    'Mechanical'
] as const;

export const CAMPUS_STRUCTURE = {
    BLOCK_A: {
        name: 'Block A',
        purpose: 'Administrative Block',
        departments: []
    },
    BLOCK_B: {
        name: 'Block B',
        purpose: 'ECE & CSE Block',
        departments: ['Computer Science', 'Electrical & Computer Engineering']
    },
    BLOCK_C: {
        name: 'Block C',
        purpose: 'Engineering & Technology Block',
        departments: ['AI & DS', 'Data Science', 'AI & ML', 'Civil', 'Mechanical', 'Computer Science']
    },
    BLOCK_D: {
        name: 'Block D',
        purpose: 'Placement & R&D Block',
        departments: ['Placement Office', 'R&D Department']
    }
} as const;

export const CAMPUS_BLOCKS = ['Block A', 'Block B', 'Block C', 'Block D'] as const;

export const ROOM_LOGIC = {
    FLOORS: 4,
    ROOMS_PER_FLOOR: 10,
    GET_ROOM_NAME: (floor: number, index: number) => {
        const base = (floor + 1) * 100;
        return (base + index + 1).toString();
    }
};


export const ROLES = {
    SUPER_ADMIN: 'super-admin',
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const NAV_LINKS = {
    [ROLES.SUPER_ADMIN]: [
        { label: 'Platform Overview', href: '/dashboard/super-admin' },
        { label: 'Deep Analytics', href: '/dashboard/super-admin/analytics' },
        { label: 'Academic Calendar', href: '/dashboard/super-admin/calendar' },
        { label: 'Global Announcements', href: '/dashboard/super-admin/announcements' },
        { label: 'Infrastructure & Labs', href: '/dashboard/super-admin/infrastructure' },
        { label: 'Department Control', href: '/dashboard/super-admin/departments' },
        { label: 'Faculty Registry', href: '/dashboard/super-admin/faculty' },
        { label: 'Student Directory', href: '/dashboard/super-admin/students' },
        { label: 'Circulars & Archive', href: '/dashboard/super-admin/circulars' },
        { label: 'Performance Node', href: '/dashboard/super-admin/performance' },
        { label: 'User Role Control', href: '/dashboard/super-admin/roles' },
        { label: 'System Config', href: '/dashboard/super-admin/config' },
        { label: 'Financial Pulse', href: '/dashboard/super-admin/financials' },
        { label: 'Administrative Registry', href: '/dashboard/super-admin/admins' },
    ],
    [ROLES.ADMIN]: [
        { label: 'Admin Dashboard', href: '/dashboard/admin' },
        { label: 'AI Smart Generator', href: '/dashboard/admin/smart-generator' },
        { label: 'Timetable Control', href: '/dashboard/admin/timetable' },
        { label: 'User Directory', href: '/dashboard/admin/users' },
        { label: 'Batch Segments', href: '/dashboard/admin/batches' },
        { label: 'Exam Node', href: '/dashboard/admin/exams' },
        { label: 'Infrastructure', href: '/dashboard/admin/infrastructure' },
        { label: 'Room Registry', href: '/dashboard/admin/rooms' },
        { label: 'Financial Tracking', href: '/dashboard/admin/fees' },
        { label: 'Campus Events', href: '/dashboard/admin/events' },
        { label: 'Report Generation', href: '/dashboard/admin/reports' },
        { label: 'Notifications', href: '/dashboard/admin/notifications' },
        { label: 'Asset Management', href: '/dashboard/admin/infrastructure' },
    ],
    [ROLES.FACULTY]: [
        { label: 'Teaching Hub', href: '/dashboard/faculty' },
        { label: 'AI Question Generator', href: '/dashboard/faculty/question-generator' },
        { label: 'Smart Attendance', href: '/dashboard/faculty/attendance' },
        { label: 'Assignment Logs', href: '/dashboard/faculty/assignments' },
        { label: 'Grade Center', href: '/dashboard/faculty/grades' },
        { label: 'Course Library', href: '/dashboard/faculty/courses' },
        { label: 'Student Performance', href: '/dashboard/faculty/student-performance' },
        { label: 'Events & Invigilation', href: '/dashboard/faculty/events' },
        { label: 'Workload & AI', href: '/dashboard/faculty/workload' },
        { label: 'Messages', href: '/dashboard/chat' },
        { label: 'Profile Settings', href: '/dashboard/profile' },
    ],
    [ROLES.STUDENT]: [
        { label: 'Main Dashboard', href: '/dashboard/student' },
        { label: 'Schedule & Timetable', href: '/dashboard/student/timetable' },
        { label: 'Attendance Log', href: '/dashboard/student/attendance' },
        { label: 'My Academic Grades', href: '/dashboard/student/grades' },
        { label: 'Course Materials', href: '/dashboard/student/courses' },
        { label: 'Digital Library', href: '/dashboard/student/library' },
        { label: 'Campus Events', href: '/dashboard/student/events' },
        { label: 'Tests & Quizzes', href: '/dashboard/student/tests' },
        { label: 'Global Notifications', href: '/dashboard/student/notifications' },
        { label: 'Live Classes', href: '/dashboard/student/live-classes' },
        { label: 'Class Notes', href: '/dashboard/student/notes' },
        { label: 'Interactive Roadmap', href: '/dashboard/student/roadmaps' },
        { label: 'Career & Alumni', href: '/dashboard/student/alumni' },
        { label: 'Personalized AI study', href: '/dashboard/student/ai-assistant' },
        { label: 'Learning Forum', href: '/dashboard/student/forum' },
        { label: 'Messages', href: '/dashboard/student/chat' },
    ],
};

export const LMS_NAV_LINKS = {
    [ROLES.STUDENT]: [
        { label: 'LMS Learning Hub', href: '/dashboard/student' },
        { label: 'AI Learning Hub', href: '/lms/ai-hub' },
        { label: 'AI Study Assistant', href: '/dashboard/student/ai-assistant' },
        { label: 'Registered Courses', href: '/dashboard/student/courses' },
        { label: 'Live Classes', href: '/dashboard/student/live-classes' },
        { label: 'Learning Roadmap', href: '/dashboard/student/roadmaps' },
        { label: 'Notes', href: '/dashboard/student/notes' },
        { label: 'AI Tests & Quizzes', href: '/dashboard/student/tests' },
        { label: 'Skill Assessments', href: '/dashboard/student/skill-assessment' },
        { label: 'Performance Analysis', href: '/dashboard/student/grades' },
        { label: 'Peer Learning Forum', href: '/dashboard/student/forum' },
        { label: 'Messages & Chat', href: '/dashboard/student/chat' },
        { label: 'Alumni Network', href: '/dashboard/student/alumni' },
    ],
    [ROLES.ADMIN]: [
        { label: 'LMS Admin Dashboard', href: '/dashboard/admin' },
        { label: 'Course Catalog', href: '/dashboard/admin/courses' },
        { label: 'Faculty Training', href: '/dashboard/admin/faculty' },
        { label: 'LMS Reports', href: '/dashboard/admin/reports' },
        { label: 'Global Study Path', href: '/dashboard/admin/timetable' },
    ],
    [ROLES.SUPER_ADMIN]: [
        { label: 'LMS Global Control', href: '/dashboard/super-admin' },
        { label: 'Institutional Courses', href: '/dashboard/super-admin/departments' },
        { label: 'LMS Analytics', href: '/dashboard/super-admin/analytics' },
    ],
};

export const ERP_NAV_LINKS = {
    [ROLES.STUDENT]: [
        { label: 'ERP Overview', href: '/dashboard/student-erp' },
        { label: 'My Profile', href: '/dashboard/student-erp/profile' },
        { label: 'My Schedule', href: '/dashboard/student-erp/schedule' },
        { label: 'Timetable', href: '/dashboard/student-erp/schedule' },
        { label: 'Attendance Analytics', href: '/dashboard/student-erp/attendance' },
        { label: 'Exams Performance', href: '/dashboard/student-erp/exams' },
        { label: 'Fee Payments', href: '/dashboard/student-erp/fees' },
        { label: 'Profile Settings', href: '/dashboard/profile' },
        { label: 'Campus Records', href: '/dashboard/student-erp/records' },
        { label: 'Global Notifications', href: '/dashboard/student/notifications' },
    ],
    [ROLES.ADMIN]: [
        { label: 'ERP Admin Node', href: '/dashboard/admin' },
        { label: 'Financial Tracking', href: '/dashboard/admin/fees' },
        { label: 'ERP Reports', href: '/dashboard/admin/reports' },
    ],
    [ROLES.SUPER_ADMIN]: [
        { label: 'Institutional ERP', href: '/dashboard/super-admin' },
        { label: 'Global Financials', href: '/dashboard/super-admin/financials' },
        { label: 'ERP System Logs', href: '/dashboard/super-admin/logs' },
    ],
};
