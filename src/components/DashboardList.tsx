"use client";
import React from 'react';
import Link from 'next/link';
import { Trash2, Download } from 'lucide-react';

interface Invoice {
  _id: string;
  invoice_id: string;
  client_name: string;
  total: number;
  currency: string;
  createdAt: string;
}

export default function DashboardList({ invoices, onDelete }: { invoices: Invoice[], onDelete: (id: string) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-400 text-[10px]">ID</th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-400 text-[10px]">Client</th>
            <th className="px-6 py-4 font-bold uppercase tracking-wider text-slate-400 text-[10px]">Amount</th>
            <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-slate-400 text-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {invoices.map((inv) => (
            <tr key={inv._id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{inv.invoice_id}</td>
              <td className="px-6 py-4 text-slate-600">{inv.client_name}</td>
              <td className="px-6 py-4 font-bold text-[#4f46e5]">{inv.currency} {inv.total.toLocaleString()}</td>
              <td className="px-6 py-4 text-right space-x-3">
                <a href={`/api/invoice/${inv._id}/pdf`} className="inline-flex p-2 text-slate-400 hover:text-[#4f46e5]"><Download size={18} /></a>
                <button onClick={() => onDelete(inv._id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
