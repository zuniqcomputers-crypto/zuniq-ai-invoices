import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AmbientBackground from "@/components/AmbientBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zuniq Invoices – AI Invoice Generator | Free Forever",
  description:
    "Create professional invoices in seconds with AI. Chat, generate, and download polished PDFs. Free, no sign‑up, unlimited invoices.",
  keywords: [
    "invoice generator",
    "AI invoices",
    "free invoice",
    "PDF invoice",
    "freelancer tools",
    "small business",
  ],
  openGraph: {
    title: "Zuniq Invoices – AI‑Powered Invoice Generator",
    description:
      "Chat with AI, answer a few questions, and get a polished invoice instantly – free forever.",
    url: "https://zuniq-ai-invoices.vercel.app",
    siteName: "Zuniq Invoices",
    images: [
      {
        url: "https://zuniq-ai-invoices.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zuniq Invoices – AI Invoice Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuniq Invoices – AI Invoice Generator",
    description:
      "Chat with AI, answer a few questions, and get a polished invoice instantly – free forever.",
    images: ["https://zuniq-ai-invoices.vercel.app/og-image.png"],
  },
  robots: "index, follow",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <AmbientBackground>
          <main id="main-content">{children}</main>
        </AmbientBackground>
        {/* Jotform AI Agent floating chat */}
        <script src="https://cdn.jotfor.ms/agent/embedjs/019f4698c1a070008ea96e9f3f5288c4a537/embed.js"></script>
      </body>
    </html>
  );
}
