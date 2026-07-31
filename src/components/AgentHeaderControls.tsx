"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, LayoutGrid, List } from "lucide-react";

export function AgentHeaderControls() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    const nativeInput = document.getElementById("agentListSearchInput") as HTMLInputElement;
    if (nativeInput) {
      nativeInput.value = val;
      nativeInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const handleViewChange = (val: string) => {
    if (!val) return;
    setViewMode(val);
    if (val === "grid") {
      const btn = document.getElementById("btnViewGrid");
      if (btn) btn.click();
    } else {
      const btn = document.getElementById("btnViewList");
      if (btn) btn.click();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-56 sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={handleSearchChange}
          className="pl-9 h-9 text-xs"
        />
      </div>
      <ToggleGroup type="single" value={viewMode} onValueChange={handleViewChange} className="border border-border/60 rounded-md p-0.5">
        <ToggleGroupItem value="grid" size="sm" aria-label="Grid View" className="h-7 w-7 p-0">
          <LayoutGrid className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" size="sm" aria-label="List View" className="h-7 w-7 p-0">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
