"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bot,
  Play,
  Pause,
  MoreVertical,
  Star,
  Shield,
  Code,
  DollarSign,
  Share2,
  Edit,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: "active" | "paused" | "inactive";
  isFavorite?: boolean;
  avatarKey?: string;
  model?: string;
  lastActive?: string;
}

const defaultAgents: Agent[] = [
  {
    id: "security",
    name: "Security Sentinel",
    role: "Security & Compliance",
    description: "Monitors vulnerability advisories, audits dependencies, and enforces security policies.",
    status: "active",
    isFavorite: true,
    avatarKey: "security",
    model: "Claude 3.7 Sonnet",
    lastActive: "2m ago",
  },
  {
    id: "coder",
    name: "Code Architect",
    role: "Software Engineering",
    description: "Automates refactoring, generates unit test suites, and conducts automated code reviews.",
    status: "active",
    isFavorite: true,
    avatarKey: "coder",
    model: "GPT-4o",
    lastActive: "Just now",
  },
  {
    id: "research",
    name: "Deep Researcher",
    role: "Research & Synthesis",
    description: "Gathers web data, analyzes documentation, and produces technical summaries.",
    status: "active",
    avatarKey: "research",
    model: "Gemini 2.0 Flash",
    lastActive: "15m ago",
  },
  {
    id: "finance",
    name: "Cost Guard",
    role: "Financial Audit",
    description: "Tracks LLM API spending, flags abnormal usage, and optimizes context budget.",
    status: "paused",
    avatarKey: "finance",
    model: "Orchestrator",
    lastActive: "1h ago",
  },
  {
    id: "social",
    name: "Community Manager",
    role: "Social & Growth",
    description: "Drafts release notes, monitors feedback channels, and manages announcements.",
    status: "inactive",
    avatarKey: "social",
    model: "GPT-4o-mini",
    lastActive: "2d ago",
  },
];

export function AgentCards() {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => {
        if (data?.agents?.length) {
          setAgents(data.agents);
        }
      })
      .catch(() => {});
  }, []);

  const toggleStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a
      )
    );
  };

  const toggleFavorite = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isFavorite: !a.isFavorite } : a))
    );
  };

  const getRoleIcon = (key?: string) => {
    switch (key) {
      case "security": return <Shield className="h-4 w-4 text-emerald-500" />;
      case "coder": return <Code className="h-4 w-4 text-blue-500" />;
      case "finance": return <DollarSign className="h-4 w-4 text-amber-500" />;
      case "social": return <Share2 className="h-4 w-4 text-purple-500" />;
      default: return <Bot className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full pt-2">
      {agents.map((agent) => (
        <Card key={agent.id} className="group hover:border-primary/50 transition-all shadow-xs border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border bg-muted/40">
                  <AvatarFallback>{getRoleIcon(agent.avatarKey)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    {agent.name}
                    {agent.isFavorite && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">{agent.role}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleFavorite(agent.id)}>
                    <Star className="mr-2 h-3.5 w-3.5" />
                    {agent.isFavorite ? "Remove Favorite" : "Mark as Favorite"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleStatus(agent.id)}>
                    {agent.status === "active" ? <Pause className="mr-2 h-3.5 w-3.5" /> : <Play className="mr-2 h-3.5 w-3.5" />}
                    {agent.status === "active" ? "Pause Agent" : "Activate Agent"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const editNav = document.getElementById("navAgent");
                      if (editNav) editNav.click();
                    }}
                  >
                    <Edit className="mr-2 h-3.5 w-3.5" /> Edit Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pb-3">
            <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/30">
              <span>Model: {agent.model || "Orchestrator"}</span>
              <span>Active: {agent.lastActive}</span>
            </div>
          </CardContent>

          <CardFooter className="pt-2 justify-between border-t border-border/30 bg-muted/20">
            <Badge
              variant={agent.status === "active" ? "default" : agent.status === "paused" ? "secondary" : "outline"}
              className="capitalize text-[10px]"
            >
              {agent.status}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs gap-1 hover:bg-background"
              onClick={() => toggleStatus(agent.id)}
            >
              {agent.status === "active" ? (
                <>
                  <Pause className="h-3 w-3" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" /> Start
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
