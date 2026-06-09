// ============================================================
//  AI powered by Google Gemini (free tier)
// ============================================================

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

// Helper to recalculate totals
function calculateTotals(data: InvoiceData) {
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const total = subtotal + (subtotal * Math.max(0, data.tax_percentage)) / 100 - (data.discount || 0);
  return { subtotal, total };
}

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent";

const SYSTEM_PROMPT = `You are a friendly, professional AI invoice assistant for "Zuniq Invoices".
Your job is to collect information from the user step by step to build a complete invoice.
You are given the current invoice data in JSON format and the conversation history.
Your task is to:
- Check which fields are still missing or empty.
- Ask ONE question at a time to fill the next missing field.
- If the user corrects a previous answer (e.g., "no, my business name is XYZ"), you must update that field and thank them.
- Never repeat a question that has already been answered.
- If all fields are filled, respond that the invoice is complete and the user can review it.
- When the user gives an answer, you must update the invoice data accordingly.

You must output your response in the following JSON format ONLY, with no extra text:
{
  "reply": "your message to the user",
  "updatedData": { ... the updated invoice object with all fields }
}

If the user sends a greeting or thanks, respond naturally but still keep the JSON format.

Important fields and their order:
1. business_name
2. business_email
3. business_phone
4. trn_number
5. business_logo_url (optional, can be skipped)
6. client_name
7. client_email
8. client_phone
9. client_address
10. currency
11. items (list of { description, quantity, unit_price })
12. tax_percentage
13. discount
14. due_date
15. qr_code_data (optional)
16. notes (optional)
17. signature_url (optional)

Always keep the conversation natural and helpful. If the user asks for help or says "I don't know", give them a hint.`;

async function callGemini(
  currentData: InvoiceData,
  userMessage: string,
  history: string[]
): Promise<{ reply: string; updatedData: InvoiceData }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const previousMessages = history
    .map((msg, idx) => `[${idx % 2 === 0 ? "AI" : "User"}]: ${msg}`)
    .join("\n");

  const fullPrompt = `
Current invoice data (JSON):
${JSON.stringify(currentData, null, 2)}

Previous conversation:
${previousMessages}

User's latest message:
${userMessage}

Remember: output ONLY the JSON object with "reply" and "updatedData".`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT + "\n\n" + fullPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1500,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${errorText}`);
  }

  const json = await response.json();
  const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error("No content in Gemini response");

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse JSON from Gemini response");

  const parsed = JSON.parse(jsonMatch[0]);

  const updatedData: InvoiceData = {
    ...currentData,
    ...parsed.updatedData,
  };
  const totals = calculateTotals(updatedData);
  updatedData.subtotal = totals.subtotal;
  updatedData.total = totals.total;
  updatedData.issue_date = updatedData.issue_date || new Date().toISOString().split("T")[0];

  return {
    reply: parsed.reply || "I didn't understand that. Could you rephrase?",
    updatedData,
  };
}

export async function processChat(
  msg: string,
  currentData: InvoiceData,
  history: string[]
): Promise<{ reply: string; updatedData: InvoiceData }> {
  try {
    return await callGemini(currentData, msg, history);
  } catch (error: any) {
    console.error("Gemini error:", error);
    return {
      reply: "I'm sorry, I had a little trouble understanding that. Could you try again?",
      updatedData: currentData,
    };
  }
}
