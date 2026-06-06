export interface InvoiceData {
  invoice_id: string;
  business_name: string;
  business_email: string;
  client_name: string;
  client_email: string;
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
  { key: "business_name", question: "What is your business name?", hint: "Your company or personal name." },
  { key: "business_email", question: "What's your business email?", hint: "e.g. hello@example.com" },
  { key: "client_name", question: "Who is the client?", hint: "The client's full name." },
  { key: "client_email", question: "What is the client's email?", hint: "Client email address." },
  { key: "client_address", question: "What is the client's address?", hint: "City or full address." },
  { key: "currency", question: "Which currency should we use? (USD, EUR, PKR, etc.)", hint: "e.g. USD" },
  { key: "items", question: "What service did you provide? Describe it and the price.", hint: "e.g. Logo design 5000 PKR" },
  { key: "tax_percentage", question: "Any tax percentage? (just the number)", hint: "e.g. 10" },
  { key: "discount", question: "Any discount amount?", hint: "e.g. 100 or 5%" },
  { key: "due_date", question: "What is the due date? (e.g., 2026-06-15)", hint: "Date format: YYYY-MM-DD" },
  { key: "notes", question: "Any additional notes for the invoice?", hint: "Payment terms, thank you note, etc." },
];

function getNextMissing(data: InvoiceData): number {
  for (let i = 0; i < fieldOrder.length; i++) {
    const key = fieldOrder[i].key;
    const val = data[key];
    if (key === "items") {
      // Check if there is at least one item with a non‑empty description
      const hasDescription = data.items.length > 0 && data.items.some(item => item.description.trim() !== "");
      if (!hasDescription) return i;
    } else if (typeof val === "string" && val.trim() === "") {
      return i;
    } else if (key === "currency" && (typeof val !== "string" || val.trim() === "")) {
      return i;
    }
    // For numbers (tax, discount), 0 is a valid answer, so we don't treat them as missing
  }
  return -1;
}

function applyAnswer(data: InvoiceData, fieldIndex: number, answer: string) {
  const key = fieldOrder[fieldIndex].key;
  const trimmed = answer.trim();

  if (key === "items") {
    // Accept any answer: use it as the description, set price to 0
    // If the user included a price, we try to extract it, but if we can't, that's okay
    const parts = trimmed.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*$/);
    if (parts) {
      data.items = [{
        description: parts[1],
        quantity: 1,
        unit_price: parseFloat(parts[2]),
      }];
    } else {
      // No clear price at the end – just store the whole thing as description
      data.items = [{
        description: trimmed,
        quantity: 1,
        unit_price: 0,
      }];
    }
  } else if (key === "tax_percentage" || key === "discount") {
    const num = parseFloat(trimmed);
    (data as any)[key] = isNaN(num) ? 0 : num;
  } else if (key === "currency") {
    data.currency = trimmed.toUpperCase() || "USD";
  } else {
    // All string fields: just store the answer
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

  // Find the first missing field
  const missingIdx = getNextMissing(data);

  if (missingIdx === -1) {
    // All fields filled – recalculate totals
    const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
    const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
    data.subtotal = subtotal;
    data.total = total;
    return {
      reply: "All information collected! You can review your invoice on the right. Want to make changes or finalize?",
      updatedData: data,
    };
  }

  // Apply the user's answer to the missing field
  applyAnswer(data, missingIdx, t);

  // After answering, recalculate totals
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
  data.subtotal = subtotal;
  data.total = total;

  // Find the next missing field
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
