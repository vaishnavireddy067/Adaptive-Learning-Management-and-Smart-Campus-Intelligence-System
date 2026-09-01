import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const exams = await prisma.exam.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json(exams);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const exam = await prisma.exam.create({
            data: {
                subject: body.subject,
                code: body.code,
                date: body.date,
                time: body.time,
                urgency: body.urgency || 'low',
                semester: body.semester,
                role: body.role,
                venue: body.venue
            }
        });
        return NextResponse.json(exam, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create exam' }, { status: 500 });
    }
}
