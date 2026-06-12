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

// ─── Rule‑Based AI (with intelligent phrase extraction) ───
const fieldOrder: { key: keyof InvoiceData; question: string; hint: string; sensible?: boolean }[] = [
  { key: "business_name", question: "What is your business name?", hint: "Your company or personal name.", sensible: true },
  { key: "business_email", question: "What's your business email?", hint: "e.g. hello@example.com" },
  { key: "business_phone", question: "What's your business phone number?", hint: "e.g. 00971507024817" },
  { key: "trn_number", question: "What is your TRN (Tax Registration Number)?", hint: "e.g. 104790700900001" },
  { key: "business_logo_url", question: "Do you have a logo? You can upload one later, or type 'skip'.", hint: "You can paste a URL or upload a file from the edit form." },
  { key: "client_name", question: "Who is the client?", hint: "Client's full name.", sensible: true },
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

const invalidNames = ["no name", "nothing", "none", "asdf", "xyz", "test", "unknown", "n/a", "na"];

function isSensibleAnswer(key: string, answer: string): boolean {
  if (key === "business_name" || key === "client_name") {
    const lower = answer.trim().toLowerCase();
    if (lower.length < 2 || invalidNames.includes(lower)) return false;
    if (/^[a-z0-9]{1}$/.test(lower)) return false;
  }
  if (key === "business_email" || key === "client_email") {
    const trimmed = answer.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".")) return false;
  }
  return true;
}

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
  let trimmed = answer.trim();

  // ---- Intelligent extraction for common phrases ----
  const phrasePatterns = [
    /(?:my |the )?business name (?:is|:)\s+(.+)/i,
    /(?:my |the )?client name (?:is|:)\s+(.+)/i,
    /(?:my |the )?email (?:is|:)\s+(.+)/i,
    /(?:my |the )?phone (?:number\s*)?(?:is|:)\s+(.+)/i,
    /(?:my |the )?address (?:is|:)\s+(.+)/i,
    /(?:my |the )?trn (?:is|:)\s+(.+)/i,
  ];
  for (const pattern of phrasePatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      trimmed = match[1].trim();
      break;
    }
  }

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

function ruleBasedChat(msg: string, currentData: InvoiceData): { reply: string; updatedData: InvoiceData } {
  const data = { ...currentData, items: currentData.items.map((i) => ({ ...i })) };
  const t = msg.trim();
  const lower = t.toLowerCase();

  if (["hello", "hi", "hey", "good morning"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    return {
      reply: nextIdx === -1 ? "Hello! All details filled." : `Hello! ${fieldOrder[nextIdx].question}`,
      updatedData: data,
    };
  }
  if (["thanks", "thank you", "thx"].some(g => lower.includes(g))) {
    return { reply: "You're welcome! 😊", updatedData: data };
  }
  if (["help", "not sure", "idk"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    if (nextIdx === -1) return { reply: "All set!", updatedData: data };
    return { reply: `No problem! ${fieldOrder[nextIdx].hint}`, updatedData: data };
  }

  const missingIdx = getNextMissing(data);
  if (missingIdx === -1) {
    const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
    const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
    data.subtotal = subtotal;
    data.total = total;
    return { reply: "All information collected! You can review and finalize.", updatedData: data };
  }

  // Check sensible answer
  const fieldKey = fieldOrder[missingIdx].key;
  if (fieldOrder[missingIdx].sensible && !isSensibleAnswer(fieldKey, t)) {
    return {
      reply: `That doesn't seem like a valid ${fieldKey.replace(/_/g, " ")}. ${fieldOrder[missingIdx].hint} Please try again.`,
      updatedData: data,
    };
  }

  applyAnswer(data, missingIdx, t);
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
  data.subtotal = subtotal;
  data.total = total;

  const nextIdx = getNextMissing(data);
  if (nextIdx === -1) return { reply: "All information collected! You can review and finalize.", updatedData: data };
  return { reply: fieldOrder[nextIdx].question, updatedData: data };
}

// ─── Gemini AI (with reliable model) ───
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";

async function geminiChat(msg: string, currentData: InvoiceData, history: string[]): Promise<{ reply: string; updatedData: InvoiceData }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prev = history.map((m, i) => `[${i % 2 === 0 ? "AI" : "User"}]: ${m}`).join("\n");
  const prompt = `You are an invoice assistant. Current data: ${JSON.stringify(currentData)}. Conversation: ${prev}. User: ${msg}. Output ONLY: {"reply":"...", "updatedData": {...}}`;

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1500 },
    }),
  });

  if (!res.ok) throw new Error("Gemini API failed");
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No response");
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Invalid JSON");
  const parsed = JSON.parse(match[0]);
  const updated = { ...currentData, ...parsed.updatedData };
  return { reply: parsed.reply, updatedData: updated };
}

// ─── Main Export ───
export async function processChat(
  msg: string,
  currentData: InvoiceData,
  history: string[],
  useGemini: boolean = false
): Promise<{ reply: string; updatedData: InvoiceData }> {
  if (useGemini) {
    try {
      return await geminiChat(msg, currentData, history);
    } catch (e) {
      console.error("Gemini failed, falling back to rule-based AI", e);
    }
  }
  return ruleBasedChat(msg, currentData);
}
