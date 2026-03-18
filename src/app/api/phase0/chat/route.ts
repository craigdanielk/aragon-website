import { PHASE0_SYSTEM_PROMPT } from "@/lib/phase0-system-prompt";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body: { messages: Message[]; businessContext?: Record<string, unknown> } = await request.json();

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "API not configured. Please contact craigdanielk@gmail.com directly.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = body.businessContext
      ? `## BUSINESS INTELLIGENCE (pre-extracted from client website)\n${JSON.stringify(body.businessContext, null, 2)}\n\n---\n\n${PHASE0_SYSTEM_PROMPT}`
      : PHASE0_SYSTEM_PROMPT;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        stream: true,
        messages: body.messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response back to the client as Server-Sent Events
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
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

                  if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`)
                    );
                  }

                  if (parsed.type === "message_stop") {
                    controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                  }
                } catch {
                  // Skip malformed JSON lines
                }
              }
            }
          }

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Phase0 chat error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
