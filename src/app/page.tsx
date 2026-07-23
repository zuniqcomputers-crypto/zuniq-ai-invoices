import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// --- Inline SVG Icons ---

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.1 9.2A7 7 0 0 1 11 20z" />
    <path d="M11 20v-5" />
    <path d="M11 15l-3-3" />
    <path d="M11 15l3-3" />
  </svg>
);

const SproutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" />
    <path d="M10 20c5.5-3 5.5-13 0-16" />
    <path d="M10 12.5a5.5 5.5 0 0 1 6.5 0" />
    <path d="M10 12.5a5.5 5.5 0 0 0-6.5 0" />
  </svg>
);

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);

const WaterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-6-8-7-8s-7 6-7 8a7 7 0 0 0 7 7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- Content Data ---

const features = [
  {
    title: "AI-Drafted Roots",
    description: "Our intelligence extracts every item and tax from your natural conversation, ensuring a solid foundation.",
    icon: <SproutIcon />,
  },
  {
    title: "Natural Growth",
    description: "Bill in over 100+ currencies with automatic formatting that adapts to your client's soil.",
    icon: <LeafIcon />,
  },
  {
    title: "Sun-Drenched Speed",
    description: "Generate professional PDFs in under 15 seconds. No forms, no barriers, just instant blossom.",
    icon: <SunIcon />,
  },
  {
    title: "Clean Hydration",
    description: "Your data is handled with care. We use secure encryption to keep your billing fresh and safe.",
    icon: <WaterIcon />,
  },
  {
    title: "Eco-Friendly PWA",
    description: "Install Zuniq on any device. It's lightweight, offline-ready, and works everywhere on earth.",
    icon: <ZapIcon />,
  },
  {
    title: "Resilient Security",
    description: "No mandatory sign-ups. Your invoices are scoped to your session, providing total privacy.",
    icon: <ShieldIcon />,
  },
];

const templates = [
  { name: "Meadow", bg: "bg-blue-50", text: "text-blue-600" },
  { name: "Clover", bg: "bg-emerald-50", text: "text-emerald-600" },
  { name: "Sprout", bg: "bg-green-50", text: "text-green-600" },
  { name: "Pine", bg: "bg-teal-50", text: "text-teal-600" },
  { name: "Mint", bg: "bg-cyan-50", text: "text-cyan-600" },
  { name: "Lime", bg: "bg-lime-50", text: "text-lime-600" },
];

// --- Main Page Component ---

export default function LandingPage() {
  return (
    <div className={`min-h-screen bg-[#f5f7f0] text-slate-800 ${inter.className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 
          0%, 100% { transform: translateY(0px) rotate(12deg); } 
          50% { transform: translateY(-15px) rotate(14deg); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        details summary::-webkit-details-marker { display:none; }
      `}} />

      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-[100] w-full border-b border-emerald-100 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px_24px_12px_24px] bg-gradient-to-br from-emerald-400 to-green-600 shadow-sm transition-transform group-hover:rotate-12">
              <span className="text-xl font-bold text-white italic">Z</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Zuniq <span className="text-green-600">Invoices</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-green-600 transition-colors">Dashboard</Link>
            <Link 
              href="/new" 
              className="rounded-full bg-gradient-to-r from-emerald-400 to-green-600 px-6 py-2.5 text-white shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Create Invoice
            </Link>
          </div>
          
          {/* Mobile Create Button */}
          <Link href="/new" className="md:hidden rounded-full bg-green-600 p-2 text-white shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </Link>
        </div>
      </nav>

      {/* 2. HERO */}
      <header className="relative overflow-hidden px-4 pt-16 pb-24 md:pt-24 md:pb-32 text-center lg:text-left">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></span>
              Free AI Billing Forever
            </div>
            <h1 className="mb-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl xl:text-7xl">
              Invoices that feel like <br />
              <span className="bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent italic">
                walking on fresh grass.
              </span>
            </h1>
            <p className="mb-10 text-lg font-medium text-slate-600 md:text-xl lg:max-w-xl">
              Zuniq AI uses conversational intelligence to turn your chat into professional, high-end PDF invoices. No forms, no manual data entry—just simple, organic growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link 
                href="/new" 
                className="rounded-full bg-gradient-to-r from-emerald-400 to-green-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Try It Free
              </Link>
              <button className="rounded-full border-2 border-emerald-200 bg-white px-8 py-4 text-base font-bold text-green-700 shadow-sm transition-all hover:bg-emerald-50 active:scale-95">
                How It Grows
              </button>
            </div>
          </div>

          <div className="relative flex-1 items-center justify-center hidden lg:flex">
            <div className="animate-float relative flex h-72 w-72 items-center justify-center rounded-[40%_60%_70%_30%/50%_40%_60%_50%] bg-gradient-to-br from-emerald-100 to-green-200 shadow-2xl">
              <span className="text-9xl filter drop-shadow-lg">🌿</span>
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-emerald-400/20 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-green-500/10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. FEATURES */}
      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-green-600">Growth Engine</h2>
          <h3 className="mb-16 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Rooted in Simplicity, <br /> Blooming with Power
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="group rounded-3xl border border-emerald-100 bg-white p-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  {f.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">{f.title}</h4>
                <p className="text-sm font-medium leading-relaxed text-slate-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT GROWS */}
      <section className="bg-white px-4 py-24 border-y border-emerald-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl uppercase italic">How It Grows</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { id: 1, em: "💬", title: "Chat", desc: "Just tell Zuniq about your work. 'I did a logo for Ali for $500'." },
              { id: 2, em: "🌱", title: "Grow", desc: "Our AI extracts the data and prepares your invoice draft in real-time." },
              { id: 3, em: "🌿", title: "Blossom", desc: "Download your high-resolution vector PDF and get paid by your clients." }
            ].map((step) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl shadow-inner">
                  {step.em}
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                    {step.id}
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold text-slate-900">{step.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEMPLATES */}
      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl italic">Bespoke Templates</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {templates.map((t, i) => (
              <div key={i} className={`group flex aspect-[1/1.4] flex-col overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all hover:scale-[1.02] ${t.bg}`}>
                <div className="flex-1 p-4 text-left">
                  <div className={`text-[10px] font-black uppercase tracking-widest ${t.text}`}>{t.name}</div>
                  <div className="mt-4 space-y-2">
                    <div className="h-1 w-full rounded bg-white/60"></div>
                    <div className="h-1 w-2/3 rounded bg-white/60"></div>
                  </div>
                </div>
                <div className="bg-white/40 p-4 backdrop-blur-sm">
                  <div className="h-3 w-full rounded bg-white/80 shadow-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-sm overflow-hidden rounded-[2.5rem] border-2 border-emerald-100 bg-white p-10 text-center shadow-xl shadow-emerald-900/5">
          <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-green-600">The Sprout Plan</h3>
          <div className="mb-6 text-6xl font-extrabold text-slate-900">$0</div>
          <p className="mb-8 text-sm font-bold text-slate-500 uppercase italic">Free for everyone, forever.</p>
          <ul className="mb-10 space-y-4 text-left">
            {[
              "Unlimited Conversational Invoices",
              "100+ Currency Support",
              "High-Resolution PDF Export",
              "Custom Business Branding",
              "Client Memory System",
              "Session-Based Privacy"
            ].map((li, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-green-600">
                  <CheckIcon />
                </span>
                {li}
              </li>
            ))}
          </ul>
          <Link 
            href="/new" 
            className="block w-full rounded-full bg-gradient-to-r from-emerald-400 to-green-600 py-4 text-base font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95"
          >
            Start Growing
          </Link>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="px-4 py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl uppercase italic">Common Ground</h2>
          <div className="space-y-4">
            {[
              { q: "Is it really free?", a: "Yes, Zuniq is rooted in our belief that simple billing tools should be free for every solopreneur. The core engine is and will remain free." },
              { q: "How smart is the AI?", a: "We use Gemini 1.5 Pro with a deterministic system prompt. It extracts complex line items, taxes, and discounts with 99.9% accuracy." },
              { q: "Is my data secure?", a: "We value privacy above all. Your invoices are saved to your browser session and our database using enterprise-grade encryption." }
            ].map((faq, i) => (
              <details key={i} className="group rounded-3xl border border-emerald-50 bg-[#f5f7f0]/50 transition-all overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 focus:outline-none">
                  <span className="text-base font-bold text-slate-800">{faq.q}</span>
                  <span className="text-green-600 transition-transform group-open:rotate-180">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm font-medium leading-relaxed text-slate-500">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-emerald-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
            <div className="max-w-xs text-center md:text-left">
              <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px_16px_8px_16px] bg-white text-green-900 font-bold italic">Z</div>
                <span className="text-2xl font-bold italic">Zuniq <span className="text-emerald-400">Invoices</span></span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-emerald-100/60">
                Helping freelancers and small agencies grow their businesses since today. Open-source core and nature-inspired design.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 text-sm font-bold uppercase tracking-widest md:justify-end">
              <div className="flex flex-col gap-4">
                <span className="text-emerald-400 text-xs">Product</span>
                <Link href="/new" className="hover:text-emerald-400 transition-colors">Create</Link>
                <Link href="/" className="hover:text-emerald-400 transition-colors">History</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-emerald-400 text-xs">Connect</span>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</Link>
                <a href="mailto:zuniq.studio@gmail.com" className="hover:text-emerald-400 transition-colors">Support</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-10 text-center text-xs font-bold uppercase tracking-widest text-emerald-100/40">
            © {new Date().getFullYear()} Zuniq Studio. Hand-cultivated with Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
}
