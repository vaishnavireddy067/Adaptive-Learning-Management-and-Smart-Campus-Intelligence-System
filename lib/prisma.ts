import { PrismaClient } from '@prisma/client';

const fallbackUrl = "postgresql://neondb_owner:npg_1MjkAmDEts7W@ep-rough-resonance-aywdj975-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL || fallbackUrl,
            },
        },
    });
};

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
