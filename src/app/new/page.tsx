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
  const [showPreview, setShowPreview] = useState(false); // mobile toggle
  const [showInfo, setShowInfo] = useState(false); // info modal

  const handleSend = async (msg: string) => {
    setMessages([...messages, { sender: "user", text: msg }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, currentData: invoiceData, conversationHistory: [] }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { sender: "ai", text: "Sorry, something went wrong. Please try again." }]);
      } else {
        setInvoiceData(data.updatedData);
        setMessages(prev => [...prev, { sender: "ai", text: data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: "ai", text: "Network error. Please check your connection." }]);
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
    <div className="flex flex-col md:flex-row h-screen">
      {/* Info Modal */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">About Zuniq AI Invoices</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Story */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 Our Story</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                One day, my younger brother told me his biggest headache: invoices. He was paying for tools 
                and still wasting time. I'm a problem solver at heart—I love tackling complex challenges. 
                That moment, Zuniq AI Invoices sparked in my mind. My brother works at a company in Dubai, 
                and from that day, I started building this app. Now, it saves you time and money, just like I hoped.
              </p>
            </div>

            {/* How to Use */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 How to Use</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-medium text-gray-700">Chat naturally:</span> Answer the AI's questions 
                  one by one, just like texting a friend.
                </li>
                <li>
                  <span className="font-medium text-gray-700">If the AI repeats:</span> Try phrasing your 
                  answer more clearly (e.g., "client is Ali" instead of just "Ali"). You can also type 
                  <span className="text-blue-600"> "help"</span> for hints.
                </li>
                <li>
                  <span className="font-medium text-gray-700">View your invoice:</span> On desktop, see the 
                  live preview on the right. On mobile, tap <span className="bg-gray-100 px-2 py-0.5 rounded">Show Preview</span>.
                </li>
                <li>
                  <span className="font-medium text-gray-700">Save & download:</span> Click "Finalize" to 
                  save, then download the PDF from the dashboard.
                </li>
              </ul>
              <p className="mt-4 text-xs text-gray-400 italic">
                Built with ❤️ to make invoicing frustration‑free.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r flex flex-col h-full">
        <div className="p-4 bg-blue-600 text-white font-bold text-lg flex justify-between items-center">
          <span>🤖 AI Invoice Assistant</span>
          <div className="flex items-center gap-2">
            {/* Info icon */}
            <button
              onClick={() => setShowInfo(true)}
              className="text-white hover:text-blue-200 text-xl leading-none"
              aria-label="About this app"
            >
              ℹ️
            </button>
            {/* Preview toggle (mobile) */}
            <button
              className="md:hidden text-sm bg-white text-blue-600 px-3 py-1 rounded"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>
        </div>
        <ChatWindow messages={messages} onSend={handleSend} onFinalize={handleFinalize} isComplete={isComplete} />
      </div>

      {/* Preview Section */}
      <div className={`w-full md:w-1/2 p-4 md:p-6 overflow-auto bg-white ${showPreview ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-2xl font-bold mb-4">📄 Live Preview</h2>
        <InvoicePreview data={invoiceData} />
        {isComplete && (
          <button
            onClick={handleFinalize}
            className="mt-6 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Save & Finalize Invoice
          </button>
        )}
      </div>
    </div>
  );
}
