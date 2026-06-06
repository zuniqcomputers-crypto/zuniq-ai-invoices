import { InvoiceData } from "@/utils/ai";

export default function InvoicePreview({ data }: { data: InvoiceData }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{data.business_name || "Your Business"}</h3>
            {data.business_email && <p className="text-indigo-200 text-xs mt-1">{data.business_email}</p>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold tracking-wider">INVOICE</div>
            <div className="text-indigo-200 text-sm mt-1">#{data.invoice_id || "ZIQ-0001"}</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Dates & Client */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Issue Date</p>
            <p className="font-medium text-gray-800">{data.issue_date || "—"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Due Date</p>
            <p className="font-medium text-gray-800">{data.due_date || "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Bill To</p>
            <p className="font-medium text-gray-800">{data.client_name || "Client Name"}</p>
            {data.client_email && <p className="text-gray-500 text-xs">{data.client_email}</p>}
            {data.client_address && <p className="text-gray-500 text-xs">{data.client_address}</p>}
          </div>
        </div>

        {/* Items Table */}
        <div className="border-t border-gray-100 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                <th className="py-2 font-semibold">Description</th>
                <th className="py-2 font-semibold text-center">Qty</th>
                <th className="py-2 font-semibold text-right">Unit Price</th>
                <th className="py-2 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-300 italic">No items added yet</td>
                </tr>
              ) : (
                data.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="py-3 text-gray-800">{item.description || "Service"}</td>
                    <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-600">{data.currency} {item.unit_price.toFixed(2)}</td>
                    <td className="py-3 text-right font-medium text-gray-800">{data.currency} {(item.quantity * item.unit_price).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t border-gray-200 pt-4 space-y-1 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{data.currency} {data.subtotal.toFixed(2)}</span>
          </div>
          {data.tax_percentage > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Tax ({data.tax_percentage}%)</span>
              <span>{data.currency} {((data.subtotal * data.tax_percentage) / 100).toFixed(2)}</span>
            </div>
          )}
          {data.discount > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>-{data.currency} {data.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>{data.currency} {data.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div className="border-t border-gray-100 pt-4 text-xs text-gray-500">
            <p className="font-semibold text-gray-400 mb-1">Notes</p>
            <p>{data.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
