"use client";

import { useState } from "react";
import TicketTabs from "./ticket-tab";

const tabKeys = [
  "overview",
  "sales",
  "promos",
  "demographics",
  "checkin",
  "insights",
] as const;
type TabKey = (typeof tabKeys)[number];

const ticketTabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "sales", label: "Sales" },
  { key: "promos", label: "Promos" },
  { key: "demographics", label: "Demographics" },
  { key: "checkin", label: "Check-in" },
  { key: "insights", label: "Insights" },
];

const tabStyles: Record<
  TabKey,
  { text: string; border: string; selectedBg: string }
> = {
  overview: {
    text: "text-indigo-700",
    border: "border-indigo-200",
    selectedBg: "bg-indigo-600",
  },
  sales: {
    text: "text-green-700",
    border: "border-green-200",
    selectedBg: "bg-green-600",
  },
  promos: {
    text: "text-pink-700",
    border: "border-pink-200",
    selectedBg: "bg-pink-600",
  },
  demographics: {
    text: "text-blue-700",
    border: "border-blue-200",
    selectedBg: "bg-blue-600",
  },
  checkin: {
    text: "text-orange-700",
    border: "border-orange-200",
    selectedBg: "bg-orange-600",
  },
  insights: {
    text: "text-sky-700",
    border: "border-sky-200",
    selectedBg: "bg-sky-600",
  },
};

export default function AnalyticsTicketTab() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="space-y-6">
      {/* Tab Content */}

      <>
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-200">
            AI-Powered Ticketing Intelligence
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
            Actionable insights for ticket sales, revenue, and attendance.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-xl border border-indigo-200 bg-white p-4 dark:border-indigo-700 dark:bg-indigo-900/40">
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
              234
            </div>
            <div className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
              Projected Final Sales
            </div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-blue-900/40">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-300">
              85%
            </div>
            <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
              Confidence
            </div>
          </div>
          <div className="rounded-xl border border-green-200 bg-white p-4 dark:border-green-700 dark:bg-green-900/40">
            <div className="text-xl font-bold text-green-600 dark:text-green-300">
              $32.5K
            </div>
            <div className="text-sm font-medium text-green-900 dark:text-green-200">
              Projected Revenue
            </div>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4 dark:border-orange-700 dark:bg-orange-900/40">
            <div className="text-xl font-bold text-orange-600 dark:text-orange-300">
              18
            </div>
            <div className="text-sm font-medium text-orange-900 dark:text-orange-200">
              Expected No-Shows
            </div>
          </div>
          <div className="rounded-xl border border-violet-200 bg-white p-4 dark:border-violet-700 dark:bg-violet-900/40">
            <div className="text-xl font-bold text-violet-600 dark:text-violet-300">
              12
            </div>
            <div className="text-sm font-medium text-violet-900 dark:text-violet-200">
              Last-Minute Purchases
            </div>
          </div>
          <div className="rounded-xl border border-rose-200 bg-white p-4 dark:border-rose-700 dark:bg-rose-900/40">
            <div className="text-xl font-bold text-rose-600 dark:text-rose-300">
              4.2%
            </div>
            <div className="text-sm font-medium text-rose-900 dark:text-rose-200">
              Refund Rate
            </div>
          </div>
        </div>

        {/* Status Card */}
        {/* <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 p-4 dark:border-slate-700 dark:from-green-900/40 dark:via-yellow-900/40 dark:to-red-900/40">
          <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500"></span>
          <span className="font-semibold text-green-700 dark:text-green-300">
            Low Refund Risk
          </span>
          <span className="ml-auto text-xs text-gray-500 dark:text-slate-400">
            AI confidence: 85%
          </span>
        </div> */}
      </>

      <TicketTabs
        selected={selectedTab}
        setSelected={setSelectedTab}
        tabKeys={tabKeys}
        ticketTabs={ticketTabs}
        tabStyles={tabStyles}
      />
    </div>
  );
}
