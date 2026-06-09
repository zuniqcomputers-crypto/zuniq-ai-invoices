"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* ---- Navigation (sticky, never hides) ---- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden ring-2 ring-indigo-400/50 shadow-md bg-white p-0.5 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
              Zuniq Invoices
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition hidden sm:block">
              My Invoices
            </Link>
            <button
              onClick={() => setShowSupport(true)}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              ☕ Support us
            </button>
            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
            >
              <span className="text-lg">⚡</span>
              <span className="whitespace-nowrap">Create Free Invoice</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Support Modal ---- */}
      {showSupport && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowSupport(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">☕ Buy me a coffee</h2>
              <button
                onClick={() => setShowSupport(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Zuniq Invoices is free forever. If it saves you time, support the project with a small donation.
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">Bank Account Details</p>
              <p className="text-gray-800 font-medium">Account Name: <span className="font-normal">[ZAFAR KHAN]</span></p>
              <p className="text-gray-800 font-medium">Account Number: <span className="font-normal">[0215668201005729]</span></p>
              <p className="text-gray-800 font-medium">Bank: <span className="font-normal">[MCB Bank Limited]</span></p>
              <p className="text-gray-800 font-medium">IBAN: <span className="font-normal">[PK81MUCB0215668201005729]</span></p>
            </div>
            <p className="text-xs text-gray-400">You can also use the button below to donate via card.</p>
            <a
              href="https://www.buymeacoffee.com/zuniq" // Replace with actual Buy Me a Coffee link if you have one
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl font-bold transition-colors"
            >
              Donate with card
            </a>
          </div>
        </div>
      )}

      {/* ---- Hero Section ---- */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 animate-fade-in-up">
            🎉 Free & Unlimited – No credit card required
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight animate-fade-in-up">
            Invoices,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">
              just talk to it.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 animate-fade-in-up">
            The AI‑powered invoice generator that replaces boring forms with a smart conversational assistant.
            Chat with our AI, answer a few questions, and get a professional invoice instantly — for free, forever.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Link
              href="/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              <span className="text-2xl">⚡</span> Create Your First Invoice
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-sm transition-all"
            >
              <span>🎥</span> See how it works
            </a>
          </div>
        </div>
      </section>

      {/* ---- Trust / Social Proof ---- */}
      <section className="py-10 sm:py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { value: "100%", label: "Free" },
            { value: "∞", label: "Unlimited Invoices" },
            { value: "AI‑Powered", label: "Smart Assistant" },
            { value: "PDF", label: "Professional Downloads" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Features ---- */}
      <section id="features" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
          Why you’ll love{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Zuniq</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            {
              icon: "💬",
              title: "Chat with AI",
              desc: "No more filling out forms. Just tell our AI assistant about your business, your client, and your services, and it builds the invoice for you — in seconds.",
            },
            {
              icon: "📄",
              title: "Premium Invoices",
              desc: "Every invoice is designed to look like it came from a $100k design studio. Add your logo, set tax rates, and even embed a QR code for payment.",
            },
            {
              icon: "📊",
              title: "Invoice History",
              desc: "All your invoices are saved (optionally sign in to keep them private). View, edit, download, or delete anytime. Track paid and unpaid effortlessly.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{f.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Chat with the AI",
                desc: "Answer simple questions about your invoice. The AI is friendly, never repeats itself, and understands when you correct it.",
              },
              {
                step: "2",
                title: "Review & Edit",
                desc: "See a live preview as you chat. Switch to edit mode to tweak any field — even add multiple items, tax, and discount.",
              },
              {
                step: "3",
                title: "Save & Download",
                desc: "Finalize your invoice and download a polished PDF. Optionally sign in to keep your invoices in your private dashboard.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-indigo-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Story (elder brother) ---- */}
      <section className="py-20 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Built from a real frustration</h2>
          <p className="text-indigo-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            One day, my elder brother told me his biggest headache: invoices. He was paying for tools and still wasting time.
            I'm a problem solver – I love tackling complex challenges. That moment, Zuniq AI Invoices sparked in my mind.
            My brother works in Dubai, and from that day I built this app. Now, it saves you time and money, just like I hoped.
          </p>
          <p className="mt-6 text-indigo-300 font-semibold">— Built with ❤️ for freelancers and small businesses</p>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-500 text-sm">
            <span>© 2026 Zuniq Invoices.</span>
            <span className="hidden sm:inline">|</span>
            <span>Built for freelancers & small businesses.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-900 transition">My Invoices</Link>
            <Link href="/new" className="hover:text-gray-900 transition">Create New</Link>
            <button onClick={() => setShowSupport(true)} className="hover:text-gray-900 transition">☕ Support us</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
