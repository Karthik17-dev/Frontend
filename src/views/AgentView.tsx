import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, Cpu, Terminal, Play, Square, Activity } from "lucide-react";

export function AgentView() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs] = useState<string[]>([
    "[System] Agent initialized in computer-use mode",
    "[Watchdog] Active subagent monitoring attached",
    "[Task] Waiting for user directive...",
  ]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-y-auto">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" /> Autonomous Subagent Control
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isRunning ? "destructive" : "default"}
            onClick={() => setIsRunning(!isRunning)}
            className="gap-1.5 h-8 text-xs font-medium"
          >
            {isRunning ? (
              <>
                <Square className="w-3.5 h-3.5" /> Stop Agent
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Start Agent
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* Status Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary animate-pulse" /> Live Telemetry Watchdog
              </CardTitle>
              <Badge variant={isRunning ? "default" : "secondary"}>
                {isRunning ? "Running" : "Idle"}
              </Badge>
            </div>
            <CardDescription className="text-xs">Real-time SSE event loop stream & subagent monitor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Task Execution Progress</span>
                <span>{isRunning ? "45%" : "0%"}</span>
              </div>
              <Progress value={isRunning ? 45 : 0} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-muted/50 rounded-lg border text-center">
                <div className="text-xs text-muted-foreground">Subagents Spawned</div>
                <div className="text-lg font-bold">0</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg border text-center">
                <div className="text-xs text-muted-foreground">Tool Calls</div>
                <div className="text-lg font-bold">0</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg border text-center">
                <div className="text-xs text-muted-foreground">CPU Usage</div>
                <div className="text-lg font-bold flex items-center justify-center gap-1">
                  <Cpu className="w-4 h-4 text-emerald-500" /> 1.2%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Terminal Log Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Agent Event Console
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs space-y-1 h-64 overflow-y-auto">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="text-emerald-400">➜</span> {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
