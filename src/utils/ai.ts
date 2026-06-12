function isSensibleAnswer(key: string, answer: string): boolean {
  // Generic invalid answers that should never be accepted for any field
  const genericInvalid = [
    "ok", "okay", "yes", "no", "fine", "good", "well", "sure", "yep", "nope",
    "maybe", "nothing", "none", "idk", "i don't know", "asdf", "xyz", "test",
    "unknown", "n/a", "na", "hmm", "lol", "k", "yeah", "nah"
  ];
  const lower = answer.trim().toLowerCase();
  if (genericInvalid.includes(lower)) return false;

  // For business name and client name, require at least 2 characters
  if (key === "business_name" || key === "client_name") {
    if (lower.length < 2) return false;
    // Also reject if it's just a number or random characters
    if (/^[0-9]+$/.test(lower)) return false;
  }

  // For email fields, must contain @ and .
  if (key === "business_email" || key === "client_email") {
    if (!answer.includes("@") || !answer.includes(".")) return false;
  }

  // For phone, at least a few digits
  if (key === "business_phone" || key === "client_phone") {
    if (!/\d/.test(answer) || answer.length < 5) return false;
  }

  return true;
}
