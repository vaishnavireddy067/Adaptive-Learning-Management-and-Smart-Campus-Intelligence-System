import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Seed core users
    const users = [
        { email: 'superadmin@institution.edu', name: 'Super Admin', role: 'super-admin', password: hashedPassword, designation: 'System Administrator' },
        { email: 'admin@institution.edu', name: 'Dr. Robert Vance', role: 'admin', password: hashedPassword, department: 'Computer Science', designation: 'Head of Department' },
        { email: 'faculty@institution.edu', name: 'Prof. Alan Turing', role: 'faculty', password: hashedPassword, department: 'Computer Science', designation: 'Senior Professor' },
        { email: 'faculty.ml@institution.edu', name: 'Dr. Grace Hopper', role: 'faculty', password: hashedPassword, department: 'AI & ML', designation: 'Associate Professor' },
        { email: 'student@institution.edu', name: 'Vaishnavi Anugu', role: 'student', password: hashedPassword, department: 'Computer Science', rollNo: 'CS2026-001' },
        { email: 'student2@institution.edu', name: 'John Doe', role: 'student', password: hashedPassword, department: 'Computer Science', rollNo: 'CS2026-002' },
        { email: 'student3@institution.edu', name: 'Jane Smith', role: 'student', password: hashedPassword, department: 'AI & ML', rollNo: 'AI2026-003' },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: { password: hashedPassword, role: user.role, name: user.name, department: user.department, rollNo: user.rollNo, designation: user.designation },
            create: user,
        });
    }

    // Seed Departments
    await prisma.department.deleteMany();
    await prisma.department.createMany({
        data: [
            { code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. Robert Vance', block: 'Block A', facultyCount: 24, studentCount: 480 },
            { code: 'AIML', name: 'Artificial Intelligence & ML', hod: 'Dr. Grace Hopper', block: 'Block B', facultyCount: 18, studentCount: 360 },
            { code: 'ECE', name: 'Electronics & Communication', hod: 'Dr. Sarah Connor', block: 'Block C', facultyCount: 20, studentCount: 400 },
            { code: 'MECH', name: 'Mechanical Engineering', hod: 'Dr. Henry Ford', block: 'Block D', facultyCount: 15, studentCount: 300 },
        ],
    });

    // Seed Events & Exams
    await prisma.event.deleteMany();
    await prisma.exam.deleteMany();

    await prisma.event.createMany({
        data: [
            {
                title: 'Campus Tech Fest 2026',
                date: '2026-06-15',
                time: '10:00 AM',
                venue: 'Block B Auditorium',
                type: 'Technology',
                status: 'upcoming',
                desc: 'Hackathon, project expo, and industry talks.',
                summary: 'Annual technology showcase',
            },
            {
                title: 'Career Fair',
                date: '2026-06-20',
                time: '09:00 AM',
                venue: 'Main Quadrangle',
                type: 'Career',
                status: 'upcoming',
                desc: 'Meet recruiters from partner companies.',
                summary: 'Placement drive kickoff',
            },
            {
                title: 'Orientation Day',
                date: '2025-08-01',
                time: '09:00 AM',
                venue: 'Block A',
                type: 'Academic',
                status: 'past',
                desc: 'Welcome session for new students.',
                summary: 'Completed',
            },
        ],
    });

    await prisma.exam.createMany({
        data: [
            {
                subject: 'Data Structures',
                code: 'CS301',
                date: '2026-05-28',
                time: '10:00 AM - 01:00 PM',
                urgency: 'high',
                semester: 'Sem 5',
                venue: 'Hall A',
            },
            {
                subject: 'Operating Systems',
                code: 'CS302',
                date: '2026-06-02',
                time: '02:00 PM - 05:00 PM',
                urgency: 'medium',
                semester: 'Sem 5',
                venue: 'Hall B',
            },
            {
                subject: 'Machine Learning',
                code: 'AI401',
                date: '2026-06-10',
                time: '10:00 AM - 01:00 PM',
                urgency: 'low',
                semester: 'Sem 6',
                venue: 'Lab Block',
            },
        ],
    });

    // Seed Courses
    const demoCodes = ['CS101-DEMO', 'AI201-DEMO'];
    const existingCourses = await prisma.course.findMany({
        where: { code: { in: demoCodes } },
        select: { id: true },
    });
    const existingIds = existingCourses.map((c) => c.id);
    if (existingIds.length > 0) {
        await prisma.enrolment.deleteMany({ where: { courseId: { in: existingIds } } });
        await prisma.resource.deleteMany({ where: { courseId: { in: existingIds } } });
        await prisma.note.deleteMany({ where: { courseId: { in: existingIds } } });
        await prisma.quiz.deleteMany({ where: { courseId: { in: existingIds } } });
        await prisma.assignment.deleteMany({ where: { courseId: { in: existingIds } } });
        await prisma.attendance.deleteMany({ where: { courseId: { in: existingIds } } });
        await prisma.course.deleteMany({ where: { id: { in: existingIds } } });
    }

    const c1 = await prisma.course.create({
        data: {
            title: 'Introduction to Programming',
            code: 'CS101-DEMO',
            description: 'Seeded demo course.',
            department: 'Computer Science',
            credits: 4,
            instructor: 'faculty@institution.edu',
        },
    });
    const c2 = await prisma.course.create({
        data: {
            title: 'AI Fundamentals',
            code: 'AI201-DEMO',
            description: 'Seeded demo course.',
            department: 'AI & ML',
            credits: 3,
            instructor: 'faculty.ml@institution.edu',
        },
    });

    await prisma.resource.createMany({
        data: [
            { title: 'Course Syllabus', type: 'PDF', url: 'https://example.com/syllabus-cs101.pdf', courseId: c1.id },
            { title: 'Week 1 Lecture', type: 'VIDEO', url: 'https://example.com/lecture-1', courseId: c1.id },
            { title: 'AI Reading List', type: 'LINK', url: 'https://example.com/ai-readings', courseId: c2.id },
        ],
    });

    const student = await prisma.user.findUnique({ where: { email: 'student@institution.edu' } });
    if (student) {
        await prisma.enrolment.createMany({
            data: [
                { userId: student.id, courseId: c1.id, status: 'active', grade: 8.5 },
                { userId: student.id, courseId: c2.id, status: 'active', grade: 7.2 },
            ],
        });

        // Seed Fees
        await prisma.fee.deleteMany({ where: { userId: student.id } });
        await prisma.fee.createMany({
            data: [
                { userId: student.id, semester: 'Semester 5 Tuition', totalAmount: 45000, paidAmount: 45000, dueDate: '2026-01-15', status: 'paid' },
                { userId: student.id, semester: 'Semester 6 Tuition', totalAmount: 45000, paidAmount: 20000, dueDate: '2026-07-15', status: 'partial' },
            ],
        });

        // Seed Attendance
        await prisma.attendance.deleteMany({ where: { userId: student.id } });
        await prisma.attendance.createMany({
            data: [
                { userId: student.id, courseId: c1.id, date: '2026-05-01', status: 'present' },
                { userId: student.id, courseId: c1.id, date: '2026-05-02', status: 'present' },
                { userId: student.id, courseId: c1.id, date: '2026-05-03', status: 'absent' },
                { userId: student.id, courseId: c2.id, date: '2026-05-01', status: 'present' },
                { userId: student.id, courseId: c2.id, date: '2026-05-02', status: 'present' },
            ],
        });
    }

    // Seed Assignments
    await prisma.assignment.deleteMany();
    await prisma.assignment.createMany({
        data: [
            { title: 'Array Data Structures & Algorithms', courseId: c1.id, department: 'Computer Science', faculty: 'Prof. Alan Turing', dueDate: '2026-06-10', totalMarks: 100, submissions: 42 },
            { title: 'Neural Networks Architecture Report', courseId: c2.id, department: 'AI & ML', faculty: 'Dr. Grace Hopper', dueDate: '2026-06-18', totalMarks: 50, submissions: 28 },
        ],
    });

    // Seed Circulars
    await prisma.circular.deleteMany();
    await prisma.circular.createMany({
        data: [
            { title: 'End Semester Examination Schedule Released', category: 'Academic', targetRole: 'all', date: '2026-05-15', content: 'The final timetable for Spring 2026 semester exams is now published.' },
            { title: 'Annual Hackathon Registration Open', category: 'Event', targetRole: 'student', date: '2026-05-20', content: 'Register your teams of up to 4 members for Campus Tech Fest 2026.' },
            { title: 'Faculty Development Workshop on AI in Education', category: 'Staff', targetRole: 'faculty', date: '2026-05-22', content: 'Interactive session on using AI tools in syllabus design.' },
        ],
    });

    console.log('Seed completed: users, departments, events, exams, courses, fees, attendance, assignments, circulars');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

