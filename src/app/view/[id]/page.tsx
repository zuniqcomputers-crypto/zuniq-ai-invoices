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
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading invoice…
      </div>
    );
  }

  if (!invoiceData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Invoice #{id}</h1>
          <a
            href={`/api/invoice/${id}/pdf`}
            className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            download
          >
            📥 Download PDF
          </a>
        </div>
        <InvoicePreview data={invoiceData} />
      </div>
    </div>
  );
}
