"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = () => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data.invoices || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInvoices(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete invoice?")) return;
    await fetch(`/api/invoice/${id}`, { method: "DELETE" });
    fetchInvoices();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">⚡ Zuniq AI Invoices</h1>
            <p className="text-gray-500 text-sm mt-1">Create and manage invoices effortlessly</p>
          </div>
          <Link
            href="/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl active:scale-95 transition"
          >
            <span className="text-lg">+</span> Create New Invoice
          </Link>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-white rounded-2xl animate-pulse shadow-sm" />)}
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-gray-700">No invoices yet</h2>
            <p className="text-gray-400 mt-2">Create your first invoice and it'll appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {invoices.map((inv: any) => (
              <div key={inv.invoice_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-sm text-gray-500">{inv.invoice_id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {inv.status}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{inv.client_name || "Unknown Client"}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-4">{inv.currency} {inv.total.toFixed(2)}</p>
                <div className="flex gap-2">
                  <a
                    href={`/api/invoice/${inv.invoice_id}/pdf`}
                    className="flex-1 text-center py-2 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm hover:bg-blue-100 transition"
                    download
                  >
                    PDF
                  </a>
                  <button
                    onClick={() => handleDelete(inv.invoice_id)}
                    className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition"
                  >
                    Delete
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
