"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function AIStudioWorkspace() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Welcome to the Studio, Jawad. 🌿 I'm ready to craft your invoice. Tell me what we're billing for?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput("");
    // Simulate AI response for UI feel
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Got it. I've updated the draft with those details. Does the preview look correct?" }]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-[#f5f7f0] text-slate-800 ${inter.className} flex flex-col overflow-hidden`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-soft { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .glass-panel { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px); }
        .paper-shadow { shadow: 0 20px 50px -10px rgba(22, 163, 74, 0.1); }
        .ellipse-logo { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
      `}} />

      {/* 1. STUDIO NAVBAR */}
      <nav className="h-20 border-b border-emerald-100 bg-white/70 backdrop-blur-md z-50 px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-400 blur-md rounded-full animate-pulse opacity-30"></div>
            <div className="relative h-8 w-8 bg-white ellipse-logo shadow-sm flex items-center justify-center border border-emerald-100 group-hover:rotate-6 transition-transform">
              <img src="/logo.png" alt="Zuniq" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <span className="text-xl font-[800] tracking-tighter">Zuniq <span className="text-green-600 italic">Studio</span></span>
        </Link>
        
        {/* Progress Tracker */}
        <div className="hidden md:flex items-center gap-4 bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100">
           <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Invoice Growth</span>
           <div className="w-32 h-1.5 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-600 w-[65%] rounded-full transition-all duration-1000"></div>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-xs font-bold text-slate-400 hover:text-green-600 transition-colors uppercase tracking-widest">Clear</button>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95">Save Draft</button>
        </div>
      </nav>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        
        {/* LEFT: AI CHAT ASSISTANT (The Mind) */}
        <div className="w-full lg:w-[450px] flex flex-col bg-white border-r border-emerald-50 relative z-20">
          <div className="p-6 border-b border-emerald-50 bg-[#fcfdfa]/80 flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800/60">Zuniq Intelligence Active</h2>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-8 bg-gradient-to-b from-white to-[#f5f7f0]/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-tr-none font-medium' 
                    : 'bg-emerald-50 text-slate-700 rounded-tl-none border border-emerald-100/50 italic'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Input Bar */}
          <div className="p-6 bg-white">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message your assistant..."
                className="w-full bg-[#f5f7f0] border-2 border-transparent focus:border-emerald-200 rounded-[1.5rem] py-5 px-8 pr-16 focus:outline-none transition-all text-sm placeholder:text-slate-400 font-medium"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-slate-900 text-white rounded-2xl hover:bg-green-600 transition-all shadow-md active:scale-90"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            <p className="mt-4 text-[9px] text-center text-slate-300 font-bold uppercase tracking-widest">Crafted with precision by Zuniq AI</p>
          </div>
        </div>

        {/* RIGHT: LIVE PAPER PREVIEW (The Craft) */}
        <div className="flex-grow bg-[#f5f7f0] p-6 md:p-12 overflow-y-auto flex flex-col items-center custom-scrollbar">
          <div className="w-full max-w-[750px] flex justify-between items-center mb-8">
             <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-800/30">Document View</span>
             </div>
             <div className="flex gap-4">
                <button className="bg-white border border-emerald-100 text-slate-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all">Templates</button>
                <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Download PDF</button>
             </div>
          </div>

          {/* THE LUXURY INVOICE SHEET */}
          <div className="w-full max-w-[750px] bg-white rounded-[1rem] shadow-[0_40px_80px_-20px_rgba(22,163,74,0.12)] border border-emerald-50 min-h-[1000px] p-12 md:p-24 flex flex-col relative overflow-hidden">
            
            {/* Top Emerald Detail */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600"></div>

            <div className="flex justify-between items-start mb-24">
              <div className="space-y-6">
                <div className="h-16 w-16 bg-emerald-50 rounded-3xl flex items-center justify-center border border-emerald-100">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10 opacity-80" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-sm font-bold text-slate-900">Your Business Name</h3>
                   <p className="text-xs text-slate-400 italic">Registration / Tax ID Pending</p>
                </div>
              </div>
              
              <div className="text-right">
                <h1 className="text-5xl font-[900] tracking-tighter text-slate-900 uppercase italic mb-4">Invoice</h1>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">Draft #ZIQ-8842</p>
                  <p className="text-[10px] font-bold text-slate-400 block mt-2">Issued: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-grow">
               <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-emerald-50">
                      <th className="py-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Description of Service</th>
                      <th className="py-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="py-12 text-sm font-medium text-slate-400 italic">Mention your tasks in the chat to populate this area...</td>
                      <td className="py-12 text-xl font-[900] text-slate-200 text-right tracking-tighter italic">$0.00</td>
                    </tr>
                  </tbody>
               </table>
            </div>

            {/* Total Balance Area */}
            <div className="mt-20 pt-12 border-t-4 border-emerald-50 flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Total Outstanding</p>
                <p className="text-6xl font-[1000] text-slate-900 tracking-tightest italic">$0.00</p>
              </div>
              <div className="text-right space-y-6">
                 <div className="h-12 w-48 bg-emerald-950/5 border border-emerald-900/10 rounded-2xl flex items-center justify-center text-emerald-900/40 text-[10px] font-black uppercase tracking-[0.3em] italic">
                   Signature Required
                 </div>
                 <p className="text-[10px] font-bold text-slate-400">Thank you for choosing Zuniq Studio.</p>
              </div>
            </div>

            {/* Bottom Graphic Detail */}
            <div className="absolute bottom-8 left-12">
               <div className="flex gap-2">
                  <div className="w-1 h-1 bg-emerald-200 rounded-full"></div>
                  <div className="w-8 h-1 bg-emerald-100 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
