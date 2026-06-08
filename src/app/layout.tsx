import "./globals.css";
import type { Metadata } from "next";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Zuniq Invoices",
  description: "AI‑powered invoice generator",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
