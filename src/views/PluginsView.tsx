import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Puzzle, ShieldCheck, ExternalLink, Check, Plus } from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  description: string;
  installed: boolean;
  category: string;
}

export function PluginsView() {
  const [plugins] = useState<Plugin[]>([
    { id: "google-workspace", name: "Google Workspace", description: "Gmail, Calendar, Drive, and Docs integration", installed: true, category: "Productivity" },
    { id: "github", name: "GitHub Integration", description: "Repository access, issue tracking, and PR management", installed: true, category: "Developer Tools" },
    { id: "notion", name: "Notion Sync", description: "Search and modify Notion workspace pages", installed: false, category: "Notes & Docs" },
    { id: "slack", name: "Slack Messenger", description: "Send alerts and read channel messages", installed: false, category: "Communication" },
    { id: "web-search", name: "Tavily Web Search", description: "Real-time web browsing and information retrieval", installed: true, category: "Search" },
  ]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-y-auto">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <Puzzle className="w-4 h-4 text-primary" /> Plugin & Integration Store
          </h1>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plugins.map((plugin) => (
            <Card key={plugin.id} className="flex flex-col justify-between hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-[11px] mb-2">{plugin.category}</Badge>
                  {plugin.installed && (
                    <Badge variant="default" className="bg-emerald-600 gap-1 text-[11px]">
                      <ShieldCheck className="w-3 h-3" /> Enabled
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base">{plugin.name}</CardTitle>
                <CardDescription className="text-xs leading-relaxed">{plugin.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                {plugin.installed ? (
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Configured
                  </Button>
                ) : (
                  <Button size="sm" className="h-8 gap-1.5 text-xs">
                    <Plus className="w-3.5 h-3.5" /> Connect <ExternalLink className="w-3 h-3 ml-0.5" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
