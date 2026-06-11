"use client";
import { useState, useRef, useEffect } from "react";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";

/* ────────── Professional SVG Icons ────────── */
const icons = {
  create: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  history: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  logo: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  qr: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2m4 0v2m-8-2h2m-4 0h2m8-6h-2m0 0V6m0 0H6m0 0v2m0 2h2m10 0h2m-2 0v2m-4 0h-2m0-2V6m-4 0v2m0 2h2m-2 0V6" />
      <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth={2} />
    </svg>
  ),
  smart: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  templates: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  export: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  clients: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  preview: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

export default function NewInvoice() {
  /* ──────────── States ──────────── */
  const [useSmartAI, setUseSmartAI] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoice_id: "",
    business_name: "",
    business_email: "",
    business_phone: "",
    trn_number: "",
    business_logo_url: "",
    signature_url: "",
    qr_code_data: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    client_address: "",
    items: [],
    subtotal: 0,
    tax_percentage: -1,
    discount: -1,
    total: 0,
    currency: "",
    due_date: "",
    issue_date: new Date().toISOString().split("T")[0],
    notes: ""
  });

  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your AI invoice assistant. What is your business name?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isComplete =
    !!invoiceData.business_name &&
    !!invoiceData.client_name &&
    invoiceData.items.length > 0;

  /* ──────────── Recalculate Totals ──────────── */
  useEffect(() => {
    const subtotal = invoiceData.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
    const total = subtotal + (subtotal * Math.max(0, invoiceData.tax_percentage)) / 100 - (invoiceData.discount || 0);
    setInvoiceData(prev => ({ ...prev, subtotal, total }));
  }, [invoiceData.items, invoiceData.tax_percentage, invoiceData.discount]);

  /* ──────────── Auto‑scroll Chat ──────────── */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ──────────── Send Message ──────────── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          currentData: invoiceData,
          conversationHistory: [],
          useGemini: useSmartAI
        })
      });
      const data = await res.json();
      if (data.error) {
        setMessages([...newMessages, { sender: "ai", text: "Sorry, something went wrong." }]);
      } else {
        setInvoiceData(data.updatedData);
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Network error." }]);
    }
  };

  /* ──────────── Finalize Invoice ──────────── */
  const handleFinalize = async () => {
    const res = await fetch("/api/invoice/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData)
    });
    if (res.ok) window.location.href = "/";
    else alert("Failed to save.");
  };

  /* ──────────── Field / Item Helpers ──────────── */
  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };
  const addItem = () => {
    setInvoiceData(prev => ({ ...prev, items: [...prev.items, { description: "", quantity: 1, unit_price: 0 }] }));
  };
  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };

  /* ──────────── Quick Actions Menu ──────────── */
  const quickActions = [
    { label: "Create Invoice", icon: icons.create, action: () => { window.location.href = "/new"; } },
    { label: "Invoice History", icon: icons.history, action: () => { window.location.href = "/dashboard"; } },
    { label: "Upload Logo", icon: icons.logo, action: () => document.getElementById("logoUpload")?.click() },
    { label: "QR Code", icon: icons.qr, action: () => document.getElementById("qrUpload")?.click() },
    { label: "Smart AI", icon: icons.smart, action: () => setUseSmartAI(!useSmartAI) },
    { label: "Templates", icon: icons.templates, action: () => alert("Templates coming soon! We're working on a gallery of professional invoice templates.") },
    { label: "Export PDF", icon: icons.export, action: () => { if (isComplete) handleFinalize(); else alert("Please complete the invoice before exporting."); } },
    { label: "Clients", icon: icons.clients, action: () => alert("Client database coming soon! You'll be able to save and reuse client information.") },
    { label: "Preview", icon: icons.preview, action: () => setShowPreview(true) },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ────────── Header ────────── */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg overflow-hidden ring-2 ring-indigo-400/30">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Zuniq Invoices</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
          >
            📄 Preview
          </button>
          {isComplete && (
            <button
              onClick={handleFinalize}
              className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-green-700 transition"
            >
              Finalize ✨
            </button>
          )}
        </div>
      </header>

      {/* ────────── Chat Area ────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Smart AI Selector at top of chat */}
        <div className="flex items-center gap-2 text-sm text-gray-500 border-b border-gray-100 pb-3 mb-2">
          <span className="font-medium text-gray-400">AI Mode:</span>
          <div className="relative">
            <select
              value={useSmartAI ? "smart" : "normal"}
              onChange={(e) => setUseSmartAI(e.target.value === "smart")}
              className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="normal">📋 Normal Invoice Agent</option>
              <option value="smart">✨ Smart AI</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ────────── ChatGPT‑style Input Area ────────── */}
      <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3">
        {/* Toolbar: Upload Logo, QR */}
        <div className="flex items-center gap-2 mb-2">
          <label className="cursor-pointer text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition flex items-center gap-1">
            🖼️ Logo
            <input
              id="logoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => updateField("business_logo_url", ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
          <label className="cursor-pointer text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition flex items-center gap-1">
            🔳 QR
            <input
              id="qrUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => updateField("qr_code_data", ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition"
          />
          <button
            onClick={handleSend}
            className="h-12 w-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg hover:bg-gray-800 active:scale-95 transition"
          >
            ➤
          </button>
        </div>
      </div>

      {/* ────────── Floating Quick Actions Button ────────── */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-200"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {showQuickActions && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 w-64 animate-fade-in">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => { action.action(); setShowQuickActions(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <span className="text-gray-400 group-hover:text-indigo-600 transition">{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ────────── Preview Modal ────────── */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">📄 Invoice Preview</h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <InvoicePreview data={invoiceData} />
          </div>
        </div>
      )}
    </div>
  );
}
