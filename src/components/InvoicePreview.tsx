import { InvoiceData } from "@/utils/ai";

export default function InvoicePreview({ data }: { data: InvoiceData }) {
  return (
    <div className="border rounded-xl p-6 shadow-sm bg-white text-gray-700 text-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{data.business_name || "Your Business"}</h3>
          <p>{data.business_email}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">INVOICE</p>
          <p># {data.invoice_id || "ZIQ-0001"}</p>
          <p>Date: {data.issue_date}</p>
          <p>Due: {data.due_date || "—"}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mb-6">
        <div>
          <p className="font-semibold">Bill To:</p>
          <p>{data.client_name || "Client Name"}</p>
          <p>{data.client_email}</p>
          <p>{data.client_address}</p>
        </div>
      </div>
      <table className="w-full mb-4 border-t">
        <thead><tr className="border-b text-left"><th className="py-2">Description</th><th className="py-2">Qty</th><th className="py-2">Unit Price</th><th className="py-2">Amount</th></tr></thead>
        <tbody>
          {data.items.length === 0 ? (
            <tr><td colSpan={4} className="py-4 text-center text-gray-400 italic">No items added yet</td></tr>
          ) : data.items.map((item, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{item.description || "Service"}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">{data.currency} {item.unit_price.toFixed(2)}</td>
              <td className="py-2">{data.currency} {(item.quantity * item.unit_price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end space-y-1">
        <p>Subtotal: {data.currency} {data.subtotal.toFixed(2)}</p>
        <p>Tax ({data.tax_percentage}%): {data.currency} {((data.subtotal * data.tax_percentage) / 100).toFixed(2)}</p>
        <p>Discount: {data.currency} {data.discount.toFixed(2)}</p>
        <p className="font-bold text-lg border-t pt-1">Total: {data.currency} {data.total.toFixed(2)}</p>
      </div>
      {data.notes && <div className="mt-6 border-t pt-3 text-xs text-gray-500">Notes: {data.notes}</div>}
    </div>
  );
}
