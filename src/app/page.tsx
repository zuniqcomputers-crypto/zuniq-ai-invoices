"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Inline Icons ---
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.1 9.2A7 7 0 0 1 11 20z" /><path d="M11 20v-5" /><path d="M11 15l-3-3" /><path d="M11 15l3-3" /></svg>
);

export default function InvoiceCreator() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello Jawad! 🌿 I'm your Zuniq assistant. Tell me what you're billing for today (e.g., '3 logos for $200 each')." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput("");
    // Here you would normally call your /api/chat
  };

  return (
    <div className="min-h-screen bg-[#f5f7f0] text-slate-800 font-sans flex flex-col">
      {/* 1. FRESH NAVBAR */}
      <nav className="h-16 border-b border-emerald-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white font-bold italic shadow-sm">Z</div>
          <span className="font-bold text-lg tracking-tight">Zuniq <span className="text-green-600">Studio</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-green-600 transition-colors">Dashboard</Link>
          <button className="bg-emerald-50 text-green-700 px-4 py-2 rounded-full text-xs font-bold border border-emerald-100 hover:bg-emerald-100 transition-all">Save Draft</button>
        </div>
      </nav>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* LEFT: AI CHAT (Light & Grassy) */}
        <div className="w-full lg:w-[450px] flex flex-col border-r border-emerald-50 bg-white shadow-sm z-10">
          <div className="p-4 border-b border-emerald-50 flex items-center gap-3 bg-emerald-50/30">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700">Zuniq AI Billing Agent</span>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-[#fcfdfa]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-tr-none' 
                    : 'bg-emerald-50 text-slate-700 rounded-tl-none border border-emerald-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-emerald-50">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to Zuniq..."
                className="w-full bg-slate-50 border border-emerald-100 rounded-2xl py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 p-3 bg-gradient-to-r from-emerald-400 to-green-600 text-white rounded-xl hover:shadow-lg transition-all active:scale-90"
              >
                <SendIcon />
              </button>
            </div>
            <p className="mt-3 text-[10px] text-center text-slate-400 font-medium">Zuniq AI creates your invoice as you chat. 🌿</p>
          </div>
        </div>

        {/* RIGHT: LIVE PREVIEW (The "Bespoke" Document) */}
        <div className="flex-grow bg-[#f5f7f0] p-4 md:p-12 overflow-y-auto flex flex-col items-center">
          <div className="w-full max-w-[700px] mb-8 flex justify-between items-center">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-800/40 italic">Live Document Preview</h2>
            <button className="bg-white text-slate-800 px-6 py-2.5 rounded-full text-xs font-bold shadow-sm border border-emerald-100 hover:shadow-md transition-all active:scale-95">Download PDF</button>
          </div>

          {/* THE INVOICE SHEET */}
          <div className="w-full max-w-[700px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(22,163,74,0.05)] border border-emerald-50 min-h-[900px] p-10 md:p-20 flex flex-col">
            <div className="flex justify-between items-start mb-20">
              <div className="space-y-4">
                <div className="h-14 w-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-green-600">
                  <LeafIcon />
                </div>
                <div className="h-2 w-32 bg-slate-100 rounded-full"></div>
                <div className="h-2 w-24 bg-slate-50 rounded-full"></div>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 uppercase italic mb-2">Invoice</h1>
                <p className="text-[10px] font-black text-green-600 tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full inline-block">Draft #ZIQ-001</p>
              </div>
            </div>

            <div className="flex-grow">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-50">
                      <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                      <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="py-8 text-sm font-bold text-slate-700 italic">Start chatting to add items...</td>
                      <td className="py-8 text-sm font-bold text-slate-300 text-right">$0.00</td>
                    </tr>
                  </tbody>
               </table>
            </div>

            <div className="mt-20 pt-10 border-t-2 border-emerald-50 flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Balance</p>
                <p className="text-5xl font-black text-slate-900 tracking-tightest italic">$0.00</p>
              </div>
              <div className="text-right space-y-4">
                 <div className="h-2 w-32 bg-slate-50 rounded-full ml-auto"></div>
                 <div className="h-10 w-40 bg-emerald-950 rounded-2xl flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest italic">Official Zuniq Seal</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
