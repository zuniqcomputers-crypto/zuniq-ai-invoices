import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const doc = new jsPDF();
    
    // Add Brand Header
    doc.setFillColor(16, 163, 74); // Emerald-600
    doc.rect(0, 0, 210, 5, 'F');
    
    doc.setFontSize(22);
    doc.setTextColor(20, 20, 20);
    doc.text("INVOICE", 150, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`ID: ZIQ-${Math.floor(Math.random() * 10000)}`, 150, 32);
    doc.text(`Issued: ${new Date().toLocaleDateString()}`, 150, 37);

    // Sender & Client
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("FROM:", 20, 50);
    doc.text(data.sender || "Zuniq Studio User", 20, 57);
    
    doc.text("BILL TO:", 120, 50);
    doc.text(data.client || "Valued Client", 120, 57);

    // Table
    const tableBody = data.items.map((item: any) => [
      item.desc,
      `${data.currency || '$'} ${item.price.toLocaleString()}`
    ]);

    (doc as any).autoTable({
      startY: 70,
      head: [['Description', 'Amount']],
      body: tableBody.length > 0 ? tableBody : [['No items listed', '$ 0.00']],
      headStyles: { fill: [16, 163, 74], textColor: [255, 255, 255] },
      alternateRowStyles: { fill: [245, 247, 240] },
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`TOTAL DUE: ${data.currency || '$'} ${data.total.toLocaleString()}`, 140, finalY + 10);

    const pdfOutput = doc.output('arraybuffer');
    return new NextResponse(pdfOutput, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
