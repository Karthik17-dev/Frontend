import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UnifiedComposer } from "@/components/assistant-ui/unified-composer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am Zed, your AI coding and automation assistant. How can I help you today?",
      timestamp: "Just now",
    },
  ]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      {/* Header Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Active Session
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Connected
          </Badge>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                  <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                </Avatar>
              )}
              <Card
                className={`p-4 max-w-[80%] rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-card border-border"
                }`}
              >
                {msg.content}
              </Card>
              {msg.role === "user" && (
                <Avatar className="w-8 h-8 border bg-muted">
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Fixed Composer */}
      <div className="p-4 border-t bg-background/80 backdrop-blur flex justify-center">
        <UnifiedComposer />
      </div>
    </div>
  );
}
