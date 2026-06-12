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

// ─── Rule‑Based AI (friendly & helpful) ───
const fieldOrder: { key: keyof InvoiceData; question: string; hint: string; sensible?: boolean }[] = [
  { key: "business_name", question: "What's your business name? 😊", hint: "Just your company or personal name.", sensible: true },
  { key: "business_email", question: "What's your business email? 📧", hint: "So we can add it to the invoice." },
  { key: "business_phone", question: "What's your business phone number? 📞", hint: "Optional, but it looks professional." },
  { key: "trn_number", question: "Got a TRN (Tax Registration Number)? 🔢", hint: "Type it if you have one, or just say 'skip'." },
  { key: "business_logo_url", question: "Do you have a logo? 🎨 You can upload one later or skip.", hint: "Makes your invoice stand out!" },
  { key: "client_name", question: "Who is the client? 👤", hint: "The person or company you're billing.", sensible: true },
  { key: "client_email", question: "What's the client's email? 📬", hint: "So they can get a copy." },
  { key: "client_phone", question: "Client phone number? 📱", hint: "Optional but useful." },
  { key: "client_address", question: "What's the client's address? 🏠", hint: "City or full address." },
  { key: "currency", question: "Which currency should we use? 💰", hint: "Like USD, EUR, AED, PKR..." },
  { key: "items", question: "What service or products did you provide? 🛠️", hint: "Describe the work and the price, like 'Logo design 500 USD'." },
  { key: "tax_percentage", question: "Any tax percentage? 🧾", hint: "Just the number, like 5. Or type 0." },
  { key: "discount", question: "Any discount? 🏷️", hint: "Amount or percentage, or 0." },
  { key: "due_date", question: "When is the due date? 📅", hint: "e.g. 2026-06-30" },
  { key: "qr_code_data", question: "Add a QR code? (payment link, etc.) 📲", hint: "Optional, type 'skip' if none." },
  { key: "notes", question: "Any notes or payment instructions? 📝", hint: "'Payment due within 15 days' or 'Thank you!'" },
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
  let trimmed = answer.trim();

  // Intelligent phrase extraction (like "my business name is Zuniq")
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

function ruleBasedChat(msg: string, currentData: InvoiceData): { reply: string; updatedData: InvoiceData } {
  const data = { ...currentData, items: currentData.items.map((i) => ({ ...i })) };
  const t = msg.trim();
  const lower = t.toLowerCase();

  // Very friendly greetings
  if (["hello", "hi", "hey", "yo", "good morning", "good afternoon", "good evening"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    return {
      reply: nextIdx === -1
        ? "Hey there! All your invoice details are filled. You can review and finalize whenever you're ready. 😊"
        : `Hey! 👋 Let's create your invoice together — it's completely free. ${fieldOrder[nextIdx].question}`,
      updatedData: data,
    };
  }

  // Thanks
  if (["thanks", "thank you", "thx", "appreciate"].some(g => lower.includes(g))) {
    return { reply: "You're welcome! 😊 I'm happy to help. Anything else you need?", updatedData: data };
  }

  // Confused / help
  if (["help", "not sure", "idk", "i don't know", "confused", "what"].some(g => lower.includes(g))) {
    const nextIdx = getNextMissing(data);
    if (nextIdx === -1) return { reply: "No worries! Your invoice is complete. You can review it or start a new one.", updatedData: data };
    return {
      reply: `No problem at all! I'm here to make invoicing easy. ${fieldOrder[nextIdx].hint} Just answer naturally — there's no wrong answer.`,
      updatedData: data,
    };
  }

  const missingIdx = getNextMissing(data);
  if (missingIdx === -1) {
    const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
    const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
    data.subtotal = subtotal;
    data.total = total;
    return { reply: "All done! 🎉 Your invoice is ready. You can preview it or finalize it to download a PDF.", updatedData: data };
  }

  applyAnswer(data, missingIdx, t);
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
  data.subtotal = subtotal;
  data.total = total;

  const nextIdx = getNextMissing(data);
  if (nextIdx === -1) return { reply: "Awesome! 🥳 All fields are filled. You can preview your invoice and finalize when ready.", updatedData: data };
  return { reply: `Great! 👍 ${fieldOrder[nextIdx].question}`, updatedData: data };
}

// ─── Gemini AI (with engaging, casual prompt) ───
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";

const GEMINI_SYSTEM_PROMPT = `You are Zuniq, a super friendly and enthusiastic AI invoice assistant. You help freelancers and small business owners create beautiful invoices just by chatting. You're like a helpful friend who happens to be amazing at invoices.

Your style:
- Warm, casual, and encouraging (use emojis occasionally 😊)
- Use phrases like "Hey!", "No worries!", "Let's do this!", "Awesome!"
- When someone greets you, say something like "Hey there! 👋 Ready to create a free invoice? Let's make it awesome. What's your business name?"
- Always make the user feel confident — even if they don't know something, you gently guide them with hints.
- Never repeat the same question over and over. If they seem stuck, offer an example or a different approach.
- If they correct you (e.g., "No, my business name is actually Zuniq"), thank them and update the info immediately.
- If they ask something completely unrelated, you can briefly chat, but gently bring the conversation back to the invoice.

You are given the current invoice data (JSON) and the conversation history.
Your job:
1. Check which fields are missing.
2. Ask ONE question at a time in a friendly, natural way.
3. When the user answers, update the data and move to the next missing field.
4. When all fields are filled, congratulate them and tell them they can preview and finalize.

IMPORTANT: You must ALWAYS output your response as a JSON object with exactly this format:
{
  "reply": "your message to the user",
  "updatedData": { ... the updated invoice object with all fields }
}
Never include any text outside the JSON.`;

async function geminiChat(msg: string, currentData: InvoiceData, history: string[]): Promise<{ reply: string; updatedData: InvoiceData }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prev = history.map((m, i) => `[${i % 2 === 0 ? "AI" : "User"}]: ${m}`).join("\n");
  const fullPrompt = `${GEMINI_SYSTEM_PROMPT}\n\nCurrent invoice data:\n${JSON.stringify(currentData, null, 2)}\n\nConversation:\n${prev}\n\nUser's latest message: ${msg}`;

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
