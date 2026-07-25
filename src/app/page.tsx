"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className={`min-h-screen bg-[#f5f7f0] text-slate-800 ${inter.className} overflow-x-hidden`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes heartbeat { 0% { transform: scale(1); } 25% { transform: scale(1.03); } 50% { transform: scale(1); } }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 3s ease-in-out infinite; }
        
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        
        .glass-nav { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(15px); }
        .leaf-shape { border-radius: 60% 40% 70% 30% / 50% 30% 70% 50%; }
        .ellipse-logo { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
      `}} />

      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] border-b border-emerald-100 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Animated Logo Container */}
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-400 blur-md rounded-full animate-pulse-glow opacity-50"></div>
              <div className="relative h-10 w-10 bg-white ellipse-logo shadow-sm overflow-hidden flex items-center justify-center border border-emerald-100 group-hover:rotate-6 transition-transform duration-500">
                <img src="/logo.png" alt="Zuniq Logo" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <span className="text-2xl font-[800] tracking-tighter text-slate-900">
              Zuniq <span className="text-green-600 italic">Invoices</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-green-600 transition-colors">Dashboard</Link>
            <Link 
              href="/new" 
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-40 pb-32 px-6">
        {/* Background Blobs */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-emerald-100/40 blur-[100px] rounded-full -z-10 animate-float"></div>
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-green-100/30 blur-[120px] rounded-full -z-10 animate-float" style={{animationDelay: '-2s'}}></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              The New Standard of Freedom
            </div>
            <h1 className="text-[45px] md:text-[75px] leading-[0.9] font-[900] tracking-tightest text-slate-900 mb-8">
              Invoices that feel <br />
              <span className="bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent italic underline decoration-emerald-200">like fresh grass.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg leading-relaxed">
              Zuniq AI transforms your messy job details into elite PDF invoices. Talk to the assistant, blossom your business.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/new" className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl hover:bg-green-600 transition-all duration-500 active:scale-95">
                Create Invoice — $0
              </Link>
              <button className="px-10 py-5 bg-white border border-emerald-100 text-slate-600 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all">
                How It Grows
              </button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative flex justify-center lg:justify-end reveal">
            <div className="animate-float relative flex h-[350px] w-[350px] md:h-[500px] md:w-[500px] items-center justify-center leaf-shape bg-gradient-to-br from-emerald-400 to-green-600 shadow-[0_50px_100px_-20px_rgba(22,163,74,0.3)]">
              <span className="text-[120px] md:text-[200px] filter drop-shadow-2xl">🌿</span>
              <div className="absolute -top-10 -left-10 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl reveal">
                 <div className="h-2 w-20 bg-emerald-500 rounded-full mb-3"></div>
                 <div className="h-2 w-12 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. DESIGN STUDIO SECTION (zuniq.xyz promo) */}
      <section className="py-32 px-6 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="h-1 w-20 bg-emerald-500 mb-8 rounded-full"></div>
              <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter mb-8 italic uppercase">
                Zuniq <span className="text-emerald-400">Design Studio</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-10">
                Beyond invoices, we build identities. From high-end **Websites** and **Elite Logos** to professional **Business Cards** and **Posters**. If you can imagine it, Zuniq can design it.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12 text-sm font-bold tracking-widest uppercase text-emerald-100/60">
                 <div className="flex items-center gap-2">✓ Website Design</div>
                 <div className="flex items-center gap-2">✓ Brand Logos</div>
                 <div className="flex items-center gap-2">✓ Posters & Print</div>
                 <div className="flex items-center gap-2">✓ Business Cards</div>
              </div>
              <a href="https://zuniq.xyz" target="_blank" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all duration-500">
                Visit Studio <span className="text-xl">→</span>
              </a>
            </div>
            
            <div className="relative group reveal">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse-glow"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-xl hover:border-emerald-500/40 transition-colors duration-700">
                 <h4 className="text-center text-xs font-black uppercase tracking-[0.5em] text-emerald-400 mb-10">Portfolio Highlight</h4>
                 <div className="aspect-video bg-slate-900 rounded-2xl border border-white/5 shadow-inner flex items-center justify-center">
                    <span className="text-slate-700 font-[900] italic tracking-tight text-3xl">ZUNIQ.XYZ</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-green-600 mb-6">Rooted in Excellence</h2>
          <h3 className="text-4xl md:text-6xl font-[900] tracking-tight text-slate-900 mb-20 uppercase italic">Blooming with Power</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="AI-Drafted Roots" desc="Extraction engine that understands your conversation perfectly." />
            <FeatureCard title="Eco-Currency" desc="Bill in 100+ local and global currencies with ease." />
            <FeatureCard title="Sun-Speed PDF" desc="Vector-sharp PDFs generated in under 10 seconds." />
            <FeatureCard title="Secure Soil" desc="Enterprise encryption. Your data stays only in your hands." />
            <FeatureCard title="Organic Growth" desc="Automated tax and discount logic. No manual math." />
            <FeatureCard title="Nature-PWA" desc="Install on your phone. Works at the office or on the move." />
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-32 px-6 bg-emerald-50/50">
        <div className="max-w-md mx-auto bg-white rounded-[3rem] p-12 shadow-2xl border border-emerald-100 text-center reveal">
           <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-4 py-1 rounded-full">Always Free</span>
           <div className="text-7xl font-[900] text-slate-900 my-8 italic">$0</div>
           <p className="text-slate-500 font-bold mb-10 uppercase tracking-widest text-xs italic leading-loose">
             Unlimited AI Invoices <br/> 
             Custom Branding <br/> 
             No Hidden Fees
           </p>
           <Link href="/new" className="block w-full py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform">
             Start Growing Now
           </Link>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <h3 className="text-center text-4xl font-[900] mb-20 uppercase italic tracking-tighter">Common Ground</h3>
        <div className="space-y-4">
           <details className="group p-8 bg-white border border-emerald-100 rounded-3xl reveal">
              <summary className="font-bold text-lg list-none cursor-pointer flex justify-between items-center uppercase italic">
                Is it really free?
                <span className="text-green-600">+</span>
              </summary>
              <p className="mt-6 text-slate-500 leading-relaxed">Yes. Zuniq AI is built to empower freelancers. The core invoice engine is and will always be free.</p>
           </details>
           <details className="group p-8 bg-white border border-emerald-100 rounded-3xl reveal">
              <summary className="font-bold text-lg list-none cursor-pointer flex justify-between items-center uppercase italic">
                How smart is the AI?
                <span className="text-green-600">+</span>
              </summary>
              <p className="mt-6 text-slate-500 leading-relaxed">We use Gemini 1.5 Pro to ensure complex data like taxes and multi-line items are extracted with 100% precision.</p>
           </details>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 py-20 px-6 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white ellipse-logo flex items-center justify-center text-emerald-950 font-bold italic">Z</div>
              <span className="text-2xl font-[900] uppercase italic tracking-tighter">Zuniq <span className="text-emerald-400">Studio</span></span>
            </div>
            <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-emerald-100/40">
               <a href="https://zuniq.xyz" target="_blank" className="hover:text-white">Portfolio</a>
               <Link href="/privacy" className="hover:text-white">Privacy</Link>
               <a href="mailto:zuniq.studio@gmail.com" className="hover:text-white">Support</a>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-[10px] font-bold text-emerald-100/20 uppercase tracking-[0.4em]">
             © {new Date().getFullYear()} ZUNIQ STUDIO — BEYOND DESIGN.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-component for features
function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-10 rounded-[2.5rem] border border-emerald-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-left reveal">
      <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-green-600 mb-8">🌿</div>
      <h4 className="text-xl font-bold mb-4 uppercase italic">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
