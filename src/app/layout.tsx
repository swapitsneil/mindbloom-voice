import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "MindBloom Voice Companion — AI Burnout & Mental Risk Detection",
  description:
    "MindBloom Voice Companion uses AI to detect early burnout and emotional risk through reflection, mood, and voice-based insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#F6F7F4] text-foreground`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
