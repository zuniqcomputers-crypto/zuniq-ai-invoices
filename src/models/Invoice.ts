import mongoose, { Schema, Document } from "mongoose";

export interface IInvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface IInvoice extends Document {
  invoice_id: string;
  session_id: string;
  business_name: string;
  business_email: string;
  client_name: string;
  client_email: string;
  client_address: string;
  items: IInvoiceItem[];
  subtotal: number;
  tax_percentage: number;
  discount: number;
  total: number;
  currency: string;
  due_date: string;
  issue_date: string;
  notes: string;
  status: "paid" | "unpaid";
  createdAt: Date;
}

const InvoiceItemSchema = new Schema<IInvoiceItem>({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unit_price: { type: Number, required: true, default: 0 },
});

const InvoiceSchema = new Schema<IInvoice>({
  invoice_id: { type: String, required: true, unique: true },
  session_id: { type: String, required: true, index: true },
  business_name: { type: String, default: "" },
  business_email: { type: String, default: "" },
  client_name: { type: String, default: "" },
  client_email: { type: String, default: "" },
  client_address: { type: String, default: "" },
  items: [InvoiceItemSchema],
  subtotal: { type: Number, default: 0 },
  tax_percentage: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  currency: { type: String, default: "USD" },
  due_date: { type: String, default: "" },
  issue_date: { type: String, default: "" },
  notes: { type: String, default: "" },
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);
