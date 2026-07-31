"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Bot,
  Play,
  Pause,
  MoreVertical,
  Star,
  Sparkles,
  ExternalLink,
  Shield,
  Code,
  DollarSign,
  Share2,
  HelpCircle,
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
    lastActive: " Just now",
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

export function AgentPageView() {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && agent.status === "active";
    if (filter === "paused") return matchesSearch && agent.status === "paused";
    if (filter === "inactive") return matchesSearch && agent.status === "inactive";
    if (filter === "favorites") return matchesSearch && agent.isFavorite;
    return matchesSearch;
  });

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
    <div className="w-full min-h-full p-6 space-y-6 bg-background text-foreground">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
          <p className="text-sm text-muted-foreground">Your autonomous AI workforce, working for you.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agents..."
              className="pl-9 h-9 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as any)}>
            <ToggleGroupItem value="grid" size="sm" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" size="sm" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Hero Card */}
      <Card className="relative overflow-hidden border-border/60 bg-linear-to-r from-primary/10 via-card to-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Your workspace, connected</CardTitle>
          </div>
          <CardDescription>
            Deploy custom agents to automate code audits, data synthesis, and workflow routines around the clock.
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-2">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            Explore Integrations <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>

      {/* Filters & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <Tabs value={filter} onValueChange={setFilter} className="w-auto">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
            <TabsTrigger value="paused" className="text-xs">Paused</TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs gap-1">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> Favorites
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          size="sm"
          className="gap-1.5 text-xs font-semibold"
          onClick={() => {
            const btn = document.getElementById("btnOpenCreateAgentForm");
            if (btn) btn.click();
          }}
        >
          <Plus className="h-4 w-4" /> Create Agent
        </Button>
      </div>

      {/* Agents Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="group hover:border-primary/50 transition-all shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
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
                        {agent.isFavorite ? "Remove Favorite" : "Mark as Favorite"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(agent.id)}>
                        {agent.status === "active" ? "Pause Agent" : "Activate Agent"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/30">
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
                  className="h-7 text-xs gap-1"
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
      ) : (
        <div className="space-y-2">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="p-3 flex items-center justify-between hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback>{getRoleIcon(agent.avatarKey)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm flex items-center gap-2">
                    {agent.name}
                    <Badge variant="outline" className="text-[10px]">{agent.role}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                  {agent.status}
                </Badge>
                <Button size="sm" variant="ghost" className="h-8" onClick={() => toggleStatus(agent.id)}>
                  {agent.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
