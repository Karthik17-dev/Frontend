"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

export function AgentFilterBar() {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    const nativePill = document.querySelector(`.filter-pill[data-filter="${val}"]`) as HTMLButtonElement;
    if (nativePill) {
      nativePill.click();
    }
  };

  const handleCreateAgent = () => {
    const btn = document.getElementById("btnOpenCreateAgentForm");
    if (btn) btn.click();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full pt-1 pb-1">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="h-9 bg-muted/50 p-1 border border-border/40">
          <TabsTrigger value="all" className="text-xs px-3">All</TabsTrigger>
          <TabsTrigger value="active" className="text-xs px-3">Active</TabsTrigger>
          <TabsTrigger value="inactive" className="text-xs px-3">Inactive</TabsTrigger>
          <TabsTrigger value="paused" className="text-xs px-3">Paused</TabsTrigger>
          <TabsTrigger value="archived" className="text-xs px-3">Archived</TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs px-3 gap-1">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> Favorites
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Button
        size="sm"
        onClick={handleCreateAgent}
        className="gap-1.5 text-xs font-semibold shadow-xs"
      >
        <Plus className="h-4 w-4" /> Create agent
      </Button>
    </div>
  );
}
