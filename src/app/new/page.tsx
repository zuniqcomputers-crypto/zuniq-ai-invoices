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
  const [showInfo, setShowInfo] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isComplete = !!invoiceData.business_name && !!invoiceData.client_name && invoiceData.items.length > 0;

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async (msg?: string) => {
    const text = msg || input.trim();
    if (!text) return;
    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, currentData: invoiceData, conversationHistory: [] }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages([...newMessages, { sender: "ai", text: "Sorry, something went wrong. Please try again." }]);
      } else {
        setInvoiceData(data.updatedData);
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Network error. Please check your connection." }]);
    }
  };

  const handleFinalize = async () => {
    const res = await fetch("/api/invoice/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Failed to save.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Info Modal (fancy) */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowInfo(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">About Zuniq AI Invoices</h2>
              <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 Our Story</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                One day, my younger brother told me his biggest headache: invoices. He was paying for tools and still wasting time.
                I'm a problem solver – I love tackling complex challenges. That moment, Zuniq AI Invoices sparked in my mind.
                My brother works in Dubai, and from that day I built this app. Now, it saves you time and money, just like I hoped.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 How to Use</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>💬 Chat naturally – answer the AI's questions one by one.</li>
                <li>📄 Tap <span className="bg-indigo-100 px-2 py-0.5 rounded-full text-indigo-700 font-medium">Preview</span> to see your invoice in real‑time.</li>
                <li>📥 Finalize to save and download a professional PDF.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-5 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">⚡</div>
          <h1 className="text-xl font-bold text-gray-800">AI Invoice Assistant</h1>
        </div>
        <button onClick={() => setShowInfo(true)} className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition">
          ℹ️
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
                : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="px-4 py-3 bg-white/80 backdrop-blur-md border-t border-gray-200 flex items-center gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your answer..."
          className="flex-1 h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
        />
        <button onClick={() => handleSend()} className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg active:scale-95 transition">
          ➤
        </button>
        {isComplete && (
          <button onClick={handleFinalize} className="h-12 px-5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg active:scale-95 transition text-sm">
            Finalize
          </button>
        )}
      </div>

      {/* Floating Preview Button + Drawer */}
      {!showPreview && (
        <button
          onClick={() => setShowPreview(true)}
          className="fixed bottom-24 right-5 h-14 w-14 rounded-full bg-white shadow-2xl border border-gray-200 flex items-center justify-center text-blue-600 z-40 animate-bounce-gentle md:hidden"
        >
          📄
        </button>
      )}
      {showPreview && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto md:hidden animate-slide-up">
          <div className="sticky top-0 bg-white pt-4 pb-2 px-6 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">📄 Live Preview</h2>
            <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>
          <div className="p-4">
            <InvoicePreview data={invoiceData} />
            {isComplete && (
              <button onClick={handleFinalize} className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg">
                Save & Finalize Invoice
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Preview (unchanged) */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-1/2 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📄 Live Preview</h2>
        <InvoicePreview data={invoiceData} />
        {isComplete && (
          <button onClick={handleFinalize} className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg">
            Save & Finalize Invoice
          </button>
        )}
      </div>
    </div>
  );
}
