import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";

// GET – fetch a single invoice
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const invoice = await Invoice.findOne({ invoice_id: params.id });
  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ invoice });
}

// PUT – update an existing invoice
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoice_id: params.id },
      { $set: body },
      { new: true }
    );
    if (!updatedInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, invoice: updatedInvoice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Update failed" }, { status: 500 });
  }
}

// DELETE – (optional) already exists? If not, keep it.
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  await Invoice.findOneAndDelete({ invoice_id: params.id });
  return NextResponse.json({ success: true });
}
