import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  try {
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        const records = await prisma.attendance.findMany({
          where: { userId: user.id },
          include: { course: true },
          orderBy: { date: 'desc' },
        });
        return NextResponse.json(records);
      }
    }

    const allRecords = await prisma.attendance.findMany({
      take: 100,
      orderBy: { date: 'desc' },
      include: { user: true, course: true },
    });
    return NextResponse.json(allRecords);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, courseId, date, status } = body;

    const record = await prisma.attendance.create({
      data: {
        userId,
        courseId,
        date: date || new Date().toISOString().split('T')[0],
        status: status || 'present',
      },
    });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    return NextResponse.json({ error: 'Failed to log attendance' }, { status: 500 });
  }
}
