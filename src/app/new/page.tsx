"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MasterLandingPage() {
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
    <div className="min-h-screen bg-[#f5f7f0] text-slate-900 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes drift { 0% { transform: translate(0,0); } 50% { transform: translate(30px, 20px); } 100% { transform: translate(0,0); } }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        .grassy-text { background: linear-gradient(135deg, #4ade80 0%, #15803d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass-card { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(16, 185, 129, 0.1); }
        .ellipse-logo { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
        .mesh-gradient { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); z-index: -1; opacity: 0.4; animation: drift 15s infinite ease-in-out; }
      `}} />

      {/* 1. ELITE NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] border-b border-emerald-100 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-400 blur-lg rounded-full animate-pulse opacity-20"></div>
              <div className="relative h-10 w-10 bg-white ellipse-logo shadow-sm flex items-center justify-center border border-emerald-100 group-hover:rotate-12 transition-transform duration-500">
                <img src="/logo.png" alt="Z" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tightest">Zuniq <span className="text-green-600 italic">Studio</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <Link href="/" className="hover:text-green-600 transition-colors">Dashboard</Link>
            <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
            <Link href="/new" className="bg-slate-900 text-white px-8 py-3 rounded-full shadow-xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95">Start Free</Link>
          </div>
          <Link href="/new" className="md:hidden bg-green-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase">New</Link>
        </div>
      </nav>

      {/* 2. HERO SECTION WITH MESH GRADIENTS */}
      <header className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6">
        <div className="mesh-gradient bg-emerald-200 top-[-10%] right-[-10%]"></div>
        <div className="mesh-gradient bg-green-100 bottom-0 left-[-5%]" style={{animationDelay: '-5s'}}></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 text-green-800 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              The Future of Billing is Here
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[85px] leading-[0.9] font-black tracking-tightest text-slate-900 mb-10">
              Invoices that feel <br />
              <span className="grassy-text italic underline decoration-emerald-200 underline-offset-8">like fresh grass.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-lg leading-relaxed">
              Experience the world's most peaceful billing tool. Talk to Zuniq AI, describe your work, and watch a professional PDF blossom in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link href="/new" className="w-full sm:w-auto text-center px-12 py-6 bg-slate-900 text-white rounded-full font-black text-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:bg-green-600 transition-all duration-500 hover:-translate-y-1 active:scale-95">
                Create Free Invoice
              </Link>
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">100% Free Forever</span>
                <span className="text-slate-300 text-[10px] font-medium uppercase tracking-widest">No Card / No Signup</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end reveal">
            <div className="absolute -inset-4 bg-emerald-400 blur-3xl opacity-20 rounded-full"></div>
            <div className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-[60%_40%_70%_30%/50%_30%_70%_50%] bg-gradient-to-br from-emerald-400 to-green-700 shadow-2xl flex items-center justify-center animate-[float_10s_ease-in-out_infinite]">
              <span className="text-[120px] md:text-[220px] drop-shadow-2xl">🌿</span>
              {/* Floating Stat Card */}
              <div className="absolute top-10 left-0 bg-white/60 backdrop-blur-xl p-4 md:p-6 rounded-3xl border border-white/40 shadow-2xl reveal translate-x-[-20%]">
                 <p className="text-[10px] font-black uppercase text-emerald-800 opacity-50">Saved Time</p>
                 <p className="text-2xl md:text-4xl font-black grassy-text tracking-tighter">8.5 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. SOCIAL PROOF (BRANDS) */}
      <section className="py-20 bg-white border-y border-emerald-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-12 italic">Empowering Global Creators</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <span className="text-2xl md:text-3xl font-black tracking-tighter italic">UPWORK</span>
             <span className="text-2xl md:text-3xl font-black tracking-tighter italic">FIVERR</span>
             <span className="text-2xl md:text-3xl font-black tracking-tighter italic">LINKEDIN</span>
             <span className="text-2xl md:text-3xl font-black tracking-tighter italic">TOPTAL</span>
          </div>
        </div>
      </section>

      {/* 4. DESIGN STUDIO SECTION (zuniq.xyz) - THE ELITE UPGRADE */}
      <section className="py-32 md:py-48 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="mesh-gradient bg-emerald-600 top-1/4 left-0 opacity-20 blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <div className="h-1.5 w-20 bg-emerald-500 mb-10 rounded-full"></div>
            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tightest uppercase italic">
              Beyond <br /> <span className="text-emerald-400">The Invoice.</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium italic">
              Zuniq isn't just a tool; it's a creative house. From pixel-perfect **Websites** and **Elite Branding** to custom **Poster Design** and **Business Cards**. If it's beautiful, we build it.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-16 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/40">
               <div className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> High-End Websites</div>
               <div className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Logo Identity</div>
               <div className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Social Content</div>
               <div className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Print & Posters</div>
            </div>
            <a href="https://zuniq.xyz" target="_blank" className="group inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all duration-500 active:scale-95">
              Visit Zuniq Studio <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>
          
          <div className="relative group reveal">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 backdrop-blur-3xl hover:border-emerald-500/40 transition-all duration-700 flex flex-col items-center">
               <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500 mb-16">Portfolio Showcase</h3>
               <div className="w-full aspect-video bg-slate-900 rounded-3xl border border-white/5 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-slate-700 font-black italic tracking-tightest text-3xl md:text-5xl">ZUNIQ.XYZ</span>
               </div>
               <p className="mt-12 text-slate-500 text-xs font-bold uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">Built for the next generation of designers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENTO FEATURE GRID */}
      <section id="features" className="py-32 md:py-48 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-32">
            <h2 className="text-[10px] font-black text-green-600 uppercase tracking-[0.5em] mb-6 italic">Engineering Peace</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tightest uppercase italic">Rooted in Tech, <br /> Blooming with Ease.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard color="bg-emerald-50" title="Natural NLU" desc="Our Gemini-powered brain understands your conversational English perfectly. No forms required." />
            <FeatureCard color="bg-blue-50" title="Global Soil" desc="Bill in 150+ currencies. USD, AED, PKR—we format everything to your local client standards." />
            <FeatureCard color="bg-green-50" title="Vector Sharp" desc="High-resolution PDF generation. Crisp logos and clean lines that look perfect when printed." />
            <FeatureCard color="bg-slate-900 text-white" title="PWA Protocol" desc="Install Zuniq on your mobile device. Offline-ready for when you're working at a coffee shop." />
            <FeatureCard color="bg-purple-50" title="Secure Roots" desc="End-to-end encryption for your invoice data. We never sell your client lists. Your data is your property." />
            <FeatureCard color="bg-orange-50" title="Instant Sync" desc="Saved to your browser session. Come back anytime to re-download or delete old invoices." />
          </div>
        </div>
      </section>

      {/* 6. HOW IT GROWS (WORKFLOW) */}
      <section className="py-32 px-6 bg-[#f5f7f0]/50 border-t border-emerald-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-24 tracking-tighter uppercase italic italic">Simple. Organic. Effective.</h2>
          <div className="grid md:grid-cols-3 gap-16 relative">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 -z-10 hidden md:block"></div>
             <Step num="01" title="Chat" desc="Tell the AI what you did. 'I built a logo for Ali for $250'." />
             <Step num="02" title="Blossom" desc="The AI extracts items and taxes to build your professional draft." />
             <Step num="03" title="Harvest" desc="Download your polished PDF and get paid by your client instantly." />
          </div>
        </div>
      </section>

      {/* 7. PRICING & FAQ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#f5f7f0] rounded-[3rem] p-12 md:p-20 border border-emerald-100 shadow-2xl reveal">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-4 py-1.5 rounded-full">Fairness First</span>
            <div className="text-7xl md:text-[100px] font-black text-slate-900 my-10 tracking-tightest italic">$0</div>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest text-sm leading-relaxed">
              Unlimited AI Invoices <br /> No Hidden Subscriptions <br /> Free for Every Freelancer
            </p>
            <Link href="/new" className="block w-full py-6 bg-gradient-to-r from-emerald-500 to-green-700 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] transition-transform active:scale-95">
              Start Your Harvest Now
            </Link>
          </div>

          <div className="mt-40 space-y-4 text-left">
            <h3 className="text-center text-4xl font-black mb-20 italic italic uppercase tracking-tighter">Common Ground</h3>
            <Accordion q="Is it really free for everyone?" a="Yes. Zuniq AI is built on our philosophy that basic productivity tools should be a human right for creators. We sustain this through our Design Studio services." />
            <Accordion q="Can I use my own studio logo?" a="Absolutely. Upload your logo in the chat or workspace, and it will be embedded into the vector PDF output with professional alignment." />
            <Accordion q="Is the AI smart enough for taxes?" a="Yes. You can mention tax percentages (e.g. 5% VAT) or discounts, and the AI automatically calculates the math to ensure zero human error." />
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-emerald-950 py-24 md:py-32 px-6 text-white text-center relative overflow-hidden">
        <div className="mesh-gradient bg-emerald-400 bottom-[-20%] left-[-10%] opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-10 mb-20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-white ellipse-logo flex items-center justify-center text-emerald-950 font-black italic text-xl">Z</div>
              <span className="text-3xl font-black uppercase italic tracking-tighter">Zuniq <span className="text-emerald-400">Studio</span></span>
            </div>
            <p className="text-emerald-100/30 text-[10px] font-bold uppercase tracking-[0.5em] max-w-md leading-relaxed">
              Your privacy is our soil. We never share, sell, or monitor your private business data. 100% Session-Scoped.
            </p>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
               <a href="https://zuniq.xyz" target="_blank" className="hover:text-white transition-colors">Design Studio</a>
               <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <a href="mailto:zuniq.studio@gmail.com" className="hover:text-white transition-colors">Studio Support</a>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 text-[10px] font-bold text-emerald-100/10 uppercase tracking-[0.6em]">
             © {new Date().getFullYear()} ZUNIQ STUDIO — WHERE IDEAS BLOSSOM.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
function FeatureCard({ title, desc, color }: { title: string, desc: string, color: string }) {
  return (
    <div className={`p-10 md:p-12 rounded-[3rem] border border-emerald-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left reveal glass-card ${color}`}>
      <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-10 font-black italic">Z</div>
      <h4 className="text-2xl font-black mb-6 uppercase italic tracking-tightest">{title}</h4>
      <p className="opacity-70 text-sm font-medium leading-relaxed italic">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center reveal">
      <div className="h-16 w-16 bg-white border border-emerald-100 rounded-full flex items-center justify-center text-green-600 font-black text-xl italic shadow-xl mb-10 z-10">{num}</div>
      <h4 className="text-xl font-black mb-4 uppercase italic tracking-tighter">{title}</h4>
      <p className="text-slate-400 text-sm font-medium italic max-w-[200px]">{desc}</p>
    </div>
  );
}

function Accordion({ q, a }: { q: string, a: string }) {
  return (
    <details className="group p-8 md:p-10 bg-white border border-emerald-100 rounded-[2.5rem] reveal shadow-sm hover:shadow-md transition-all">
      <summary className="font-black text-base md:text-lg list-none cursor-pointer flex justify-between items-center uppercase italic tracking-tighter">
        {q}
        <span className="text-emerald-500 text-2xl group-open:rotate-45 transition-transform">+</span>
      </summary>
      <p className="mt-8 text-slate-500 leading-relaxed font-medium italic text-sm md:text-base border-t border-emerald-50 pt-8">{a}</p>
    </details>
  );
}
