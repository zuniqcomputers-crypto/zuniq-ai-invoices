"use client";
import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";

export default function NewInvoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoice_id: "", business_name: "", business_email: "", client_name: "", client_email: "",
    client_address: "", items: [], subtotal: 0, tax_percentage: 0, discount: 0, total: 0,
    currency: "USD", due_date: "", issue_date: new Date().toISOString().split("T")[0], notes: ""
  });

  const [messages, setMessages] = useState([{ sender: "ai", text: "Hello! Let's create your invoice. What is your business name?" }]);

  const handleSend = async (msg: string) => {
    setMessages([...messages, { sender: "user", text: msg }]);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, currentData: invoiceData, conversationHistory: [] }),
    });
    const data = await res.json();
    if (data.error) {
      setMessages(prev => [...prev, { sender: "ai", text: "Error, try again." }]);
    } else {
      setInvoiceData(data.updatedData);
      setMessages(prev => [...prev, { sender: "ai", text: data.reply }]);
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

  const isComplete = !!invoiceData.business_name && !!invoiceData.client_name && invoiceData.items.length > 0;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r flex flex-col">
        <div className="p-4 bg-blue-600 text-white font-bold text-lg">🤖 AI Invoice Assistant</div>
        <ChatWindow messages={messages} onSend={handleSend} onFinalize={handleFinalize} isComplete={isComplete} />
      </div>
      <div className="w-1/2 p-6 overflow-auto bg-white">
        <h2 className="text-2xl font-bold mb-4">📄 Live Preview</h2>
        <InvoicePreview data={invoiceData} />
        {isComplete && (
          <button onClick={handleFinalize} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Save & Finalize Invoice
          </button>
        )}
      </div>
    </div>
  );
}
