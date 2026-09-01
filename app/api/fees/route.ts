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
        const fees = await prisma.fee.findMany({
          where: { userId: user.id },
          orderBy: { dueDate: 'asc' },
        });
        return NextResponse.json(fees);
      }
    }

    const allFees = await prisma.fee.findMany({
      take: 100,
      orderBy: { dueDate: 'asc' },
      include: { user: true },
    });
    return NextResponse.json(allFees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    return NextResponse.json({ error: 'Failed to fetch fees' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, semester, totalAmount, paidAmount, dueDate, status } = body;

    const feeRecord = await prisma.fee.create({
      data: {
        userId,
        semester,
        totalAmount: parseFloat(totalAmount),
        paidAmount: paidAmount ? parseFloat(paidAmount) : 0,
        dueDate,
        status: status || 'unpaid',
      },
    });
    return NextResponse.json(feeRecord, { status: 201 });
  } catch (error) {
    console.error('Error creating fee record:', error);
    return NextResponse.json({ error: 'Failed to record fee' }, { status: 500 });
  }
}
