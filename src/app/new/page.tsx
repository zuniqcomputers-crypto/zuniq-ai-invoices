"use client";
import { useState, useRef, useEffect } from "react";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";
import Link from "next/link";

/* ────────── Refined SVG Icons (small, line‑style) ────────── */
const icons = {
  create: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  history: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  logo: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  qr: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2m4 0v2m-8-2h2m-4 0h2m8-6h-2m0 0V6m0 0H6m0 0v2m0 2h2m10 0h2m-2 0v2m-4 0h-2m0-2V6m-4 0v2m0 2h2m-2 0V6" />
      <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth={2} />
    </svg>
  ),
  smart: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  smartOn: (
    <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  templates: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  export: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  clients: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  preview: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

/* ────────── Templates Data ────────── */
const templates = [
  {
    name: "Freelance Design",
    description: "Logo design, 2 items, tax 5%",
    data: {
      business_name: "Design Studio",
      business_email: "hello@designstudio.com",
      client_name: "Client Co.",
      client_email: "client@example.com",
      currency: "USD",
      items: [
        { description: "Logo design", quantity: 1, unit_price: 500 },
        { description: "Brand guidelines", quantity: 1, unit_price: 300 },
      ],
      tax_percentage: 5,
      discount: 0,
      notes: "Thank you for your business!",
    },
  },
  {
    name: "Consulting",
    description: "Strategy session, 1 item, no tax",
    data: {
      business_name: "Zuniq Consulting",
      business_email: "info@zuniqconsulting.com",
      client_name: "Acme Corp",
      client_email: "acme@example.com",
      currency: "AED",
      items: [{ description: "Strategy session (2 hours)", quantity: 2, unit_price: 750 }],
      tax_percentage: 0,
      discount: 0,
      notes: "Payment due within 15 days.",
    },
  },
  {
    name: "Agency",
    description: "Multiple items, tax 5%, discount 50",
    data: {
      business_name: "Creative Agency",
      business_email: "team@creativeagency.com",
      client_name: "Global Brand",
      client_email: "brand@example.com",
      currency: "EUR",
      items: [
        { description: "Social media graphics", quantity: 5, unit_price: 120 },
        { description: "Website banners", quantity: 3, unit_price: 200 },
      ],
      tax_percentage: 5,
      discount: 50,
      notes: "Revision included.",
    },
  },
  {
    name: "Product Sale",
    description: "Physical goods, 3 items, tax 10%",
    data: {
      business_name: "StoreX",
      business_email: "orders@storex.com",
      client_name: "John Doe",
      client_email: "john@example.com",
      currency: "USD",
      items: [
        { description: "T-shirt", quantity: 2, unit_price: 25 },
        { description: "Mug", quantity: 1, unit_price: 15 },
        { description: "Sticker pack", quantity: 3, unit_price: 8 },
      ],
      tax_percentage: 10,
      discount: 20,
      notes: "Shipped within 3-5 business days.",
    },
  },
];

export default function NewInvoice() {
  /* ──────────── States ──────────── */
  const [useSmartAI, setUseSmartAI] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [success, setSuccess] = useState(false);

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
    notes: "",
  });

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hey! 👋 Describe your invoice. For example: 'Invoice for Ali, 3 design pages, due in 7 days, 20% advance'.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filledFields = Object.entries(invoiceData).filter(([key, val]) => {
    if (key === "items")
      return invoiceData.items.length > 0 && invoiceData.items.some((i) => i.description.trim() !== "");
    if (key === "tax_percentage" || key === "discount") return (val as number) !== -1;
    return typeof val === "string" && val.trim() !== "";
  }).length;
  const progressPct = Math.round((filledFields / 17) * 100);

  const isComplete = !!invoiceData.business_name && !!invoiceData.client_name && invoiceData.items.length > 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, thinking]);

  useEffect(() => {
    const subtotal = invoiceData.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
    const total =
      subtotal + (subtotal * Math.max(0, invoiceData.tax_percentage)) / 100 - (invoiceData.discount || 0);
    setInvoiceData((prev) => ({ ...prev, subtotal, total }));
  }, [invoiceData.items, invoiceData.tax_percentage, invoiceData.discount]);

  /* ──────────── Handlers ──────────── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    setThinking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          currentData: invoiceData,
          conversationHistory: [],
          useGemini: useSmartAI,
        }),
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
    } finally {
      setThinking(false);
    }
  };

  const handleFinalize = async () => {
    const res = await fetch("/api/invoice/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    });
    if (res.ok) {
      setSuccess(true);
    } else {
      alert("Failed to save.");
    }
  };

  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  /* ──────────── Quick Actions Menu ──────────── */
  const quickActions = [
    { label: "Create Invoice", icon: icons.create, action: () => (window.location.href = "/new") },
    { label: "Invoice History", icon: icons.history, action: () => (window.location.href = "/dashboard") },
    { label: "Upload Logo", icon: icons.logo, action: () => document.getElementById("logoUpload")?.click() },
    { label: "QR Code", icon: icons.qr, action: () => document.getElementById("qrUpload")?.click() },
    {
      label: useSmartAI ? "✨ Smart AI (On)" : "💡 Smart AI (Off)",
      icon: useSmartAI ? icons.smartOn : icons.smart,
      action: () => setUseSmartAI(!useSmartAI),
    },
    { label: "Templates", icon: icons.templates, action: () => setShowTemplates(true) },
    {
      label: "Export PDF",
      icon: icons.export,
      action: () => {
        if (isComplete) handleFinalize();
        else alert("Complete the invoice first.");
      },
    },
    {
      label: "Clients",
      icon: icons.clients,
      action: () => alert("Client database coming soon!"),
    },
    { label: "Preview", icon: icons.preview, action: () => setShowPreview(true) },
  ];

  /* ──────────── Success Screen ──────────── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Invoice Created!</h2>
          <p className="text-slate-400 mb-6">Your invoice has been saved and is ready to send.</p>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setInvoiceData({ ...invoiceData, invoice_id: "", items: [], subtotal: 0, total: 0 });
                setMessages([
                  { sender: "ai", text: "Hey! Let's create another invoice. What's your business name?" },
                ]);
              }}
              className="block w-full py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition"
            >
              Create Another Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────── Main UI ──────────── */
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg overflow-hidden bg-slate-700">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-lg font-semibold text-white">New Invoice</h1>
          <span className="text-xs text-slate-400 ml-2">{progressPct}% complete</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="text-sm px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
          >
            📄 Preview
          </button>
          {isComplete && (
            <button
              onClick={handleFinalize}
              className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
            >
              Finalize ✨
            </button>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-md"
                  : "bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-slate-800 text-slate-400 text-sm px-4 py-3 rounded-2xl rounded-bl-md border border-slate-700 flex items-center gap-2">
              <span className="flex gap-1">
                <span
                  className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </span>
              <span className="ml-2">AI is thinking…</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/80 border-t border-slate-700 px-4 sm:px-6 py-3">
        {useSmartAI && (
          <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              Smart AI is active
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your invoice..."
            className="flex-1 h-12 px-4 rounded-xl border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition"
            disabled={thinking}
          />
          <button
            onClick={handleSend}
            disabled={thinking}
            className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 active:scale-95 transition disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Floating Quick Actions Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        {showQuickActions && (
          <div className="absolute bottom-16 right-0 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-2 w-56 animate-fade-in">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.action();
                  setShowQuickActions(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 rounded-lg transition"
              >
                <span className="text-slate-400">{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">📄 Invoice Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <InvoicePreview data={invoiceData} />
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowTemplates(false)}
        >
          <div
            className="bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">📋 Invoice Templates</h2>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="grid gap-3">
              {templates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInvoiceData({ ...invoiceData, ...t.data } as InvoiceData);
                    setShowTemplates(false);
                    setMessages([
                      ...messages,
                      { sender: "ai", text: `Loaded "${t.name}" template.` },
                    ]);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition text-left"
                >
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
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
    </div>
  );
}
