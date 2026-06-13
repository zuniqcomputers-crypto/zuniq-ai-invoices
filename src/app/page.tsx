"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="bg-white text-gray-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* ---- Nav ---- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl overflow-hidden ring-2 ring-indigo-400/50 shadow-md bg-white p-0.5 flex-shrink-0">
              <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
              Zuniq Invoices
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition hidden sm:block">
              Dashboard
            </Link>
            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 text-xs sm:text-base"
            >
              <span className="text-lg">⚡</span>
              <span className="whitespace-nowrap">Create Free Invoice</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Support Modal (still accessible from footer) ---- */}
      {showSupport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowSupport(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">☕ Support us</h2>
              <button onClick={() => setShowSupport(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
            </div>
            <p className="text-gray-600 mb-6">Zuniq Invoices is free and open to everyone. If it helps your business, consider supporting its development.</p>
            <a href="https://ko-fi.com/zuniqinvoices" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105">☕️ Support on Ko‑fi</a>
            <p className="mt-4 text-xs text-gray-400 text-center">Secure donation via Ko‑fi. No account required.</p>
          </div>
        </div>
      )}

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-70 pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Invoices that feel like magic.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Zuniq turns a short chat into a polished, ready‑to‑send invoice. No forms, no templates—just describe what you need and get a professional PDF in seconds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/new" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <span className="text-xl">⚡</span> Create your first invoice
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-3.5 rounded-2xl font-semibold text-base shadow-sm transition-all">
              See how it works
            </a>
          </div>

          {/* Sample invoice preview (static, just for trust) */}
          <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 transform rotate-[-0.5deg] hover:rotate-0 transition-all duration-500">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">Z</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Design Studio</p>
                  <p className="text-xs text-gray-500">hello@designstudio.com</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">Invoice</p>
                <p className="text-xs text-gray-500">#INV‑0001</p>
              </div>
            </div>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-gray-800">Logo design</td>
                  <td className="py-2 text-center text-gray-600">1</td>
                  <td className="py-2 text-right text-gray-600">$500</td>
                  <td className="py-2 text-right font-medium text-gray-800">$500</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-800">Brand guidelines</td>
                  <td className="py-2 text-center text-gray-600">1</td>
                  <td className="py-2 text-right text-gray-600">$300</td>
                  <td className="py-2 text-right font-medium text-gray-800">$300</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="text-right space-y-1">
                <div className="flex justify-between gap-8 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">$800</span>
                </div>
                <div className="flex justify-between gap-8 text-sm">
                  <span className="text-gray-500">Tax (5%)</span>
                  <span className="font-medium">$40</span>
                </div>
                <div className="border-t border-gray-200 pt-1 flex justify-between gap-8 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>$840</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Trust badges ---- */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { value: "Free forever", label: "No hidden costs" },
            { value: "Secure", label: "Data encrypted" },
            { value: "AI‑assisted", label: "Smart & fast" },
            { value: "PDF export", label: "Print & share ready" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section id="how-it-works" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
          From chat to invoice in 30 seconds
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Tell the AI", desc: "Type or speak what you need: 'Invoice for Ali, 3 design pages, due in 7 days'." },
            { step: "2", title: "Review & refine", desc: "The AI builds a polished draft. Edit any field, add items, or change tax." },
            { step: "3", title: "Share & track", desc: "Download a PDF or share a live link. Clients see a beautiful, branded page." },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Short origin ---- */}
      <section className="py-20 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Built for people who hate invoicing</h2>
          <p className="text-indigo-200 text-base sm:text-lg leading-relaxed">
            Our founder created Zuniq after watching freelancers waste hours on clunky invoice tools. We believe billing should be fast, free, and even enjoyable.
          </p>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Zuniq Invoices. Built for clarity, not complexity.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-900 transition">Dashboard</Link>
            <Link href="/new" className="hover:text-gray-900 transition">Create New</Link>
            <button onClick={() => setShowSupport(true)} className="hover:text-gray-900 transition">☕ Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
