import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Trash2, Play } from "lucide-react";

interface ScheduledTask {
  id: string;
  title: string;
  schedule: string;
  lastRun: string;
  status: "active" | "paused";
}

export function ScheduledView() {
  const [tasks] = useState<ScheduledTask[]>([
    { id: "1", title: "Daily Morning News Digest", schedule: "Every day at 8:00 AM", lastRun: "Today at 8:00 AM", status: "active" },
    { id: "2", title: "Weekly Repo Dependency Audit", schedule: "Every Monday at 9:00 AM", lastRun: "3 days ago", status: "active" },
  ]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-y-auto">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Scheduled & Cron Tasks
          </h1>
        </div>
        <Button size="sm" className="gap-1.5 h-8 text-xs font-medium">
          <Plus className="w-3.5 h-3.5" /> Schedule New Task
        </Button>
      </header>

      <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{task.title}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" /> {task.schedule}
                  </CardDescription>
                </div>
                <Badge variant={task.status === "active" ? "default" : "secondary"}>
                  {task.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
              <span>Last executed: {task.lastRun}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs gap-1">
                  <Play className="w-3 h-3" /> Run Now
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
