"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Inter, Montserrat, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['900'] });
const playfair = Playfair_Display({ subsets: ['latin'], style: 'italic' });

export default function MasterPortfolioPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className={`min-h-screen bg-[#fcfdfa] text-slate-900 overflow-x-hidden selection:bg-emerald-200 ${inter.className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes rotate-bg { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        
        .handwriting { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 3s ease-in-out forwards; animation-delay: 1s; }
        .ellipse-ring { background: conic-gradient(from 0deg, #4ade80, #3b82f6, #8b5cf6, #ec4899, #4ade80); animation: rotate-bg 4s linear infinite; }
        
        .glass-nav { background: rgba(252, 253, 250, 0.8); backdrop-filter: blur(20px); }
        .hero-gradient { background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); }
        
        /* Mobile Scaling Fixes */
        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem !important; line-height: 1.1 !important; }
        }
      `}} />

      {/* 1. ELITE NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] border-b border-emerald-100/50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group relative z-[110]">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute inset-0 ellipse-ring rounded-full blur-[2px]"></div>
              <div className="absolute inset-[2px] bg-white rounded-full"></div>
              <img src="/logo.png" alt="Zuniq" className="relative z-10 w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
            </div>
            <span className={`text-xl font-black tracking-tighter uppercase ${montserrat.className}`}>
              ZUNIQ<span className="text-emerald-500">AI</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <Link href="/" className="hover:text-emerald-600 transition-all">Studio</Link>
            <a href="#features" className="hover:text-emerald-600 transition-all">Technology</a>
            <Link 
              href="/new" 
              className="bg-slate-900 text-white px-8 py-3 rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
            >
              Start Billing
            </Link>
          </div>
          
          <Link href="/new" className="md:hidden relative z-[110] bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            Create
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION - THE "PEN" ANIMATION EXPERIENCE */}
      <header className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-[-5%] w-[500px] h-[500px] bg-blue-50/50 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm mb-10">
               <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-700">Now with Gemini 1.5 Integration</span>
            </div>
            
            <h1 className="hero-title text-5xl md:text-7xl lg:text-[95px] font-black tracking-tightest leading-[0.85] text-slate-900 mb-10">
              The Art of <br />
              <span className="relative inline-block text-emerald-600 italic">
                Invoicing
                {/* SVG Pen underline effect */}
                <svg className="absolute -bottom-4 left-0 w-full h-4 text-emerald-200" viewBox="0 0 300 20" fill="none">
                  <path className="handwriting" d="M5 15C50 5 150 5 295 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed mb-12 italic">
              Stop filling forms. Describe your work in natural language and watch Zuniq AI draft your <span className={playfair.className}>perfect</span> PDF.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link 
                href="/new" 
                className="w-full sm:w-auto z-20 text-center px-12 py-7 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-emerald-600 transition-all duration-500 hover:-translate-y-2 active:scale-95"
              >
                Create Invoice — $0
              </Link>
              <div className="text-left">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Effort Required</p>
                 <p className="text-2xl font-black text-emerald-600 tracking-tighter">Zero Percent.</p>
              </div>
            </div>
          </div>

          {/* Luxury Mockup Preview */}
          <div className="relative reveal hidden lg:block">
            <div className="absolute -inset-10 bg-emerald-400/10 blur-[100px] rounded-full animate-float"></div>
            <div className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-12 overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
               <div className="flex justify-between items-start mb-16">
                  <div className="h-14 w-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                     <img src="/logo.png" className="w-8 h-8 opacity-50" />
                  </div>
                  <div className="text-right">
                     <h4 className="text-3xl font-black italic tracking-tighter">INVOICE</h4>
                     <p className="text-[10px] font-bold text-slate-300 tracking-widest">ZIQ-STUDIO-2024</p>
                  </div>
               </div>
               <div className="space-y-6 mb-16">
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-emerald-50 rounded-full"></div>
               </div>
               <div className="flex justify-between items-end border-t border-slate-50 pt-10">
                  <div className="text-5xl font-[1000] tracking-tightest italic">$1,450.00</div>
                  <div className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full tracking-widest">Verified</div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. TECHNOLOGY BENTO GRID (The Long Content) */}
      <section id="features" className="py-32 md:py-48 px-6 bg-white border-y border-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
             <h2 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-6 italic">Core Infrastructure</h2>
             <h3 className="text-4xl md:text-6xl font-black tracking-tightest uppercase italic">Engineered for Elegance.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard title="NLU Intelligence" desc="Powered by Gemini 1.5 Pro, our AI understands complex job descriptions, multi-line items, and specific tax requests instantly." />
            <FeatureCard title="Global Currency" desc="Automatic formatting for 150+ world currencies. Whether you bill in AED, PKR, or USD, we match the local standard." />
            <FeatureCard title="Vector Rendering" desc="Not just a PDF—a masterpiece. High-resolution vector output that looks crisp on Retina displays and premium office printers." />
            <FeatureCard title="PWA Architecture" desc="Install Zuniq on your mobile device. Offline-first logic ensures you can draft invoices while traveling or in low-signal areas." color="bg-slate-900 text-white" />
            <FeatureCard title="Privacy First" desc="We use session-scoped encryption. Your client data and business details are never stored for training or sold to third parties." />
            <FeatureCard title="Instant Sync" desc="Saved locally to your browser. Revisit your studio dashboard anytime to download, edit, or delete past professional billing." />
          </div>
        </div>
      </section>

      {/* 4. DESIGN STUDIO SECTION (zuniq.xyz Showcase) */}
      <section className="py-32 md:py-48 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <div className="h-2 w-20 bg-emerald-500 mb-12 rounded-full"></div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tightest uppercase italic mb-10">
              Beyond <br /> <span className="text-emerald-400">Design.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium mb-12 italic">
              Need more than an invoice? Zuniq Studio builds high-end digital identities. From **Luxury Branding** to **SaaS Web Design** and **Elite Print Media**. 
            </p>
            <div className="grid grid-cols-2 gap-8 mb-16 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/30">
               <div>✓ Website Architecture</div>
               <div>✓ Brand Identity & Logos</div>
               <div>✓ Business Card Design</div>
               <div>✓ Professional Posters</div>
            </div>
            <a href="https://zuniq.xyz" target="_blank" className="group inline-flex items-center gap-6 bg-white text-slate-900 px-12 py-7 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all duration-500 active:scale-95 shadow-2xl shadow-emerald-500/20">
              View Portfolio <span className="text-3xl group-hover:translate-x-3 transition-transform">→</span>
            </a>
          </div>

          <div className="reveal relative group">
             <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-[4rem] group-hover:bg-emerald-500/30 transition-all"></div>
             <div className="relative bg-white/5 border border-white/10 rounded-[4rem] p-12 backdrop-blur-3xl flex flex-col items-center">
                <div className="w-full aspect-video bg-slate-900 rounded-3xl border border-white/5 shadow-inner flex items-center justify-center mb-10">
                   <span className="text-slate-700 font-black italic tracking-tightest text-4xl md:text-6xl uppercase">ZUNIQ.XYZ</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.5em] text-emerald-500/50 italic text-center">Excellence in every pixel</p>
             </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & TRUST SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#fcfdfa] border border-emerald-100 rounded-[4rem] p-12 md:p-24 shadow-2xl reveal">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 bg-emerald-50 px-6 py-2 rounded-full inline-block mb-10">Limited Time Offer</span>
             <h3 className="text-7xl md:text-[120px] font-black tracking-tightest italic text-slate-900 mb-8">$0</h3>
             <p className="text-xl md:text-2xl text-slate-500 font-bold uppercase tracking-widest mb-16">Free for every Freelancer. <br /> Forever.</p>
             <Link 
               href="/new" 
               className="block w-full py-8 bg-gradient-to-r from-emerald-500 to-green-700 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:scale-[1.02] transition-transform active:scale-95"
             >
               Start Your First Invoice
             </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-emerald-950 py-32 px-6 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-8 max-w-sm">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950 font-black italic text-2xl">Z</div>
               <span className="text-3xl font-black uppercase tracking-tighter italic">Zuniq <span className="text-emerald-500">Studio</span></span>
            </div>
            <p className="text-emerald-100/40 text-sm leading-relaxed font-medium italic">
              Empowering the world's most talented creators with AI-driven professional tools. Based in Pakistan, operating globally.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Your invoice data is never shared or sold. 100% Private.</p>
          </div>

          <div className="grid grid-cols-2 gap-20 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
             <div className="flex flex-col gap-6">
                <span className="text-white/20 text-[9px]">SITEMAP</span>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/new" className="hover:text-white transition-colors">Generator</Link>
                <a href="https://zuniq.xyz" target="_blank" className="hover:text-white transition-colors">Studio</a>
             </div>
             <div className="flex flex-col gap-6">
                <span className="text-white/20 text-[9px]">LEGAL</span>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <a href="mailto:zuniq.studio@gmail.com" className="hover:text-white transition-colors">Support</a>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-24 border-t border-white/5 mt-24 text-center">
           <p className="text-[9px] font-bold text-emerald-100/10 uppercase tracking-[0.8em]">© {new Date().getFullYear()} ZUNIQ STUDIO — WHERE IDEAS BLOSSOM.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, color = "bg-[#fcfdfa]" }: { title: string, desc: string, color?: string }) {
  return (
    <div className={`p-10 md:p-14 rounded-[3.5rem] border border-emerald-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 text-left reveal ${color}`}>
       <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-10 font-black italic">Z</div>
       <h4 className="text-2xl font-black mb-6 uppercase italic tracking-tightest">{title}</h4>
       <p className="text-slate-400 text-sm font-medium leading-relaxed italic">{desc}</p>
    </div>
  );
}
