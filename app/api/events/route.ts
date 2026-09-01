import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const event = await prisma.event.create({
            data: {
                title: body.title,
                date: body.date,
                time: body.time,
                venue: body.venue,
                type: body.type,
                status: body.status || 'upcoming',
                desc: body.desc,
                ai: body.ai,
                summary: body.summary,
            }
        });
        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
