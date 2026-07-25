"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// --- Types ---
type Message = { role: 'ai' | 'user'; content: string };
type InvoiceData = { sender: string; client: string; items: { desc: string; price: number }[]; tax: number };

export default function AIStudioWorkspace() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Greetings, Jawad. 🌿 I'm your Zuniq Studio assistant. Tell me about the project you're billing for—who is the client and what was the service?" }
  ]);
  const [input, setInput] = useState("");
  const [showPreview, setShowPreview] = useState(false); // Mobile Toggle
  const [invoice, setInvoice] = useState<InvoiceData>({ sender: "Jawad", client: "", items: [], tax: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // --- Smart Professional AI Logic ---
  const processAI = (text: string) => {
    const lowText = text.toLowerCase();
    let reply = "";
    let updated = { ...invoice };

    // 1. Logic for Names
    if (lowText.includes("my name is") || lowText.includes("i am")) {
      const name = text.split(/is|am/i)[1]?.trim();
      updated.sender = name;
      reply = `Pleased to meet you, ${name}. I've updated the sender details. Now, what is the client's name and the total amount?`;
    } 
    // 2. Logic for Items/Price
    else if (lowText.includes("$") || lowText.includes("aed") || lowText.includes("pkr") || /\d+/.test(text)) {
      const amount = text.match(/\d+/)?.[0] || "0";
      updated.items = [...updated.items, { desc: text, price: parseInt(amount) }];
      reply = `Understood. I've added "${text}" to the line items. Should we apply any specific tax percentage or is this the final total?`;
    }
    // 3. Logic for Clients
    else if (lowText.includes("client is") || lowText.includes("for ")) {
      const client = text.split(/is|for/i)[1]?.trim();
      updated.client = client;
      reply = `Excellent, I've noted ${client} as the client. What specific services did you provide for this invoice?`;
    }
    // 4. Default Fallback
    else {
      reply = "I've noted that down. To make this invoice professional, could you please provide the specific service description and the currency you'd like to use?";
    }

    setInvoice(updated);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    processAI(userMsg);
  };

  return (
    <div className={`min-h-screen bg-[#f5f7f0] text-slate-800 ${inter.className} flex flex-col overflow-hidden`}>
      {/* 1. COMPACT NAVBAR */}
      <nav className="h-16 border-b border-emerald-100 bg-white/80 backdrop-blur-md z-50 px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-white border border-emerald-100 rounded-full shadow-sm flex items-center justify-center">
            <img src="/logo.png" alt="Z" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-black text-sm tracking-tighter uppercase italic">Zuniq <span className="text-green-600">Studio</span></span>
        </Link>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden bg-emerald-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200"
          >
            {showPreview ? "Back to Chat" : "View Invoice"}
          </button>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-md">
            Save
          </button>
        </div>
      </nav>

      {/* 2. STUDIO WORKSPACE */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-64px)] relative">
        
        {/* LEFT: THE CHAT INTERFACE (Primary on Mobile) */}
        <div className={`w-full lg:w-[450px] flex flex-col bg-white border-r border-emerald-50 z-20 ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-emerald-50 bg-[#fcfdfa] flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-800/60">Professional Assistant</h2>
             </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-tr-none font-medium' 
                    : 'bg-emerald-50/50 text-slate-700 rounded-tl-none border border-emerald-100/50'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Input */}
          <div className="p-4 bg-white border-t border-emerald-50">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your job details..."
                className="w-full bg-[#f8faf5] border border-emerald-100 rounded-2xl py-4 px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
              <button onClick={handleSend} className="absolute right-2 p-3 bg-slate-900 text-white rounded-xl hover:bg-green-600 active:scale-90 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: THE INVOICE PREVIEW (Hidden on Mobile unless toggled) */}
        <div className={`flex-grow bg-[#f5f7f0] p-4 md:p-12 overflow-y-auto flex flex-col items-center ${showPreview ? 'flex' : 'hidden lg:flex'}`}>
          <div className="w-full max-w-[700px] flex justify-between items-center mb-6">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800/30 italic">Linen Paper Preview</span>
             <button className="bg-white border border-emerald-200 text-slate-500 px-6 py-2 rounded-full text-[10px] font-black uppercase hover:bg-white transition-all shadow-sm">PDF Settings</button>
          </div>

          <div className="w-full max-w-[700px] bg-white rounded-sm shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] min-h-[900px] p-8 md:p-16 flex flex-col relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-600"></div>

            <div className="flex justify-between items-start mb-20">
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                 <img src="/logo.png" alt="Logo" className="w-8 h-8 opacity-40 grayscale" />
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-[900] tracking-tighter text-slate-900 uppercase italic">Invoice</h1>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">No. ZIQ-{Math.floor(Math.random()*9000)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-20">
               <div>
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">From</p>
                  <p className="text-sm font-bold text-slate-900">{invoice.sender || "Jawad Studio"}</p>
                  <p className="text-xs text-slate-400">Freelance Designer</p>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">Bill To</p>
                  <p className="text-sm font-bold text-slate-900">{invoice.client || "Client Name Pending"}</p>
                  <p className="text-xs text-slate-400 italic">Address details in chat...</p>
               </div>
            </div>

            <div className="flex-grow">
               <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-4 text-[10px] font-black uppercase text-slate-400">Description</th>
                      <th className="py-4 text-[10px] font-black uppercase text-slate-400 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {invoice.items.length === 0 ? (
                      <tr>
                        <td className="py-10 text-xs text-slate-300 italic">Waiting for service details...</td>
                        <td className="py-10 text-xs text-slate-200 text-right">$0.00</td>
                      </tr>
                    ) : (
                      invoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-5 text-sm font-medium text-slate-700">{item.desc}</td>
                          <td className="py-5 text-sm font-bold text-slate-900 text-right">${item.price.toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
               </table>
            </div>

            <div className="mt-10 pt-10 border-t border-emerald-50 flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount Due</p>
                <p className="text-5xl font-[1000] text-slate-900 tracking-tightest italic">
                  ${invoice.items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                 <div className="w-32 h-10 border-b-2 border-emerald-100 ml-auto mb-2 italic text-[10px] text-slate-300 flex items-end justify-center">Digital Signature</div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verified by Zuniq AI</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
