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

/* ─── Helpers ─── */
function calculateTotals(data: InvoiceData) {
  const subtotal = data.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * Math.max(0, data.tax_percentage)) / 100 - (data.discount || 0);
  return { subtotal, total };
}

/* ─── Client memory (localStorage) ─── */
function getClientMemory(): { name: string; email: string; phone: string; address: string }[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("zuniq_clients") || "[]");
  } catch { return []; }
}

function saveClientToMemory(client: { name: string; email: string; phone: string; address: string }) {
  if (typeof window === "undefined") return;
  const clients = getClientMemory();
  const exists = clients.find(c => c.name.toLowerCase() === client.name.toLowerCase());
  if (!exists) {
    clients.push(client);
    localStorage.setItem("zuniq_clients", JSON.stringify(clients.slice(-20))); // keep last 20
  }
}

/* ─── Free-form command parser ─── */
function tryParseCommand(input: string): Partial<InvoiceData> | null {
  const lower = input.toLowerCase();
  // Pattern: "create an invoice for [client], [items], due in [days], [tax/discount]"
  const match = lower.match(
    /(?:create|new|make)\s+(?:an?\s+)?invoice\s+(?:for\s+)?([^,]+),\s*(.+)/i
  );
  if (!match) return null;

  const clientName = match[1].trim();
  const rest = match[2].trim();
  const parsed: Partial<InvoiceData> = { client_name: clientName };

  // Extract due date
  const dueMatch = rest.match(/due\s+in\s+(\d+)\s*days?/i);
  if (dueMatch) {
    const days = parseInt(dueMatch[1]);
    const due = new Date();
    due.setDate(due.getDate() + days);
    parsed.due_date = due.toISOString().split("T")[0];
  }

  // Extract items – look for "X items" or "X design pages", etc.
  const itemsMatch = rest.match(/(\d+)\s*([\w\s]+?)(?:\s*,\s*|$)/);
  if (itemsMatch) {
    const qty = parseInt(itemsMatch[1]);
    const desc = itemsMatch[2].trim();
    parsed.items = [{ description: desc, quantity: qty, unit_price: 0 }];
  }

  // Extract advance / deposit
  const advanceMatch = rest.match(/(\d+)%\s*(advance|deposit)/i);
  if (advanceMatch) {
    const percent = parseInt(advanceMatch[1]);
    parsed.notes = `${percent}% advance payment required.`;
  }

  // Tax
  const taxMatch = rest.match(/tax\s+(\d+)%?/i);
  if (taxMatch) parsed.tax_percentage = parseInt(taxMatch[1]);

  // Discount
  const discountMatch = rest.match(/discount\s+(\d+)/i);
  if (discountMatch) parsed.discount = parseInt(discountMatch[1]);

  return parsed;
}

/* ─── Field definitions ─── */
const fieldOrder: { key: keyof InvoiceData; question: string; hint: string; sensible?: boolean }[] = [
  { key: "business_name", question: "What's your business name? 😊", hint: "Your company or personal name.", sensible: true },
  { key: "business_email", question: "What's your business email? 📧", hint: "e.g. hello@example.com", sensible: true },
  { key: "business_phone", question: "What's your business phone number? 📞", hint: "Optional, but it looks professional.", sensible: true },
  { key: "trn_number", question: "Got a TRN (Tax Registration Number)? 🔢", hint: "Type it if you have one, or just say 'skip'." },
  { key: "business_logo_url", question: "Do you have a logo? 🎨 You can upload one later or skip.", hint: "Makes your invoice stand out!" },
  { key: "client_name", question: "Who is the client? 👤", hint: "The person or company you're billing.", sensible: true },
  { key: "client_email", question: "What's the client's email? 📬", hint: "So they can get a copy.", sensible: true },
  { key: "client_phone", question: "Client phone number? 📱", hint: "Optional but useful.", sensible: true },
  { key: "client_address", question: "What's the client's address? 🏠", hint: "City or full address.", sensible: true },
  { key: "currency", question: "Which currency should we use? 💰", hint: "Like USD, EUR, AED, PKR...", sensible: true },
  { key: "items", question: "What service or products did you provide? 🛠️", hint: "Describe the work and the price, like 'Logo design 500 USD'." },
  { key: "tax_percentage", question: "Any tax percentage? 🧾", hint: "Just the number, like 5. Or type 0." },
  { key: "discount", question: "Any discount? 🏷️", hint: "Amount or percentage, or 0." },
  { key: "due_date", question: "When is the due date? 📅", hint: "e.g. 2026-06-30" },
  { key: "qr_code_data", question: "Add a QR code? (payment link, etc.) 📲", hint: "Optional, type 'skip' if none." },
  { key: "notes", question: "Any notes or payment instructions? 📝", hint: "'Payment due within 15 days' or 'Thank you!'" },
];

const genericInvalid = [
  "ok", "okay", "yes", "no", "fine", "good", "well", "sure", "yep", "nope",
  "maybe", "nothing", "none", "idk", "i don't know", "asdf", "xyz", "test",
  "unknown", "n/a", "na", "hmm", "lol", "k", "yeah", "nah", "what", "why"
];

function isSensibleAnswer(key: string, answer: string): boolean {
  const lower = answer.trim().toLowerCase();
  if (genericInvalid.includes(lower)) return false;
  if (key === "business_name" || key === "client_name") {
    if (lower.length < 2) return false;
    if (/^[0-9]+$/.test(lower)) return false;
  }
  if (key === "business_email" || key === "client_email") {
    if (!answer.includes("@") || !answer.includes(".")) return false;
  }
  if (key === "business_phone" || key === "client_phone") {
    if (!/\d/.test(answer) || answer.length < 5) return false;
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
    data.currency = trimmed.toUpperCase() || "USD";
  } else {
    (data as any)[key] = trimmed;
  }
}

/* ─── Rule‑Based Chat (now with command parsing + client memory) ─── */
function ruleBasedChat(msg: string, currentData: InvoiceData, history: string[]): { reply: string; updatedData: InvoiceData } {
  const data = { ...currentData, items: currentData.items.map(i => ({ ...i })) };
  const t = msg.trim();
  const lower = t.toLowerCase();

  // 1. Try free-form command first
  const commandParsed = tryParseCommand(t);
  if (commandParsed) {
    const updated = { ...data, ...commandParsed } as InvoiceData;
    // If client name was filled, save to memory
    if (commandParsed.client_name) {
      saveClientToMemory({
        name: commandParsed.client_name,
        email: updated.client_email || "",
        phone: updated.client_phone || "",
        address: updated.client_address || "",
      });
    }
    const totals = calculateTotals(updated);
    updated.subtotal = totals.subtotal;
    updated.total = totals.total;
    return {
      reply: "I've pre-filled the invoice from your description! You can adjust any field in the preview. What would you like to change?",
      updatedData: updated,
    };
  }

  // 2. Greetings
  if (["hello", "hi", "hey", "yo", "good morning"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    return {
      reply: nextIdx === -1
        ? "Hey! All details are filled. You can preview or finalize."
        : `Hey! 👋 Let's create your invoice. ${fieldOrder[nextIdx].question}`,
      updatedData: data,
    };
  }

  // 3. Thanks
  if (["thanks", "thank you", "thx"].some(g => lower.includes(g))) {
    return { reply: "You're welcome! 😊", updatedData: data };
  }

  // 4. Help
  if (["help", "not sure", "idk", "confused"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    if (nextIdx === -1) return { reply: "All set! Review and finalize.", updatedData: data };
    return { reply: `No problem! ${fieldOrder[nextIdx].hint}`, updatedData: data };
  }

  // 5. Client suggestion (if user types 'use last client' or 'repeat')
  if (lower.match(/use (last|previous|same) client/i)) {
    const clients = getClientMemory();
    if (clients.length > 0) {
      const last = clients[clients.length - 1];
      data.client_name = last.name;
      data.client_email = last.email;
      data.client_phone = last.phone;
      data.client_address = last.address;
      const nextIdx = getNextMissing(data);
      return {
        reply: `Loaded your last client: ${last.name}. ${nextIdx !== -1 ? fieldOrder[nextIdx].question : "All details are filled."}`,
        updatedData: data,
      };
    }
  }

  const missingIdx = getNextMissing(data);
  if (missingIdx === -1) {
    const totals = calculateTotals(data);
    data.subtotal = totals.subtotal;
    data.total = totals.total;
    return { reply: "All done! 🎉 You can preview or finalize.", updatedData: data };
  }

  const fieldKey = fieldOrder[missingIdx].key;

  // Error prevention: reject nonsensical answers
  if (fieldOrder[missingIdx].sensible && !isSensibleAnswer(fieldKey, t)) {
    return {
      reply: `Hmm, "${t}" doesn't seem right for ${fieldKey.replace(/_/g, " ")}. ${fieldOrder[missingIdx].hint}`,
      updatedData: data,
    };
  }

  applyAnswer(data, missingIdx, t);

  // Save client to memory if we just got client name
  if (fieldKey === "client_name" && data.client_name.trim() !== "") {
    saveClientToMemory({
      name: data.client_name,
      email: data.client_email,
      phone: data.client_phone,
      address: data.client_address,
    });
  }

  const totals = calculateTotals(data);
  data.subtotal = totals.subtotal;
  data.total = totals.total;

  const nextIdx = getNextMissing(data);
  if (nextIdx === -1) return { reply: "Awesome! All fields are ready. You can preview or finalize.", updatedData: data };
  return { reply: `Great! 👍 ${fieldOrder[nextIdx].question}`, updatedData: data };
}

/* ─── Gemini AI (unchanged) ─── */
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";

const GEMINI_SYSTEM_PROMPT = `You are Zuniq, a super friendly AI invoice assistant. Help the user create an invoice step by step. Be warm, encouraging, and use emojis. Never accept nonsense answers. If the user gives a free-form command like "Create an invoice for Ali, 3 design pages, due in 7 days", you must fill the invoice data accordingly and return it in the JSON response. Output ONLY a JSON object: { "reply": "...", "updatedData": {...} }`;

async function geminiChat(msg: string, currentData: InvoiceData, history: string[]): Promise<{ reply: string; updatedData: InvoiceData }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prev = history.map((m, i) => `[${i % 2 === 0 ? "AI" : "User"}]: ${m}`).join("\n");
  const fullPrompt = `${GEMINI_SYSTEM_PROMPT}\n\nCurrent data: ${JSON.stringify(currentData)}\nConversation: ${prev}\nUser: ${msg}`;

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
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

/* ─── Main Export ─── */
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
  return ruleBasedChat(msg, currentData, history);
}
