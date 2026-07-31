import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatView } from "@/views/ChatView";
import { ModelsView } from "@/views/ModelsView";
import { AgentView } from "@/views/AgentView";
import { PluginsView } from "@/views/PluginsView";
import { ScheduledView } from "@/views/ScheduledView";
import { Toaster } from "@/components/ui/sonner";

export type AppView = "chat" | "agent" | "models" | "plugins" | "scheduled";

export function App() {
  const [activeView, setActiveView] = useState<AppView>("chat");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return "dark";
      if (stored === "light") return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <AppSidebar
          activeView={activeView}
          onNavigate={setActiveView}
          theme={theme}
          onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
        />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          {activeView === "chat" && <ChatView />}
          {activeView === "agent" && <AgentView />}
          {activeView === "models" && <ModelsView />}
          {activeView === "plugins" && <PluginsView />}
          {activeView === "scheduled" && <ScheduledView />}
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
