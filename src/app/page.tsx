"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="bg-white text-gray-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* ---- Nav (clean logo, no halo) ---- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1">
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

      {/* ---- Support Modal ---- */}
      {showSupport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowSupport(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">☕ Support us</h2>
              <button onClick={() => setShowSupport(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
            </div>
            <p className="text-gray-600 mb-6">Zuniq Invoices is free and open. If it helps your business, consider supporting its development.</p>
            <a href="https://ko-fi.com/zuniqinvoices" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105">☕️ Support on Ko‑fi</a>
            <p className="mt-4 text-xs text-gray-400 text-center">Secure donation via Ko‑fi. No account required.</p>
          </div>
        </div>
      )}

      {/* ---- Hero Section ---- */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 animate-fade-in-up">
              🎉 Free & Unlimited – No credit card
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight animate-fade-in-up">
              Invoices that feel
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500">
                like magic.
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed animate-fade-in-up">
              Chat with our AI, answer a few questions, and get a polished invoice instantly. No forms, no templates—just describe what you need.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <Link href="/new" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <span className="text-xl">⚡</span> Create your first invoice
              </Link>
              <a href="#transformation" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-3.5 rounded-2xl font-semibold text-base shadow-sm transition-all">
                See how it works
              </a>
            </div>
          </div>

          {/* Right side – Animated Showcase (ready for custom images) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Floating chat bubble */}
              <div className="absolute -top-12 -left-8 bg-white rounded-2xl shadow-lg p-4 z-20 max-w-[200px] animate-float">
                <p className="text-sm text-gray-600">💬 Invoice for Ali, 3 design pages, due in 7 days</p>
              </div>
              {/* AI processing badge */}
              <div className="absolute -top-6 right-0 bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>✨ AI Processing</div>

              {/* Showcase cards – replace src with your images later */}
              <div className="grid grid-cols-2 gap-4">
                {/* Main invoice card */}
                <div className="col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 transform rotate-[-1deg] hover:rotate-0 transition-all duration-500 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">Z</div>
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
                      <div className="flex justify-between gap-8 text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium">$800</span></div>
                      <div className="flex justify-between gap-8 text-sm"><span className="text-gray-500">Tax (5%)</span><span className="font-medium">$40</span></div>
                      <div className="border-t border-gray-200 pt-1 flex justify-between gap-8 text-lg font-bold text-gray-900"><span>Total</span><span>$840</span></div>
                    </div>
                  </div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">AI Powered</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">PDF Ready</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">Auto‑Filled</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">Smart Tax</span>
                  </div>
                </div>

                {/* Secondary cards (will hold your images later) */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col items-center justify-center gap-2 animate-float" style={{ animationDelay: '0.3s' }}>
                  <div className="text-3xl">🖼️</div>
                  <p className="text-xs text-gray-500 text-center">Your showcase image 1</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col items-center justify-center gap-2 animate-float" style={{ animationDelay: '0.6s' }}>
                  <div className="text-3xl">📱</div>
                  <p className="text-xs text-gray-500 text-center">Your showcase image 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Transformation Flow ---- */}
      <section id="transformation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "💬", title: "You chat", desc: "Describe your invoice in a few words. The AI understands everything – clients, items, due dates." },
              { step: "✨", title: "AI builds it", desc: "Our smart assistant instantly creates a draft with all details, ready for you to review." },
              { step: "📤", title: "Share & get paid", desc: "Download a professional PDF or send a live link. Clients see a beautiful, branded page." },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
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
