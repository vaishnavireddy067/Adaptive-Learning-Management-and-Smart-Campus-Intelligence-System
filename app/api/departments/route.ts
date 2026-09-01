import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, name, hod, block, facultyCount, studentCount } = body;

    const department = await prisma.department.create({
      data: {
        code,
        name,
        hod,
        block,
        facultyCount: facultyCount ? parseInt(facultyCount, 10) : 0,
        studentCount: studentCount ? parseInt(studentCount, 10) : 0,
      },
    });
    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
