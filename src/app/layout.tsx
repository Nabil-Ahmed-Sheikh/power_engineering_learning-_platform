import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Power Engineering Lab",
  description:
    "Self-study platform for power systems engineering, PSS/E, PSCAD, ETAP, and interview preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NavBar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-foreground/50">
          Power Engineering Lab — a personal self-study platform.
        </footer>
      </body>
    </html>
  );
}
