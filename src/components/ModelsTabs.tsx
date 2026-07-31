"use client";

import { useState } from "react";

export function ModelsTabs() {
  const [activeTab, setActiveTab] = useState("providers");

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    if (typeof window !== "undefined" && (window as any).modelsStore) {
      (window as any).modelsStore.setTab(value);
    }
    const tabContentProviders = document.getElementById("tabContentProviders");
    const tabContentModels = document.getElementById("tabContentModels");
    if (value === "providers") {
      if (tabContentProviders) tabContentProviders.style.display = "block";
      if (tabContentModels) tabContentModels.style.display = "none";
    } else {
      if (tabContentProviders) tabContentProviders.style.display = "none";
      if (tabContentModels) tabContentModels.style.display = "block";
    }
  };

  return (
    <div className="agents-filter-pills flex items-center gap-2">
      <button
        className={`filter-pill ${activeTab === "providers" ? "active" : ""}`}
        onClick={() => handleTabClick("providers")}
        data-tab="providers"
      >
        Providers
      </button>
      <button
        className={`filter-pill ${activeTab === "models" ? "active" : ""}`}
        onClick={() => handleTabClick("models")}
        data-tab="models"
      >
        Models
      </button>
    </div>
  );
}
