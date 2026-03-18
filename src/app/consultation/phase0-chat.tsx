"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHASE0_INITIAL_MESSAGE } from "@/lib/phase0-system-prompt";
import { UrlIntake } from "./url-intake";
import type { BusinessIntelligence } from "@/app/api/phase0/extract/route";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Phase = 1 | 2 | 3 | 4;
type ViewState = "url-intake" | "chat" | "saving" | "complete";

const PHASE_LABELS: Record<Phase, string> = {
  1: "Business Overview",
  2: "Discovery",
  3: "Gap Identification",
  4: "Proposal",
};

function detectPhase(messages: Message[]): Phase {
  const userCount = messages.filter((m) => m.role === "user").length;
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const isComplete = lastAssistant?.content.includes("[PHASE0_COMPLETE]");

  if (isComplete) return 4;
  if (userCount >= 5) return 3;
  if (userCount >= 2) return 2;
  return 1;
}

function isConversationComplete(messages: Message[]): boolean {
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  return lastAssistant?.content.includes("[PHASE0_COMPLETE]") ?? false;
}

function stripMarker(content: string): string {
  return content.replace("[PHASE0_COMPLETE]", "").trim();
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-neutral-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ phase }: { phase: Phase }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {([1, 2, 3, 4] as Phase[]).map((p) => (
        <div key={p} className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              p <= phase
                ? "bg-[var(--accent-blue)]"
                : "bg-neutral-700"
            }`}
          />
          <span
            className={`hidden sm:inline transition-colors ${
              p === phase
                ? "text-neutral-200"
                : p < phase
                ? "text-neutral-500"
                : "text-neutral-600"
            }`}
          >
            {PHASE_LABELS[p]}
          </span>
          {p < 4 && <span className="text-neutral-700 hidden sm:inline">/</span>}
        </div>
      ))}
    </div>
  );
}

// Simple markdown to safe text renderer — only processes LLM output (not user input).
// Escapes HTML entities first to prevent any injection, then applies formatting.
function renderMarkdown(text: string): string {
  // Escape HTML entities first
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return (
    escaped
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Headers
      .replace(/^### (.+)$/gm, '<h4 class="text-base font-semibold text-neutral-100 mt-4 mb-2">$1</h4>')
      .replace(/^## (.+)$/gm, '<h3 class="text-lg font-semibold text-neutral-100 mt-5 mb-2">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 class="text-xl font-bold text-neutral-100 mt-6 mb-3">$1</h2>')
      // Unordered lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-neutral-300">$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-neutral-300">$1</li>')
      // Paragraphs (double newlines)
      .replace(/\n\n/g, '</p><p class="mt-3">')
      // Single newlines
      .replace(/\n/g, "<br>")
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const content = stripMarker(message.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? "bg-[var(--accent-blue)] text-white rounded-br-md"
            : "bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-200 rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div
            className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
      </div>
    </motion.div>
  );
}

function CompletionPanel({
  messages,
  onSave,
  saving,
}: {
  messages: Message[];
  onSave: (email: string, businessName: string) => void;
  saving: boolean;
}) {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(email, businessName);
  };

  // Extract the proposal from the last assistant message
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const proposalText = lastAssistant ? stripMarker(lastAssistant.content) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 rounded-lg bg-[var(--accent-blue-glow)] border border-[var(--accent-blue)]/30">
        <h3 className="text-lg font-semibold text-neutral-100 mb-2">
          Your Phase 0 assessment is ready
        </h3>
        <p className="text-sm text-neutral-400">
          Enter your details below to receive the full document and have it saved for follow-up.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-base focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Business name (optional)
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-base focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            placeholder="Your business name"
          />
        </div>
        <button
          type="submit"
          disabled={saving || !email}
          className="w-full py-3 text-base font-medium rounded-lg bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save & Get Document"}
        </button>
      </form>

      {/* Download as text */}
      <button
        onClick={() => {
          const blob = new Blob(
            [
              `ARAGON Phase 0 Assessment\n${"=".repeat(40)}\n\n${proposalText}\n\n---\nGenerated by A.R.A.G.O.N. Phase 0 Discovery\nhttps://aragon.dev`,
            ],
            { type: "text/plain" }
          );
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "aragon-phase0-assessment.txt";
          a.click();
          URL.revokeObjectURL(url);
        }}
        className="w-full py-3 text-sm font-medium rounded-lg border border-[var(--border)] text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 transition-colors"
      >
        Download as text file
      </button>
    </motion.div>
  );
}

function CompletedView({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 space-y-6"
    >
      <div className="w-16 h-16 rounded-full bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 flex items-center justify-center mx-auto">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--accent-green)]"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-neutral-100 mb-2">Assessment saved</h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          Craig will review your Phase 0 assessment and follow up within 24 hours.
          Check your email for a copy of the document.
        </p>
      </div>
      <a
        href="mailto:craigdanielk@gmail.com?subject=Phase 0 Follow-up"
        className="inline-block px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
      >
        Email Craig directly
      </a>
      <div>
        <button
          onClick={onRestart}
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Start a new assessment
        </button>
      </div>
    </motion.div>
  );
}

export function Phase0Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: PHASE0_INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("url-intake");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [businessContext, setBusinessContext] = useState<BusinessIntelligence | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const phase = detectPhase(messages);
  const complete = isConversationComplete(messages);

  const handleIntelligenceComplete = (intelligence: BusinessIntelligence) => {
    setBusinessContext(intelligence);
    setViewState("chat");
  };

  const handleSkipToChat = () => {
    setViewState("chat");
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    setError("");
    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/phase0/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          ...(businessContext ? { businessContext } : {}),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get response");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let assistantContent = "";
      let buffer = "";

      // Add a placeholder assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantContent += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed
            }
          }
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      // Remove the empty assistant message if there was an error
      setMessages((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].role === "assistant" && prev[prev.length - 1].content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSave = async (email: string, businessName: string) => {
    setSaving(true);
    try {
      await fetch("/api/phase0/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          contactEmail: email,
          conversationHistory: messages,
          apqcMap: null,
          gaps: null,
          proposal: null,
        }),
      });
      setViewState("complete");
    } catch {
      setError("Failed to save. You can still download the document.");
    } finally {
      setSaving(false);
    }
  };

  const handleRestart = () => {
    setMessages([{ role: "assistant", content: PHASE0_INITIAL_MESSAGE }]);
    setViewState("url-intake");
    setBusinessContext(null);
    setError("");
    setInput("");
  };

  if (viewState === "url-intake") {
    return (
      <UrlIntake
        onComplete={handleIntelligenceComplete}
        onSkip={handleSkipToChat}
      />
    );
  }

  if (viewState === "complete") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <CompletedView onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col" style={{ minHeight: "calc(100vh - 8rem)" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-2">
          Phase 0 Discovery
        </h1>
        <p className="text-sm text-neutral-500 mb-4">
          A conversation to understand your business and identify where we can help.
        </p>
        <ProgressBar phase={phase} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <MessageBubble key={`${i}-${msg.role}`} message={msg} />
          ))}
        </AnimatePresence>

        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-start">
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl rounded-bl-md">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg bg-red-950/30 border border-red-900 text-red-300 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Completion panel or input */}
      {complete && viewState === "chat" ? (
        <CompletionPanel
          messages={messages}
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        !complete && (
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response..."
              rows={1}
              disabled={isStreaming}
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-[15px] focus:outline-none focus:border-[var(--accent-blue)] transition-colors resize-none disabled:opacity-50 placeholder:text-neutral-600"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="p-3 rounded-xl bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )
      )}
    </div>
  );
}
