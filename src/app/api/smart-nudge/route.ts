import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function getPaymentProbability(clientEmail: string): Promise<number> {
  return 0.3 + Math.random() * 0.6;
}

export async function POST(req: NextRequest) {
  try {
    const { invoiceId, clientEmail, dueDate } = await req.json();
    if (!invoiceId || !clientEmail || !dueDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const probability = await getPaymentProbability(clientEmail);
    const daysUntilDue = Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    let tone = "friendly";
    if (daysUntilDue <= 2 || probability < 0.5) tone = "firm";
    else if (daysUntilDue <= 7 || probability < 0.8) tone = "polite";

    let emailBody = `This is a friendly reminder that invoice ${invoiceId} is due on ${dueDate}. Thank you for your prompt payment.`;

    if (GEMINI_API_KEY) {
      try {
        const prompt = `Write a short, professional payment reminder email for invoice ${invoiceId}. The client's predicted payment probability is ${(probability * 100).toFixed(0)}%. Due date: ${dueDate} (${daysUntilDue} days from now). Use a ${tone} tone. Keep it under 5 sentences. Do NOT include a subject line.`;
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );
        const geminiData = await geminiRes.json();
        const generated = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated) emailBody = generated;
      } catch (geminiError) {
        console.warn("Gemini failed, using default message");
      }
    }

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: "Zuniq Invoices <invoice@zuniq-invoices.vercel.app>",
        to: clientEmail,
        subject: `Invoice ${invoiceId} – Payment Reminder`,
        text: emailBody,
      });
    }

    return NextResponse.json({ success: true, probability, tone, emailBody });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
