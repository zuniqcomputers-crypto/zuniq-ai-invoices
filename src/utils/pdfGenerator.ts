import jsPDF from "jspdf";
import "jspdf-autotable";
import { IInvoice } from "@/models/Invoice";

export async function generateInvoicePDF(invoice: IInvoice): Promise<Buffer> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(20);
  doc.text("INVOICE", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Invoice #: ${invoice.invoice_id}`, 14, 40);
  doc.text(`Date: ${invoice.issue_date}`, 14, 48);
  doc.text(`Due Date: ${invoice.due_date}`, 14, 56);

  doc.text("From:", 14, 70);
  doc.text(invoice.business_name, 14, 78);
  doc.text(invoice.business_email, 14, 86);
  doc.text("To:", 120, 70);
  doc.text(invoice.client_name, 120, 78);
  doc.text(invoice.client_email, 120, 86);
  doc.text(invoice.client_address, 120, 94);

  const tableColumn = ["Description", "Qty", "Unit Price", "Amount"];
  const tableRows = invoice.items.map(item => [
    item.description,
    item.quantity.toString(),
    `${invoice.currency} ${item.unit_price.toFixed(2)}`,
    `${invoice.currency} ${(item.quantity * item.unit_price).toFixed(2)}`,
  ]);

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 110,
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.text(`Subtotal: ${invoice.currency} ${invoice.subtotal.toFixed(2)}`, 140, finalY);
  doc.text(`Tax (${invoice.tax_percentage}%): ${invoice.currency} ${((invoice.subtotal * invoice.tax_percentage) / 100).toFixed(2)}`, 140, finalY + 8);
  doc.text(`Discount: ${invoice.currency} ${invoice.discount.toFixed(2)}`, 140, finalY + 16);
  doc.setFontSize(14);
  doc.text(`Total: ${invoice.currency} ${invoice.total.toFixed(2)}`, 140, finalY + 28);

  if (invoice.notes) {
    doc.setFontSize(11);
    doc.text(`Notes: ${invoice.notes}`, 14, finalY + 40);
  }

  return Buffer.from(doc.output("arraybuffer"));
}
