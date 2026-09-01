import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.event.delete({ where: { id } });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const event = await prisma.event.update({
            where: { id },
            data: body
        });
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}
