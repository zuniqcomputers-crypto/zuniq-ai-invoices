export interface InvoiceData {
  invoice_id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  trn_number: string;
  business_logo_url: string;
  signature_url: string;
  qr_code_data: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  items: { description: string; quantity: number; unit_price: number }[];
  subtotal: number;
  tax_percentage: number;
  discount: number;
  total: number;
  currency: string;
  due_date: string;
  issue_date: string;
  notes: string;
}

const fieldOrder: { key: keyof InvoiceData; question: string; hint: string }[] = [
  { key: "business_name", question: "What is your business name?", hint: "e.g. Pharmacos Skincare Trading FZC" },
  { key: "business_email", question: "What's your business email?", hint: "e.g. official@example.com" },
  { key: "business_phone", question: "What's your business phone number?", hint: "e.g. 00971507024817" },
  { key: "trn_number", question: "What is your TRN (Tax Registration Number)?", hint: "e.g. 104790700900001" },
  { key: "business_logo_url", question: "Do you have a logo? You can upload one later in the editor, or type 'skip'.", hint: "You can paste a URL or upload a file from the edit form." },
  { key: "client_name", question: "Who is the client?", hint: "Client's full name." },
  { key: "client_email", question: "What is the client's email?", hint: "Client email address." },
  { key: "client_phone", question: "What is the client's phone number?", hint: "e.g. 056 950 5008" },
  { key: "client_address", question: "What is the client's address?", hint: "City or full address." },
  { key: "currency", question: "Which currency should we use? (USD, EUR, AED, etc.)", hint: "e.g. AED" },
  { key: "items", question: "What service or products did you provide? Describe the items and prices.", hint: "e.g. Disaar sunscreen 2 x 11.50 AED" },
  { key: "tax_percentage", question: "Any tax percentage? (just the number, or 0 for none)", hint: "e.g. 5" },
  { key: "discount", question: "Any discount amount?", hint: "e.g. 100 or 0 for none" },
  { key: "due_date", question: "What is the due date? (e.g., 2026-06-15)", hint: "Date format: YYYY-MM-DD" },
  { key: "qr_code_data", question: "Any QR code? Enter text or URL to encode (or type 'none')", hint: "e.g. your payment link" },
  { key: "notes", question: "Any payment instructions or additional notes?", hint: "e.g. 'Credit, payment due within 30 days'" },
];

function getNextMissing(data: InvoiceData): number {
  for (let i = 0; i < fieldOrder.length; i++) {
    const key = fieldOrder[i].key;
    const val = data[key];
    if (key === "items") {
      const hasDescription = data.items.length > 0 && data.items.some(item => item.description.trim() !== "");
      if (!hasDescription) return i;
    } else if (key === "tax_percentage" || key === "discount") {
      if (val === -1) return i;
    } else if (typeof val === "string" && val.trim() === "") {
      return i;
    }
  }
  return -1;
}

function applyAnswer(data: InvoiceData, fieldIndex: number, answer: string) {
  const key = fieldOrder[fieldIndex].key;
  const trimmed = answer.trim();

  if (key === "items") {
    const parts = trimmed.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*$/);
    if (parts) {
      data.items = [{ description: parts[1], quantity: 1, unit_price: parseFloat(parts[2]) }];
    } else {
      data.items = [{ description: trimmed, quantity: 1, unit_price: 0 }];
    }
  } else if (key === "tax_percentage" || key === "discount") {
    const num = parseFloat(trimmed);
    (data as any)[key] = isNaN(num) ? 0 : num;
  } else if (key === "currency") {
    data.currency = trimmed.toUpperCase() || "AED";
  } else {
    (data as any)[key] = trimmed;
  }
}

export function processChat(
  msg: string,
  currentData: InvoiceData,
  history: string[]
): { reply: string; updatedData: InvoiceData } {
  const data = { ...currentData, items: currentData.items.map((i) => ({ ...i })) };
  const t = msg.trim();
  const lower = t.toLowerCase();

  // Greetings
  if (["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "yo"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    return {
      reply: nextIdx === -1
        ? "Hello! All invoice details are filled. You can review and finalize."
        : `Hello! ${fieldOrder[nextIdx].question}`,
      updatedData: data,
    };
  }

  // Thanks
  if (["thanks", "thank you", "thx", "appreciate"].some(g => lower.includes(g))) {
    return { reply: "You're welcome! 😊", updatedData: data };
  }

  // Help
  if (["help", "not sure", "what do you mean", "idk", "i don't know", "confused"].some(phrase => lower.includes(phrase))) {
    const nextIdx = getNextMissing(data);
    if (nextIdx === -1) return { reply: "All set! You can finalize the invoice.", updatedData: data };
    return { reply: `No problem! ${fieldOrder[nextIdx].hint}`, updatedData: data };
  }

  // Find first missing field
  const missingIdx = getNextMissing(data);

  if (missingIdx === -1) {
    const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
    const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
    data.subtotal = subtotal;
    data.total = total;
    return {
      reply: "All information collected! You can review your invoice on the right. Want to make changes or finalize?",
      updatedData: data,
    };
  }

  applyAnswer(data, missingIdx, t);

  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
  data.subtotal = subtotal;
  data.total = total;

  const nextIdx = getNextMissing(data);
  if (nextIdx === -1) {
    return {
      reply: "All information collected! You can review your invoice on the right. Want to make changes or finalize?",
      updatedData: data,
    };
  }

  return {
    reply: fieldOrder[nextIdx].question,
    updatedData: data,
  };
}
