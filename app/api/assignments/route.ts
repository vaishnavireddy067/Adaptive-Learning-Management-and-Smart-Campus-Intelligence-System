import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: { dueDate: 'asc' },
      include: {
        course: true,
      },
    });
    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, courseId, department, faculty, dueDate, totalMarks } = body;

    const assignment = await prisma.assignment.create({
      data: {
        title,
        courseId,
        department,
        faculty,
        dueDate,
        totalMarks: totalMarks ? parseInt(totalMarks, 10) : 100,
      },
    });
    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
  }
}
