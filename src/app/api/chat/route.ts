import { NextRequest, NextResponse } from "next/server";
import { processChat, InvoiceData } from "@/utils/ai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, currentData, conversationHistory = [], useGemini = false } = body as {
      message: string;
      currentData: InvoiceData;
      conversationHistory: string[];
      useGemini?: boolean;
    };

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const result = await processChat(message, currentData, conversationHistory, useGemini);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
