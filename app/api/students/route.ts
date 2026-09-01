import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'student' },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        rollNo: true,
        department: true,
        status: true,
        phone: true,
        createdAt: true,
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, rollNo, department, phone } = body;

    const student = await prisma.user.create({
      data: {
        name,
        email,
        rollNo,
        department: department || 'Computer Science',
        phone,
        role: 'student',
      },
    });
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}
