import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zuniq AI Invoices",
  description: "AI-powered invoice generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
