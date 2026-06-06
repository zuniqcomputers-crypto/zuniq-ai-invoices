import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";
import { getSessionId } from "@/lib/session";

// Generate a unique invoice ID with a random suffix
function generateUniqueId() {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ZIQ-${randomPart}`;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const sessionId = getSessionId();
    const body = await req.json();

    // Try up to 3 times in case of duplicate key
    let attempts = 0;
    while (attempts < 3) {
      try {
        const invoice_id = body.invoice_id || generateUniqueId();
        const newInvoice = new Invoice({
          ...body,
          invoice_id,
          session_id: sessionId,
          issue_date: body.issue_date || new Date().toISOString().split("T")[0],
        });
        await newInvoice.save();
        return NextResponse.json({ success: true, invoice: newInvoice }, { status: 201 });
      } catch (error: any) {
        if (error.code === 11000) {
          attempts++;
          continue; // Duplicate ID, try again with a new random ID
        }
        throw error;
      }
    }
    // If all attempts fail, return error
    return NextResponse.json(
      { error: "Failed to generate a unique invoice ID after several attempts" },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error", details: error.toString() },
      { status: 500 }
    );
  }
}
