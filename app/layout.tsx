import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InsightGrid — Analytics Dashboard",
  description: "Comprehensive analytics dashboard with real-time data visualization, KPI tracking, and interactive charts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${plusJakartaSans.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
