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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, currentData: invoiceData, conversationHistory: [] }),
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with logo */}
      <header className="px-4 py-3 bg-white border-b flex items-center gap-2 shadow-sm">
        <div className="h-8 w-8 rounded-lg overflow-hidden">
          <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-lg font-semibold text-gray-800">AI Invoice Assistant</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
              msg.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-800"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your answer..."
          className="flex-1 h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSend} className="h-10 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700">
          Send
        </button>
        {isComplete && (
          <button onClick={handleFinalize} className="h-10 px-4 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700">
            Finalize
          </button>
        )}
      </div>

      {/* Desktop Preview (hidden on mobile) */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-1/2 bg-white border-l p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">📄 Live Preview</h2>
        <InvoicePreview data={invoiceData} />
        {isComplete && (
          <button onClick={handleFinalize} className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white font-semibold">
            Save & Finalize Invoice
          </button>
        )}
      </div>
    </div>
  );
}
