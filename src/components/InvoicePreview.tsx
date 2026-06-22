import { InvoiceData } from "@/utils/ai";

export default function InvoicePreview({ data }: { data: InvoiceData }) {
  const qrCodeUrl = data.qr_code_data
    ? `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(data.qr_code_data)}`
    : null;
  const status = (data as any).status || "draft";
  const statusStyles: Record<string, string> = {
    paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    unpaid: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    draft: "bg-slate-700 text-slate-300 border-slate-600",
    overdue: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <div className="max-w-[860px] mx-auto bg-slate-800 shadow-2xl rounded-2xl overflow-hidden border border-slate-700 print:shadow-none print:rounded-none print:border-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-8 py-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            {data.business_logo_url && (
              <div className="h-16 w-16 rounded-xl bg-white p-1.5 shadow-lg flex-shrink-0">
                <img src={data.business_logo_url} alt="Logo" className="h-full w-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{data.business_name || "Your Business"}</h2>
              {data.business_email && <p className="text-slate-400 text-sm">{data.business_email}</p>}
              {data.business_phone && <p className="text-slate-400 text-sm">{data.business_phone}</p>}
              {data.trn_number && <p className="text-slate-400 text-sm">TRN: {data.trn_number}</p>}
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-light tracking-[0.2em] uppercase">Invoice</h1>
            <p className="text-slate-400 text-lg font-mono mt-2">#{data.invoice_id || "ZIQ-0001"}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status.toLowerCase()] || statusStyles.draft}`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Body (same as light version but with dark styling) */}
      <div className="p-6 md:p-10 space-y-8 text-slate-200">
        {/* Dates & Client */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div><p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Issue Date</p><p className="font-medium text-white mt-1">{data.issue_date || "—"}</p></div>
          <div><p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Due Date</p><p className="font-medium text-white mt-1">{data.due_date || "—"}</p></div>
          <div><p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Bill To</p><p className="font-semibold text-white text-base mt-1">{data.client_name || "Client Name"}</p>{data.client_email && <p className="text-slate-400 text-sm">{data.client_email}</p>}{data.client_phone && <p className="text-slate-400 text-sm">{data.client_phone}</p>}{data.client_address && <p className="text-slate-400 text-sm">{data.client_address}</p>}</div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-y border-slate-700 text-left text-slate-400 text-xs uppercase tracking-wider"><th className="py-3 px-4 font-semibold">Description</th><th className="py-3 px-4 font-semibold text-center">Qty</th><th className="py-3 px-4 font-semibold text-right">Unit Price</th><th className="py-3 px-4 font-semibold text-right">Amount</th></tr></thead>
            <tbody className="divide-y divide-slate-700">
              {data.items.length === 0 ? <tr><td colSpan={4} className="py-8 text-center text-slate-500 italic">No items added yet</td></tr> : data.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-700/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{item.description || "Service"}</td>
                  <td className="py-3 px-4 text-center text-slate-300">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{data.currency} {item.unit_price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-medium text-white">{data.currency} {(item.quantity * item.unit_price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end"><div className="w-full sm:w-64 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="font-medium text-white">{data.currency} {data.subtotal.toFixed(2)}</span></div>
          {data.tax_percentage > 0 && <div className="flex justify-between text-sm"><span className="text-slate-400">Tax ({data.tax_percentage}%)</span><span className="font-medium text-white">{data.currency} {((data.subtotal * data.tax_percentage) / 100).toFixed(2)}</span></div>}
          {data.discount > 0 && <div className="flex justify-between text-sm"><span className="text-slate-400">Discount</span><span className="font-medium text-red-400">-{data.currency} {data.discount.toFixed(2)}</span></div>}
          <div className="border-t-2 border-slate-600 pt-2 flex justify-between text-lg font-bold text-white"><span>Total</span><span>{data.currency} {data.total.toFixed(2)}</span></div>
        </div></div>

        {/* Notes & Signature */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-6 border-t border-slate-700">
          <div className="text-sm text-slate-400 space-y-4">
            {data.notes && <div><p className="font-semibold text-slate-500 mb-1">Notes & Payment Instructions</p><p className="leading-relaxed">{data.notes}</p></div>}
            <div><p className="text-xs text-slate-500">Thank you for your business!</p></div>
          </div>
          <div className="flex items-end gap-6">
            {data.signature_url && <div><p className="text-xs text-slate-500 mb-2">Authorized Signature</p><img src={data.signature_url} alt="Signature" className="h-14 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>}
            {qrCodeUrl && <div className="text-center"><img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" /><p className="text-xs text-slate-500 mt-1">Scan to pay</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
