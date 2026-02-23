import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { MemberstackProvider } from "@/components/MemberstackProvider";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
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
    <html lang="en" className={`${instrumentSans.variable} ${GeistSans.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased">
        <MemberstackProvider>
          {children}
        </MemberstackProvider>
        <AgentationProvider />
      </body>
    </html>
  );
}
