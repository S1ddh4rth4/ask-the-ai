"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askTheAI = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); 

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with the Dark Side.");
      }

      const data = await response.json();

      const aiResponse: Message = { 
        role: "ai", 
        text: data.response 
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      const errorResponse: Message = {
        role: "ai",
        text: "The connection to the Holocron was severed. Control your anger and try again.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-black text-red-500 font-mono tracking-wide">
      {/* Sith Holocron Header */}
      <div className="w-full text-center py-4 bg-gradient-to-b from-red-950/30 to-transparent border-b border-red-950">
        <h1 className="text-sm font-black tracking-[0.3em] text-red-600 animate-pulse">
          SITH HOLOCRON CORRUPTION INTERFACE
        </h1>
      </div>

      {/* Conversation History Area */}
      <div className="flex-1 w-full max-w-3xl mx-auto p-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-5 rounded-r-md bg-zinc-950/40 backdrop-blur-sm border-l-4 transition-all duration-500
                ${msg.role === "user" 
                  ? "border-red-500 shadow-[[-10px_0_15px_-3px_rgba(239,68,68,0.5)],_inset_0_0_10px_rgba(239,68,68,0.05)] text-red-400/90" 
                  : "border-red-600 shadow-[[-12px_0_25px_-3px_rgba(220,38,38,0.8)],_inset_0_0_15px_rgba(220,38,38,0.1)] text-red-500 font-medium font-sans"
                }`}
            >
              <div className="text-xs font-black tracking-widest uppercase mb-2 opacity-60">
                {msg.role === "user" ? "▲ Apprentice Command" : "▼ Sith Lord Edict"}
              </div>
              <div className="leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full border-t border-red-950 bg-black p-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="w-full h-32 p-4 rounded-lg bg-black border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600 text-red-400 placeholder-red-950 resize-none shadow-[0_0_15px_rgba(220,38,38,0.05)] disabled:opacity-50"
            placeholder={isLoading ? "The Force is shifting... Wait." : "Submit to your anger... Type your command..."}
          />
          <button 
            onClick={askTheAI}
            disabled={isLoading}
            className={`w-full py-3 px-6 text-black font-black rounded-lg transition-all duration-300 tracking-[0.2em] 
              ${isLoading 
                ? "bg-red-950 text-red-700 cursor-not-allowed opacity-40 shadow-none" 
                : "bg-red-700 hover:bg-red-600 shadow-[0_0_20px_rgba(185,28,28,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)]"
              }`}
          >
            {isLoading ? "COMMUNICATION IN PROGRESS..." : "CHANNEL THE FORCE"}
          </button>
        </div>
      </div>
    </main>
  );
}