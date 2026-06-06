"use client";
import { useState, useRef, useEffect } from "react";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";

export default function NewInvoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoice_id: "", business_name: "", business_email: "", client_name: "", client_email: "",
    client_address: "", items: [], subtotal: 0, tax_percentage: 0, discount: 0, total: 0,
    currency: "USD", due_date: "", issue_date: new Date().toISOString().split("T")[0], notes: ""
  });
  const [messages, setMessages] = useState([{ sender: "ai", text: "Hello! Let's create your invoice. What is your business name?" }]);
  const [input, setInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isComplete = !!invoiceData.business_name && !!invoiceData.client_name && invoiceData.items.length > 0;
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, currentData: invoiceData, conversationHistory: [] }) });
      const data = await res.json();
      if (data.error) setMessages([...newMessages, { sender: "ai", text: "Sorry, something went wrong." }]);
      else { setInvoiceData(data.updatedData); setMessages([...newMessages, { sender: "ai", text: data.reply }]); }
    } catch (err) { setMessages([...newMessages, { sender: "ai", text: "Network error." }]); }
  };

  const handleFinalize = async () => {
    const res = await fetch("/api/invoice/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(invoiceData) });
    if (res.ok) window.location.href = "/";
    else alert("Failed to save.");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Dark Premium Header */}
      <header className="px-5 py-3 bg-gray-900 text-white flex items-center justify-between shadow-2xl z-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg overflow-hidden ring-2 ring-indigo-400/50">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">Zuniq Invoices</h1>
        </div>
        <div className="text-xs px-3 py-1 bg-indigo-600/30 rounded-full text-indigo-200 font-medium">
          AI Assistant
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-md"
                : "bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Glassmorphism Input Bar */}
      <div className="px-4 py-3 bg-white/80 backdrop-blur-lg border-t border-gray-200 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your answer..."
          className="flex-1 h-12 px-4 rounded-xl border-0 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition"
        />
        <button onClick={handleSend} className="h-12 w-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg hover:bg-gray-800 active:scale-95 transition">
          ➤
        </button>
        {isComplete && (
          <button onClick={handleFinalize} className="h-12 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg active:scale-95 transition text-sm">
            Finalize ✨
          </button>
        )}
      </div>

      {/* Floating Preview Button (Mobile) */}
      {!showPreview && (
        <button onClick={() => setShowPreview(true)} className="md:hidden fixed bottom-24 right-5 h-14 w-14 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center animate-bounce-gentle z-40">
          <span className="text-xl">📄</span>
        </button>
      )}

      {/* Mobile Preview Sheet */}
      {showPreview && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
          <div className="sticky top-0 bg-white pt-4 pb-2 px-6 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">📄 Invoice Preview</h2>
            <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>
          <div className="p-4">
            <InvoicePreview data={invoiceData} />
            {isComplete && (
              <button onClick={handleFinalize} className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg">
                Save & Finalize Invoice
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Preview (always visible) */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-1/2 bg-white border-l border-gray-200 p-6 overflow-y-auto shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">📄 Live Preview</h2>
        <InvoicePreview data={invoiceData} />
        {isComplete && (
          <button onClick={handleFinalize} className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg">
            Save & Finalize Invoice
          </button>
        )}
      </div>
    </div>
  );
}
