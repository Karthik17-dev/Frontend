"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Paperclip,
  Code,
  Bookmark,
  Globe,
  Mic,
  SendHorizontal,
  Sparkles,
  Bot,
  Monitor,
  ChevronDown,
} from "lucide-react";

export function ChatMenu() {
  const [mode, setMode] = useState("agent");
  const [selectedModel, setSelectedModel] = useState("Orchestrator");

  const handleAttachFile = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
    <TooltipProvider>
      <div className="flex items-center justify-between w-full px-2 py-1.5 gap-2 bg-background/50 rounded-xl border border-border/40 backdrop-blur-xs">
        {/* Left Side: Attachment Dropdown + Mode Capsule */}
        <div className="flex items-center gap-2">
          {/* Attachment Dropdown */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-accent">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">Attach & Context</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" className="w-48 shadow-lg">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Add to Prompt</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleAttachFile} className="cursor-pointer gap-2">
                <Paperclip className="h-4 w-4 text-primary" />
                <span>Add files</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Code className="h-4 w-4 text-blue-500" />
                <span>Import code</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Bookmark className="h-4 w-4 text-amber-500" />
                <span>Saved prompt</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mode Capsule (Agent / Computer) */}
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => val && setMode(val)}
            className="bg-muted/60 p-0.5 rounded-lg border border-border/30"
          >
            <ToggleGroupItem
              value="agent"
              size="sm"
              className="h-7 px-2.5 text-xs gap-1.5 rounded-md data-[state=on]:bg-background data-[state=on]:shadow-xs"
            >
              <Bot className="h-3.5 w-3.5 text-primary" />
              <span>Agent</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="computer"
              size="sm"
              className="h-7 px-2.5 text-xs gap-1.5 rounded-md data-[state=on]:bg-background data-[state=on]:shadow-xs"
            >
              <Monitor className="h-3.5 w-3.5 text-indigo-500" />
              <span>Computer</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Right Side: Model Selector + Mic + Send */}
        <div className="flex items-center gap-1.5">
          {/* Model Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs font-medium gap-1.5 rounded-lg border-border/50">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>{selectedModel}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 shadow-lg">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Select LLM Provider</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedModel("Orchestrator")} className="cursor-pointer justify-between">
                <span className="font-medium">Orchestrator</span>
                <Badge variant="secondary" className="text-[10px] px-1 py-0">Default</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel("Claude 3.7 Sonnet")} className="cursor-pointer justify-between">
                <span>Claude 3.7 Sonnet</span>
                <Badge variant="outline" className="text-[10px] px-1 py-0">Anthropic</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel("GPT-4o")} className="cursor-pointer justify-between">
                <span>GPT-4o</span>
                <Badge variant="outline" className="text-[10px] px-1 py-0">OpenAI</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel("Gemini 2.0 Flash")} className="cursor-pointer justify-between">
                <span>Gemini 2.0 Flash</span>
                <Badge variant="outline" className="text-[10px] px-1 py-0">Google</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Voice Input Mic */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={() => {
                  const micBtn = document.getElementById("voiceInputBtn");
                  if (micBtn) micBtn.click();
                }}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Voice Input</TooltipContent>
          </Tooltip>

          {/* Send Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-xs"
                onClick={() => {
                  const btnSend = document.getElementById("btnSend");
                  if (btnSend) btnSend.click();
                }}
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Send Message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
