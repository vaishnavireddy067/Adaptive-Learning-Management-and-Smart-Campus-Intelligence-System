import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getBaseUrl = () => {
  const url = process.env.NEXTAUTH_URL || process.env.VERCEL_URL;
  if (!url) return "https://adaptive-learning-management-and-smart-campus-intelligence-system.vercel.app";
  return url.startsWith("http") ? url : `https://${url}`;
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "AVNIET – Smart College Management System",
  description: "AVNIET Smart Campus – Next-Gen campus management with LMS, Student ERP, faculty tools, attendance, timetables and more.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
