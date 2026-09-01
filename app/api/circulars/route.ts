import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const circulars = await prisma.circular.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(circulars);
  } catch (error) {
    console.error('Error fetching circulars:', error);
    return NextResponse.json({ error: 'Failed to fetch circulars' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, targetRole, content, date } = body;

    const circular = await prisma.circular.create({
      data: {
        title,
        category: category || 'General',
        targetRole: targetRole || 'all',
        content,
        date: date || new Date().toISOString().split('T')[0],
      },
    });
    return NextResponse.json(circular, { status: 201 });
  } catch (error) {
    console.error('Error creating circular:', error);
    return NextResponse.json({ error: 'Failed to publish circular' }, { status: 500 });
  }
}
