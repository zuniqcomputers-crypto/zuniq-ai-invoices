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

function calculateTotals(data: InvoiceData) {
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * data.tax_percentage / 100) - data.discount;
  return { subtotal, total };
}

function parseDate(text: string): string | null {
  const match = text.match(/\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}|\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}|\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}/i);
  return match ? match[0] : null;
}

function extractCurrency(text: string): string | null {
  const map: Record<string, string> = {
    $: "USD", usd: "USD", dollar: "USD",
    "€": "EUR", eur: "EUR", euro: "EUR",
    "£": "GBP", gbp: "GBP", pound: "GBP",
    pkr: "PKR", rs: "PKR", rupee: "PKR",
    inr: "INR",
  };
  for (const [key, val] of Object.entries(map)) {
    if (text.toLowerCase().includes(key)) return val;
  }
  return null;
}

function extractNumber(text: string): number | null {
  const match = text.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

// Common greetings, thanks, etc.
const greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "yo"];
const thanks = ["thanks", "thank you", "thx", "appreciate"];
function isGreeting(t: string) { return greetings.some(g => t.toLowerCase().includes(g)); }
function isThanks(t: string) { return thanks.some(g => t.toLowerCase().includes(g)); }

// Get the first missing field question
function getMissingQuestion(data: InvoiceData): string | null {
  if (!data.business_name) return "What is your business name?";
  if (!data.business_email) return "What's your business email?";
  if (!data.client_name) return "Who is the client?";
  if (!data.client_email) return "What is the client's email?";
  if (!data.client_address) return "What is the client's address?";
  if (data.items.length === 0 || data.items.every(i => !i.description || i.unit_price === 0))
    return "What service did you provide? And how much did you charge?";
  if (!data.currency) return "Which currency should we use? (USD, EUR, PKR, etc.)";
  if (data.tax_percentage === 0) return "Any tax percentage? (e.g., 10% tax)";
  if (data.discount === 0) return "Any discount amount?";
  if (!data.due_date) return "What is the due date? (e.g., 2026-06-01)";
  if (!data.notes) return "Any additional notes for the invoice?";
  return null;
}

// Check if the last AI message was the same question (to avoid repetition)
function lastAiWasSameQuestion(history: string[], question: string): boolean {
  if (history.length === 0) return false;
  const last = history[history.length - 1];
  return last === question;
}

// Provide hints for common "stuck" situations
function getHint(question: string): string {
  const hints: Record<string, string> = {
    "What is your business name?": "Just tell me the name of your business or your own name.",
    "What's your business email?": "I need an email address for your business (e.g., hello@example.com).",
    "Who is the client?": "Tell me the client's name (e.g., 'client is Ali' or just 'Ali').",
    "What is the client's email?": "The client's email address.",
    "What is the client's address?": "The client's physical address or city.",
    "What service did you provide? And how much did you charge?": "Describe the service and the price, like 'Logo design for 5000 PKR'.",
    "Which currency should we use?": "USD, EUR, PKR, INR, etc.",
    "Any tax percentage?": "If you charged tax, what percentage? (e.g., '10% tax')",
    "Any discount amount?": "If you gave a discount, how much? (e.g., '5% discount')",
    "What is the due date?": "When should the client pay? (e.g., '2026-06-15')",
    "Any additional notes for the invoice?": "Anything extra, like payment terms or a thank you note.",
  };
  return hints[question] || "Just type your answer naturally.";
}

export function processChat(
  msg: string,
  currentData: InvoiceData,
  history: string[]
): { reply: string; updatedData: InvoiceData } {
  const data = { ...currentData, items: currentData.items.map(i => ({ ...i })) };
  const t = msg.trim().toLowerCase();

  // 1. Greetings
  if (isGreeting(t)) {
    const nextQ = getMissingQuestion(data);
    return {
      reply: nextQ
        ? `Hello! Let's get started. ${nextQ}`
        : "Hello! All invoice details are filled. Feel free to review and finalize.",
      updatedData: data,
    };
  }

  // 2. Thanks
  if (isThanks(t)) {
    return {
      reply: "You're welcome! 😊 Anything else you need?",
      updatedData: data,
    };
  }

  // 3. Help / "not sure"
  if (t.match(/not sure|what do you mean|help|idk|i don't know|confused/i)) {
    const nextQ = getMissingQuestion(data);
    if (!nextQ) return { reply: "All set! You can review and finalize.", updatedData: data };
    const hint = getHint(nextQ);
    return { reply: `No worries! ${hint}`, updatedData: data };
  }

  // ---------- Extract information ----------
  // Business name
  if (!data.business_name) {
    const m = t.match(/(?:my business|company|i am|i'm) (?:is |called )?([A-Za-z0-9 &]+)/i);
    if (m) data.business_name = m[1].trim();
    else if (t.split(" ").length <= 3 && !t.match(/\d/)) data.business_name = t;
  }

  // Client name
  if (!data.client_name) {
    let m = t.match(/(?:for|client is|client name is|to) ([A-Za-z ]+?)(?:,|\.|$| and| for)/i);
    if (!m) m = t.match(/(?:it is|its) ([A-Za-z ]+?)(?:,|\.|$| and| for)/i);
    if (m) data.client_name = m[1].trim();
    else if (t.split(" ").length <= 3 && !t.match(/\d/)) data.client_name = t;
  }

  // Emails
  const emails = t.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);
  if (emails) {
    if (!data.business_email && emails[0]) data.business_email = emails[0];
    if (!data.client_email && emails[1]) data.client_email = emails[1];
    if (!data.client_email && emails[0] && data.business_email !== emails[0]) data.client_email = emails[0];
  }

  // Currency & amount
  const curr = extractCurrency(t);
  if (curr) data.currency = curr;
  const amt = extractNumber(t);
  if (amt !== null) {
    if (data.items.length === 0) {
      data.items.push({ description: "", quantity: 1, unit_price: amt });
    } else if (data.items[0].unit_price === 0) {
      data.items[0].unit_price = amt;
    }
  }

  // Description
  if (data.items.length > 0 && !data.items[0].description) {
    const desc = t.match(/(?:for|did|made|created|service|provided?) ([a-zA-Z0-9 ]+?)(?: for|,|\.|$| and| at)/i);
    if (desc) data.items[0].description = desc[1].trim();
    else if (!t.match(/\d/) && t.length > 2) data.items[0].description = t;
  }

  // Discount & tax
  const disc = t.match(/(\d+)\s*%?\s*(off|discount)/i);
  if (disc) data.discount = parseFloat(disc[1]);
  const tax = t.match(/(\d+)\s*%?\s*tax/i);
  if (tax) data.tax_percentage = parseFloat(tax[1]);

  // Dates
  const date = parseDate(t);
  if (date && !data.due_date) data.due_date = date;

  // Address
  if (!data.client_address) {
    const addr = t.match(/(?:address|located at) (?:is )?(.+)/i);
    if (addr) data.client_address = addr[1].trim();
  }

  if (!data.issue_date) data.issue_date = new Date().toISOString().split("T")[0];

  // Recalculate totals
  const { subtotal, total } = calculateTotals(data);
  data.subtotal = subtotal;
  data.total = total;

  // ---------- Decide next reply ----------
  const nextQ = getMissingQuestion(data);
  const anyChange = JSON.stringify(data) !== JSON.stringify(currentData);

  if (nextQ) {
    // If no data was extracted and the same question was asked last time, give a hint
    if (!anyChange && lastAiWasSameQuestion(history, nextQ)) {
      const hint = getHint(nextQ);
      return { reply: `I still need that info. ${hint}`, updatedData: data };
    }
    // Normal flow: ask the next question
    return { reply: nextQ, updatedData: data };
  }

  // All fields filled
  return {
    reply: "All information collected! You can review your invoice on the right. Want to make changes or finalize?",
    updatedData: data,
  };
}
