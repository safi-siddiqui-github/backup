"use client";

import { useState } from "react";
import { BudgetTabKey } from "./types";
import { BudgetTabs } from "./budget-tab";
 

const tabs: { key: BudgetTabKey; label: string; count?: number }[] = [
  { key: "overview", label: "Overview" },
  { key: "categories", label: "Categories", count: 6 },
  { key: "vendors", label: "Vendors", count: 12 },
  { key: "cashflow", label: "Cash Flow" },
  { key: "roi", label: "ROI Analysis" },
  { key: "insights", label: "Insights" },
];

export default function Budget() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-200">
          Budget Intelligence & Forecasting
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
          Track spend, savings, risk, and ROI across your event.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { value: "$48.8K", label: "Projected Final Spend", color: "indigo" },
          { value: "85%", label: "Confidence", color: "blue" },
          { value: "$1.3K", label: "Projected Savings", color: "green" },
          { value: "15%", label: "Overrun Risk", color: "red" },
          { value: "$1.6K", label: "Weekly Burn Rate", color: "orange" },
          { value: "$31", label: "Cost Per Attendee", color: "purple" },
        ].map((item) => (
          <div
            key={item.label}
            className={`p-4 bg-white dark:bg-slate-700/50 rounded-xl border border-${item.color}-200 dark:border-${item.color}-700`}
          >
            <div className={`text-xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}>
              {item.value}
            </div>
            <div className={`text-sm font-medium text-${item.color}-900 dark:text-${item.color}-300`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <BudgetTabs tabs={tabs} selected={selected} setSelected={setSelected} />
    </div>
  );
}
