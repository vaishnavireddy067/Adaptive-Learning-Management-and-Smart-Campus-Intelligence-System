import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/** Same accounts as `prisma/seed.ts` — matches login page defaults. No UI changes. */
export async function GET() {
    try {
        const hashedPassword = await bcrypt.hash("password123", 10);

        const users = [
            { email: "superadmin@institution.edu", name: "Super Admin", role: "super-admin", password: hashedPassword },
            { email: "admin@institution.edu", name: "Admin HOD", role: "admin", password: hashedPassword },
            { email: "faculty@institution.edu", name: "Faculty Admin", role: "faculty", password: hashedPassword },
            { email: "student@institution.edu", name: "Vaishnavi", role: "student", password: hashedPassword },
        ];

        for (const user of users) {
            await prisma.user.upsert({
                where: { email: user.email },
                update: { password: hashedPassword, role: user.role, name: user.name },
                create: user,
            });
        }

        return NextResponse.json({
            message: "Seed successful (users only). Run `npm run db:seed` for events/exams sample data.",
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("SEEDING ERROR:", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
