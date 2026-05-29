import { NextRequest, NextResponse } from "next/server";
import { processChat, InvoiceData } from "@/utils/ai";

// Force dynamic to avoid static prerendering issues
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, currentData, conversationHistory = [] } = body as {
      message: string;
      currentData: InvoiceData;
      conversationHistory: string[];
    };

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const result = processChat(message, currentData, conversationHistory);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

// If any other method is used, return 405
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
