import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Invoice from "@/models/Invoice";
import { generateInvoicePDF } from "@/utils/pdfGenerator";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const invoice = await Invoice.findOne({ invoice_id: params.id });
  if (!invoice) return new NextResponse("Not found", { status: 404 });

  const pdfBuffer = await generateInvoicePDF(invoice.toObject());

  // Convert Node.js Buffer to a proper ArrayBuffer
  const arrayBuffer = new Uint8Array(pdfBuffer).buffer;

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${params.id}.pdf`,
    },
  });
}

export const dynamic = 'force-dynamic';
