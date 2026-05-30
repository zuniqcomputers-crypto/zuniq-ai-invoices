import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";
import { getSessionId } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const sessionId = getSessionId();
    const body = await req.json();
    const count = await Invoice.countDocuments({ session_id: sessionId });
    const invoice_id = body.invoice_id || `ZIQ-${String(count + 1).padStart(4, "0")}`;

    const newInvoice = new Invoice({
      ...body,
      invoice_id,
      session_id: sessionId,
      issue_date: body.issue_date || new Date().toISOString().split("T")[0],
    });
    await newInvoice.save();
    return NextResponse.json({ success: true, invoice: newInvoice }, { status: 201 });
  } catch (error: any) {
    // Return the real error message in the response
    return NextResponse.json(
      { error: error.message || "Server error", details: error.toString() },
      { status: 500 }
    );
  }
}
