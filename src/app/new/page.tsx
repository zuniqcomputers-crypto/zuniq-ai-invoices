"use client";
import { useState, useRef, useEffect } from "react";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";

export default function NewInvoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoice_id: "",
    business_name: "",
    business_email: "",
    business_phone: "",
    trn_number: "",
    business_logo_url: "",
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
    { sender: "ai", text: "Hello! Let's create your invoice. What is your business name?" }
  ]);
  const [input, setInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isComplete =
    !!invoiceData.business_name &&
    !!invoiceData.client_name &&
    invoiceData.items.length > 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Recalculate totals whenever items, tax, or discount change
  useEffect(() => {
    const subtotal = invoiceData.items.reduce(
      (sum, i) => sum + i.quantity * i.unit_price,
      0
    );
    const total =
      subtotal + (subtotal * Math.max(0, invoiceData.tax_percentage)) / 100 - (invoiceData.discount || 0);
    setInvoiceData(prev => ({ ...prev, subtotal, total }));
  }, [invoiceData.items, invoiceData.tax_percentage, invoiceData.discount]);

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
          conversationHistory: []
        })
      });
      const data = await res.json();
      if (data.error) {
        setMessages([
          ...newMessages,
          { sender: "ai", text: "Sorry, something went wrong." }
        ]);
      } else {
        setInvoiceData(data.updatedData);
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Network error." }]);
    }
  };

  const handleFinalize = async () => {
    const res = await fetch("/api/invoice/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData)
    });
    if (res.ok) window.location.href = "/";
    else alert("Failed to save.");
  };

  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unit_price: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData(prev => ({ ...prev, items: newItems }));
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
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-sm"
              }`}
            >
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
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your answer..."
          className="flex-1 h-12 px-4 rounded-xl border-0 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition"
        />
        <button
          onClick={handleSend}
          className="h-12 w-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg hover:bg-gray-800 active:scale-95 transition"
        >
          ➤
        </button>
        {isComplete && (
          <button
            onClick={handleFinalize}
            className="h-12 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg active:scale-95 transition text-sm"
          >
            Finalize ✨
          </button>
        )}
      </div>

      {/* Floating Preview Button (Mobile) */}
      {!showPreview && (
        <button
          onClick={() => setShowPreview(true)}
          className="md:hidden fixed bottom-24 right-5 h-14 w-14 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center animate-bounce-gentle z-40"
        >
          <span className="text-xl">📄</span>
        </button>
      )}

      {/* Mobile Preview Sheet */}
      {showPreview && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
          <div className="sticky top-0 bg-white pt-4 pb-2 px-6 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {editMode ? "✏️ Edit Invoice" : "📄 Invoice Preview"}
            </h2>
            <div className="flex items-center gap-2">
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium"
                >
                  ✏️ Edit
                </button>
              )}
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-medium"
                >
                  👁 Preview
                </button>
              )}
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4">
            {editMode ? (
              <InvoiceEditForm
                data={invoiceData}
                updateField={updateField}
                updateItem={updateItem}
                addItem={addItem}
                removeItem={removeItem}
              />
            ) : (
              <>
                <InvoicePreview data={invoiceData} />
                {isComplete && (
                  <button
                    onClick={handleFinalize}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg"
                  >
                    Save & Finalize Invoice
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Preview (always visible) */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-1/2 bg-white border-l border-gray-200 p-6 overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {editMode ? "✏️ Edit Invoice" : "📄 Live Preview"}
          </h2>
          <div className="flex items-center gap-2">
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="text-sm px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition"
              >
                ✏️ Edit
              </button>
            )}
            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="text-sm px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                👁 Preview
              </button>
            )}
          </div>
        </div>

        {editMode ? (
          <InvoiceEditForm
            data={invoiceData}
            updateField={updateField}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
          />
        ) : (
          <>
            <InvoicePreview data={invoiceData} />
            {isComplete && (
              <button
                onClick={handleFinalize}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg"
              >
                Save & Finalize Invoice
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Edit Form Component ---------- */
function InvoiceEditForm({
  data,
  updateField,
  updateItem,
  addItem,
  removeItem
}: {
  data: InvoiceData;
  updateField: (field: keyof InvoiceData, value: any) => void;
  updateItem: (index: number, field: string, value: any) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Business Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Name</label>
          <input value={data.business_name} onChange={e => updateField("business_name", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Email</label>
          <input value={data.business_email} onChange={e => updateField("business_email", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Phone</label>
          <input value={data.business_phone} onChange={e => updateField("business_phone", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">TRN Number</label>
          <input value={data.trn_number} onChange={e => updateField("trn_number", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Logo URL</label>
          <input value={data.business_logo_url} onChange={e => updateField("business_logo_url", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://... (optional)" />
        </div>
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Name</label>
          <input value={data.client_name} onChange={e => updateField("client_name", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Email</label>
          <input value={data.client_email} onChange={e => updateField("client_email", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Phone</label>
          <input value={data.client_phone} onChange={e => updateField("client_phone", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Address</label>
          <input value={data.client_address} onChange={e => updateField("client_address", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-500">Items</label>
          <button onClick={addItem} className="text-xs px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">+ Add Item</button>
        </div>
        <div className="space-y-3">
          {data.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <input placeholder="Description" value={item.description} onChange={e => updateItem(idx, "description", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="col-span-2">
                <input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(idx, "quantity", parseFloat(e.target.value) || 0)} className="w-full h-10 px-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="col-span-3">
                <input type="number" placeholder="Price" value={item.unit_price} onChange={e => updateItem(idx, "unit_price", parseFloat(e.target.value) || 0)} className="w-full h-10 px-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="col-span-1 text-right">
                <button onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700 font-bold">×</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & Discount */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Tax (%)</label>
          <input type="number" value={data.tax_percentage === -1 ? 0 : data.tax_percentage} onChange={e => updateField("tax_percentage", parseFloat(e.target.value) || 0)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Discount</label>
          <input type="number" value={data.discount === -1 ? 0 : data.discount} onChange={e => updateField("discount", parseFloat(e.target.value) || 0)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Issue Date</label>
          <input type="date" value={data.issue_date} onChange={e => updateField("issue_date", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Due Date</label>
          <input type="date" value={data.due_date} onChange={e => updateField("due_date", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* QR Code Data */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">QR Code Data (text or URL)</label>
        <input value={data.qr_code_data} onChange={e => updateField("qr_code_data", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Payment link or any text" />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
        <textarea value={data.notes} onChange={e => updateField("notes", e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
    </div>
  );
}
