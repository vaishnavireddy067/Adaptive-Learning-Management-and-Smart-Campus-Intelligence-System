import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

const DEMO_USERS: Record<string, { id: string; name: string; role: string; password: string }> = {
    "student@institution.edu": { id: "student-1", name: "Vaishnavi", role: "student", password: "password123" },
    "faculty@institution.edu": { id: "faculty-1", name: "Faculty Admin", role: "faculty", password: "password123" },
    "admin@institution.edu": { id: "admin-1", name: "Admin HOD", role: "admin", password: "password123" },
    "superadmin@institution.edu": { id: "superadmin-1", name: "Super Admin", role: "super-admin", password: "password123" },
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email.trim().toLowerCase();
                const password = credentials.password;

                try {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    });

                    if (user && user.password) {
                        const isPasswordValid = await bcrypt.compare(password, user.password);
                        if (isPasswordValid) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            };
                        }
                    }
                } catch (dbError) {
                    console.warn("Database lookup error during auth, checking demo fallbacks:", dbError);
                }

                // Fallback for demo accounts (ensures instant Vercel login even if DB is not yet seeded)
                const demo = DEMO_USERS[email];
                if (demo && password === demo.password) {
                    return {
                        id: demo.id,
                        email: email,
                        name: demo.name,
                        role: demo.role,
                    };
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "avniet-lms-super-secret-key-2026-fallback-secret",
};
