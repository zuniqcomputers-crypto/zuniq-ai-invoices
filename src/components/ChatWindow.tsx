"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  messages: { sender: string; text: string }[];
  onSend: (msg: string) => void;
  onFinalize: () => void;
  isComplete: boolean;
}

export default function ChatWindow({ messages, onSend, onFinalize, isComplete }: Props) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white border text-gray-800"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your answer..." className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">Send</button>
        {isComplete && <button type="button" onClick={onFinalize} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm">Finalize</button>}
      </form>
    </div>
  );
}
