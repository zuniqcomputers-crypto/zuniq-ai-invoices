import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const invoice = await Invoice.findOne({ invoice_id: params.id });
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ invoice });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  await Invoice.findOneAndDelete({ invoice_id: params.id });
  return NextResponse.json({ success: true });
}
