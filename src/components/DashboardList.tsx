interface Invoice {
  invoice_id: string;
  client_name: string;
  total: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function DashboardList({ invoices, onDelete }: { invoices: Invoice[]; onDelete: (id: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3">Invoice #</th>
            <th className="px-6 py-3">Client</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-8 text-gray-500">No invoices yet.</td></tr>
          ) : (
            invoices.map((inv) => (
              <tr key={inv.invoice_id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{inv.invoice_id}</td>
                <td className="px-6 py-4">{inv.client_name || "—"}</td>
                <td className="px-6 py-4">{inv.currency} {inv.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${inv.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 space-x-2">
                  <a href={`/api/invoice/${inv.invoice_id}/pdf`} className="text-blue-600 hover:underline text-sm" download>PDF</a>
                  <button onClick={() => onDelete(inv.invoice_id)} className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
