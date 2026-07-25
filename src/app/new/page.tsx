"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AIStudioWorkspace() {
  const [messages, setMessages] = useState([{ role: 'ai', content: "Greetings, Jawad. 🌿 Describe your job details (Price, Client, Items) and I will build your document." }]);
  const [input, setInput] = useState("");
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [invoice, setInvoice] = useState({ sender: "Jawad", client: "", items: [] as any[], currency: "$", total: 0 });
  const [isDownloading, setIsMobileDownloading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userText }]);

    // Smart Extraction Logic
    setTimeout(() => {
      let reply = "I've noted that. Anything else to add?";
      const amount = userText.match(/\d+/);
      
      if (userText.toLowerCase().includes("client")) {
        const name = userText.split(/is/i)[1]?.trim() || "Client";
        setInvoice(v => ({ ...v, client: name }));
        reply = `Updated client to ${name}. What services did you provide?`;
      } else if (amount) {
        const price = parseInt(amount[0]);
        setInvoice(v => ({ 
          ...v, 
          items: [...v.items, { desc: userText, price: price }],
          total: v.total + price 
        }));
        reply = `Added ${userText} ($${price}). The total is now $${invoice.total + price}. Ready to download?`;
      }
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    }, 600);
  };

  const downloadPDF = async () => {
    setIsMobileDownloading(true);
    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${Date.now()}.pdf`;
      a.click();
    } catch (e) {
      alert("Error generating PDF");
    } finally {
      setIsMobileDownloading(false);
    }
  };

  return (
    <div className="h-screen bg-[#f5f7f0] flex flex-col overflow-hidden text-slate-800">
      {/* HEADER */}
      <nav className="h-16 border-b border-emerald-100 bg-white flex items-center justify-between px-6 shrink-0">
        <Link href="/" className="font-black text-sm italic">ZUNIQ <span className="text-green-600">STUDIO</span></Link>
        <div className="flex gap-3">
          <button onClick={() => setIsMobilePreview(!isMobilePreview)} className="lg:hidden bg-emerald-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
            {isMobilePreview ? "Back to Chat" : "View Invoice"}
          </button>
          <button onClick={downloadPDF} disabled={isDownloading} className="bg-slate-900 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest disabled:opacity-50">
            {isDownloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </nav>

      <main className="flex flex-grow overflow-hidden">
        {/* CHAT - Always visible on desktop, hidden on mobile preview */}
        <div className={`w-full lg:w-[400px] bg-white border-r border-emerald-50 flex flex-col ${isMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
          <div ref={scrollRef} className="flex-grow p-6 space-y-4 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-green-600 text-white rounded-tr-none' : 'bg-emerald-50 text-slate-700 rounded-tl-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-emerald-50 bg-white">
            <div className="relative">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type details..." className="w-full bg-slate-50 border border-emerald-100 rounded-2xl py-4 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500/20" />
              <button onClick={handleSend} className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-xl">→</button>
            </div>
          </div>
        </div>

        {/* PREVIEW - Hidden on mobile chat, visible on desktop */}
        <div className={`flex-grow bg-[#f5f7f0] p-6 lg:p-12 overflow-y-auto ${!isMobilePreview ? 'hidden lg:block' : 'block'}`}>
          <div className="max-w-[700px] mx-auto bg-white shadow-2xl min-h-[800px] p-10 md:p-16 flex flex-col relative rounded-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-600"></div>
            <div className="flex justify-between mb-20">
               <div className="h-12 w-12 bg-emerald-50 rounded flex items-center justify-center font-bold text-green-600">Z</div>
               <div className="text-right">
                  <h1 className="text-3xl font-black tracking-tighter italic uppercase">Invoice</h1>
                  <p className="text-[10px] text-slate-400 font-bold">DRAFT #ZIQ-STUDIO</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mb-16 text-sm">
               <div><p className="text-[9px] font-black text-green-600 uppercase mb-2">From</p><p className="font-bold">{invoice.sender}</p></div>
               <div className="text-right"><p className="text-[9px] font-black text-green-600 uppercase mb-2">Bill To</p><p className="font-bold">{invoice.client || "Client Name..."}</p></div>
            </div>
            <div className="flex-grow">
               <table className="w-full text-left">
                  <thead className="border-b border-emerald-50 text-[10px] uppercase font-black text-slate-400">
                    <tr><th className="pb-4">Description</th><th className="pb-4 text-right">Price</th></tr>
                  </thead>
                  <tbody className="text-sm">
                    {invoice.items.map((it, i) => (
                      <tr key={i} className="border-b border-slate-50"><td className="py-4">{it.desc}</td><td className="py-4 text-right font-bold">${it.price}</td></tr>
                    ))}
                  </tbody>
               </table>
            </div>
            <div className="mt-10 pt-10 border-t-2 border-emerald-50 flex justify-between items-end">
               <div><p className="text-[10px] font-black text-slate-400 uppercase">Total Due</p><p className="text-5xl font-black italic">${invoice.total}</p></div>
               <div className="text-right italic text-slate-300 text-[10px]">Verified by Zuniq AI</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
