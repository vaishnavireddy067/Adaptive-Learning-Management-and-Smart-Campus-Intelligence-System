import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const faculty = await prisma.user.findMany({
      where: { role: 'faculty' },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        designation: true,
        status: true,
        phone: true,
        createdAt: true,
      },
    });
    return NextResponse.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, department, designation, phone } = body;

    const facultyMember = await prisma.user.create({
      data: {
        name,
        email,
        department: department || 'Computer Science',
        designation: designation || 'Assistant Professor',
        phone,
        role: 'faculty',
      },
    });
    return NextResponse.json(facultyMember, { status: 201 });
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json({ error: 'Failed to create faculty member' }, { status: 500 });
  }
}
