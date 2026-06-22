"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="bg-slate-900 text-slate-100 selection:bg-indigo-500/30">
      {/* ---- Nav ---- */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white">Zuniq Invoices</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition hidden sm:block">
              Dashboard
            </Link>
            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all text-sm"
            >
              <span>+</span> Create Invoice
            </Link>
          </div>
        </div>
      </nav>

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <p className="text-indigo-400 text-sm font-medium mb-4 animate-fade-in-up">
              ⭐ Trusted by freelancers and agencies
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              AI invoices done for you.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Chat with our AI, answer a few questions, and get a polished invoice instantly — free forever.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105"
              >
                Start invoicing for free
              </Link>
              <a
                href="#product-preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all"
              >
                See the product
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">No credit card · Unlimited invoices · Cancel anytime</p>
          </div>

          {/* Hero product preview – realistic dashboard mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-12 -left-8 bg-slate-800 rounded-2xl shadow-xl p-4 z-20 max-w-[200px] animate-float">
                <p className="text-sm text-slate-300">💬 Invoice for Ali, 3 design pages, due in 7 days</p>
              </div>
              <div className="absolute -top-6 right-0 bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>✨ AI Processing</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-5 transform rotate-[-1deg] hover:rotate-0 transition-all duration-500 animate-float">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">Z</div>
                      <div>
                        <p className="font-semibold text-white text-sm">Design Studio</p>
                        <p className="text-xs text-slate-400">hello@designstudio.com</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white uppercase tracking-wider">Invoice</p>
                      <p className="text-xs text-slate-400">#INV‑0001</p>
                    </div>
                  </div>
                  <table className="w-full text-sm mb-4">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-2 text-left">Description</th>
                        <th className="py-2 text-center">Qty</th>
                        <th className="py-2 text-right">Price</th>
                        <th className="py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-2 text-slate-200">Logo design</td><td className="py-2 text-center text-slate-400">1</td><td className="py-2 text-right text-slate-400">$500</td><td className="py-2 text-right font-medium text-white">$500</td></tr>
                      <tr><td className="py-2 text-slate-200">Brand guidelines</td><td className="py-2 text-center text-slate-400">1</td><td className="py-2 text-right text-slate-400">$300</td><td className="py-2 text-right font-medium text-white">$300</td></tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end"><div className="text-right space-y-1"><div className="flex justify-between gap-8 text-sm"><span className="text-slate-400">Subtotal</span><span className="font-medium text-white">$800</span></div><div className="flex justify-between gap-8 text-sm"><span className="text-slate-400">Tax (5%)</span><span className="font-medium text-white">$40</span></div><div className="border-t border-slate-700 pt-1 flex justify-between gap-8 text-lg font-bold text-white"><span>Total</span><span>$840</span></div></div></div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-medium">AI Powered</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">PDF Ready</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 font-medium">Auto‑Filled</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-medium">Smart Tax</span>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-4 flex flex-col items-center justify-center gap-2 animate-float" style={{ animationDelay: '0.3s' }}>
                  <div className="text-3xl">📄</div>
                  <p className="text-xs text-slate-400 text-center">Live invoice editor</p>
                </div>
                <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-4 flex flex-col items-center justify-center gap-2 animate-float" style={{ animationDelay: '0.6s' }}>
                  <div className="text-3xl">📊</div>
                  <p className="text-xs text-slate-400 text-center">Dashboard analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Features (compact cards) ---- */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: "💬", title: "Chat‑based creation", desc: "Tell the AI what you need and it builds the invoice instantly." },
            { icon: "📄", title: "Professional PDFs", desc: "Every invoice is designed with modern typography and clean spacing." },
            { icon: "📊", title: "Dashboard & history", desc: "View, edit, duplicate, or download all your invoices anytime." },
          ].map((f, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section id="product-preview" className="py-16 sm:py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Describe the invoice", desc: "Type a short sentence like 'Invoice for Ali, 3 designs, due in 7 days'." },
              { step: "02", title: "Review & edit", desc: "The AI fills everything. You can tweak any field before finalizing." },
              { step: "03", title: "Export or send", desc: "Download a PDF or share a live link with your client. Professional and fast." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-indigo-400 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="py-16 sm:py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to stop wasting time on invoices?</h2>
        <Link href="/new" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all">
          Create your first invoice free
        </Link>
        <p className="mt-3 text-sm text-slate-500">No sign‑up required. Start immediately.</p>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Zuniq Invoices</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link href="/new" className="hover:text-white transition">Create New</Link>
            <button onClick={() => setShowSupport(true)} className="hover:text-white transition">☕ Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
