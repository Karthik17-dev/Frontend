import React from 'react';
import { createRoot } from 'react-dom/client';
import { PluginConnectDialog } from './components/PluginConnectDialog';
import { AgentCards } from './components/AgentCards';
import { ModelsTabs } from './components/ModelsTabs';
import { SchedulesTabs } from './components/SchedulesTabs';
import './index.css';

// 1. Mount Shadcn UI AgentCards inside the Agents list container
const agentCardsContainer = document.getElementById('agentCards-root');
if (agentCardsContainer) {
  const root = createRoot(agentCardsContainer);
  root.render(React.createElement(AgentCards));
}

// 2. Mount PluginConnectDialog if container is present
const pluginDialogContainer = document.getElementById('plugin-dialog-root');
if (pluginDialogContainer) {
  const root = createRoot(pluginDialogContainer);
  root.render(React.createElement(PluginConnectDialog));
}

// 3. Mount Shadcn UI ModelsTabs
const modelsTabsContainer = document.getElementById('modelsTabs-root');
if (modelsTabsContainer) {
  const root = createRoot(modelsTabsContainer);
  root.render(React.createElement(ModelsTabs));
}

// 4. Mount Shadcn UI SchedulesTabs
const schedulesTabsContainer = document.getElementById('schedulesTabs-root');
if (schedulesTabsContainer) {
  const root = createRoot(schedulesTabsContainer);
  root.render(React.createElement(SchedulesTabs));
}
