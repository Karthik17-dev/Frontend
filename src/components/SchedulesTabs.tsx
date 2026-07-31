"use client";

import { useState } from "react";

export function SchedulesTabs() {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    if (typeof window !== "undefined" && (window as any).schedulesStore) {
      (window as any).schedulesStore.setTab(value);
    }
  };

  return (
    <div className="agents-filter-pills flex items-center gap-2">
      <button
        className={`filter-pill ${activeTab === "all" ? "active" : ""}`}
        onClick={() => handleTabClick("all")}
        data-status="all"
      >
        All
      </button>
      <button
        className={`filter-pill ${activeTab === "active" ? "active" : ""}`}
        onClick={() => handleTabClick("active")}
        data-status="active"
      >
        Active
      </button>
      <button
        className={`filter-pill ${activeTab === "paused" ? "active" : ""}`}
        onClick={() => handleTabClick("paused")}
        data-status="paused"
      >
        Paused
      </button>
    </div>
  );
}
