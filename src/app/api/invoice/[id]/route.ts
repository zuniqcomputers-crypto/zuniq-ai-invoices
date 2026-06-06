import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const invoice = await Invoice.findOne({ invoice_id: params.id });
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ invoice });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const updated = await Invoice.findOneAndUpdate(
      { invoice_id: params.id },
      { $set: body },
      { new: true }
    );
    if (!updated) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    return NextResponse.json({ success: true, invoice: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  await Invoice.findOneAndDelete({ invoice_id: params.id });
  return NextResponse.json({ success: true });
}
