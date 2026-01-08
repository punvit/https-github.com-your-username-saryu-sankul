import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Saryu Sankul - Peaceful Retreat in Ayodhya",
  description: "Experience comfort, tradition, and serenity in the heart of Ayodhya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased bg-[#F9FAFB]")}>
        {children}
      </body>
    </html>
  );
}
