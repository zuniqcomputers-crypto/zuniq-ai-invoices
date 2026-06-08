"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = () => {
    fetch("/api/invoices")
      .then((r) => r.json())
      .then((d) => setInvoices(d.invoices || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete invoice?")) return;
    await fetch(`/api/invoice/${id}`, { method: "DELETE" });
    fetchInvoices();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden ring-2 ring-indigo-400/50">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Zuniq Invoices</h1>
            <p className="text-indigo-200 text-xs">AI‑powered invoice manager</p>
          </div>
        </div>
        <Link
          href="/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition"
        >
          <span className="text-lg">+</span> Create New Invoice
        </Link>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No invoices yet</h2>
            <p className="text-gray-500 mb-6">Your first invoice is just a chat away.</p>
            <Link
              href="/new"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition"
            >
              <span className="text-lg">+</span> Create your first invoice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {invoices.map((inv: any) => (
              <div
                key={inv.invoice_id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs text-gray-400">{inv.invoice_id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      inv.status === "paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {inv.client_name || "Unknown Client"}
                </h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">
                  {inv.currency} {inv.total.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/view/${inv.invoice_id}`}
                    className="flex-1 text-center py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition"
                  >
                    👁️ View
                  </Link>
                  <Link
                    href={`/edit/${inv.invoice_id}`}
                    className="flex-1 text-center py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition"
                  >
                    ✏️ Edit
                  </Link>
                  <a
                    href={`/api/invoice/${inv.invoice_id}/pdf`}
                    className="flex-1 text-center py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-sm hover:bg-indigo-100 transition"
                    download
                  >
                    📥 PDF
                  </a>
                  <button
                    onClick={() => handleDelete(inv.invoice_id)}
                    className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
