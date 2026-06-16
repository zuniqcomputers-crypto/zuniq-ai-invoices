"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailModal, setEmailModal] = useState<{ id: string; client_email?: string } | null>(null);
  const [emailSending, setEmailSending] = useState(false);

  const fetchInvoices = () => {
    fetch("/api/invoices")
      .then((r) => r.json())
      .then((d) => setInvoices(d.invoices || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInvoices(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    await fetch(`/api/invoice/${id}`, { method: "DELETE" });
    fetchInvoices();
  };

  const handleDuplicate = async (inv: any) => {
    const newInvoice = { ...inv, invoice_id: "", _id: undefined, createdAt: undefined, issue_date: new Date().toISOString().split("T")[0], due_date: "", status: "draft" };
    const res = await fetch("/api/invoice/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInvoice),
    });
    if (res.ok) {
      fetchInvoices();
      alert("Invoice duplicated! Edit the new draft.");
    } else {
      alert("Failed to duplicate.");
    }
  };

  const handleSendEmail = async () => {
    if (!emailModal) return;
    const clientEmail = prompt("Client email address:", emailModal.client_email || "");
    if (!clientEmail) return;
    const message = prompt("Add a message (optional):", `Please find invoice ${emailModal.id} attached.`);
    setEmailSending(true);
    try {
      const res = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: emailModal.id, clientEmail, message }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Invoice sent successfully!");
        setEmailModal(null);
      } else {
        alert("Failed to send: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setEmailSending(false);
    }
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i: any) => i.status === "paid").length,
    unpaid: invoices.filter((i: any) => i.status === "unpaid" || i.status === "draft").length,
    revenue: invoices.filter((i: any) => i.status === "paid").reduce((sum: number, i: any) => sum + (i.total || 0), 0),
    overdue: invoices.filter((i: any) => i.due_date && i.status !== "paid" && new Date(i.due_date) < new Date()).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>
        <Link href="/new" className="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
          + New Invoice
        </Link>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Invoices", value: stats.total, color: "bg-indigo-100 text-indigo-800" },
            { label: "Paid", value: stats.paid, color: "bg-emerald-100 text-emerald-800" },
            { label: "Unpaid", value: stats.unpaid, color: "bg-amber-100 text-amber-800" },
            { label: "Revenue", value: `$${stats.revenue.toFixed(0)}`, color: "bg-green-100 text-green-800" },
            { label: "Overdue", value: stats.overdue, color: "bg-red-100 text-red-800" },
          ].map((s, i) => (
            <div key={i} className={`${s.color} rounded-2xl p-4 shadow-sm`}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-40 bg-white rounded-2xl animate-pulse shadow-sm" />)}
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-7xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Zuniq Invoices!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Your invoices will appear here. Start by creating your first invoice – it takes less than 30 seconds.</p>
            <Link href="/new" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition">
              <span className="text-lg">+</span> Create your first invoice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {invoices.map((inv: any) => (
              <div key={inv.invoice_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs text-gray-400">{inv.invoice_id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${inv.status === "paid" ? "bg-emerald-100 text-emerald-700" : inv.status === "overdue" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {inv.status || "unpaid"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{inv.client_name || "Unknown Client"}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">{inv.currency} {inv.total.toFixed(2)}</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/view/${inv.invoice_id}`} className="flex-1 text-center py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition">👁️</Link>
                  <Link href={`/edit/${inv.invoice_id}`} className="flex-1 text-center py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition">✏️</Link>
                  <a href={`/api/invoice/${inv.invoice_id}/pdf`} className="flex-1 text-center py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-sm hover:bg-indigo-100 transition" download>📥</a>
                  <button onClick={() => handleDuplicate(inv)} className="flex-1 text-center py-2 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm hover:bg-blue-100 transition">📋</button>
                  <button onClick={() => setEmailModal({ id: inv.invoice_id, client_email: inv.client_email })} className="flex-1 text-center py-2 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-sm hover:bg-emerald-100 transition">✉️</button>
                  <button onClick={() => handleDelete(inv.invoice_id)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition">🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email modal */}
      {emailModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEmailModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">✉️ Send Invoice</h2>
            <p className="text-sm text-gray-600 mb-6">Invoice <strong>{emailModal.id}</strong> will be sent to <strong>{emailModal.client_email || "the client"}</strong>.</p>
            <button onClick={handleSendEmail} disabled={emailSending} className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50">{emailSending ? "Sending…" : "Send Now"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
