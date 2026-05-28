import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";
import { getSessionId } from "@/lib/session";

export async function GET(req: NextRequest) {
  await dbConnect();
  const invoices = await Invoice.find({ session_id: getSessionId() }).sort({ createdAt: -1 });
  return NextResponse.json({ invoices });
}
export const dynamic = 'force-dynamic';
