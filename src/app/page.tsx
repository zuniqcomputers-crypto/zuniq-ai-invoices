"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
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
    <div className="min-h-screen bg-[#f5f7f0] text-slate-800 overflow-x-hidden selection:bg-emerald-100">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        .ellipse-logo { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
        .grassy-gradient { background: linear-gradient(135deg, #4ade80 0%, #16a34a 100%); }
      `}} />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] border-b border-emerald-100 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-400 blur-lg rounded-full animate-pulse opacity-30"></div>
              <div className="relative h-10 w-10 bg-white ellipse-logo shadow-sm overflow-hidden flex items-center justify-center border border-emerald-100 group-hover:rotate-12 transition-transform duration-500">
                <img src="/logo.png" alt="Z" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tighter">Zuniq <span className="text-green-600 italic">Invoices</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-green-600 transition-colors">Dashboard</Link>
            <Link href="/new" className="grassy-gradient text-white px-7 py-3 rounded-full shadow-lg hover:scale-105 transition-all">Start Free</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-[45px] md:text-[70px] leading-[0.95] font-black tracking-tightest text-slate-900 mb-8">
              Invoices that feel <br />
              <span className="bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent italic">like fresh grass.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium mb-10 max-w-lg leading-relaxed">
              Zuniq AI transforms messy job details into professional PDFs. Just talk to the assistant, blossom your business.
            </p>
            <Link href="/new" className="inline-block px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl hover:bg-green-600 transition-all duration-500 active:scale-95">
              Create My First Invoice — Free
            </Link>
          </div>
          <div className="relative flex justify-center lg:justify-end reveal">
            <div className="h-[350px] w-[350px] md:h-[450px] md:w-[450px] rounded-[60%_40%_70%_30%/50%_30%_70%_50%] grassy-gradient shadow-2xl flex items-center justify-center animate-[float_8s_ease-in-out_infinite]">
              <span className="text-9xl">🌿</span>
            </div>
          </div>
        </div>
      </header>

      {/* DESIGN STUDIO (zuniq.xyz) */}
      <section className="py-32 px-6 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-8 italic uppercase tracking-tighter">
              Zuniq <span className="text-emerald-400">Design Studio</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Need more than just invoices? We build high-end **Websites**, **Elite Logos**, **Posters**, and **Business Cards**. If you can imagine it, Zuniq can design it.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10 text-xs font-bold uppercase tracking-widest text-emerald-500/80">
               <div>✓ Website Design</div><div>✓ Brand Identity</div><div>✓ Print Posters</div><div>✓ Digital Cards</div>
            </div>
            <a href="https://zuniq.xyz" target="_blank" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-400 transition-all">Visit Portfolio →</a>
          </div>
          <div className="reveal bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center backdrop-blur-xl">
             <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-slate-700 font-black text-2xl italic italic tracking-widest">ZUNIQ.XYZ</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-emerald-950 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <span className="text-2xl font-black italic">Zuniq <span className="text-emerald-400">Studio</span></span>
            <p className="text-emerald-100/40 text-[10px] font-bold uppercase tracking-[0.4em]">Your data is never shared or sold. 100% Private.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-emerald-500">
               <a href="https://zuniq.xyz">Portfolio</a><Link href="/privacy">Privacy</Link><a href="mailto:zuniq.studio@gmail.com">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
