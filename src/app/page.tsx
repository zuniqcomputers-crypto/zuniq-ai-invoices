"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NewInvoicePage() {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: "Hello! 🌿 I'm Zuniq AI. Tell me what you want to bill for today. For example: 'I designed a logo for Ali for $250 with a 5% tax.'" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Call your AI backend
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, currentData: {}, conversationHistory: messages })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Got it! Updating your preview live... 🌿" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f0] text-slate-800 font-sans flex flex-col">
      <Navbar />

      {/* WORKSPACE GRID */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden p-4 md:p-6 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* LEFT PANEL: LIGHT CHAT ASSISTANT */}
        <div className="w-full lg:w-[420px] bg-white rounded-[2.5rem] border border-emerald-100 shadow-xl shadow-emerald-900/5 flex flex-col overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-5 border-b border-emerald-50 bg-emerald-50/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                AI Billing Assistant
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600/60 uppercase bg-white px-2.5 py-1 rounded-full border border-emerald-100">
              Active
            </span>
          </div>

          {/* Message Thread */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-white via-emerald-50/10 to-[#f9fbf7]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-tr-none shadow-md shadow-emerald-600/10 font-medium'
                    : 'bg-white border border-emerald-100 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-2xl rounded-tl-none text-xs font-bold animate-pulse flex items-center gap-2">
                  <span>🌿 Zuniq is building...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-emerald-50">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your job or items..."
                className="w-full bg-[#f8faf5] border border-emerald-100 rounded-full py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm text-slate-800 placeholder:text-slate-400 font-medium transition-all"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="absolute right-2 p-3 bg-gradient-to-r from-emerald-400 to-green-600 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            <p className="mt-2 text-[10px] text-center text-slate-400 font-medium">
              Zero forms. Just chat naturally to update the document.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: REAL-TIME PAPER PREVIEW (Light & High-End) */}
        <div className="flex-grow bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-emerald-100/80 p-6 md:p-10 overflow-y-auto flex flex-col items-center shadow-xl shadow-emerald-900/5 relative">
          
          {/* Top Preview Action Bar */}
          <div className="w-full max-w-[700px] mb-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-800/60">
                Live Document
              </span>
            </div>
            <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all">
              Download PDF 📄
            </button>
          </div>

          {/* THE PAPER SHEET */}
          <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100 min-h-[850px] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
            
            {/* Soft decorative green accent bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-green-600"></div>

            <div>
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-16">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-green-600 font-black text-xl italic shadow-sm">
                    Z
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Your Business Name</h3>
                    <p className="text-xs text-slate-400">your@email.com</p>
                  </div>
                </div>

                <div className="text-right">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase italic">
                    INVOICE
                  </h1>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider inline-block mt-1">
                    DRAFT #001
                  </span>
                </div>
              </div>

              {/* Items Table Placeholder */}
              <div className="border-t border-slate-100 pt-8 mb-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                      <th className="pb-3">Description</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-6 text-sm text-slate-500 font-medium italic">
                        Tell the AI assistant what services you provided...
                      </td>
                      <td className="py-6 text-sm font-bold text-slate-300 text-right">
                        $0.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoice Footer Total */}
            <div className="border-t-2 border-emerald-50 pt-8 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Total Balance
                </span>
                <span className="text-4xl font-black text-slate-900 tracking-tight italic">
                  $0.00
                </span>
              </div>

              <div className="text-right space-y-2">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 inline-block">
                  Ready to Export
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
