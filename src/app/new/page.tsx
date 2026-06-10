"use client";
import { useState, useRef, useEffect } from "react";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";

export default function NewInvoice() {
  /* ──────────── States ──────────── */
  const [useSmartAI, setUseSmartAI] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    { label: "Create Invoice", icon: "📄", href: "/new" },
    { label: "Invoice History", icon: "📊", href: "/dashboard" },
    { label: "Upload Logo", icon: "🖼️", action: () => document.getElementById("logoUpload")?.click() },
    { label: "QR Code", icon: "🔳", action: () => document.getElementById("qrUpload")?.click() },
    { label: "Smart AI", icon: useSmartAI ? "✨" : "💡", action: () => setUseSmartAI(!useSmartAI) },
    { label: "Templates", icon: "📋", href: "#" },
    { label: "Export PDF", icon: "📥", action: () => alert("Finish the invoice first") },
    { label: "Clients", icon: "👥", href: "#" },
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
        {/* Toolbar: Upload Logo, QR, and Smart AI selector (also present in chat area) */}
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
          className="h-14 w-14 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center hover:scale-105 transition"
        >
          <span className="text-2xl">+</span>
        </button>

        {showQuickActions && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 w-56 animate-fade-in">
            {quickActions.map((action, idx) => (
              action.href ? (
                <a
                  key={idx}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <span className="text-lg">{action.icon}</span> {action.label}
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <span className="text-lg">{action.icon}</span> {action.label}
                </button>
              )
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

      {/* Hidden file inputs for Quick Actions */}
      <input
        id="logoUploadHidden"
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
      <input
        id="qrUploadHidden"
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
    </div>
  );
}
