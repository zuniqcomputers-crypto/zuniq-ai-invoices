"use client";
import { useState } from "react";
import Link from "next/link";

/* ────────────────────────────
   Icons – tiny, line‑style, premium
   ──────────────────────────── */
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
};

/* ────────────────────────────
   Reusable Components
   ──────────────────────────── */

/** Trust badge with check icon */
function TrustBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
      <Icon.check /> {text}
    </span>
  );
}

/** Feature Card */
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

/** Testimonial Card */
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

/** Template Card – shows a small invoice preview */
function TemplateCard({ name, style }: { name: string; style: string }) {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 text-center cursor-pointer">
      <div className="h-32 bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-slate-500 text-sm">
        {/* Simple fake invoice preview */}
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
  const [templateModal, setTemplateModal] = useState<string | null>(null);

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

      {/* ========== 1. NAVIGATION ========== */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Zuniq Invoices Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white">Zuniq Invoices</span>
          </Link>

          {/* Center links – hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition hidden sm:block">
              Login
            </Link>
            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all text-sm"
            >
              <Icon.bolt /> Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== 2. HERO SECTION ========== */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Create Professional AI Invoices in Seconds
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Generate beautiful invoices instantly using AI. Export PDFs, manage clients, and get paid faster without wasting time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105"
              >
                <Icon.bolt /> Start Creating Free
              </Link>
              <button
                onClick={() => setDemoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all"
              >
                <Icon.eye /> See Live Demo
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <TrustBadge text="Free Forever" />
              <TrustBadge text="No Credit Card Required" />
              <TrustBadge text="Unlimited Invoices" />
              <TrustBadge text="Professional PDF Export" />
              <TrustBadge text="AI Powered" />
            </div>
          </div>

          {/* Right: Dashboard preview (floating cards) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-8 -left-6 bg-slate-800 rounded-2xl shadow-xl p-4 z-20 max-w-[180px] animate-float">
                <p className="text-sm text-slate-300">💬 Invoice for Ali, 3 designs...</p>
              </div>
              <div className="absolute -top-4 right-4 bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                ✨ AI Processing
              </div>

              <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 p-5 transform rotate-[-1deg] hover:rotate-0 transition-all duration-500 animate-float">
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
                      <th className="py-2 text-left">Description</th><th className="py-2 text-center">Qty</th><th className="py-2 text-right">Price</th><th className="py-2 text-right">Amount</th>
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

              <div className="absolute -bottom-6 -left-4 bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <p className="text-xs text-slate-400">📊 Analytics</p>
                <div className="flex gap-2 mt-2">
                  <div className="h-2 w-12 bg-indigo-500 rounded-full"></div>
                  <div className="h-2 w-8 bg-cyan-500 rounded-full"></div>
                  <div className="h-2 w-16 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-6 bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-4 animate-float" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Recent Invoices</span>
                  <span className="text-xs text-indigo-400 font-medium">+12%</span>
                </div>
                <div className="mt-2 space-y-1">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex justify-between text-xs"><span className="text-slate-300">Client {i}</span><span className="text-slate-500">$120</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. SOCIAL PROOF (modest numbers) ========== */}
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

      {/* ========== 4. FEATURES ========== */}
      <section id="features" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Powerful Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={Icon.sparkle} title="AI Invoice Generation" desc="Describe your invoice naturally and let AI generate it instantly." />
          <FeatureCard icon={Icon.document} title="Professional PDF Export" desc="Download beautiful, print‑ready invoices with one click." />
          <FeatureCard icon={Icon.users} title="Client Management" desc="Save client details, track history, and reuse them for future invoices." />
          <FeatureCard icon={Icon.eye} title="Invoice History" desc="Every invoice is automatically saved. Search, filter, and export anytime." />
          <FeatureCard icon={Icon.chart} title="Smart Analytics" desc="Track payments, overdue invoices, and monthly revenue at a glance." />
          <FeatureCard icon={Icon.shield} title="Brand Customization" desc="Upload your logo, choose templates, and make invoices truly yours." />
        </div>
      </section>

      {/* ========== 5. INVOICE TEMPLATES ========== */}
      <section id="templates" className="py-20 sm:py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Beautiful Invoice Templates</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <TemplateCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. PRODUCT SHOWCASE ========== */}
      <section className="py-20 sm:py-24 space-y-20">
        {[
          { title: "AI Invoice Creation", desc: "Simply chat with the AI and watch it build a complete invoice.", img: "/ai-mockup.png" },
          { title: "Powerful Invoice Editor", desc: "Edit every detail — items, tax, discount, notes — in real time.", img: "/editor-mockup.png" },
          { title: "Smart Dashboard", desc: "Track all your invoices, clients, and payments from one place.", img: "/dashboard-mockup.png" },
          { title: "One‑Click PDF Export", desc: "Download polished PDFs or send live invoice links to clients.", img: "/pdf-mockup.png" },
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

      {/* ========== 7. TESTIMONIALS ========== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">What Our Users Say</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>

      {/* ========== 8. FAQ ========== */}
      <section id="faq" className="py-20 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            "Is Zuniq Invoices really free?",
            "Can I export invoices as PDF?",
            "Can I upload my own logo?",
            "Can I edit invoices after creating them?",
            "Does it support multiple currencies?",
            "Can I add taxes and discounts?",
            "Is my data secure?",
            "Do I need a credit card?",
          ].map((question, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-semibold hover:bg-slate-800 transition"
              >
                <span>{question}</span>
                <span className={`transform transition-transform ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-sm text-slate-400">
                  Absolutely! Zuniq Invoices is free forever with all core features. No credit card required.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========== 9. SECURITY ========== */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              { icon: <Icon.shield />, label: "Secure Cloud Storage" },
              { icon: <Icon.shield />, label: "Privacy First" },
              { icon: <Icon.shield />, label: "Encrypted Data" },
              { icon: <Icon.shield />, label: "Reliable Infrastructure" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-400">
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 10. FINAL CTA ========== */}
      <section className="py-20 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start Creating Professional Invoices Today</h2>
        <p className="text-slate-400 mb-8">Generate unlimited AI invoices for free. No credit card required.</p>
        <Link href="/new" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all hover:scale-105">
          <Icon.bolt /> Create My First Invoice
        </Link>
      </section>

      {/* ========== 11. FOOTER ========== */}
      <footer className="border-t border-slate-800 py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#templates" className="hover:text-white transition">Templates</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 text-slate-400">
              <span className="hover:text-white transition cursor-pointer">🐦</span>
              <span className="hover:text-white transition cursor-pointer">💼</span>
              <span className="hover:text-white transition cursor-pointer">📘</span>
              <span className="hover:text-white transition cursor-pointer">📷</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Zuniq Invoices. All rights reserved.
        </div>
      </footer>

      {/* ========== LIVE DEMO MODAL ========== */}
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
