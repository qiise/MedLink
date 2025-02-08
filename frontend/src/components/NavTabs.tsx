
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface NavTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: "forum", label: "Forum" },
  { id: "mentorship", label: "Mentorship" },
];

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <div className="flex space-x-1 rounded-xl bg-secondary p-1 max-w-md mx-auto mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200",
            "ring-white ring-opacity-60 ring-offset-2 focus:outline-none",
            activeTab === tab.id
              ? "bg-white text-primary shadow"
              : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
