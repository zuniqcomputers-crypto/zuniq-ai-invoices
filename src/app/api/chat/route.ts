import { NextRequest, NextResponse } from "next/server";
import { processChat, InvoiceData } from "@/utils/ai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, currentData, conversationHistory = [] } = body as {
    message: string;
    currentData: InvoiceData;
    conversationHistory: string[];
  };

  if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });

  try {
    const result = processChat(message, currentData, conversationHistory);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
