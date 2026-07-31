import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Boxes, Search, CheckCircle2, Key, Zap } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  category: string;
  status: "connected" | "not_configured" | "error";
  modelsCount: number;
}

export function ModelsView() {
  const [search, setSearch] = useState("");
  const [providers] = useState<Provider[]>([
    { id: "groq", name: "Groq", category: "Fast Inference", status: "connected", modelsCount: 8 },
    { id: "qwen", name: "Alibaba Qwen", category: "Open Weights", status: "connected", modelsCount: 12 },
    { id: "openai", name: "OpenAI", category: "Frontier", status: "connected", modelsCount: 6 },
    { id: "anthropic", name: "Anthropic", category: "Frontier", status: "not_configured", modelsCount: 4 },
    { id: "google", name: "Google Gemini", category: "Multimodal", status: "connected", modelsCount: 5 },
    { id: "deepseek", name: "DeepSeek", category: "Reasoning", status: "connected", modelsCount: 3 },
  ]);

  const filtered = providers.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-y-auto">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <Boxes className="w-4 h-4 text-primary" /> Model Registry & Providers
          </h1>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search providers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto w-full space-y-6">
        <Tabs defaultValue="providers">
          <TabsList className="mb-4">
            <TabsTrigger value="providers" className="gap-2"><Boxes className="w-4 h-4" /> AI Providers</TabsTrigger>
            <TabsTrigger value="custom" className="gap-2"><Zap className="w-4 h-4" /> Local & Custom Endpoints</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <Card key={p.id} className="relative overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <CardDescription className="text-xs">{p.category}</CardDescription>
                    </div>
                    {p.status === "connected" ? (
                      <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[11px]">
                        Not Configured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-xs text-muted-foreground pt-0">
                  <span>{p.modelsCount} models available</span>
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                    <Key className="w-3.5 h-3.5" /> API Key
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Custom OpenAI-Compatible Endpoint</CardTitle>
                <CardDescription className="text-xs">Connect to Ollama, vLLM, LM Studio, or local servers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Base URL</label>
                  <Input placeholder="http://localhost:11434/v1" className="text-xs font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Model Name</label>
                  <Input placeholder="llama3.2:latest" className="text-xs font-mono" />
                </div>
                <Button size="sm" className="gap-2"><Zap className="w-4 h-4" /> Save Endpoint</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
