"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { InvoiceData } from "@/utils/ai";

export default function EditInvoice() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoiceData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setInvoiceData((prev) => {
      if (!prev) return null;
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setInvoiceData((prev) => {
      if (!prev) return null;
      return { ...prev, items: [...prev.items, { description: "", quantity: 1, unit_price: 0 }] };
    });
  };

  const removeItem = (index: number) => {
    setInvoiceData((prev) => {
      if (!prev) return null;
      const newItems = prev.items.filter((_, i) => i !== index);
      return { ...prev, items: newItems };
    });
  };

  const handleSave = async () => {
    if (!invoiceData) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/invoice/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });
      if (res.ok) {
        alert("Invoice updated!");
        router.push("/");
      } else {
        const data = await res.json();
        alert("Failed to update: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading invoice…
      </div>
    );
  }

  if (!invoiceData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-5 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg overflow-hidden ring-2 ring-indigo-400/50">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-lg font-bold">Edit Invoice #{id}</h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-indigo-200 hover:text-white"
        >
          Cancel
        </button>
      </header>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <InvoiceEditForm
          data={invoiceData}
          updateField={updateField}
          updateItem={updateItem}
          addItem={addItem}
          removeItem={removeItem}
        />
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 transition"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Edit Form (with logo upload) ---------- */
function InvoiceEditForm({
  data,
  updateField,
  updateItem,
  addItem,
  removeItem,
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
          <input value={data.business_name} onChange={(e) => updateField("business_name", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Email</label>
          <input value={data.business_email} onChange={(e) => updateField("business_email", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Phone</label>
          <input value={data.business_phone} onChange={(e) => updateField("business_phone", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">TRN Number</label>
          <input value={data.trn_number} onChange={(e) => updateField("trn_number", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {/* Logo Upload Field */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Business Logo</label>
          <div className="flex items-center gap-3">
            <input
              value={data.business_logo_url}
              onChange={(e) => updateField("business_logo_url", e.target.value)}
              placeholder="Paste image URL or upload"
              className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="h-10 px-4 rounded-lg bg-indigo-100 text-indigo-700 font-medium text-sm flex items-center cursor-pointer hover:bg-indigo-200 transition">
              📁 Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      updateField("business_logo_url", ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          {data.business_logo_url && (
            <div className="mt-2 flex items-center gap-2">
              <img src={data.business_logo_url} alt="Logo preview" className="h-8 w-8 object-contain rounded border" />
              <button
                onClick={() => updateField("business_logo_url", "")}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Name</label>
          <input value={data.client_name} onChange={(e) => updateField("client_name", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Email</label>
          <input value={data.client_email} onChange={(e) => updateField("client_email", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Phone</label>
          <input value={data.client_phone} onChange={(e) => updateField("client_phone", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Client Address</label>
          <input value={data.client_address} onChange={(e) => updateField("client_address", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-500">Items</label>
          <button onClick={addItem} className="text-xs px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">
            + Add Item
          </button>
        </div>
        <div className="space-y-3">
          {data.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <input placeholder="Description" value={item.description} onChange={(e) => updateItem(idx, "description", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="col-span-2">
                <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", parseFloat(e.target.value) || 0)} className="w-full h-10 px-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="col-span-3">
                <input type="number" placeholder="Price" value={item.unit_price} onChange={(e) => updateItem(idx, "unit_price", parseFloat(e.target.value) || 0)} className="w-full h-10 px-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
          <input type="number" value={data.tax_percentage === -1 ? 0 : data.tax_percentage} onChange={(e) => updateField("tax_percentage", parseFloat(e.target.value) || 0)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Discount</label>
          <input type="number" value={data.discount === -1 ? 0 : data.discount} onChange={(e) => updateField("discount", parseFloat(e.target.value) || 0)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Issue Date</label>
          <input type="date" value={data.issue_date} onChange={(e) => updateField("issue_date", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Due Date</label>
          <input type="date" value={data.due_date} onChange={(e) => updateField("due_date", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* QR Code Data */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">QR Code Data (text or URL)</label>
        <input value={data.qr_code_data} onChange={(e) => updateField("qr_code_data", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Payment link or any text" />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
        <textarea value={data.notes} onChange={(e) => updateField("notes", e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
    </div>
  );
}
