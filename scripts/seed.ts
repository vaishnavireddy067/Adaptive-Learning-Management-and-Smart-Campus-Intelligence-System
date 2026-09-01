const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Generate a hash for the default password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password', salt);

    const users = [
        { email: 'admin@lms.com', name: 'Super Admin', role: 'super-admin', password },
        { email: 'admin.cs@lms.com', name: 'Dept Admin', role: 'admin', password },
        { email: 'student@lms.com', name: 'Student Account', role: 'student', password },
        { email: 'faculty@lms.com', name: 'Faculty Account', role: 'faculty', password },
    ];

    console.log('Seeding users...');
    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: { password: user.password }, // Update password just in case
            create: user,
        });
        console.log(`- Upserted ${user.role}: ${user.email}`);
    }

    console.log('Seed completed successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
