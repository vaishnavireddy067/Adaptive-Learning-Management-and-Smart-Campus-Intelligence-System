import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const ACCENTS = ['emerald', 'indigo', 'amber', 'rose', 'blue', 'purple'] as const;
const ICONS = ['📚', '🐍', '🤖', '☕', '📊', '💾'];

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    const role = (session.user as { role?: string }).role || 'student';

    try {
        if (role === 'student') {
            const user = await prisma.user.findUnique({
                where: { email },
                include: {
                    enrolments: {
                        where: { status: 'active' },
                        include: { course: true },
                    },
                },
            });
            if (!user) {
                return NextResponse.json([]);
            }
            const courses = user.enrolments.map(
                (
                    e: (typeof user.enrolments)[number],
                    i: number
                ) => ({
                id: e.course.code,
                title: e.course.title,
                instructor: e.course.instructor || 'Faculty',
                progress: e.grade != null ? Math.min(100, Math.round((e.grade / 10) * 100)) : 0,
                icon: ICONS[i % ICONS.length],
                colorKey: ACCENTS[i % ACCENTS.length],
                department: e.course.department,
            }));
            return NextResponse.json(courses);
        }

        if (role === 'faculty') {
            const rows = await prisma.course.findMany({
                where: { instructor: email },
                orderBy: { title: 'asc' },
                include: { resources: true },
            });
            return NextResponse.json(
                rows.map((c: (typeof rows)[number], i: number) => ({
                    id: c.code,
                    title: c.title,
                    instructor: c.instructor || email,
                    progress: 0,
                    icon: ICONS[i % ICONS.length],
                    colorKey: ACCENTS[i % ACCENTS.length],
                    department: c.department,
                    resources: c.resources,
                }))
            );
        }

        const rows = await prisma.course.findMany({ orderBy: { title: 'asc' } });
        return NextResponse.json(
            rows.map((c: (typeof rows)[number], i: number) => ({
                id: c.code,
                title: c.title,
                instructor: c.instructor || '—',
                progress: 0,
                icon: ICONS[i % ICONS.length],
                colorKey: ACCENTS[i % ACCENTS.length],
                department: c.department,
            }))
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to load courses' }, { status: 500 });
    }
}
