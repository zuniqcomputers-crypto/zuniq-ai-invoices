"use client";
import { useState } from "react";
import Link from "next/link";

/* ────── Tiny, line‑style Icons ────── */
const Icon = {
  sparkle: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  bolt: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  check: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  shield: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  star: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  document: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  chart: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 16l4-4 4 4 5-5" />
    </svg>
  ),
  users: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  eye: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  globe: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  ),
  lock: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
};

/* ────── Reusable Components ────── */

function TrustBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
      <Icon.check /> {text}
    </span>
  );
}

function FeatureCard({ icon: IconComp, title, desc }: { icon: React.ComponentType; title: string; desc: string }) {
  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
        <IconComp />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function TestimonialCard({ avatar, name, title, company, text }: { avatar: string; name: string; title: string; company: string; text: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Icon.star key={i} />
        ))}
      </div>
      <p className="text-slate-300 text-sm leading-relaxed italic">“{text}”</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{name}</p>
          <p className="text-slate-400 text-xs">{title}, {company}</p>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ name, style, onClick }: { name: string; style: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-slate-800 rounded-2xl border border-slate-700 p-4 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 text-center cursor-pointer"
    >
      <div className="h-32 bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-slate-500 text-sm">
        {/* Fake invoice preview */}
        <div className="w-full h-full p-3 flex flex-col gap-2">
          <div className="h-2 w-3/4 bg-slate-600 rounded" />
          <div className="h-2 w-1/2 bg-slate-600 rounded" />
          <div className="flex-1 flex gap-2 mt-2">
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full bg-slate-600 rounded" />
              <div className="h-1.5 w-2/3 bg-slate-600 rounded" />
              <div className="h-1.5 w-1/2 bg-slate-600 rounded" />
            </div>
          </div>
          <div className="h-2 w-1/3 bg-indigo-500 rounded self-end" />
        </div>
      </div>
      <p className="text-white font-semibold">{name}</p>
      <p className="text-slate-400 text-xs">{style}</p>
    </div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [demoModal, setDemoModal] = useState(false);

  const templates = [
    { name: "Modern", style: "Clean & contemporary" },
    { name: "Minimal", style: "Simple & elegant" },
    { name: "Corporate", style: "Professional & structured" },
    { name: "Luxury", style: "High‑end & premium" },
    { name: "Creative", style: "Bold & artistic" },
    { name: "Dark", style: "Elegant dark theme" },
  ];

  const testimonials = [
    {
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Sarah Chen",
      title: "Freelance Designer",
      company: "DesignCraft",
      text: "This is the fastest invoice tool I've ever used. It literally cuts my billing time by 90%.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Mike Johnson",
      title: "Agency Owner",
      company: "Digital Horizon",
      text: "Zuniq saves me hours every week. The AI is incredibly accurate and the PDFs look amazing.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Emily Roberts",
      title: "Consultant",
      company: "StratEdge",
      text: "I love how professional the invoices look. My clients are impressed and I get paid faster.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      name: "David Kim",
      title: "Developer",
      company: "CodeBridge",
      text: "Finally an invoice tool that doesn't feel like accounting software. Super intuitive.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      name: "Anna Martinez",
      title: "Photographer",
      company: "Aperture Studio",
      text: "The template designs are beautiful. I switched from a paid tool and this free version is better.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "James Wilson",
      title: "Marketing Consultant",
      company: "GrowthLab",
      text: "Zuniq remembers my clients and services, so invoicing takes literally 30 seconds. Highly recommended.",
    },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 selection:bg-indigo-500/30 font-sans overflow-x-hidden">

      {/* ========== NAVIGATION ========== */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Zuniq Invoices Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white">Zuniq Invoices</span>
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition hidden sm:block">
              Dashboard
            </Link>
            <Link href="/new" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all text-sm">
              <Icon.bolt /> Elevate Your Billing
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO (Upgraded) ========== */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Intelligent Invoicing for the Modern Enterprise.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Harness the power of AI to generate, manage, and track professional financial documents with surgical precision. Secure, seamless, and sophisticated.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/new" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105">
                <Icon.bolt /> Elevate Your Billing
              </Link>
              <button onClick={() => setDemoModal(true)} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all">
                <Icon.eye /> See Live Demo
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">Enterprise-grade PDF exports. Trusted in 20+ countries. Secure by design.</p>
          </div>

          {/* Dashboard preview (unchanged) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-8 -left-6 bg-slate-800 rounded-2xl shadow-xl p-4 z-20 max-w-[180px] animate-float">
                <p className="text-sm text-slate-300">💬 Invoice for Ali, 3 designs...</p>
              </div>
              <div className="absolute -top-4 right-4 bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>✨ AI Processing</div>
              <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 p-5 transform rotate-[-1deg] hover:rotate-0 transition-all duration-500 animate-float">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">Z</div>
                    <div><p className="font-semibold text-white text-sm">Design Studio</p><p className="text-xs text-slate-400">hello@designstudio.com</p></div>
                  </div>
                  <div className="text-right"><p className="text-sm font-bold text-white uppercase tracking-wider">Invoice</p><p className="text-xs text-slate-400">#INV‑0001</p></div>
                </div>
                <table className="w-full text-sm mb-4">
                  <thead><tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider"><th className="py-2 text-left">Description</th><th className="py-2 text-center">Qty</th><th className="py-2 text-right">Price</th><th className="py-2 text-right">Amount</th></tr></thead>
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
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF (modest) ========== */}
      <section className="py-12 bg-slate-800/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "2,500+", label: "Invoices Generated" },
            { value: "500+", label: "Happy Users" },
            { value: "20+", label: "Countries" },
            { value: "99.9%", label: "Uptime" },
          ].map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FEATURES (Consolidated & New) ========== */}
      <section id="features" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Powerful, Intelligent, Secure</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={Icon.sparkle} title="Predictive Document Generation" desc="Describe your requirements in plain language. Our AI engine instantly constructs compliant, multi-currency invoices tailored to your brand." />
          <FeatureCard icon={Icon.chart} title="Financial Intelligence & Analytics" desc="Go beyond basic tracking. Visualize revenue trends, monitor aging receivables, and optimize your cash flow through our smart dashboard." />
          <FeatureCard icon={Icon.shield} title="White-Label Brand Customization" desc="Upload your corporate identity and choose from a curated collection of high-end templates, including 'Luxury' and 'Corporate' themes designed for elite professionals." />
        </div>

        {/* Two new features */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FeatureCard icon={Icon.lock} title="Secure Client Portals" desc="Provide your clients with a premium experience. Send a 'Live Link' where they can view, download, and manage their invoice history in a secure, branded environment." />
          <FeatureCard icon={Icon.globe} title="Global Compliance & Tax Engine" desc="Automatically calculate localized taxes (VAT, GST) and handle 20+ currencies with real-time accuracy." />
        </div>
      </section>

      {/* ========== INVOICE TEMPLATES ========== */}
      <section id="templates" className="py-20 sm:py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Beautiful Invoice Templates</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t, idx) => (
              <TemplateCard key={idx} {...t} onClick={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS (unchanged) ========== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { step: "01", title: "Describe the invoice", desc: "Type what you need in plain English." },
            { step: "02", title: "AI fills everything", desc: "The smart assistant creates the invoice instantly." },
            { step: "03", title: "Download & share", desc: "Get a polished PDF or send a live link to your client." },
          ].map((s, i) => (
            <div key={i} className="relative">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">{s.step}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PRODUCT SHOWCASE (unchanged) ========== */}
      <section className="py-20 sm:py-24 space-y-20 bg-slate-800/30">
        {[
          { title: "AI Invoice Creation", desc: "Simply chat with the AI and watch it build a complete invoice.", img: "/ai-mockup.png" },
          { title: "Smart Dashboard", desc: "Track all your invoices, clients, and payments from one place.", img: "/dashboard-mockup.png" },
        ].map((item, i) => (
          <div key={i} className={`max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className={`${i % 2 !== 0 ? 'md:order-2' : ''}`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">{item.desc}</p>
            </div>
            <div className={`${i % 2 !== 0 ? 'md:order-1' : ''}`}>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 shadow-2xl">
                <img src={item.img} alt={item.title} className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">What Our Users Say</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>

      {/* ========== FAQ (Refined) ========== */}
      <section id="faq" className="py-20 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How does Zuniq handle data security?", a: "We utilize encrypted data protocols and secure cloud storage to ensure every transaction is protected." },
            { q: "Can I export for accounting software?", a: "Yes, generate professional PDF exports or use our dashboard to export data for your financial reporting." },
            { q: "Is Zuniq Invoices really free?", a: "Absolutely! Zuniq Invoices is free forever with all core features. No credit card required." },
            { q: "Can I upload my own logo?", a: "Yes, you can upload your logo and customize your invoices to match your brand." },
            { q: "Does it support multiple currencies?", a: "Yes, Zuniq supports over 20 currencies and automatically calculates localized taxes." },
            { q: "Can I add taxes and discounts?", a: "Of course. You can add tax percentages, discounts, and even advance payments to any invoice." },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-semibold hover:bg-slate-800 transition">
                <span>{item.q}</span>
                <span className={`transform transition-transform ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-sm text-slate-400">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECURITY (Enterprise) ========== */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Bank-Level Security for Your Peace of Mind</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: <Icon.lock />, title: "AES-256 Encryption", desc: "Your financial data is encrypted at rest and in transit." },
              { icon: <Icon.shield />, title: "Privacy-First Architecture", desc: "We never sell your data. Your clients' information remains yours alone." },
              { icon: <Icon.check />, title: "99.9% Uptime Guarantee", desc: "Reliable infrastructure to ensure your business never pauses." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start Creating Professional Invoices Today</h2>
        <p className="text-slate-400 mb-8">Generate unlimited AI invoices for free. No credit card required.</p>
        <Link href="/new" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105">
          <Icon.bolt /> Elevate Your Billing
        </Link>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#templates" className="hover:text-white transition">Templates</a></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/new" className="hover:text-white transition">Create Invoice</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="mailto:support@zuniq-invoices.vercel.app" className="hover:text-white transition">Email Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 text-slate-400">
              <span className="hover:text-white transition cursor-pointer">🐦</span>
              <span className="hover:text-white transition cursor-pointer">💼</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Zuniq Invoices. All rights reserved.
        </div>
      </footer>

      {/* ========== DEMO MODAL ========== */}
      {demoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDemoModal(false)}>
          <div className="bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">🚀 Live Demo</h2>
              <button onClick={() => setDemoModal(false)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <p className="text-slate-300 text-sm mb-4">Type a sample command to see how the AI generates an invoice:</p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  readOnly
                  value="Invoice for Ali, 3 design pages, due in 7 days, 20% advance"
                  className="flex-1 h-12 px-4 rounded-xl border border-slate-600 bg-slate-700 text-white text-sm"
                />
                <button className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center">➤</button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-200 text-sm px-4 py-3 rounded-2xl rounded-bl-md border border-slate-700 max-w-[80%]">
                    Hey! I've created your invoice. Client: Ali, items: 3 design pages, due in 7 days, 20% advance noted.
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-slate-400 text-xs text-center">This is a demo preview. Create real invoices for free!</p>
          </div>
        </div>
      )}
    </div>
  );
}
