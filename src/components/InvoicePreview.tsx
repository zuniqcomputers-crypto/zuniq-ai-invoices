import { InvoiceData } from "@/utils/ai";

export default function InvoicePreview({ data }: { data: InvoiceData }) {
  const qrCodeUrl = data.qr_code_data
    ? `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(data.qr_code_data)}`
    : null;

  // Status badge style
  const status = (data as any).status || "unpaid";
  const statusStyles: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
    unpaid: "bg-amber-100 text-amber-800 border-amber-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
    overdue: "bg-red-100 text-red-800 border-red-200",
  };
  const badgeStyle = statusStyles[status.toLowerCase()] || statusStyles.unpaid;

  return (
    <div className="max-w-[900px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 font-sans print:shadow-none print:rounded-none print:border-none">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 px-8 py-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            {data.business_logo_url && (
              <div className="h-16 w-16 rounded-xl bg-white p-1.5 shadow-lg flex-shrink-0">
                <img
                  src={data.business_logo_url}
                  alt="Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{data.business_name || "Your Business"}</h2>
              {data.business_email && <p className="text-blue-200 text-sm">{data.business_email}</p>}
              {data.business_phone && <p className="text-blue-200 text-sm">{data.business_phone}</p>}
              {data.trn_number && <p className="text-blue-200 text-sm">TRN: {data.trn_number}</p>}
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-extrabold tracking-widest uppercase">Invoice</h1>
            <p className="text-blue-200 text-lg font-mono mt-2">#{data.invoice_id || "ZIQ-0001"}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Left: Client & dates */}
        <div className="lg:col-span-2 p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Issue Date</p>
              <p className="font-medium text-gray-800 mt-1">{data.issue_date || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Due Date</p>
              <p className="font-medium text-gray-800 mt-1">{data.due_date || "—"}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Bill To</p>
              <p className="font-semibold text-gray-900 text-base mt-1">{data.client_name || "Client Name"}</p>
              {data.client_email && <p className="text-gray-500 text-sm">{data.client_email}</p>}
              {data.client_phone && <p className="text-gray-500 text-sm">{data.client_phone}</p>}
              {data.client_address && <p className="text-gray-500 text-sm">{data.client_address}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Item</th>
                  <th className="py-3 px-4 font-semibold text-center">Qty</th>
                  <th className="py-3 px-4 font-semibold text-right">Unit Price</th>
                  <th className="py-3 px-4 font-semibold text-right">Tax</th>
                  <th className="py-3 px-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-300 italic">No items added yet</td>
                  </tr>
                ) : (
                  data.items.map((item, idx) => {
                    const lineTotal = item.quantity * item.unit_price;
                    const taxAmount = data.tax_percentage ? lineTotal * (data.tax_percentage / 100) : 0;
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-800">{item.description || "Service"}</td>
                        <td className="py-3 px-4 text-center text-gray-600">{item.quantity}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{data.currency} {item.unit_price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{data.currency} {taxAmount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-medium text-gray-800">{data.currency} {lineTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Notes & Terms */}
          {data.notes && (
            <div className="text-sm text-gray-500 mt-6 border-t pt-4">
              <p className="font-semibold text-gray-400 mb-1">Notes & Payment Instructions</p>
              <p className="leading-relaxed">{data.notes}</p>
            </div>
          )}
        </div>

        {/* Right sidebar: Totals + QR */}
        <div className="lg:col-span-1 bg-gray-50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-800">{data.currency} {data.subtotal.toFixed(2)}</span>
              </div>
              {data.tax_percentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax ({data.tax_percentage}%)</span>
                  <span className="font-medium text-gray-800">
                    {data.currency} {((data.subtotal * data.tax_percentage) / 100).toFixed(2)}
                  </span>
                </div>
              )}
              {data.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-medium text-red-500">-{data.currency} {data.discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{data.currency} {data.total.toFixed(2)}</span>
            </div>
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="mt-8 flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
              </div>
              <p className="text-xs text-gray-400 mt-2">Scan to pay</p>
            </div>
          )}

          {/* Footer branding */}
          <div className="mt-8 text-xs text-gray-400 text-center">
            <p>Generated by Zuniq Invoices</p>
            <p>AI‑powered invoice management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
