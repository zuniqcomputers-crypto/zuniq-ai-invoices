"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/utils/ai";

export default function ViewInvoice() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/invoice/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.invoice) {
          setInvoiceData(data.invoice);
        } else {
          alert("Invoice not found");
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
        router.push("/");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading invoice…
      </div>
    );
  }

  if (!invoiceData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-5 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg overflow-hidden ring-2 ring-indigo-400/50">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-lg font-bold">Invoice #{id}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/edit/${id}`)}
            className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            ✏️ Edit
          </button>
          <a
            href={`/api/invoice/${id}/pdf`}
            className="text-sm px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
            download
          >
            📥 PDF
          </a>
          <button
            onClick={() => router.push("/")}
            className="text-sm px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium transition"
          >
            ← Back
          </button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <InvoicePreview data={invoiceData} />
      </div>
    </div>
  );
}
