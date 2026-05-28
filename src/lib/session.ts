import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export function getSessionId(): string {
  const cookieStore = cookies();
  let sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return sessionId;
}
