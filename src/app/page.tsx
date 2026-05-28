"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardList from "@/components/DashboardList";

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">⚡ Zuniq AI Invoices</h1>
        <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
          + Create New Invoice
        </Link>
      </div>
      {loading ? <p>Loading...</p> : <DashboardList invoices={invoices} onDelete={handleDelete} />}
    </div>
  );
}
