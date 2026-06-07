export interface InvoiceData {
  invoice_id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  trn_number: string;
  business_logo_url: string;
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

// Ordered list of fields, exactly as before
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

// Find first missing field index, or -1 if all filled
function getNextMissing(data: InvoiceData): number {
  for (let i = 0; i < fieldOrder.length; i++) {
    const key = fieldOrder[i].key;
    const val = data[key];
    if (key === "items") {
      const hasDescription = data.items.length > 0 && data.items.some(item => item.description.trim() !== "");
      if (!hasDescription) return i;
    } else if (key === "tax_percentage" || key === "discount") {
      if (val === -1) return i;
    } else if (key === "currency") {
      if (typeof val !== "string" || val.trim() === "") return i;
    } else if (typeof val === "string" && val.trim() === "") {
      return i;
    }
  }
  return -1;
}

// Try to detect which field the user wants to correct based on their message
function detectCorrection(text: string, data: InvoiceData): { field: keyof InvoiceData; value: string } | null {
  const lower = text.toLowerCase().trim();

  // Mapping of field keys to phrases that indicate a correction for that field
  const fieldPhrases: { key: keyof InvoiceData; patterns: RegExp[] }[] = [
    {
      key: "business_name",
      patterns: [
        /(?:business|company)\s+name\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:my)?\s*(?:business|company)\s+name\s+(?:is|should be)\s+(.+)/i,
        /^business\s+name\s+(?:is|:)\s+(.+)/i,
      ]
    },
    {
      key: "business_email",
      patterns: [
        /(?:business|company)\s+email\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:my)?\s*(?:business|company)\s+email\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "business_phone",
      patterns: [
        /(?:business|company)\s+phone\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:my)?\s*(?:business|company)\s+phone\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "trn_number",
      patterns: [
        /trn\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:my)?\s*trn\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "client_name",
      patterns: [
        /client\s+name\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*client\s+name\s+(?:is|should be)\s+(.+)/i,
        /(?:it's|its)\s+(?:client\s+)?(?:name\s+)?(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "client_email",
      patterns: [
        /client\s+email\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*client\s+email\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "client_phone",
      patterns: [
        /client\s+phone\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*client\s+phone\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "client_address",
      patterns: [
        /client\s+address\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*client\s+address\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "currency",
      patterns: [
        /currency\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*currency\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "due_date",
      patterns: [
        /due\s+date\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*due\s+date\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "notes",
      patterns: [
        /notes?\s+(?:should be|actually|is)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*notes?\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "tax_percentage",
      patterns: [
        /tax\s+percentage\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*tax\s+(?:percentage\s+)?(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "discount",
      patterns: [
        /discount\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*discount\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "qr_code_data",
      patterns: [
        /qr\s+code\s+(?:data|text|link|url)\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*qr\s+code\s+(?:data|text|link|url)\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "business_logo_url",
      patterns: [
        /logo\s+url\s+(?:is|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*logo\s+url\s+(?:is|should be)\s+(.+)/i,
      ]
    },
    {
      key: "items",
      patterns: [
        /(?:items?|service|product)\s+(?:description|should be|actually)\s+(.+)/i,
        /(?:no|wrong)\s+(?:the)?\s*(?:items?|service|product)\s+(?:is|should be)\s+(.+)/i,
      ]
    },
  ];

  for (const { key, patterns } of fieldPhrases) {
    for (const pattern of patterns) {
      const match = lower.match(pattern);
      if (match) {
        return { field: key, value: match[1].trim() };
      }
    }
  }

  // General "no, it's X" – if user says "no, it's" or "actually it's", we assume they want to correct the last thing the AI asked about.
  // We can't know which field, so we'll skip this for safety. But we can add a very simple rule: if the message contains "no" and then a clear value, we'll treat it as a correction for the last field we asked about. However, that's fragile, so we rely on the explicit patterns above.
  return null;
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

function applyCorrection(data: InvoiceData, field: keyof InvoiceData, value: string) {
  if (field === "tax_percentage" || field === "discount") {
    const num = parseFloat(value);
    (data as any)[field] = isNaN(num) ? 0 : num;
  } else if (field === "items") {
    // For simplicity, just replace the first item's description, but keep quantity/price
    if (data.items.length > 0) {
      data.items[0].description = value;
    } else {
      data.items = [{ description: value, quantity: 1, unit_price: 0 }];
    }
  } else {
    (data as any)[field] = value.trim();
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

  // ---- Correction detection ----
  const correction = detectCorrection(t, data);
  if (correction) {
    applyCorrection(data, correction.field, correction.value);
    // Recalculate totals
    const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
    const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
    data.subtotal = subtotal;
    data.total = total;

    const nextIdx = getNextMissing(data);
    if (nextIdx === -1) {
      return {
        reply: `Got it! I've updated ${correction.field.replace(/_/g, ' ')}. All details are complete. You can review and finalize.`,
        updatedData: data,
      };
    }
    return {
      reply: `Thanks for the correction! I've updated ${correction.field.replace(/_/g, ' ')}. ${fieldOrder[nextIdx].question}`,
      updatedData: data,
    };
  }

  // ---- Normal flow: answer the current missing field ----
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
